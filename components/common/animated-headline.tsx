"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  words: string[];
}

export default function HighlightWords({ words }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <h1 className="text-4xl md:text-5xl font-bold flex flex-wrap justify-center leading-[100%] gap-x-3 gap-y-0 max-w-xl">
      {words.map((word, index) => {
        const isActive = index === active;

        return (
          <span key={word} className="relative inline-block mb-4">
            <motion.span
              className={`transition-colors duration-500 ${
                isActive ? "text-brand" : "text-white"
              }`}
              animate={{
                scale: isActive ? 1.03 : 1,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              {word}
            </motion.span>

            {isActive && (
              <motion.span
                layoutId="activeUnderline"
                className="absolute left-0 bottom-0 bg-linear-to-l from-transparent via-brand to-transparent h-0.5 w-full rounded-full"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                }}
              />
            )}
          </span>
        );
      })}
    </h1>
  );
}
