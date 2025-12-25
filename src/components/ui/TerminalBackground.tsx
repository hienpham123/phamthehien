"use client";

import { useEffect, useState, useRef } from "react";
import TypingText from "@/components/common/TypingText";
import { COLORS } from "@/utils/constants";

const CODE_SNIPPETS = [
  "import os",
  "from typing import List, Dict, Optional",
  "def main() -> None:",
  "class User:",
  "    def __init__(self, name: str, age: int):",
  "        self.name = name",
  "        self.age = age",
  "async def fetch_data(url: str) -> Dict:",
  "    async with aiohttp.ClientSession() as session:",
  "        async with session.get(url) as response:",
  "            return await response.json()",
  "pip install fastapi uvicorn",
  "python -m venv venv",
  "source venv/bin/activate",
  "from fastapi import FastAPI",
  "app = FastAPI()",
  "@app.get('/api/users')",
  "def get_users() -> List[Dict]:",
  "    return [{'id': 1, 'name': 'John'}]",
  "if __name__ == '__main__':",
  "    uvicorn.run(app, host='0.0.0.0', port=8000)",
  "from dataclasses import dataclass",
  "@dataclass",
  "class Product:",
  "    name: str",
  "    price: float",
  "    quantity: int = 0",
  "def fibonacci(n: int) -> int:",
  "    if n <= 1:",
  "        return n",
  "    return fibonacci(n-1) + fibonacci(n-2)",
  "from pydantic import BaseModel",
  "class UserModel(BaseModel):",
  "    email: str",
  "    password: str",
  "with open('data.json', 'r') as f:",
  "    data = json.load(f)",
  "list comprehension: [x**2 for x in range(10)]",
  "generator: (x for x in range(1000000))",
  "decorator: @cache",
  "context manager: with open('file.txt') as f:",
];

interface TerminalLine {
  text: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
  id: string;
}

export default function TerminalBackground() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generateLines = (): TerminalLine[] => {
      const newLines: TerminalLine[] = [];
      if (typeof window === "undefined") return newLines;

      const height = window.innerHeight;
      const lineHeight = 24;
      const maxLines = Math.floor(height / lineHeight);
      const maxLinesToShow = Math.min(30, maxLines);

      for (let i = 0; i < maxLinesToShow; i++) {
        const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        const isGreen = Math.random() > 0.3;
        const x = Math.random() * 20;
        const y = (i / maxLinesToShow) * 100;

        newLines.push({
          text: snippet,
          x,
          y,
          color: isGreen ? COLORS.primary : "#ffffff",
          opacity: isGreen ? 0.2 + Math.random() * 0.25 : 0.15 + Math.random() * 0.2,
          id: `line-${i}`,
        });
      }

      return newLines;
    };

    const initialLines = generateLines();
    setLines(initialLines);

    glitchIntervalRef.current = setInterval(() => {
      setLines((prev) =>
        prev.map((line) => ({
          ...line,
          text:
            Math.random() > 0.95
              ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
              : line.text,
        }))
      );
    }, 2000);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setLines(generateLines());
      }, 500);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1] bg-black"
      style={{ minHeight: "100vh", willChange: "auto" }}
    >
      {/* Scanline effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/8 to-transparent"
        style={{
          height: "1px",
          animation: "scanline 10s linear infinite",
        }}
      />

      {/* Terminal lines */}
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
              textShadow:
                line.color === COLORS.primary
                  ? `0 0 8px ${line.color}, 0 0 16px ${line.color}`
                  : `0 0 4px ${line.color}`,
              willChange: "auto",
            }}
          >
            <TypingText text={line.text} speed={50} delay={0} showCursor={false} />
            <span className="terminal-cursor">_</span>
          </div>
        ))}
      </div>

      {/* Grid overlay */}
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

