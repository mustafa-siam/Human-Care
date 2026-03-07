"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

export const updateHeroContent = async (formData: FormData) => {
  const id = (formData.get("id") as string) || "singleton";

  // Extract form values
  const badgeText = (formData.get("badgeText") as string) || "";
  const headline = (formData.get("headline") as string) || "";
  const description = (formData.get("description") as string) || "";
  const livesImpacted = (formData.get("livesImpacted") as string) || "";
  const projectsCount = (formData.get("projectsCount") as string) || "";
  const yearsActive = (formData.get("yearsActive") as string) || "";

  try {
    // --- Parse existing images safely ---
    const existingImagesRaw = (formData.get("existingImages") as string) || "[]";
    let existingImages: string[] = [];
    try {
      existingImages = JSON.parse(existingImagesRaw);
      if (!Array.isArray(existingImages)) existingImages = [];
    } catch (err) {
      console.warn("Failed to parse existing images:", err);
      existingImages = [];
    }

    // --- Get new files ---
    const files = formData.getAll("images") as File[];
    let uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file) continue;

      // --- Convert file to Buffer safely in Node.js ---
      let buffer: Buffer;
      if (typeof file.arrayBuffer === "function") {
        // Browser-like File
        buffer = Buffer.from(await file.arrayBuffer());
      } else if (typeof file.stream === "function") {
        // Node.js File (server action)
        const chunks: Buffer[] = [];
        const reader = file.stream();
        for await (const chunk of reader) {
          chunks.push(Buffer.from(chunk));
        }
        buffer = Buffer.concat(chunks);
      } else {
        console.warn("Unknown file type, skipping:", file);
        continue;
      }

      const result = await imagekit.upload({
        file: buffer,
        fileName: file.name || `hero_${Date.now()}`,
        folder: "hero",
      });

      uploadedUrls.push(result.url);
    }

    // --- Combine existing and new images ---
    const finalImages = [...existingImages, ...uploadedUrls];

    // --- Debug log before upsert ---
    console.log({
      id,
      badgeText,
      headline,
      description,
      livesImpacted,
      projectsCount,
      yearsActive,
      existingImages,
      uploadedUrls,
      finalImages,
    });

    // --- Prisma upsert ---
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

    // --- Revalidate pages ---
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Detailed Hero update error:", error);
    throw new Error(error.message || "Hero update failed");
  }
};