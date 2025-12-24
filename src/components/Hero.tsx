"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Code, Sparkles } from "lucide-react";
import { useRef } from "react";
import { personalInfo } from "@/config/personalInfo";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const textRevealVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const words = personalInfo.name.split(" ");

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-0">
      {/* Animated Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container-custom section-padding relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#B3F1AA]/30 mb-8 backdrop-blur-sm text-[#B3F1AA]"
          whileHover={{ scale: 1.05, borderColor: "#B3F1AA" }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span className="text-sm">{personalInfo.title}</span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight overflow-hidden px-4"
        >
          <motion.span
            variants={textRevealVariants}
            custom={0}
            className="block text-white"
          >
            Hey, I&apos;m
          </motion.span>
          <motion.span className="block mt-2 overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={textRevealVariants}
                custom={i + 1}
                className={`inline-block mr-3 ${
                  i === words.length - 1 ? "text-[#B3F1AA]" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
        >
          {personalInfo.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#portfolio"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 relative overflow-hidden group w-auto max-w-[280px] sm:max-w-none justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Code className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Portfolio</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#B3F1AA] rounded-full font-semibold text-sm sm:text-base relative overflow-hidden group text-[#B3F1AA] w-auto max-w-[280px] sm:max-w-none justify-center"
            whileHover={{ scale: 1.05, borderColor: "#B3F1AA", backgroundColor: "rgba(179, 31, 170, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#B3F1AA]/10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative z-10">Say Hello</span>
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 flex justify-center"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm">Scroll down</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
