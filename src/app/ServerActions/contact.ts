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
      // Update existing message
      contact = await db.contactMessage.update({
        where: { id },
        data: { name, email, phone, subject, message },
      });
    } else {
      // Create new message
      contact = await db.contactMessage.create({
        data: { name, email, phone, subject, message },
      });
    }

    // Revalidate admin contacts page
    revalidatePath("/admin/contacts");

    return { success: true, data: contact };
  } catch (error: any) {
    console.error("Contact Upsert Error:", error);
    return { success: false, error: error.message || "Failed to save message" };
  }
};

/* ---------------- GET ALL CONTACT MESSAGES ---------------- */
export const getContacts = async () => {
  try {
    const contacts = await db.contactMessage.findMany({
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

/* ---------------- DELETE CONTACT MESSAGE ---------------- */
export const deleteContact = async (id: string) => {
  try {
    await db.contactMessage.delete({
      where: { id },
    });
    // Revalidate admin contacts page
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Contact Error:", error);
    return { success: false, error: error.message || "Delete failed" };
  }
};