"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Code, Sparkles } from "lucide-react";
import { useRef } from "react";
import { personalInfo } from "@/config/personalInfo";
import { useTyping } from "@/hooks/useTyping";
import Cursor from "@/components/common/Cursor";
import { containerVariants, itemVariants, textRevealVariants } from "@/utils/animations";
import { gpuOptimized, gpuOptimizedOpacity } from "@/utils/styles";
import { COLORS } from "@/utils/constants";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smooth spring animation for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Optimized transforms
  const y = useTransform(smoothProgress, [0, 1], ["0%", "50%"], {
    clamp: false,
  });
  const opacity = useTransform(smoothProgress, [0, 0.7], [1, 0], {
    clamp: true,
  });

  // Background parallax transforms
  const bgY1 = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const bgY2 = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

  const words = personalInfo.name.split(" ");

  // Calculate when title animation completes
  const titleAnimationDuration = 0.5 + (words.length + 1) * 0.08 + 0.5;
  const typingDelay = titleAnimationDuration * 1000 + 400;

  // Typing effect for description
  const { displayedText: typedDescription } = useTyping({
    text: personalInfo.description,
    speed: 30,
    delay: typingDelay,
  });

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-0"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            y: bgY1,
            ...gpuOptimized,
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-xl sm:blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{
            y: bgY2,
            ...gpuOptimized,
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-xl sm:blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        style={{
          y,
          opacity,
          ...gpuOptimizedOpacity,
        }}
        className="container-custom section-padding relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded border-2 border-[#00ff00]/50 bg-black/50 backdrop-blur-sm text-[#00ff00] mb-8 font-mono"
          style={{
            boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
            ...gpuOptimized,
          }}
          whileHover={{
            scale: 1.05,
            borderColor: COLORS.primary,
            boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
          }}
        >
          <motion.div
            style={gpuOptimized}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#00ff00]" />
          </motion.div>
          <span className="text-sm">$ whoami</span>
        </motion.div>

        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 font-mono">
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
                initial="hidden"
                animate="visible"
                className={`inline-block mr-3 ${
                  i === words.length - 1 ? "text-[#00ff00]" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 font-mono"
        >
          <span className="text-[#00ff00]">$ cat about.txt</span>
          <br />
          <span className="text-white/80">{typedDescription}</span>
          <Cursor color={COLORS.primary} />
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#portfolio"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-black/80 border-2 border-[#00ff00] rounded-full font-semibold text-sm sm:text-base text-[#00ff00] shadow-lg font-mono flex items-center gap-2 relative overflow-hidden group w-auto max-w-[280px] sm:max-w-none justify-center"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
              ...gpuOptimized,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 0 30px rgba(0, 255, 0, 0.5)",
              backgroundColor: "#00ff00",
              color: "#000000",
            }}
            whileTap={{
              scale: 0.98,
              y: 2,
              boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)",
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Code className="w-5 h-5 relative z-10" />
            <span className="relative z-10">
              <span className="text-[#00ff00]/50">$</span> explore projects
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#00ff00] rounded-full font-semibold text-sm sm:text-base relative overflow-hidden group text-[#00ff00] w-auto max-w-[280px] sm:max-w-none justify-center font-mono"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
              ...gpuOptimized,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              borderColor: COLORS.primary,
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              boxShadow: "0 0 30px rgba(0, 255, 0, 0.4)",
            }}
            whileTap={{
              scale: 0.98,
              y: 2,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00ff00]/10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative z-10">
              <span className="text-[#00ff00]/50">&gt;</span> connect
            </span>
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-20 flex justify-center">
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#00ff00]/70 hover:text-[#00ff00] transition-colors group font-mono"
            style={gpuOptimized}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm">
              <span className="text-[#00ff00]/50">→</span> discover more
            </span>
            <ArrowDown className="w-5 h-5 text-[#00ff00] group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

