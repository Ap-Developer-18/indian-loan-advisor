"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "px-4 md:px-7 py-2 md:py-3.5 rounded-full text-xs md:text-base font-bold tracking-wide transition-all duration-200 w-full sm:w-auto inline-flex items-center justify-center cursor-pointer font-sans";
  const variants = {
    primary:
      "bg-brand text-background hover:opacity-95 shadow-[0_4px_20px_rgba(163,220,47,0.25)]",
    secondary: "bg-white-pure text-background hover:bg-white-off shadow-md",
    outline:
      "bg-gray-1/40 text-foreground border border-gray-2 hover:border-gray-3 hover:bg-gray-1/80",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
