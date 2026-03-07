"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/**
 * UPSERT TEAM MEMBER
 * Handles ImageKit uploads, slug generation, and UUID-based Prisma sync.
 */
export const upsertTeam = async (formData: FormData) => {
  try {
    // 1. Extract ID (UUID String)
    const id = (formData.get("id") as string) || "";

    // 2. Extract basic fields matching your model
    const name = (formData.get("name") as string) || "";
    const role = (formData.get("role") as string) || "";
    const bio = (formData.get("bio") as string) || "";
    const expertise = (formData.get("expertise") as string) || "";
    const email = (formData.get("email") as string) || "";
    const linkedin = (formData.get("linkedin") as string) || "";

    // 3. Parse Array fields safely (String[])
    const parseArray = (key: string) => {
      try {
        const raw = formData.get(key) as string;
        const parsed = JSON.parse(raw || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const education = parseArray("education");
    const achievements = parseArray("achievements");
    const experience = parseArray("experience");

    // 4. Handle Image upload via ImageKit
    const existingImage = (formData.get("existingImage") as string) || "";
    const newFile = formData.get("image") as File | null;
    let imageUrl = existingImage;

    if (newFile && newFile.size > 0) {
      const buffer = Buffer.from(await newFile.arrayBuffer());
      const result = await imagekit.upload({
        file: buffer,
        fileName: `team_${Date.now()}_${newFile.name.replace(/\s+/g, "_")}`,
        folder: "team",
      });
      imageUrl = result.url;
    }

    // 5. Generate Slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") 
      .replace(/[\s_-]+/g, "-") 
      .replace(/^-+|-+$/g, "");

    // 6. Data Object for Prisma
    const teamData = {
      name,
      slug,
      role,
      bio,
      expertise,
      email,
      linkedin,
      image: imageUrl,
      education,
      achievements,
      experience,
    };

    let member;

    // 7. DB Operation: Check if updating (valid UUID) or creating
    if (id && id.trim() !== "" && id !== "undefined") {
      member = await db.team.update({
        where: { id: id },
        data: teamData,
      });
    } else {
      member = await db.team.create({
        data: teamData,
      });
    }

    // 8. Revalidate paths
    revalidatePath("/admin/team");
    revalidatePath("/team");
    revalidatePath(`/team/${slug}`);

    return { success: true, data: member };
  } catch (error: any) {
    console.error("Team Save Error:", error);
    return { success: false, error: error.message || "Failed to save team member" };
  }
};

/**
 * GET ALL TEAM MEMBERS
 */
export const getTeamMembers = async () => {
  try {
    const members = await db.team.findMany({
      orderBy: { createdAt: "asc" },
    });
    return { success: true, data: members };
  } catch (error) {
    console.error("Fetch Team Error:", error);
    return { success: false, error: "Failed to fetch team members" };
  }
};

/**
 * GET SINGLE MEMBER BY SLUG
 */
export const getTeamMemberBySlug = async (slug: string) => {
  try {
    const member = await db.team.findUnique({
      where: { slug },
    });
    return { success: true, data: member };
  } catch (error) {
    return { success: false, error: "Member not found" };
  }
};

/**
 * DELETE TEAM MEMBER
 */
export const deleteTeam = async (id: string) => {
  try {
    await db.team.delete({
      where: { id },
    });
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, error: "Delete failed" };
  }
};