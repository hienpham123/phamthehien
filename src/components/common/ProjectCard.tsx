"use client";

import { motion, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/constants/projects";
import Cursor from "./Cursor";
import { gpuOptimized } from "@/utils/styles";
import { COLORS } from "@/utils/constants";
import { smoothTransition } from "@/utils/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: any;
}

export default function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: ProjectCardProps) {
  // Timeline cho từng card
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;

  // Card scale down khi card tiếp theo bắt đầu xuất hiện
  const scale = useTransform(scrollYProgress, [cardStart, cardEnd], [1, 0.96]);

  // Subtle rotation - alternating direction (nhỏ hơn trên mobile)
  const rotation = index % 2 === 0 ? -2 : 2;
  // Lệch vị trí trái/phải (nhỏ hơn trên mobile)
  const xOffset = index % 2 === 0 ? -10 : 10;

  const topPositions = [80, 90, 100, 110, 120, 130]
  return (
    <div
      style={{
        position: "sticky",
        top: topPositions[index],
        height: "60vh",
        zIndex: index + 1,
      }}
      className="flex items-center"
    >
      <motion.div
        style={{
          scale,
          rotate: rotation,
          x: xOffset,
          ...gpuOptimized,
        }}
        transition={smoothTransition}
        className="w-full max-w-[90%] sm:max-w-md md:max-w-lg mx-auto p-3 sm:p-4 rounded border-2 border-[#00ff88]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff88] transition-all relative overflow-hidden group font-mono"
        whileHover={{
          y: -5,
          boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#00ff88]/20">
          <span className="text-[#00ff88] text-xs">project_{String(index + 1).padStart(2, "0")} = {"{"}</span>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />

        <div className="relative z-10 space-y-2">
          {/* Number & Title */}
          <div className="flex items-start gap-2">
            <span className="text-[#00ff88]/60 text-xl font-bold font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="text-xs mb-0.5 font-mono">
                <span className="text-[#00ff88]">title:</span>{" "}
                <span className="text-white/90 font-semibold">&apos;{project.title}&apos;</span>
                <Cursor color={COLORS.primary} />
                <span className="text-white/90">,</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs font-mono">
            <span className="text-[#00ff88]">description:</span>{" "}
            <span className="text-white/80">&apos;{project.description}&apos;</span>
            <Cursor color={COLORS.primary} />
            <span className="text-white/80">,</span>
          </div>

          {/* Tech Stack */}
          <div className="border-t border-[#00ff88]/20 pt-2">
            <div className="text-xs mb-1.5 font-mono">
              <span className="text-[#00ff88]">tech_stack:</span>{" "}
              <span className="text-white/80">[</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-3">
              {project.tech.slice(0, 4).map((tech: string, techIndex: number) => (
                <span
                  key={tech}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-[#00ff88]/30 bg-[#00ff88]/5 text-white/70 font-mono"
                >
                  &apos;{tech}&apos;{techIndex < Math.min(project.tech.length, 4) - 1 ? "," : ""}
                </span>
              ))}
            </div>
            <span className="text-white/80 text-xs font-mono pl-3">],</span>
          </div>

          {/* Actions */}
          <div className="border-t border-[#00ff88]/20 pt-3 flex gap-2">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] text-xs font-mono hover:bg-[#00ff88]/20 hover:border-[#00ff88] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={smoothTransition}
            >
              <ExternalLink style={{ width: "12px", height: "12px" }} />
              Demo
            </motion.a>

            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] text-xs font-mono hover:bg-[#00ff88]/20 hover:border-[#00ff88] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={smoothTransition}
            >
              <Github style={{ width: "12px", height: "12px" }} />
              Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

