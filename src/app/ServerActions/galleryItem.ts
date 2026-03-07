"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/**
 * UPSERT GALLERY ITEM
 * Uses ImageKit and handles Int ID
 */
export const upsertGalleryItem = async (formData: FormData) => {
  try {
    const rawId = formData.get("id") as string;
    const id = rawId && rawId !== "undefined" ? parseInt(rawId, 10) : null;
    
    const title = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "";
    const description = (formData.get("description") as string) || "";
    const dateInput = (formData.get("date") as string) || "";

    const existingImage = (formData.get("existingImage") as string) || "";
    const newFile = formData.get("image") as File | null;
    let imageUrl = existingImage;

    if (newFile && newFile.size > 0) {
      const buffer = Buffer.from(await newFile.arrayBuffer());
      const result = await imagekit.upload({
        file: buffer,
        fileName: `gallery_${Date.now()}_${newFile.name.replace(/\s+/g, "_")}`,
        folder: "gallery",
      });
      imageUrl = result.url;
    }

    const galleryData = {
      title,
      category,
      description,
      url: imageUrl,
      date: new Date(dateInput),
    };

    let item;
    if (id) {
      item = await db.galleryItem.update({
        where: { id: id },
        data: galleryData,
      });
    } else {
      item = await db.galleryItem.create({
        data: galleryData,
      });
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true, data: item };
  } catch (error: any) {
    console.error("Gallery Save Error:", error);
    return { success: false, error: error.message || "Failed to save photo" };
  }
};

/**
 * DELETE GALLERY ITEM
 */
export const deleteGalleryItem = async (id: number) => {
  try {
    await db.galleryItem.delete({ where: { id: Number(id) } });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Delete failed" };
  }
};

/**
 * GET ALL GALLERY ITEMS (Matches Project Pattern)
 */
export const getGalleryItems = async () => {
  try {
    const items = await db.galleryItem.findMany({
      orderBy: { id: "desc" },
    });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: "Failed to fetch gallery" };
  }
};