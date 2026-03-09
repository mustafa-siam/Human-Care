"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

/* ---------------- UPSERT CONTACT MESSAGE ---------------- */
export const upsertContactMessage = async (formData: FormData) => {
  try {
    const id = (formData.get("id") as string) || undefined; // optional for update
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const message = (formData.get("message") as string) || "";

    let contact;

    if (id) {
      contact = await db.contactMessage.update({
        where: { id },
        data: { name, email, phone, subject, message },
      });
    } else {
      contact = await db.contactMessage.create({
        data: { name, email, phone, subject, message },
      });
    }

    revalidatePath("/admin/contacts");
    return { success: true, data: contact };
  } catch (error: any) {
    console.error("Contact Upsert Error:", error);
    return { success: false, error: error.message || "Failed to save message" };
  }
};

/* ---------------- GET ALL CONTACT MESSAGES ---------------- */
export const getContacts = async (trashed: boolean = false) => {
  try {
    const contacts = await db.contactMessage.findMany({
      where: trashed ? { deletedAt: { not: null } } : { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: contacts };
  } catch (error: any) {
    console.error("Get Contacts Error:", error);
    return { success: false, error: error.message || "Failed to fetch contacts" };
  }
};

/* ---------------- GET SINGLE MESSAGE BY ID ---------------- */
export const getContactById = async (id: string) => {
  try {
    const contact = await db.contactMessage.findUnique({
      where: { id },
    });
    return { success: true, data: contact };
  } catch (error: any) {
    console.error("Get Contact Error:", error);
    return { success: false, error: error.message || "Contact not found" };
  }
};

/* ---------------- SOFT DELETE (MOVE TO TRASH) ---------------- */
export const moveToTrash = async (id: string) => {
  try {
    await db.contactMessage.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Move to Trash Error:", error);
    return { success: false, error: error.message || "Failed to move to trash" };
  }
};

/* ---------------- RESTORE FROM TRASH ---------------- */
export const restoreContact = async (id: string) => {
  try {
    await db.contactMessage.update({
      where: { id },
      data: { deletedAt: null },
    });
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Restore Contact Error:", error);
    return { success: false, error: error.message || "Failed to restore contact" };
  }
};

/* ---------------- PERMANENT DELETE ---------------- */
export const deleteContactPermanent = async (id: string) => {
  try {
    await db.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Permanent Delete Error:", error);
    return { success: false, error: error.message || "Delete failed" };
  }
};