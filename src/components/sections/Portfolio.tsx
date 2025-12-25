"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/constants/projects";
import ProjectCard from "@/components/common/ProjectCard";
import { fadeInLeft } from "@/utils/animations";
import { gpuOptimizedOpacity } from "@/utils/styles";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for section fade
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // ONE scroll timeline for cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring animation for section fade
  const smoothSectionProgress = useSpring(sectionProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Opacity peaks in center region (0.15 to 0.85), fades at edges
  const sectionOpacity = useTransform(smoothSectionProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3], {
    clamp: true,
  });

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-12 sm:py-20 md:py-32">
      <motion.div
        style={{
          opacity: sectionOpacity,
          ...gpuOptimizedOpacity,
        }}
        className="container-custom section-padding"
      >
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
          {/* Left Section: Title & CTA */}
          <div className="lg:sticky lg:top-32 h-fit z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Tag */}
              <div className="inline-block px-4 py-2 rounded border-2 border-[#00ff88]/50 bg-black/50 backdrop-blur-sm font-mono" style={{ boxShadow: "0 0 20px rgba(0, 255, 136, 0.2)" }}>
                <span className="text-sm font-medium text-[#00ff88]">$ find /root/exploits -type f -name &quot;*.py&quot; -o -name &quot;*.sh&quot;</span>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-mono mt-4">
                <span className="text-[#00ff88]">$ cat /var/log/exploits.log | tail -1</span>
                <br />
                <span className="text-white">&quot;Zero-Day Exploits&quot;</span>
                <br />
                <span className="text-white">&quot;Penetration Testing&quot;</span>
                <br />
                <span className="text-[#00ff88]">&quot;Security Research&quot;</span>
              </h2>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-black/80 border-2 border-[#00ff88] rounded-full font-semibold text-sm sm:text-base text-[#00ff88] shadow-lg font-mono"
                style={{ boxShadow: "0 0 20px rgba(0, 255, 136, 0.3)" }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)",
                  backgroundColor: "#00ff88",
                  color: "#000000",
                }}
                whileTap={{ 
                  scale: 0.98,
                  y: 2,
                  boxShadow: "0 0 15px rgba(0, 255, 136, 0.3)"
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                $ python3 exploit.py --target
              </motion.a>
            </motion.div>
          </div>

          {/* Right Section: Sticky Stacking Cards */}
          <div
            ref={containerRef}
            className="relative mt-8 lg:mt-0"
            style={{ height: `${projects.length * 80}vh` }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

