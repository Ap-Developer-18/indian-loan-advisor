"use client";

import React from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  text: string;
  icon?: React.ReactNode;
  pillText?: string;
  showArrow?: boolean;
  className?: string;
}

export default function Badge({
  text,
  icon,
  pillText,
  showArrow = false,
  className = "",
}: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-muted border border-brand/20 text-brand text-xs font-medium tracking-wide shadow-sm backdrop-blur-sm ${className}`}
    >
      {pillText && (
        <span className="bg-brand text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full font-sans tracking-normal select-none">
          {pillText}
        </span>
      )}
      {icon && (
        <span className="flex items-center justify-center text-sm">{icon}</span>
      )}
      <span className="font-sans antialiased">{text}</span>
      {showArrow && (
        <svg
          className="w-3 h-3 ml-0.5 text-brand stroke-[2.5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      )}
    </motion.div>
  );
}
