"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const client = await clerkClient();
  const users = await client.users.getUserList();
  
  return users.data.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddresses[0].emailAddress,
    role: (user.publicMetadata?.role as string) || "user",
    imageUrl: user.imageUrl,
  }));
}

export async function updateUserRole(userId: string, role: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role },
  });
  return { success: true };
}