"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

/* ---------------- UPSERT NOTICE (existing) ---------------- */
const generateSlug = (value: string) =>
  value.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

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

    const noticeData = { title, slug, description, excerpt, content, type, date: new Date(date), latest, image: imageUrl };

    let notice;

    if (id && id !== "undefined") {
      notice = await db.notice.update({ where: { id }, data: noticeData });
    } else {
      notice = await db.notice.create({ data: noticeData });
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

/* ---------------- GET NOTICES (optional trashed) ---------------- */
export const getNotices = async (trashed: boolean = false) => {
  try {
    const notices = await db.notice.findMany({
      where: trashed ? { deletedAt: { not: null } } : { deletedAt: null },
      orderBy: { date: "desc" },
    });
    return { success: true, data: JSON.parse(JSON.stringify(notices)) };
  } catch (error: any) {
    console.error("Get Notices Error:", error);
    return { success: false, error: "Failed to fetch notices" };
  }
};

/* ---------------- GET NOTICE BY SLUG ---------------- */
export const getNoticeBySlug = async (slug: string) => {
  try {
    const notice = await db.notice.findUnique({ where: { slug } });
    return { success: true, data: JSON.parse(JSON.stringify(notice)) };
  } catch (error: any) {
    return { success: false, error: "Notice not found" };
  }
};

/* ---------------- SOFT DELETE ---------------- */
export const moveNoticeToTrash = async (id: string) => {
  try {
    await db.notice.update({ where: { id }, data: { deletedAt: new Date() } });
    revalidatePath("/admin/notices");
    return { success: true };
  } catch (error: any) {
    console.error("Move Notice to Trash Error:", error);
    return { success: false, error: error.message || "Failed to move notice to trash" };
  }
};

/* ---------------- RESTORE ---------------- */
export const restoreNotice = async (id: string) => {
  try {
    await db.notice.update({ where: { id }, data: { deletedAt: null } });
    revalidatePath("/admin/notices");
    return { success: true };
  } catch (error: any) {
    console.error("Restore Notice Error:", error);
    return { success: false, error: error.message || "Failed to restore notice" };
  }
};

/* ---------------- PERMANENT DELETE ---------------- */
export const deleteNoticePermanent = async (id: string) => {
  try {
    await db.notice.delete({ where: { id } });
    revalidatePath("/admin/notices");
    return { success: true };
  } catch (error: any) {
    console.error("Permanent Delete Notice Error:", error);
    return { success: false, error: error.message || "Delete failed" };
  }
};