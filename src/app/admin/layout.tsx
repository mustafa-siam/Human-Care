"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, BellRing, Globe, Users, Images, Contact, Menu, X } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Hero Section", icon: <Globe size={20} />, href: "/admin/hero" },
    { name: "Projects", icon: <Briefcase size={20} />, href: "/admin/projects" },
    { name: "News & Notices", icon: <BellRing size={20} />, href: "/admin/notices" },
    { name: "Our Team", icon: <Users size={20} />, href: "/admin/team" },
    { name: "Gallery Allbum", icon: <Images size={20} />, href: "/admin/gallery" },
    { name: "Contacts", icon: <Contact size={20} />, href: "/admin/contacts" },
    { name:"View Public Site",icon: <FileText size={20} />,href:"/"},
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-72 bg-[#1f2937] border-r border-slate-800 flex-col">
        <div className="p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Human Care
          </h2>
          <p className="text-xs text-slate-500 font-medium tracking-widest uppercase mt-1">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${isActive 
                    ? " text-emerald-400 shadow-md" 
                    : "text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"}`}
              >
                <span className={`transition-colors ${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-[#1f2937] border-r border-slate-800 flex flex-col p-8 space-y-2">
            <button
              className="self-end mb-4 text-slate-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive ? "text-emerald-400 shadow-md" : "text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
          {/* overlay background */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-slate-400"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={28} />
            </button>
            <span className="text-sm text-slate-400 hidden md:inline">Welcome back, Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{ elements: { userButtonAvatarBox: "h-10 w-10" } }}
            />
          </div>
        </header>

        <main className="p-6 md:p-10 animate-in fade-in duration-500">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;