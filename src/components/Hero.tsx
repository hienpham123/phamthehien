"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Code, Sparkles } from "lucide-react";
import { useRef } from "react";
import { personalInfo } from "@/config/personalInfo";
import { useTyping } from "@/hooks/useTyping";

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

  // Optimized transforms with smooth easing
  const y = useTransform(smoothProgress, [0, 1], ["0%", "50%"], {
    clamp: false,
  });
  const opacity = useTransform(smoothProgress, [0, 0.7], [1, 0], {
    clamp: true,
  });
  
  // Background parallax transforms (moved outside JSX)
  const bgY1 = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const bgY2 = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

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
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const words = personalInfo.name.split(" ");

  // Calculate when title animation completes
  const titleAnimationDuration = 0.5 + (words.length + 1) * 0.08 + 0.5;
  const typingDelay = titleAnimationDuration * 1000 + 400; // Add 400ms buffer

  // Typing effect for description
  const { displayedText: typedDescription, isTyping: isTypingDescription } = useTyping({
    text: personalInfo.description,
    speed: 30,
    delay: typingDelay,
  });

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-0">
      {/* Animated Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Optimized: Reduced blur and slower animation for better performance */}
        <motion.div
          style={{ 
            y: bgY1,
            willChange: "transform",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-xl sm:blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
        <motion.div
          style={{ 
            y: bgY2,
            willChange: "transform",
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-xl sm:blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
      </div>

      <motion.div
        style={{ 
          y, 
          opacity,
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
          }}
          whileHover={{ 
            scale: 1.05, 
            borderColor: "#00ff00",
            boxShadow: "0 0 30px rgba(0, 255, 0, 0.4)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear",
              willChange: "transform",
            }}
            style={{ willChange: "transform" }}
          >
            <Sparkles className="w-4 h-4 text-[#00ff00]" />
          </motion.div>
          <span className="text-sm">$ whoami</span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 font-mono"
        >
          <motion.span
            variants={textRevealVariants}
            custom={0}
            initial="hidden"
            animate="visible"
            className="block text-[#00ff00]"
          >
            $ console.log(&quot;Hey, I&apos;m&quot;)
          </motion.span>
          <motion.span className="block mt-2">
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
          <span className="text-[#00ff00]">$ const description = </span>
          <br />
          <span className="text-[#00ff00]">&apos;</span>
          {typedDescription}
          {isTypingDescription && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block ml-1 w-0.5 h-5 bg-[#00ff00] align-middle"
            />
          )}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#portfolio"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-black/80 border-2 border-[#00ff00] rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 relative overflow-hidden group w-auto max-w-[320px] sm:max-w-none justify-center shadow-lg font-mono text-[#00ff00]"
            style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
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
              boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)"
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00ff00] opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Code className="w-5 h-5 relative z-10" />
            <span className="relative z-10 whitespace-nowrap">$ navigate(&apos;/portfolio&apos;)</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#00ff00] rounded-full font-semibold text-sm sm:text-base relative overflow-hidden group text-[#00ff00] w-auto max-w-[280px] sm:max-w-none justify-center shadow-lg font-mono bg-black/50"
            style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              borderColor: "#00ff00",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              boxShadow: "0 0 30px rgba(0, 255, 0, 0.4)"
            }}
            whileTap={{ 
              scale: 0.98,
              y: 2,
              boxShadow: "0 0 15px rgba(0, 255, 0, 0.2)"
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00ff00]/10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative z-10">$ handleContact()</span>
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 flex justify-center"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#00ff00]/70 hover:text-[#00ff00] transition-colors group font-mono"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm">$ scrollTo(&apos;#about&apos;)</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[#00ff00]" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
