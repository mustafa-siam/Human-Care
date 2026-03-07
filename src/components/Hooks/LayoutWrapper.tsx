"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/Shared/NavBar";
import { Footer } from "@/components/Shared/Footer";
import { Toaster } from "sonner";

export default function LayoutWrapper({children,}: {children: React.ReactNode;}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <NavBar />}

      {children}

      <Toaster position="top-right" richColors />

      {!isAdminPage && <Footer />}
    </>
  );
}