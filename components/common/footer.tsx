"use client";

import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    svgPath:
      "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
    isStroke: false,
  },
  {
    href: "https://twitter.com",
    svgPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    isStroke: false,
  },
  { href: "https://instagram.com", svgPath: "", isStroke: true },
  {
    href: "https://linkedin.com",
    svgPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z",
    isStroke: false,
  },
];

const LINK_SECTIONS = [
  {
    title: "Useful Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "About us", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#" },
      { label: "Term & Condition", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "OD/CC", href: "#" },
      { label: "Personal Loan", href: "#" },
      { label: "Business Loan", href: "#" },
      { label: "Home Loan", href: "#" },
      { label: "Project Loan", href: "#" },
      { label: "Loan Against Property", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-1/60 pt-24 relative overflow-hidden">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        <div className="md:col-span-4 space-y-6">
          <Link href="/" className="flex items-center">
            <Image width={70} height={50} src="/logo.svg" alt="logo" priority />
          </Link>
          <p className="text-sm text-muted font-light leading-relaxed max-w-sm">
            We specialize in providing hassle-free loans for every need,
            including personal loans, business loans, home loans and more.
          </p>

          <div className="flex items-center gap-3.5 pt-2">
            {SOCIAL_LINKS.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-1 border border-gray-2 flex items-center justify-center text-muted hover:text-brand hover:border-brand/40 shadow-md transition-all duration-300"
              >
                {social.isStroke ? (
                  <svg
                    className="w-4 h-4 stroke-current fill-none stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.svgPath} />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {LINK_SECTIONS.map((section, idx) => (
          <div key={idx} className="md:col-span-2 space-y-5">
            <h4 className="text-base font-bold text-foreground">
              {section.title}
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-muted">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.href}
                    className="hover:text-brand transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
            <h4 className="text-base font-bold text-foreground">Newsletter</h4>
            <p className="text-sm text-muted font-light">
              Subscribe our newsletter
            </p>
            <div className="flex rounded-xl overflow-hidden border border-gray-2 bg-background p-1.5 focus-within:border-brand/40 transition-colors w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-sm px-3 py-1 outline-none w-full text-foreground"
              />
              <button className="bg-brand text-background text-sm font-bold px-4 rounded-lg hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap">
                SignUp
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-xl bg-brand-muted border border-brand/20 flex items-center justify-center text-brand shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <span className="text-sm text-muted font-light block leading-none">
                Call to Our Experts
              </span>
              <a
                href="tel:+918595332014"
                className="text-sm font-bold text-foreground hover:text-brand transition-colors block"
              >
                +91 8595 332 014
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container border-t border-gray-2/20 py-6 flex flex-col md:flex-row items-center justify-center text-sm text-muted">
        <p>©2026 Indian Loan Advisor. All right reserved.</p>
      </div>
    </footer>
  );
}
