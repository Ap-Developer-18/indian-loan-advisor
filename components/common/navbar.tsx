"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Blogs", href: "/#blogs" },
  { label: "Contact Us", href: "contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky container top-4 z-50 w-full px-4">
      <nav className="max-w-7xl mx-auto bg-background/75 backdrop-blur-md border rounded-xl border-gray-2/80 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <Image width={70} height={50} src="/logo.svg" alt="logo" priority />
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-sm lg:text-base font-medium text-muted">
            {navLinks.map((link, index) => (
              <ul key={index}>
                <li></li>
                <li></li>
                <li>
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-brand transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              </ul>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
            <Link href={"#products"}>
              <Button
                variant="primary"
                className="w-full flex items-center justify-center gap-1.5"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden text-muted hover:text-brand p-2 border bg-gray-2 border-gray-1 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-48px)] rounded-xl border border-gray-1 bg-background/95 backdrop-blur-md px-5 py-5 shadow-xl"
          >
            <div className="flex flex-col gap-4 text-muted font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 hover:text-brand transition-colors border-b border-gray-2/20 last:border-0"
                >
                  {link.label}
                </a>
              ))}

              <Link className="mt-2" href={"#products"}>
                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center gap-1.5"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
