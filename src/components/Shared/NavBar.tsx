"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  
  const isAdmin = user?.publicMetadata?.role === "admin";
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "hero" },
    { label: "Focus", href: "focus" },
    { label: "Projects", href: "projects" },
    { label: "Updates", href: "updates" },
    { label: "Team", href: "team" },
    { label: "Gallery", href: "/gallery", isRoute: true },
    { label: "About Us", href: "about" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0F172A]/80 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
              <Image src={'/logo.jpeg'} alt='logo' width={50} height={40} className='rounded-sm' />
              <div>
                <h1 className="text-white text-xl font-bold leading-tight">Human Care Global</h1>
                <p className="text-[#10B981] text-xs font-medium">Building Better Tomorrow</p>
              </div>
            </motion.div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link key={link.href} href={link.href} className="text-white/80 hover:text-white transition-colors relative group font-medium">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all"></span>
                </Link>
              ) : (
                <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-white/80 hover:text-white transition-colors relative group font-medium cursor-pointer">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all"></span>
                </button>
              )
            )}

            <div className="flex items-center gap-6 border-l border-white/20 pl-6">
            
              {isSignedIn && isAdmin && (
                <div className="cursor-pointer">
                  <UserButton afterSignOutUrl="/">
                    <UserButton.MenuItems>
                      <UserButton.Action 
                        label="Dashboard" 
                        labelIcon={<LayoutDashboard size={16} />} 
                        onClick={() => router.push('/admin')} 
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              )}

              <motion.button
                onClick={() => scrollToSection("contact")}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Act Now
              </motion.button>
            </div>
          </nav>

          <button className="lg:hidden text-white cursor-pointer p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {isMobileMenuOpen && (
          <motion.nav 
            className="lg:hidden mt-4 pb-4 flex flex-col gap-2 bg-[#0F172A] p-6 rounded-2xl border border-white/10 shadow-2xl" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            {navLinks.map((link) => (
               <button 
                key={link.href} 
                onClick={() => link.isRoute ? router.push(link.href) : scrollToSection(link.href)} 
                className="text-white/80 text-left py-3 border-b border-white/5 hover:text-[#10B981] transition-colors"
               >
                {link.label}
               </button>
            ))}
            
            {isSignedIn && isAdmin && (
              <div className="flex flex-col gap-4 pt-4 mt-2">
                <button 
                  onClick={() => { router.push('/admin'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3  font-bold py-2"
                >
                  <LayoutDashboard size={20} /> Dashboard
                </button>
                <div className="flex items-center gap-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-white/70 text-sm">Account Settings</span>
                </div>
              </div>
            )}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}