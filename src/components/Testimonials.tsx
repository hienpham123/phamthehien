"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Technical Director",
    content: "The overall design service was impressive, from logo to website. I'll definitely recommend them!",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Consulting Specialist",
    content: "The branding design was outstanding, capturing our brand's essence perfectly. Thanks to the design team!",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Executive Director",
    content: "The design team developed an effective social marketing campaign that boosted our brand's online presence significantly!",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Project Manager",
    content: "The website design service was excellent. User-friendly and well-optimized. A wonderful experience overall!",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Business Owner",
    content: "The logo design exceeded my expectations. It's beautiful and perfectly fits our brand. Very satisfied!",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Marketing Director",
    content: "The design team created a fantastic new brand identity, bringing innovative solutions. The quality is impressive!",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-32 relative bg-black">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Testimonials
          </h2>
          <div className="w-24 h-1 bg-[#B3F1AA] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Feedback from satisfied clients</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#B3F1AA]/50 transition-all relative overflow-hidden group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#B3F1AA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              <div className="relative z-10">
                <Quote className="w-8 h-8 text-white/20 mb-4" />
                <p className="text-gray-300 mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
