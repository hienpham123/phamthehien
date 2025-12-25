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
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 p-3 sm:p-3.5 rounded-lg bg-black/90 backdrop-blur-sm border-2 border-[#00ff88] text-[#00ff88] font-mono text-xs touch-manipulation"
          style={{
            ...gpuOptimized,
            boxShadow: "0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)",
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            borderColor: COLORS.primary,
            backgroundColor: "rgba(0, 255, 136, 0.1)",
            boxShadow: "0 0 30px rgba(0, 255, 136, 0.5), inset 0 0 15px rgba(0, 255, 136, 0.2)",
          }}
          whileTap={{
            scale: 0.98,
            y: 2,
            boxShadow: "0 0 15px rgba(0, 255, 136, 0.3), inset 0 0 8px rgba(0, 255, 136, 0.1)",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

