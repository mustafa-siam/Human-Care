"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/**
 * UPSERT PROJECT
 * Handles ImageKit uploads, slug generation, and Prisma database sync.
 * ID is handled as a String (UUID/CUID).
 */
export const upsertProject = async (formData: FormData) => {
  try {
    // 1. Extract ID as a String
    const id = (formData.get("id") as string) || "";
    
    // 2. Extract basic fields
    const title = (formData.get("title") as string) || "";
    const location = (formData.get("location") as string) || "";
    const description = (formData.get("description") as string) || "";
    const fullDescription = (formData.get("fullDescription") as string) || "";
    const beneficiaries = (formData.get("beneficiaries") as string) || "";
    const timeline = (formData.get("timeline") as string) || "";
    const progress = parseInt((formData.get("progress") as string) || "0", 10);

    // 3. Parse arrays safely
    const parseArray = (key: string) => {
      try {
        const raw = formData.get(key) as string;
        const parsed = JSON.parse(raw || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const objectives = parseArray("objectives");
    const impact = parseArray("impact");

    // 4. Handle image upload via ImageKit
    const existingImage = (formData.get("existingImage") as string) || "";
    const newFile = formData.get("image") as File | null;
    let imageUrl = existingImage;

    // Only upload if a valid file with size > 0 is provided
    if (newFile && newFile.size > 0) {
      const buffer = Buffer.from(await newFile.arrayBuffer());
      const result = await imagekit.upload({
        file: buffer,
        fileName: `project_${Date.now()}_${newFile.name.replace(/\s+/g, "_")}`,
        folder: "projects",
      });
      imageUrl = result.url;
    }

    // 5. Generate Slug
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/[\s_-]+/g, "-") // Replace spaces with hyphens
      .replace(/^-+|-+$/g, ""); // Trim hyphens

    // 6. Data Object for Prisma
    const projectData = {
      title,
      slug,
      location,
      description,
      fullDescription,
      beneficiaries,
      timeline,
      progress,
      objectives,
      impact,
      image: imageUrl,
    };

    let project;

    // 7. Check if we are updating (id exists) or creating (no id)
    if (id && id.trim() !== "" && id !== "undefined") {
      // UPDATE existing project
      project = await db.project.update({
        where: { id: id },
        data: projectData,
      });
    } else {
      // CREATE new project
      project = await db.project.create({
        data: projectData,
      });
    }

    // 8. Revalidate paths to refresh the UI
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${slug}`);

    return { success: true, data: project };
  } catch (error: any) {
    console.error("Project Save Error:", error);
    return { success: false, error: error.message || "Failed to save project" };
  }
};

/**
 * DELETE PROJECT
 */
export const deleteProject = async (id: string) => {
  try {
    // id is a string, no parseInt needed
    await db.project.delete({ where: { id } });
    
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    
    return { success: true };
  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, error: "Delete failed" };
  }
};

/**
 * GET ALL PROJECTS
 */
export const getProjects = async () => {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: "Failed to fetch projects" };
  }
};

/**
 * GET SINGLE PROJECT BY SLUG
 */
export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await db.project.findUnique({ 
      where: { slug } 
    });
    return { success: true, data: project };
  } catch (error) {
    return { success: false, error: "Project not found" };
  }
};