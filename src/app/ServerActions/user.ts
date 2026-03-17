"use server";

import { clerkClient } from "@clerk/nextjs/server";

//  Helper to format user
const formatUser = (user: any) => ({
  id: user.id,
  name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "No Name",
  email: user.emailAddresses[0]?.emailAddress || "No Email",
  role: (user.publicMetadata?.role as string) || "user",
  imageUrl: user.imageUrl,
});

// Get ACTIVE users (not deleted)
export async function getUsers() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList();

    return users.data
      .filter((user) => !user.publicMetadata?.deleted)
      .map(formatUser);
  } catch (error) {
    console.error("Get Users Error:", error);
    throw new Error("Failed to fetch users");
  }
}

// Get TRASH users
export async function getDeletedUsers() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList();

    return users.data
      .filter((user) => user.publicMetadata?.deleted)
      .map(formatUser);
  } catch (error) {
    console.error("Get Deleted Users Error:", error);
    throw new Error("Failed to fetch deleted users");
  }
}

// Update role
export async function updateUserRole(userId: string, role: string) {
  try {
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    return { success: true };
  } catch (error) {
    console.error("Update Role Error:", error);
    throw new Error("Failed to update role");
  }
}

// Soft delete → move to trash
export async function deleteUser(userId: string) {
  try {
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: { deleted: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Delete User Error:", error);
    throw new Error("Failed to delete user");
  }
}

// Restore user from trash
export async function restoreUser(userId: string) {
  try {
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: { deleted: false },
    });

    return { success: true };
  } catch (error) {
    console.error("Restore User Error:", error);
    throw new Error("Failed to restore user");
  }
}

// Permanent delete 
export async function permanentDeleteUser(userId: string) {
  try {
    const client = await clerkClient();

    await client.users.deleteUser(userId);

    return { success: true };
  } catch (error) {
    console.error("Permanent Delete Error:", error);
    throw new Error("Failed to permanently delete user");
  }
}