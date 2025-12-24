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
  const textColor = isGreen ? "#000000" : "#000000"; // Dark text for both
  const numberColor = isGreen ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.15)";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: index + 1,
        marginTop: index === 0 ? "0" : "-10vh",
      }}
      className="flex items-center"
    >
      <motion.div
        style={{
          scale,
          rotate: rotation,
          backgroundColor: bgColor,
          borderRadius: "16px 30px 30px 46px" ,
          padding: "clamp(20px, 4vw, 28px)",
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
        <div className="space-y-4">
          {/* Number & Title - Editorial Layout */}
          <div className="flex items-start gap-3">
            <span
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                color: numberColor,
                lineHeight: 1,
                fontFamily: "inherit",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              style={{
                fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                fontWeight: 700,
                color: textColor,
                lineHeight: 1.2,
                marginTop: "0.25rem",
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Description - Editorial Style */}
          <p
            style={{
              color: textColor,
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              lineHeight: 1.7,
              opacity: 0.85,
              marginTop: "0.5rem",
            }}
          >
            {project.description}
          </p>

          {/* Tech Stack - Minimal Style */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                style={{
                  padding: "4px 8px",
                  borderRadius: "16px",
                  fontSize: "clamp(0.625rem, 1.5vw, 0.6875rem)",
                  backgroundColor: isGreen 
                    ? "rgba(0, 0, 0, 0.08)" 
                    : "rgba(0, 0, 0, 0.06)",
                  color: textColor,
                  border: `1px solid ${isGreen ? "rgba(0, 0, 0, 0.12)" : "rgba(0, 0, 0, 0.1)"}`,
                }}
              >
                {tech}
              </span>
            ))}
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
                backgroundColor: isGreen ? "#000000" : "#000000",
                color: isGreen ? "#FFFFFF" : "#FFFFFF",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
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
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
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
    <section id="portfolio" className="relative bg-black py-12 sm:py-20 md:py-32">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
          {/* Left Section: Title & CTA */}
          <div className="lg:sticky lg:top-32 h-fit z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Tag */}
              <div className="inline-block px-4 py-2 rounded-full border-2 border-[#B3F1AA]">
                <span className="text-sm font-medium text-white">Portfolio</span>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                Expertise Spotlight,
                <br />
                Showcasing Skills
                <br />
                Mastery
              </h2>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white rounded-full border-2 border-[#B3F1AA] text-black font-semibold text-sm sm:text-base hover:bg-[#B3F1AA] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s create
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
