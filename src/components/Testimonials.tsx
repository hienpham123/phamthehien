"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Technical Director",
    content: "The overall design service was impressive, from logo to website. I'll definitely recommend them!",
    timestamp: "2024-01-15 14:32:01",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Consulting Specialist",
    content: "The branding design was outstanding, capturing our brand's essence perfectly. Thanks to the design team!",
    timestamp: "2024-02-03 09:15:42",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Executive Director",
    content: "The design team developed an effective social marketing campaign that boosted our brand's online presence significantly!",
    timestamp: "2024-02-18 16:45:23",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Project Manager",
    content: "The website design service was excellent. User-friendly and well-optimized. A wonderful experience overall!",
    timestamp: "2024-03-05 11:20:15",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Business Owner",
    content: "The logo design exceeded my expectations. It's beautiful and perfectly fits our brand. Very satisfied!",
    timestamp: "2024-03-22 13:55:30",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Marketing Director",
    content: "The design team created a fantastic new brand identity, bringing innovative solutions. The quality is impressive!",
    timestamp: "2024-04-10 10:08:57",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-20 sm:py-32 relative">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-mono text-[#00ff00]">
            $ const testimonials: ITestimonial[] = [
          </h2>
          <div className="w-24 h-1 bg-[#00ff00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-mono">{'// Client feedback terminal'}</p>
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
              className="p-6 rounded border-2 border-[#00ff00]/30 bg-black/50 backdrop-blur-sm hover:border-[#00ff00] transition-all relative overflow-hidden group font-mono"
              style={{
                boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00ff00]/20">
                <span className="text-[#00ff00] text-xs">const</span>
                <span className="text-white/60 text-xs">testimonial_{testimonial.id}: ITestimonial =</span>
                <span className="text-[#00ff00] text-xs">{`{`}</span>
              </div>

              {/* Terminal timestamp */}
              <div className="text-[#00ff00]/60 text-xs mb-3 font-mono">
                [{testimonial.timestamp}]
              </div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#00ff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />
              
              <div className="relative z-10">
                {/* Quote with terminal style */}
                <div className="text-[#00ff00] text-sm mb-2 font-mono">
                  content: &apos;{testimonial.content}&apos;,
                </div>
                <p className="text-white/90 mb-6 leading-relaxed text-sm pl-4 border-l-2 border-[#00ff00]/30">
                  {testimonial.content}
                </p>
                
                {/* Author info with terminal style */}
                <div className="border-t border-[#00ff00]/20 pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#00ff00] text-xs">name:</span>
                    <span className="text-white/60 text-xs">&apos;{testimonial.name}&apos;,</span>
                  </div>
                  <div className="text-white font-semibold text-sm mt-2">
                    {testimonial.name}
                  </div>
                  <div className="text-[#00ff00]/70 text-xs mt-1">
                    role: &apos;{testimonial.role}&apos;
                  </div>
                </div>

                {/* Terminal cursor effect */}
                <div className="mt-4 flex items-center gap-1">
                  <span className="text-[#00ff00] text-xs animate-pulse">_</span>
                  <span className="text-[#00ff00]/30 text-xs">ready</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
