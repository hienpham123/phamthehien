"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaReact, FaJs, FaNode, FaGitAlt, FaHtml5, FaCss3Alt, FaAngular } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiThreedotjs, SiTailwindcss, SiMysql, SiPostgresql, SiMongodb } from "react-icons/si";


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
  // { name: "SPFx", Icon: SiMicrosoftsharepoint, bgColor: "#0078D4", textColor: "#FFFFFF" },
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
    <section id="skills" ref={ref} className="py-12 sm:py-20 md:py-32 relative overflow-hidden">
      
      <div className="container-custom section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-mono text-[#00ff00]">
            $ const skills: string[] = [
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[#00ff00] mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-gray-400 text-sm sm:text-base mt-4 font-mono">{'// Technology stack terminal'}</p>
        </motion.div>

        {/* Terminal command */}
        <div className="mb-6 text-center font-mono text-[#00ff00] text-sm">
          $ npm list --depth=0 | grep -E &apos;react|typescript|spfx|tailwind&apos;
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative overflow-hidden border-2 border-[#00ff00]/30 rounded-lg p-4 bg-black/50 backdrop-blur-sm" style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)" }}>
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-6"
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
            animate={
              isInView
                ? {
                    x: [0, -((80 + 24) * skills.length)], // 80px width (w-20) + 24px gap
                  }
                : { x: 0 }
            }
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              willChange: "transform",
            }}
          >
            {duplicatedSkills.map((skill, index) => {
              const IconComponent = skill.Icon;
              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all cursor-pointer border-2 border-[#00ff00]/20"
                  style={{
                    backgroundColor: skill.bgColor,
                    color: skill.textColor,
                    willChange: "auto",
                    opacity: 0.7,
                    boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)",
                  }}
                  whileHover={{ 
                    opacity: 1,
                    scale: 1.1,
                    borderColor: "#00ff00",
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.4)",
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
