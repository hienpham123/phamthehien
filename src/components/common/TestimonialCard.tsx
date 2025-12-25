"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/constants/testimonials";
import Cursor from "./Cursor";
import { gpuOptimized } from "@/utils/styles";
import { smoothTransition } from "@/utils/animations";
import { COLORS } from "@/utils/constants";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isInView: boolean;
}

export default function TestimonialCard({
  testimonial,
  index,
  isInView,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
      transition={{
        delay: index * 0.1,
        ...smoothTransition,
      }}
      className="p-6 rounded border-2 border-[#00ff00]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff00] transition-all relative overflow-hidden group font-mono"
      style={{
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
        ...gpuOptimized,
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00ff00]/20">
        <span className="text-[#00ff00] text-xs">testimonial_{testimonial.id} = {"{"}</span>
      </div>

      {/* Terminal timestamp */}
      <div className="text-[#00ff00]/60 text-xs mb-3 font-mono">
        [{testimonial.timestamp}]
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />

      <div className="relative z-10">
        {/* Quote with terminal style */}
        <div className="text-sm mb-2 font-mono">
          <span className="text-[#00ff00]">content:</span>{" "}
          <span className="text-white/80">&apos;{testimonial.content}&apos;</span>
          <Cursor color={COLORS.primary} />
          <span className="text-white/80">,</span>
        </div>

        {/* Author info */}
        <div className="border-t border-[#00ff00]/20 pt-4 mt-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#00ff00] text-xs">name:</span>
            <span className="text-white/60 text-xs">&apos;{testimonial.name}&apos;,</span>
          </div>
          <div className="text-white font-semibold text-sm mt-2">{testimonial.name}</div>
          <div className="text-[#00ff00]/70 text-xs mt-1">
            role: &apos;{testimonial.role}&apos;
          </div>
        </div>

        {/* Terminal cursor effect */}
        <div className="mt-4 flex items-center gap-1">
          <span className="text-[#00ff00] text-xs animate-pulse">_</span>
          <span className="text-[#00ff00]/30 text-xs">ready</span>
        </div>
      </div>
    </motion.div>
  );
}

