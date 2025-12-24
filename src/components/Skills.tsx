"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaReact, FaJs, FaNode, FaGitAlt, FaHtml5, FaCss3Alt, FaAngular } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiThreedotjs, SiTailwindcss, SiMysql, SiPostgresql, SiMongodb } from "react-icons/si";

// Simple SPFx icon component
const SPFxIcon = ({ className }: { className?: string }) => (
  <span className={className} style={{ fontFamily: "monospace", fontWeight: "bold" }}>SPFx</span>
);

// Skills với react-icons
const skills = [
  { name: "React", Icon: FaReact, bgColor: "#61DAFB", textColor: "#000000" },
  { name: "Next.js", Icon: SiNextdotjs, bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "Angular", Icon: FaAngular, bgColor: "#DD0031", textColor: "#FFFFFF" },
  { name: "JavaScript", Icon: FaJs, bgColor: "#F7DF1E", textColor: "#000000" },
  { name: "TypeScript", Icon: SiTypescript, bgColor: "#3178C6", textColor: "#FFFFFF" },
  { name: "Three.js", Icon: SiThreedotjs, bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "Node.js", Icon: FaNode, bgColor: "#339933", textColor: "#FFFFFF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, bgColor: "#06B6D4", textColor: "#FFFFFF" },
  { name: "HTML5", Icon: FaHtml5, bgColor: "#E34F26", textColor: "#FFFFFF" },
  { name: "CSS3", Icon: FaCss3Alt, bgColor: "#1572B6", textColor: "#FFFFFF" },
  { name: "Git", Icon: FaGitAlt, bgColor: "#F05032", textColor: "#FFFFFF" },
  { name: "SPFx", Icon: SPFxIcon, bgColor: "#0078D4", textColor: "#FFFFFF" },
  { name: "MySQL", Icon: SiMysql, bgColor: "#4479A1", textColor: "#FFFFFF" },
  { name: "PostgreSQL", Icon: SiPostgresql, bgColor: "#336791", textColor: "#FFFFFF" },
  { name: "MongoDB", Icon: SiMongodb, bgColor: "#47A248", textColor: "#FFFFFF" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate skills để tạo infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section id="skills" ref={ref} className="py-12 sm:py-20 md:py-32 relative bg-black overflow-hidden">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Skills
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[#B3F1AA] mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={
              isInView
                ? {
                    x: [0, -((80 + 24) * skills.length)], // 80px width (w-20) + 24px gap
                  }
                : { x: 0 }
            }
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedSkills.map((skill, index) => {
              const IconComponent = skill.Icon;
              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all cursor-pointer"
                  style={{
                    backgroundColor: skill.bgColor,
                    color: skill.textColor,
                  }}
                  title={skill.name}
                >
                  <IconComponent className="text-2xl sm:text-3xl" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
