"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { gpuOptimized } from "@/utils/styles";
import { COLORS } from "@/utils/constants";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix: string;
  index: number;
  isInView: boolean;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  index,
  isInView,
}: StatCardProps) {
  const countValue = useCountUp({
    end: value,
    suffix: suffix,
    enabled: isInView,
    duration: 2000,
  });

  return (
    <motion.div
      className="text-center p-3 sm:p-4 md:p-6 rounded border-2 border-[#00ff00]/30 bg-black/50 backdrop-blur-sm relative overflow-hidden group font-mono"
      style={{
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
        ...gpuOptimized,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      whileHover={{
        scale: 1.05,
        y: -5,
        borderColor: COLORS.primary,
        boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        style={gpuOptimized}
        animate={{
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-[#00ff00] relative z-10" />
      </motion.div>
      <motion.div
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 relative z-10 text-[#00ff00]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.1 + 0.5 }}
      >
        {countValue}
      </motion.div>
      <div className="text-xs sm:text-sm text-white/70 relative z-10 leading-tight">{label}</div>
    </motion.div>
  );
}

