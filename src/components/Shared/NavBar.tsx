"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled
          ? "bg-[#0F172A]/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="  flex items-center justify-center">
              <span>
                   <Image
                   src={'/logo.jpeg'}
                   alt='logo'
                   width={50}
                   height={40}
                   className='rounded-sm'
                   />
              </span>
            </div>
              <div>
                <h1 className="text-white text-xl font-bold leading-tight">
                  Human Care Global
                </h1>
                <p className="text-[#10B981] text-xs">
                  Building Better Tomorrow
                </p>
              </div>
            </motion.div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/80 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            )}

            <motion.button
              onClick={() => scrollToSection("contact")}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Act Now
            </motion.button>
          </nav>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <motion.nav
            className="lg:hidden mt-4 pb-4 flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              )
            )}

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-left"
            >
              Act Now
            </button>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}