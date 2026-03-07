"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const upsertNotice = async (formData: FormData) => {
  try {
    const id = (formData.get("id") as string) || "";

    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const excerpt = (formData.get("excerpt") as string) || "";
    const content = (formData.get("content") as string) || "";
    const type = (formData.get("type") as string) || "notice";
    const date = (formData.get("date") as string) || new Date().toISOString();
    const latest = formData.get("latest") === "true";

    const formSlug = (formData.get("slug") as string) || "";
    const slug = formSlug ? generateSlug(formSlug) : generateSlug(title);

    /* ---------- IMAGE HANDLING (same as project) ---------- */

    const existingImage = (formData.get("existingImage") as string) || "";
    const newFile = formData.get("image") as File | null;

    let imageUrl = existingImage;

    if (newFile && newFile.size > 0) {
      const buffer = Buffer.from(await newFile.arrayBuffer());

      const result = await imagekit.upload({
        file: buffer,
        fileName: `notice_${Date.now()}_${newFile.name.replace(/\s+/g, "_")}`,
        folder: "notices",
      });

      imageUrl = result.url;
    }

    /* ---------- DATA ---------- */

    const noticeData = {
      title,
      slug,
      description,
      excerpt,
      content,
      type,
      date: new Date(date),
      latest,
      image: imageUrl,
    };

    let notice;

    if (id && id !== "undefined") {
      notice = await db.notice.update({
        where: { id },
        data: noticeData,
      });
    } else {
      notice = await db.notice.create({
        data: noticeData,
      });
    }

    revalidatePath("/admin/notices");
    revalidatePath("/notices");
    revalidatePath(`/notices/${slug}`);

    return { success: true, data: notice };
  } catch (error: any) {
    console.error("Notice Save Error:", error);
    return { success: false, error: error.message || "Failed to save notice" };
  }
};


export const getNotices = async () => {
  try {
    const notices = await db.notice.findMany({
      orderBy: { date: "desc" },
    });
    // JSON.parse(JSON.stringify()) solves the Date object serialization issue
    return { success: true, data: JSON.parse(JSON.stringify(notices)) };
  } catch (error) {
    return { success: false, error: "Failed to fetch notices" };
  }
};

export const getNoticeBySlug = async (slug: string) => {
  try {
    const notice = await db.notice.findUnique({ where: { slug } });
    return { success: true, data: JSON.parse(JSON.stringify(notice)) };
  } catch (error) {
    return { success: false, error: "Notice not found" };
  }
};

export const deleteNotice = async (id: string) => {
  try {
    await db.notice.delete({ where: { id } });
    revalidatePath("/admin/notices");
    revalidatePath("/notices");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Delete failed" };
  }
};