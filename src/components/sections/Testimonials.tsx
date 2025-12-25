"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/constants/testimonials";
import TestimonialCard from "@/components/common/TestimonialCard";
import { fadeInLeft } from "@/utils/animations";
import { gpuOptimizedOpacity } from "@/utils/styles";

export default function Testimonials() {
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

  return (
    <section ref={ref} id="testimonials" className="py-20 sm:py-32 relative">
      <motion.div
        style={{
          opacity,
          ...gpuOptimizedOpacity,
        }}
        className="container-custom section-padding"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-mono text-[#00ff88]">
            $ journalctl -u security.service | grep -E &apos;SUCCESS|BREACH&apos;
          </h2>
          <div className="w-24 h-1 bg-[#00ff88] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-mono">{"# Security audit logs & verified access"}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

