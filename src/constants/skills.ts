import { FaReact, FaJs, FaNode, FaGitAlt, FaHtml5, FaCss3Alt, FaAngular } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiThreedotjs, SiTailwindcss, SiMysql, SiPostgresql, SiMongodb } from "react-icons/si";

export interface Skill {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  textColor: string;
}

export const skills: Skill[] = [
  { name: "React", Icon: FaReact, bgColor: "#61DAFB", textColor: "#000000" },
  { name: "Next.js", Icon: SiNextdotjs, bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "Angular", Icon: FaAngular, bgColor: "#DD0031", textColor: "#FFFFFF" },
  { name: "JavaScript", Icon: FaJs, bgColor: "#F7DF1E", textColor: "#000000" },
  { name: "TypeScript", Icon: SiTypescript, bgColor: "#3178C6", textColor: "#FFFFFF" },
  { name: "Three.js", Icon: SiThreedotjs, bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "Node.js", Icon: FaNode, bgColor: "#339933", textColor: "#FFFFFF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, bgColor: "#06B6D4", textColor: "#FFFFFF" },
  { name: "HTML5", Icon: FaHtml5, bgColor: "#E34F26", textColor: "#FFFFFF" },
  { name: "CSS3", Icon: FaCss3Alt, bgColor: "#1572B6", textColor: "#FFFFFF" },
  { name: "Git", Icon: FaGitAlt, bgColor: "#F05032", textColor: "#FFFFFF" },
  { name: "MySQL", Icon: SiMysql, bgColor: "#4479A1", textColor: "#FFFFFF" },
  { name: "PostgreSQL", Icon: SiPostgresql, bgColor: "#336791", textColor: "#FFFFFF" },
  { name: "MongoDB", Icon: SiMongodb, bgColor: "#47A248", textColor: "#FFFFFF" },
];

