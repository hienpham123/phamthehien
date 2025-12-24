"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, Target, Rocket, LucideIcon } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";
import { useCountUp } from "@/hooks/useCountUp";

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  index,
  isInView,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix: string;
  index: number;
  isInView: boolean;
}) {
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
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05, 
        y: -5, 
        borderColor: "#00ff00",
        boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        style={{
          willChange: "auto",
          transform: "translate3d(0, 0, 0)",
        }}
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

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stats = [
    { icon: User, label: "Projects Completed", value: 50, suffix: "+", color: "from-blue-500/20 to-purple-500/20" },
    { icon: Target, label: "Satisfied Clients", value: 30, suffix: "+", color: "from-purple-500/20 to-pink-500/20" },
    { icon: Rocket, label: "Years of Experience", value: 5, suffix: "+", color: "from-pink-500/20 to-red-500/20" },
  ];

  return (
    <section ref={ref} id="about" className="py-12 sm:py-20 md:py-32 relative overflow-hidden">
      <motion.div
        style={{ 
          y, 
          opacity,
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0)",
        }}
        className="container-custom section-padding"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-mono text-[#00ff00]">
              $ const about = require(&apos;./about.ts&apos;)
            </h2>
            <motion.div
              className="w-24 h-1 bg-[#00ff00] mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-gray-400 text-sm sm:text-base mt-4 font-mono">{'// Personal information terminal'}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <div className="mb-4 font-mono text-[#00ff00] text-sm">
                $ cat about.txt
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">
                {personalInfo.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 pl-4 border-l-2 border-[#00ff00]/30">
                {personalInfo.about.paragraph1}
              </p>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed pl-4 border-l-2 border-[#00ff00]/30">
                {personalInfo.about.paragraph2}
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

          <motion.div
            variants={itemVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
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
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded border-2 border-[#00ff00]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff00] transition-all relative overflow-hidden group font-mono"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="text-[#00ff00] text-xs mb-2">$ console.log(&apos;{item.title}&apos;)</div>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 relative z-10 text-white">{item.title}</h4>
                <p className="text-sm sm:text-base text-white/70 relative z-10 leading-relaxed pl-4 border-l-2 border-[#00ff00]/20">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
