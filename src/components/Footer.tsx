"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © {currentYear} {personalInfo.name} {personalInfo.fullName}. Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{" "}
            in Vietnam
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
