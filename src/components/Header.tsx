"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const rafRef = useRef<number>();
  const lastScrollY = useRef(0);

  // Transform scroll progress to percentage (0-100%)
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Throttled scroll handler for better mobile performance
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom section-padding py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="text-lg sm:text-xl font-bold tracking-tight relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{personalInfo.name}</span>
            <motion.span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B3F1AA]"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-white/80 hover:text-[#B3F1AA] transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B3F1AA] group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1.5"
                >
                  <motion.div
                    className="h-0.5 bg-[#B3F1AA] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: "24px", rotate: 45, y: 6 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#B3F1AA] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#B3F1AA] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: "24px", rotate: -45, y: -6 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1.5"
                >
                  <motion.div
                    className="h-0.5 bg-[#B3F1AA] rounded-full"
                    initial={{ width: "20px" }}
                    animate={{ width: "20px" }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#B3F1AA] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: "24px" }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#B3F1AA] rounded-full"
                    initial={{ width: "16px" }}
                    animate={{ width: "16px" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="block py-3 text-sm font-medium text-white/80 hover:text-[#B3F1AA] transition-colors relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0 bg-white/10 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <motion.div
          className="h-full bg-[#B3F1AA]"
          style={{ 
            width: progressWidth,
            willChange: "width",
            transform: "translate3d(0, 0, 0)",
          }}
        />
      </div>
    </motion.header>
  );
}
