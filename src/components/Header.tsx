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
    
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // Small delay to allow menu to close smoothly before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80; // Approximate header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 300); // Wait for menu close animation to complete
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b-2 border-[#00ff00]/30 shadow-lg"
          : "bg-transparent"
      }`}
      style={isScrolled ? {
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
      } : {}}
    >
      <nav className="container-custom section-padding py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="text-lg sm:text-xl font-bold tracking-tight relative group font-mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-[#00ff00]">$ {personalInfo.name.toLowerCase().replace(/\s+/g, '_')}</span>
            <motion.span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ff00]"
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
                className="text-sm font-medium text-white/80 hover:text-[#00ff00] transition-colors relative group font-mono"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#00ff00]/70">$ </span>
                {item.name.toLowerCase()}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ff00] group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.9, y: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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
                    className="h-0.5 bg-[#00ff00] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: "24px", rotate: 45, y: 6 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#00ff00] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#00ff00] rounded-full"
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
                    className="h-0.5 bg-[#00ff00] rounded-full"
                    initial={{ width: "20px" }}
                    animate={{ width: "20px" }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#00ff00] rounded-full"
                    initial={{ width: "24px" }}
                    animate={{ width: "24px" }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="h-0.5 bg-[#00ff00] rounded-full"
                    initial={{ width: "16px" }}
                    animate={{ width: "16px" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu - Terminal Style */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 pb-4 border-t-2 border-[#00ff00]/30 overflow-hidden bg-black/80 backdrop-blur-sm rounded-lg font-mono"
              style={{
                boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
              }}
            >
              <div className="px-4 py-2 text-xs text-[#00ff00]/70 border-b border-[#00ff00]/20">
                $ menu --mobile
              </div>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="block py-3 px-4 text-sm font-medium text-white hover:text-[#00ff00] transition-colors relative group border-b border-[#00ff00]/10 last:border-b-0 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    x: 5,
                    backgroundColor: "rgba(0, 255, 0, 0.05)",
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    x: 8,
                    backgroundColor: "rgba(0, 255, 0, 0.1)",
                  }}
                >
                  <span className="text-[#00ff00]/70 mr-2">&gt;</span>
                  <span className="relative z-10">{item.name.toLowerCase()}</span>
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0 bg-[#00ff00]/10 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
              <div className="px-4 py-2 text-xs text-[#00ff00]/50 mt-2">
                {'// Navigation terminal'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Progress Bar - Terminal Style */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff00]/20">
        <motion.div
          className="h-full bg-[#00ff00]"
          style={{ 
            width: progressWidth,
            willChange: "width",
            transform: "translate3d(0, 0, 0)",
            boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
          }}
        />
      </div>
    </motion.header>
  );
}
