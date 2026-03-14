"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="text-center space-y-6">
        <h1 className="text-white text-2xl font-bold">
          Sign out from current account
        </h1>

        <SignOutButton redirectUrl="/">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}