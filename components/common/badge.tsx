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
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        boxShadow: [
          "0 0 15px rgba(var(--brand),0.2)",
          "0 0 45px rgba(var(--brand),0.45)",
          "0 0 15px rgba(var(--brand),0.2)",
        ],
      }}
      transition={{
        opacity: { duration: 0.6 },
        scale: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        boxShadow: "0 0 60px rgba(var(--brand),0.6)",
        borderColor: "rgba(var(--brand),0.8)",
      }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative
        inline-flex
        items-center
        gap-2.5
        px-4
        py-2
        rounded-full
        overflow-hidden
        border
        border-brand/30
        bg-linear-to-r
        from-brand-muted/90
        via-brand-muted/70
        to-brand-muted/40
        backdrop-blur-xl
        cursor-default
        select-none
        group
        ${className}
      `}
    >
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-brand/20 blur-xl"
      />
      <motion.div
        animate={{
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full border border-brand/60"
      />
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <motion.div
          animate={{
            x: ["-200%", "300%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            top-0
            left-0
            h-full
            w-24
            bg-white/20
            blur-md
            skew-x-12
          "
        />
      </div>

      {pillText && (
        <motion.span
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative z-10
            px-2.5 py-1
            rounded-full
            bg-brand
            text-background
            text-[10px]
            font-black
            tracking-wider
            shadow-lg
          "
        >
          {pillText}
        </motion.span>
      )}

      {icon && (
        <motion.span
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -4, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 flex items-center justify-center text-base"
        >
          {icon}
        </motion.span>
      )}

      <motion.span
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative z-10
          font-semibold
          tracking-wide
          text-white
          text-xs
          md:text-sm
        "
      >
        {text}
      </motion.span>

      {/* Arrow */}
      {showArrow && (
        <motion.svg
          animate={{
            x: [0, 6, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative z-10
            w-3.5 h-3.5
            text-brand
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </motion.svg>
      )}
    </motion.div>
  );
}
