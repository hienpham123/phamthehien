export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

export const projects: Project[] = [
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

