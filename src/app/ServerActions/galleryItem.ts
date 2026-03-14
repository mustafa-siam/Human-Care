"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/* -------------------------------- */
/* UPSERT GALLERY ITEM (MULTI IMAGE) */
/* -------------------------------- */

export const upsertGalleryItem = async (formData: FormData) => {
  try {
    const id = formData.get("id") as string | null;
    const title = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "";
    const description = (formData.get("description") as string) || "";
    const dateInput = (formData.get("date") as string) || "";
    const files = formData.getAll("images") as File[];
    
    // Get IDs of images to remove (for the 'Edit' functionality)
    const removedImageIds = formData.getAll("removedImages[]") as string[];

    // 1. Handle Deletions first if updating
    if (removedImageIds.length > 0) {
      await db.galleryItem.deleteMany({
        where: {
          id: { in: removedImageIds.map((id) => Number(id)) },
        },
      });
    }

    // 2. Prepare Parallel Uploads to ImageKit
    // Using Promise.all is much faster for mobile connections
    const uploadPromises = files
      .filter((file) => file.size > 0)
      .map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: `gallery_${Date.now()}_${file.name.replace(/\s+/g, "_")}`,
          folder: "gallery",
        });

        // Return the data object for Prisma
        return {
          title,
          category,
          description,
          url: uploadResponse.url,
          date: new Date(dateInput),
        };
      });

    const newImageData = await Promise.all(uploadPromises);

    // 3. Database Operation
    if (id) {
      // UPDATE existing records metadata
      // Since your schema stores title/desc in every row, we update all items in this "album"
      // Note: This logic assumes all images with the same title/date are part of one group
      await db.galleryItem.updateMany({
        where: { 
          // You might need a more specific 'albumId' in your schema later, 
          // but for now we use the title/date context or specific ID
          title: title 
        },
        data: { title, category, description, date: new Date(dateInput) },
      });
    }

    // 4. Create the new image entries
    if (newImageData.length > 0) {
      await db.galleryItem.createMany({
        data: newImageData,
      });
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true };
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