"use client";

import { useTyping } from "@/hooks/useTyping";
import Cursor from "./Cursor";
import { COLORS } from "@/utils/constants";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorColor?: string;
  showCursor?: boolean;
}

export default function TypingText({
  text,
  speed = 30,
  delay = 0,
  className = "",
  cursorColor = COLORS.primary,
  showCursor = true,
}: TypingTextProps) {
  const { displayedText, isTyping } = useTyping({
    text,
    speed,
    delay,
  });

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <Cursor color={cursorColor} />}
    </span>
  );
}

