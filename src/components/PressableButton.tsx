"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PressableButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function PressableButton({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}: PressableButtonProps) {
  const baseClasses = "px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 relative";
  const variantClasses =
    variant === "primary"
      ? "bg-white text-black border-2 border-black"
      : "bg-transparent text-white border-2 border-white/20";

  const handleClick = (e?: React.MouseEvent) => {
    if (disabled) return;
    
    // Handle smooth scroll for anchor links
    if (href && href.startsWith("#")) {
      e?.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    
    onClick?.(e);
  };

  const buttonProps = {
    className: `${baseClasses} ${variantClasses} ${
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    } ${className}`,
    onClick: handleClick,
    disabled: href ? undefined : disabled,
  };

  const content = (
    <>
      {/* Bottom layer (shadow/base) */}
      <div
        className={`absolute inset-0 rounded-full ${
          variant === "primary" ? "bg-black" : "bg-black/50"
        }`}
        style={{ transform: "translateY(6px)" }}
        aria-hidden="true"
      />
      
      {/* Top layer content */}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        {...buttonProps}
        whileHover={
          !disabled
            ? {
                y: 2,
                transition: { duration: 0.15, ease: "easeOut" },
              }
            : {}
        }
        whileTap={
          !disabled
            ? {
                y: 6,
                transition: { duration: 0.15, ease: "easeOut" },
              }
            : {}
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      {...buttonProps}
      whileHover={
        !disabled
          ? {
              y: 2,
              transition: { duration: 0.15, ease: "easeOut" },
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              y: 6,
              transition: { duration: 0.15, ease: "easeOut" },
            }
          : {}
      }
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {content}
    </motion.button>
  );
}

