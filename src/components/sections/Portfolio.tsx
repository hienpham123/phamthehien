"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/constants/projects";
import ProjectCard from "@/components/common/ProjectCard";
import { fadeInLeft } from "@/utils/animations";

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ONE scroll timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="portfolio" className="relative bg-black py-12 sm:py-20 md:py-32">
      <div className="container-custom section-padding">
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
              <div className="inline-block px-4 py-2 rounded border-2 border-[#00ff00]/50 bg-black/50 backdrop-blur-sm font-mono" style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}>
                <span className="text-sm font-medium text-[#00ff00]">val portfolio: List&lt;Project&gt; = listOf(</span>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-mono mt-4">
                <span className="text-[#00ff00]">val title = </span>
                <span className="text-white">&quot;Expertise Spotlight,&quot;</span>
                <br />
                <span className="text-white">&quot;Showcasing Skills&quot;</span>
                <br />
                <span className="text-[#00ff00]">&quot;Mastery&quot;</span>
              </h2>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-black/80 border-2 border-[#00ff00] rounded-full font-semibold text-sm sm:text-base text-[#00ff00] shadow-lg font-mono"
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
                createProject()
              </motion.a>
            </motion.div>
          </div>

          {/* Right Section: Sticky Stacking Cards */}
          <div
            ref={containerRef}
            className="relative mt-8 lg:mt-0"
            style={{ height: `${projects.length * 100}vh` }}
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
      </div>
    </section>
  );
}

