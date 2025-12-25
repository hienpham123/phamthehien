"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";
import { gpuOptimized } from "@/utils/styles";
import { COLORS } from "@/utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-[#00ff00]/20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-mono"
        >
          <div className="text-[#00ff00]/70 text-sm sm:text-base px-4 space-y-2">
            <p className="text-[#00ff00]">$ def footer() -&gt; None:</p>
            <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
            <p className="flex items-center justify-center gap-1 sm:gap-2">
              <span>Made with</span>
              <motion.span
                style={gpuOptimized}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-[#00ff00] fill-[#00ff00]" />
              </motion.span>
              <span>by {personalInfo.name}</span>
            </p>
            <p className="text-[#00ff00]/50 text-xs mt-4">{"# Component exported"}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

