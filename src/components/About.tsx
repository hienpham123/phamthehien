"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, Target, Rocket } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";

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
    { icon: User, label: "Projects Completed", value: "50+", color: "from-blue-500/20 to-purple-500/20" },
    { icon: Target, label: "Satisfied Clients", value: "30+", color: "from-purple-500/20 to-pink-500/20" },
    { icon: Rocket, label: "Years of Experience", value: "5+", color: "from-pink-500/20 to-red-500/20" },
  ];

  return (
    <section ref={ref} id="about" className="py-12 sm:py-20 md:py-32 relative overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="container-custom section-padding"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              About
            </h2>
            <motion.div
              className="w-24 h-1 bg-[#B3F1AA] mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                {personalInfo.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                {personalInfo.about.paragraph1}
              </p>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                {personalInfo.about.paragraph2}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 order-1 md:order-2 mb-8 md:mb-0"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center p-3 sm:p-4 md:p-6 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    whileHover={{ scale: 1.1, y: -5, borderColor: "#B3F1AA" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#B3F1AA]/20 to-[#B3F1AA]/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-white relative z-10" />
                    </motion.div>
                    <motion.div
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-400 relative z-10 leading-tight">{stat.label}</div>
                  </motion.div>
                );
              })}
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
                className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#B3F1AA]/50 hover:bg-white/10 transition-colors relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#B3F1AA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 relative z-10">{item.title}</h4>
                <p className="text-sm sm:text-base text-gray-400 relative z-10 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
