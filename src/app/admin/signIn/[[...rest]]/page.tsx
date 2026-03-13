"use client";

import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminSignInPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata?.role !== "admin") {
      toast.error("Unauthorized user. you can't access dashboard");
      setRedirecting(true);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [isLoaded, isSignedIn, user, router]);

  // return AFTER hooks
  if (!isLoaded) return null;

  if (redirecting) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A] gap-6">
      <Toaster position="top-center" />

      {isSignedIn && user?.publicMetadata?.role !== "admin" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white">
            Signed in as {user.firstName}. Please sign out.
          </p>

          <SignOutButton>
            <button className="px-4 py-2 bg-red-600 rounded text-white">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      )}

      {!isSignedIn && <SignIn routing="path" path="/admin/login" />}
    </div>
  );
}