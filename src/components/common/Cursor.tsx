"use client";

import { motion } from "framer-motion";
import { cursorBlink } from "@/utils/animations";
import { cursorStyle } from "@/utils/styles";
import { COLORS } from "@/utils/constants";

interface CursorProps {
  color?: string;
  size?: string;
}

export default function Cursor({ color = COLORS.primary, size = "1em" }: CursorProps) {
  return (
    <motion.span
      animate={cursorBlink.animate}
      transition={cursorBlink.transition}
      style={{
        ...cursorStyle,
        width: "2px",
        height: size,
        backgroundColor: color,
      }}
      className="inline-block"
    />
  );
}

