"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/constants/testimonials";
import TestimonialCard from "@/components/common/TestimonialCard";
import { fadeInLeft } from "@/utils/animations";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-20 sm:py-32 relative">
      <div className="container-custom section-padding">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-mono text-[#00ff00]">
            testimonials = [
          </h2>
          <div className="w-24 h-1 bg-[#00ff00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-mono">{"# Client feedback terminal (Ruby)"}</p>
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
      </div>
    </section>
  );
}

