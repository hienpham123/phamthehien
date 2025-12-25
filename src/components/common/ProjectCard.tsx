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

  // Subtle rotation - alternating direction
  const rotation = index % 2 === 0 ? -3 : 3;

  // Xen kẽ background: light green (chẵn) và off-white (lẻ)
  const isGreen = index % 2 === 0;
  const bgColor = isGreen ? COLORS.lightGreen : COLORS.offWhite;
  const textColor = COLORS.black;
  const numberColor = isGreen ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.25)";
  const borderColor = isGreen ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.25)";
  const cursorColor = isGreen ? COLORS.darkGreen : "#1a1a1a";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "70vh",
        zIndex: index + 1,
        marginTop: index === 0 ? "0" : "4vh",
      }}
      className="flex items-center"
    >
      <motion.div
        style={{
          scale,
          rotate: rotation,
          backgroundColor: bgColor,
          borderRadius: "16px 30px 30px 46px",
          padding: "clamp(12px, 2.5vw, 18px)",
          boxShadow: "0 40px 120px rgba(0, 0, 0, 0.35)",
          ...gpuOptimized,
        }}
        transition={smoothTransition}
        className="w-full max-w-xl mx-auto"
      >
        <div className="space-y-2">
          {/* Terminal Header */}
          <div
            className="flex items-center gap-2 mb-1 pb-1 border-b"
            style={{ borderColor }}
          >
            <span
              className="text-xs font-mono font-semibold"
              style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
            >
              project_{String(index + 1).padStart(2, "0")} = {"{"}
            </span>
          </div>

          {/* Number & Title */}
          <div className="flex items-start gap-2">
            <span
              style={{
                fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
                fontWeight: 800,
                color: isGreen ? COLORS.darkGreen : "#1a1a1a",
                lineHeight: 1,
                fontFamily: "monospace",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div
                className="text-xs font-mono mb-0.5 font-semibold"
                style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
              >
                title:
              </div>
              <h3
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  fontWeight: 800,
                  color: textColor,
                  lineHeight: 1.2,
                  fontFamily: "monospace",
                  textShadow: isGreen ? "none" : "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <div>
            <div
              className="text-xs font-mono mb-0.5 font-semibold"
              style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
            >
              description:
            </div>
            <p
              style={{
                color: textColor,
                fontSize: "clamp(0.6875rem, 1.8vw, 0.75rem)",
                lineHeight: 1.5,
                fontWeight: 500,
                marginTop: "0.25rem",
                fontFamily: "monospace",
                paddingLeft: "0.75rem",
                borderLeft: `2px solid ${borderColor}`,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
              <Cursor color={cursorColor} />
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mt-2">
            <div
              className="text-xs font-mono mb-1 font-semibold"
              style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
            >
              tech_stack:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  style={{
                    padding: "3px 6px",
                    borderRadius: "4px",
                    fontSize: "clamp(0.5625rem, 1.3vw, 0.625rem)",
                    backgroundColor: isGreen
                      ? "rgba(0, 0, 0, 0.08)"
                      : "rgba(0, 0, 0, 0.06)",
                    color: textColor,
                    border: `1px solid ${isGreen ? "rgba(0, 0, 0, 0.12)" : "rgba(0, 0, 0, 0.1)"}`,
                    fontFamily: "monospace",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1.5 mt-3">
            <motion.a
              href={project.liveUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 10px",
                borderRadius: "16px",
                fontSize: "clamp(0.6875rem, 1.8vw, 0.75rem)",
                fontWeight: 600,
                backgroundColor: COLORS.black,
                color: COLORS.white,
                textDecoration: "none",
                ...gpuOptimized,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={smoothTransition}
            >
              <ExternalLink style={{ width: "12px", height: "12px" }} />
              Demo
            </motion.a>

            <motion.a
              href={project.githubUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 10px",
                borderRadius: "16px",
                fontSize: "clamp(0.6875rem, 1.8vw, 0.75rem)",
                fontWeight: 600,
                backgroundColor: "transparent",
                color: textColor,
                border: `1px solid ${isGreen ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.15)"}`,
                textDecoration: "none",
                ...gpuOptimized,
              }}
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

