"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce platform with integrated payment and smart order management. Built with Next.js and TypeScript for optimal performance and user experience.",
    tech: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web App",
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Task management system with real-time collaboration and analytics dashboard. Features include team collaboration, project tracking, and comprehensive reporting.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web App",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Mobile banking application with high security and user-friendly interface. Includes biometric authentication, real-time transactions, and secure payment processing.",
    tech: ["React Native", "Node.js", "Firebase", "Biometric Auth"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Mobile App",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Data analytics dashboard with interactive visualizations and automated reporting. Provides real-time insights and customizable data views for business intelligence.",
    tech: ["Next.js", "D3.js", "Python", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Dashboard",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Social media platform with sharing, interaction features and live video streaming. Built for scalability with modern technologies and real-time updates.",
    tech: ["React", "GraphQL", "AWS", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web App",
  },
  {
    id: 6,
    title: "AI Content Generator",
    description: "AI content generation tool with multiple templates and advanced customization. Leverages OpenAI API for intelligent content creation and optimization.",
    tech: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
    category: "AI Tool",
  },
];

// Individual Project Card Component
function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: typeof projects[0];
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  // Timeline cho từng card - mỗi card có 120vh scroll space
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;
  
  // Card chỉ scale down khi card tiếp theo bắt đầu xuất hiện
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, 0.96]
  );

  // Subtle rotation - alternating direction
  const rotation = index % 2 === 0 ? -1 : 1;

  // Xen kẽ background: light green (chẵn) và trắng (lẻ)
  const isGreen = index % 2 === 0;
  const bgColor = isGreen ? "#B9F7A5" : "#FFFFFF";
  const textColor = isGreen ? "#000000" : "#000000"; // Pure black for better contrast
  const numberColor = isGreen ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.25)";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "90vh",
        zIndex: index + 1,
        marginTop: index === 0 ? "0" : "6vh",
      }}
      className="flex items-center"
    >
      <motion.div
        style={{
          scale,
          rotate: rotation,
          backgroundColor: bgColor,
          borderRadius: "16px 30px 30px 46px" ,
          padding: "clamp(16px, 3vw, 24px)",
          boxShadow: "0 40px 120px rgba(0, 0, 0, 0.35)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        transition={{
          ease: [0.22, 1, 0.36, 1],
          duration: 0.3,
        }}
        className="w-full max-w-xl mx-auto"
      >
        <div className="space-y-3">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b" style={{ borderColor: isGreen ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.25)" }}>
            <span className="text-xs font-mono font-semibold" style={{ color: isGreen ? "#004400" : "#1a1a1a" }}>
              $ const project_{String(index + 1).padStart(2, "0")}: IProject = {'{'}
            </span>
          </div>

          {/* Number & Title - Terminal Layout */}
          <div className="flex items-start gap-3">
            <span
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 800,
                color: isGreen ? "#004400" : "#1a1a1a",
                lineHeight: 1,
                fontFamily: "monospace",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-xs font-mono mb-1 font-semibold" style={{ color: isGreen ? "#004400" : "#1a1a1a" }}>
                title:
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                  fontWeight: 800,
                  color: textColor,
                  lineHeight: 1.2,
                  fontFamily: "monospace",
                  textShadow: isGreen ? "none" : "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description - Terminal Style */}
          <div>
            <div className="text-xs font-mono mb-1 font-semibold" style={{ color: isGreen ? "#004400" : "#1a1a1a" }}>
              description:
            </div>
            <p
              style={{
                color: textColor,
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                lineHeight: 1.6,
                opacity: 1,
                fontWeight: 500,
                marginTop: "0.5rem",
                fontFamily: "monospace",
                paddingLeft: "1rem",
                borderLeft: `2px solid ${isGreen ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.25)"}`,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack - Terminal Style */}
          <div className="mt-3">
            <div className="text-xs font-mono mb-2 font-semibold" style={{ color: isGreen ? "#004400" : "#1a1a1a" }}>
              techStack:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "clamp(0.625rem, 1.5vw, 0.6875rem)",
                    backgroundColor: isGreen 
                      ? "rgba(0, 0, 0, 0.12)" 
                      : "rgba(0, 0, 0, 0.08)",
                    color: isGreen ? "#004400" : "#000000",
                    fontWeight: 600,
                    border: `1px solid ${isGreen ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.15)"}`,
                    fontFamily: "monospace",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions - Editorial Buttons */}
          <div className="flex gap-2 mt-6">
            <motion.a
              href={project.liveUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  fontSize: "clamp(0.75rem, 2vw, 0.8125rem)",
                fontWeight: 600,
                backgroundColor: isGreen ? "#004400" : "#000000",
                color: isGreen ? "#FFFFFF" : "#FFFFFF",
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              whileHover={{ 
                scale: 1.02,
                y: -1,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ 
                scale: 0.98,
                y: 1,
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.15 }}
            >
              <ExternalLink style={{ width: "14px", height: "14px" }} />
              Live Demo
            </motion.a>

            <motion.a
              href={project.githubUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  fontSize: "clamp(0.75rem, 2vw, 0.8125rem)",
                fontWeight: 600,
                backgroundColor: "transparent",
                color: textColor,
                border: `1px solid ${isGreen ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.15)"}`,
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
              whileHover={{ 
                scale: 1.02,
                y: -1,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ 
                scale: 0.98,
                y: 1,
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
              }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.15 }}
            >
              <Github style={{ width: "14px", height: "14px" }} />
              Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ ONE scroll timeline – giống Framer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="portfolio" className="relative py-12 sm:py-20 md:py-32">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
          {/* Left Section: Title & CTA */}
          <div className="lg:sticky lg:top-32 h-fit z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Tag */}
              <div className="inline-block px-4 py-2 rounded border-2 border-[#00ff00]/50 bg-black/50 backdrop-blur-sm font-mono" style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}>
                <span className="text-sm font-medium text-[#00ff00]">$ const portfolio: IProject[] = [</span>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-mono mt-4">
                <span className="text-[#00ff00]">const title = </span>
                <span className="text-white">&apos;Expertise Spotlight,&apos;</span>
                <br />
                <span className="text-white">&apos;Showcasing Skills&apos;</span>
                <br />
                <span className="text-[#00ff00]">&apos;Mastery&apos;;</span>
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
                $ createProject()
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
