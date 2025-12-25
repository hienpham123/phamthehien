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
        height: "90vh",
        zIndex: index + 1,
        marginTop: index === 0 ? "0" : "6vh",
      }}
      className="flex items-center"
    >
      <motion.div
        style={{
          scale,
          rotate: rotation,
          backgroundColor: bgColor,
          borderRadius: "16px 30px 30px 46px",
          padding: "clamp(16px, 3vw, 24px)",
          boxShadow: "0 40px 120px rgba(0, 0, 0, 0.35)",
          ...gpuOptimized,
        }}
        transition={smoothTransition}
        className="w-full max-w-xl mx-auto"
      >
        <div className="space-y-3">
          {/* Terminal Header */}
          <div
            className="flex items-center gap-2 mb-2 pb-2 border-b"
            style={{ borderColor }}
          >
            <span
              className="text-xs font-mono font-semibold"
              style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
            >
              val project_{String(index + 1).padStart(2, "0")}: Project = Project(
            </span>
          </div>

          {/* Number & Title */}
          <div className="flex items-start gap-3">
            <span
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 800,
                color: isGreen ? COLORS.darkGreen : "#1a1a1a",
                lineHeight: 1,
                fontFamily: "monospace",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div
                className="text-xs font-mono mb-1 font-semibold"
                style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
              >
                title:
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
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
              className="text-xs font-mono mb-1 font-semibold"
              style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
            >
              description:
            </div>
            <p
              style={{
                color: textColor,
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                lineHeight: 1.6,
                fontWeight: 500,
                marginTop: "0.5rem",
                fontFamily: "monospace",
                paddingLeft: "1rem",
                borderLeft: `2px solid ${borderColor}`,
              }}
            >
              {project.description}
              <Cursor color={cursorColor} />
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mt-3">
            <div
              className="text-xs font-mono mb-2 font-semibold"
              style={{ color: isGreen ? COLORS.darkGreen : "#1a1a1a" }}
            >
              tech_stack:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "clamp(0.625rem, 1.5vw, 0.6875rem)",
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
          <div className="flex gap-2 mt-6">
            <motion.a
              href={project.liveUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "clamp(0.75rem, 2vw, 0.8125rem)",
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
              <ExternalLink style={{ width: "14px", height: "14px" }} />
              Live Demo
            </motion.a>

            <motion.a
              href={project.githubUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "clamp(0.75rem, 2vw, 0.8125rem)",
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
              <Github style={{ width: "14px", height: "14px" }} />
              Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

