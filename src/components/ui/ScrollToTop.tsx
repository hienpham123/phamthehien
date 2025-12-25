"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { gpuOptimized } from "@/utils/styles";
import { COLORS } from "@/utils/constants";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-[#B3F1AA] text-black shadow-lg touch-manipulation"
          style={{
            ...gpuOptimized,
            boxShadow: "0 4px 6px rgba(179, 241, 170, 0.3)",
          }}
          whileHover={{
            scale: 1.1,
            y: -2,
            boxShadow: "0 6px 12px rgba(179, 241, 170, 0.4)",
          }}
          whileTap={{
            scale: 0.95,
            y: 2,
            boxShadow: "0 2px 4px rgba(179, 241, 170, 0.3)",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

