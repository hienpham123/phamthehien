"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/constants/skills";
import { fadeInLeft } from "@/utils/animations";
import { gpuOptimized, gpuOptimizedOpacity } from "@/utils/styles";
import { COLORS } from "@/utils/constants";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Smooth spring animation for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Opacity peaks in center region (0.15 to 0.85), fades at edges
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3], {
    clamp: true,
  });

  // Duplicate skills để tạo infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section id="skills" ref={ref} className="py-12 sm:py-20 md:py-32 relative overflow-hidden">
      <motion.div
        style={{
          opacity,
          ...gpuOptimizedOpacity,
        }}
        className="container-custom section-padding relative z-10"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-mono text-[#00ff88]">
            {"$ which nmap sqlmap burpsuite metasploit"}
          </h2>
          <motion.div
            className="w-24 h-1 bg-[#00ff88] mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-gray-400 text-sm sm:text-base mt-4 font-mono">
            {"// Security tools & exploit frameworks"}
          </p>
        </motion.div>

        {/* Terminal command */}
        <div className="mb-6 text-center font-mono text-[#00ff88] text-sm">
          $ cat ~/.tools/arsenal.txt | head -20
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          className="relative overflow-hidden border-2 border-[#00ff88]/30 rounded-lg p-4 bg-black/50 backdrop-blur-sm"
          style={{ boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)" }}
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            style={gpuOptimized}
            animate={
              isInView
                ? {
                    x: [0, -((80 + 24) * skills.length)],
                  }
                : { x: 0 }
            }
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedSkills.map((skill, index) => {
              const IconComponent = skill.Icon;
              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center cursor-pointer border-2 border-[#00ff88] bg-black/90 backdrop-blur-sm text-[#00ff88]"
                  style={{
                    opacity: 0.7,
                    boxShadow: "0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)",
                    ...gpuOptimized,
                  }}
                  whileHover={{
                    opacity: 1,
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
                  title={skill.name}
                >
                  <IconComponent className="text-2xl sm:text-3xl" style={{ filter: "drop-shadow(0 0 3px currentColor)" }} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

