"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { User, Target, Rocket } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";
import StatCard from "@/components/common/StatCard";
import Cursor from "@/components/common/Cursor";
import { containerVariants, itemVariants } from "@/utils/animations";
import { gpuOptimizedOpacity } from "@/utils/styles";
import { COLORS } from "@/utils/constants";
import { useTyping } from "@/hooks/useTyping";

const stats = [
  { icon: User, label: "Projects Completed", value: 50, suffix: "+" },
  { icon: Target, label: "Satisfied Clients", value: 30, suffix: "+" },
  { icon: Rocket, label: "Years of Experience", value: 5, suffix: "+" },
];

const features = [
  {
    title: "Passionate Learner",
    description: "Always staying updated with the latest technologies and development trends in the industry.",
  },
  {
    title: "High Quality",
    description: "Focused on creating clean, maintainable code and optimal performance.",
  },
  {
    title: "Team Player",
    description: "Experienced working in large teams and managing projects effectively.",
  },
];

export default function About() {
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

  // Opacity peaks in center region (0.05 to 0.95), fades at edges
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0], {
    clamp: true,
  });

  // Typing effect for title
  const titleText = "$ cat /proc/self/status | grep -E 'Name|Uid|Gid'";
  const { displayedText: typedTitle } = useTyping({
    text: titleText,
    speed: 30,
    delay: isInView ? 200 : 0,
  });

  return (
    <section ref={ref} id="about" className="py-12 sm:py-20 md:py-32 relative overflow-hidden">
      <motion.div
        style={{
          opacity,
          ...gpuOptimizedOpacity,
        }}
        className="container-custom section-padding"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-mono text-[#00ff88]">
              {isInView ? typedTitle : titleText}
            </h2>
            <motion.div
              className="w-24 h-1 bg-[#00ff88] mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-gray-400 text-sm sm:text-base mt-4 font-mono">
              {"// System information dump"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <div className="mb-4 font-mono text-[#00ff88] text-sm">$ cat ~/.bash_history | tail -50 | grep -E &apos;exploit|vulnerability|scan&apos;</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
                {personalInfo.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 pl-4 border-l-2 border-[#00ff88]/30">
                {personalInfo.about.paragraph1}
                <Cursor color={COLORS.primary} />
              </p>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed pl-4 border-l-2 border-[#00ff88]/30">
                {personalInfo.about.paragraph2}
                <Cursor color={COLORS.primary} />
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 order-1 md:order-2 mb-8 md:mb-0"
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded border-2 border-[#00ff88]/40 bg-black/70 backdrop-blur-sm hover:border-[#00ff88] transition-all relative overflow-hidden group font-mono"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 136, 0.15)",
                  ...gpuOptimizedOpacity,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="text-[#00ff88] text-xs mb-2">
                  $ echo &quot;{item.title}&quot; | base64
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 relative z-10 text-white">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-white/90 relative z-10 leading-relaxed pl-4 border-l-2 border-[#00ff88]/30">
                  {item.description}
                  <Cursor color={COLORS.primary} />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

