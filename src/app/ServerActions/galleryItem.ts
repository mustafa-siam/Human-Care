"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/* -------------------------------- */
/* UPSERT GALLERY ITEM (MULTI IMAGE) */
/* -------------------------------- */

export const upsertGalleryItem = async (formData: FormData) => {
  try {
    const title = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "";
    const description = (formData.get("description") as string) || "";
    const dateInput = (formData.get("date") as string) || "";

    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return { success: false, error: "No images uploaded" };
    }

    const uploadedItems = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await imagekit.upload({
        file: buffer,
        fileName: `gallery_${Date.now()}_${file.name.replace(/\s+/g, "_")}`,
        folder: "gallery",
      });

      const item = await db.galleryItem.create({
        data: {
          title,
          category,
          description,
          url: result.url,
          date: new Date(dateInput),
        },
      });

      uploadedItems.push(item);
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true, data: uploadedItems };
  } catch (error: any) {
    console.error("Gallery Save Error:", error);

    return {
      success: false,
      error: error.message || "Failed to save gallery",
    };
  }
};

/* -------------------------------- */
/* DELETE SINGLE IMAGE */
/* -------------------------------- */

export const deleteGalleryItem = async (id: number) => {
  try {
    await db.galleryItem.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Delete failed" };
  }
};

/* -------------------------------- */
/* GET ALL ITEMS */
/* -------------------------------- */

export const getGalleryItems = async () => {
  try {
    const items = await db.galleryItem.findMany({
      orderBy: { id: "desc" },
    });

    return { success: true, data: items };
  } catch (error) {
    console.error("Gallery Fetch Error:", error);

    return { success: false, error: "Failed to fetch gallery" };
  }
};