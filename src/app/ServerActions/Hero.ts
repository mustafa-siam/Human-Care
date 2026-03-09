"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/**
 * GET HERO CONTENT
 * Used in homepage
 */
export const getHeroContent = async () => {
  try {
    const hero = await db.heroContent.findUnique({
      where: { id: "singleton" },
    });

    return hero;
  } catch (error) {
    console.error("Hero fetch error:", error);
    return null;
  }
};

/**
 * UPDATE HERO CONTENT
 * Handles image uploads + upsert
 */
export const updateHeroContent = async (formData: FormData) => {
  const id = (formData.get("id") as string) || "singleton";

  const badgeText = (formData.get("badgeText") as string) || "";
  const headline = (formData.get("headline") as string) || "";
  const description = (formData.get("description") as string) || "";
  const livesImpacted = (formData.get("livesImpacted") as string) || "";
  const projectsCount = (formData.get("projectsCount") as string) || "";
  const yearsActive = (formData.get("yearsActive") as string) || "";

  try {
    /**
     * Parse existing images
     */
    const existingImagesRaw =
      (formData.get("existingImages") as string) || "[]";

    let existingImages: string[] = [];

    try {
      existingImages = JSON.parse(existingImagesRaw);
      if (!Array.isArray(existingImages)) existingImages = [];
    } catch (err) {
      console.warn("Failed to parse existing images:", err);
      existingImages = [];
    }

    /**
     * Upload new images
     */
    const files = formData.getAll("images") as File[];

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await imagekit.upload({
        file: buffer,
        fileName: file.name || `hero_${Date.now()}`,
        folder: "hero",
      });

      uploadedUrls.push(result.url);
    }

    /**
     * Combine images
     */
    const finalImages = [...existingImages, ...uploadedUrls];

    /**
     * Upsert hero content
     */
    await db.heroContent.upsert({
      where: { id },

      update: {
        badgeText,
        headline,
        description,
        livesImpacted,
        projectsCount,
        yearsActive,
        images: finalImages,
      },

      create: {
        id,
        badgeText,
        headline,
        description,
        livesImpacted,
        projectsCount,
        yearsActive,
        images: finalImages,
      },
    });

    /**
     * Revalidate pages
     */
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Hero update error:", error);
    throw new Error(error.message || "Hero update failed");
  }
};