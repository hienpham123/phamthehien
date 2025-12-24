"use client";

import { useEffect, useState, useRef } from "react";

// Characters for terminal effect
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
const COLORS = ["#00ff00", "#ffffff", "#00ffff", "#ff00ff", "#ffff00"];

// Terminal-like code snippets - React.js, TypeScript, SPFx, Tailwind CSS
const CODE_SNIPPETS = [
  "import React from 'react';",
  "const Component: React.FC = () => {",
  "export default function App() {",
  "npm install react react-dom",
  "npm install --save-dev typescript",
  "gulp bundle --ship",
  "gulp package-solution --ship",
  "npm run build",
  "npm run start",
  "npx create-react-app my-app",
  "npm install @microsoft/sp-core-library",
  "import { SPHttpClient } from '@microsoft/sp-http';",
  "className='flex items-center justify-center'",
  "const [state, setState] = useState<string>('');",
  "interface Props { title: string; }",
  "type User = { id: number; name: string; };",
  "const data: IListItem[] = await sp.web.lists.getById(listId).items.get();",
  "npm install tailwindcss postcss autoprefixer",
  "npx tailwindcss init -p",
  "export const MyWebPart: React.FC<IMyWebPartProps> = (props) => {",
  "const styles = require('./MyWebPart.module.scss');",
  "import * as React from 'react';",
  "useEffect(() => { /* ... */ }, []);",
  "const handleClick = (): void => { /* ... */ };",
];

interface TerminalLine {
  text: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
  id: string;
  charDelay: number; // Delay for each character in the line
  lineDelay: number; // Delay for the entire line
}

export default function TerminalBackground() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate terminal lines with typing effect
    const generateLines = (): TerminalLine[] => {
      const newLines: TerminalLine[] = [];
      if (typeof window === 'undefined') return newLines;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const lineHeight = 24; // Height per line
      const maxLines = Math.floor(height / lineHeight);
      const maxLinesToShow = Math.min(30, maxLines); // Limit to 30 lines
      
      // Create lines of code with typing effect
      for (let i = 0; i < maxLinesToShow; i++) {
        const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        const isGreen = Math.random() > 0.3; // 70% green
        const x = Math.random() * 20; // Random horizontal position (0-20%)
        const y = (i / maxLinesToShow) * 100; // Distribute vertically
        
        newLines.push({
          text: snippet,
          x,
          y,
          color: isGreen ? "#00ff00" : COLORS[Math.floor(Math.random() * (COLORS.length - 1)) + 1],
          opacity: isGreen ? 0.2 + Math.random() * 0.25 : 0.15 + Math.random() * 0.2,
          id: `line-${i}`,
          charDelay: 0.05 + Math.random() * 0.1, // Delay between each character (50-150ms)
          lineDelay: i * 0.5 + Math.random() * 2, // Delay before line starts typing
        });
      }
      
      return newLines;
    };

    const initialLines = generateLines();
    setLines(initialLines);

    // Update lines periodically for glitch effect - less frequent
    glitchIntervalRef.current = setInterval(() => {
      setLines((prev) =>
        prev.map((line) => ({
          ...line,
          text: Math.random() > 0.95 
            ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
            : line.text,
        }))
      );
    }, 2000); // Update every 2 seconds

    // Regenerate on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setLines(generateLines());
      }, 500);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1] bg-black" style={{ minHeight: '100vh' }}>
      {/* Scanline effect - CSS animation for better performance */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/8 to-transparent"
        style={{
          height: "1px",
          animation: "scanline 10s linear infinite",
        }}
      />

      {/* Terminal lines with typing effect */}
      <div className="absolute inset-0">
        {lines.map((line) => (
          <div
            key={line.id}
            className="absolute font-mono text-xs sm:text-sm select-none terminal-line"
            style={{
              left: `${line.x}%`,
              top: `${line.y}%`,
              color: line.color,
              opacity: line.opacity,
              textShadow: line.color === "#00ff00" 
                ? `0 0 8px ${line.color}, 0 0 16px ${line.color}` 
                : `0 0 4px ${line.color}`,
            }}
          >
            <TypingText
              text={line.text}
              charDelay={line.charDelay}
              lineDelay={line.lineDelay}
            />
            <span className="terminal-cursor">_</span>
          </div>
        ))}
      </div>

      {/* Grid overlay - subtle */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// Typing effect component
function TypingText({ text, charDelay, lineDelay }: { text: string; charDelay: number; lineDelay: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Clear any existing intervals/timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setDisplayedText("");
    currentIndexRef.current = 0;

    // Start typing after line delay
    const startTyping = () => {
      currentIndexRef.current = 0;
      setDisplayedText("");
      
      intervalRef.current = setInterval(() => {
        if (currentIndexRef.current < text.length) {
          setDisplayedText(text.slice(0, currentIndexRef.current + 1));
          currentIndexRef.current++;
        } else {
          // Finished typing, restart after delay
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            startTyping();
          }, 2000);
        }
      }, charDelay * 1000);
    };

    timeoutRef.current = setTimeout(() => {
      startTyping();
    }, lineDelay * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, charDelay, lineDelay]);

  return <span>{displayedText}</span>;
}

