"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/**
 * GET HERO CONTENT
 * Used in homepage to fetch the singleton record
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
 * Handles image uploads via ImageKit + Database Upsert
 */
export const updateHeroContent = async (formData: FormData) => {
  // Ensure we use "singleton" to match the @default("singleton") in your Prisma schema
  const id = (formData.get("id") as string) || "singleton";

  const badgeText = (formData.get("badgeText") as string) || "";
  const headline = (formData.get("headline") as string) || "";
  const description = (formData.get("description") as string) || "";
  const livesImpacted = (formData.get("livesImpacted") as string) || "";
  const projectsCount = (formData.get("projectsCount") as string) || "";
  const yearsActive = (formData.get("yearsActive") as string) || "";
  const donateLink = (formData.get("donateLink") as string) || "https://qrinux.com/";

  try {
    /**
     * 1. Parse existing images (sent as a JSON string from the client)
     */
    const existingImagesRaw = (formData.get("existingImages") as string) || "[]";
    let existingImages: string[] = [];

    try {
      existingImages = JSON.parse(existingImagesRaw);
      if (!Array.isArray(existingImages)) existingImages = [];
    } catch (err) {
      console.warn("Failed to parse existing images:", err);
      existingImages = [];
    }

    /**
     * 2. Upload new images to ImageKit
     */
    const files = formData.getAll("images") as File[];
    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Skip empty file inputs
      if (!file || file.size === 0 || typeof file === "string") continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await imagekit.upload({
        file: buffer,
        fileName: file.name || `hero_${Date.now()}`,
        folder: "hero",
      });

      uploadedUrls.push(result.url);
    }

    /**
     * 3. Combine existing images with newly uploaded ones
     */
    const finalImages = [...existingImages, ...uploadedUrls];

    /**
     * 4. Upsert hero content
     * Using the 'singleton' ID ensures we only ever have one hero record.
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
        donateLink,
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
        donateLink,
        images: finalImages,
      },
    });

    /**
     * 5. Revalidate paths to clear Next.js cache
     */
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Hero update error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred while updating hero content." 
    };
  }
};