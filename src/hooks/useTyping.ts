import { useState, useEffect } from "react";

interface UseTypingOptions {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting
  onComplete?: () => void;
}

export function useTyping({ text, speed = 50, delay = 0, onComplete }: UseTypingOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      setDisplayedText("");
      currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      };

      typeNextChar();
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, delay, onComplete]);

  return { displayedText, isTyping, isComplete };
}

