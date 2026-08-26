"use client";
import { useState } from "react";
import PrivacyPolicyModal from "../popups/privacy";
import TermsModal from "../popups/term-sheet";
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
    title: "Our Products",
    links: [
      {
        label: "Cash Credit Limit",
        href: "/products/cash-credit-limit#product-hero",
      },
      {
        label: "Over Draft Limit",
        href: "/products/overdraft-limit#product-hero",
      },
      { label: "Home Loan", href: "/products/home-loan#product-hero" },
      { label: "Personal Loan", href: "/products/personal-loan#product-hero" },
      { label: "Business Loan", href: "/products/business-loan#product-hero" },
      { label: "Project Loan", href: "/products/project-loan#product-hero" },
    ],
  },
  {
    title: "Solutions & Info",
    links: [
      {
        label: "Loan Against Property",
        href: "/products/loan-against-property#product-hero",
      },
      {
        label: "Govt Subsidy",
        href: "/products/govt-subsidy-scheme#product-hero",
      },
      { label: "NPA & OTS Funding", href: "/#products" },
      { label: "Bridge Finance", href: "/#products" },
      { label: "Stressed Asset Finance", href: "/#products" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("duplicate");
        setErrorMsg("This email is already subscribed.");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <footer className="bg-gray-1/60 pt-16 relative overflow-hidden">
      <div className="container flex max-lg:flex-col max-xl:flex-wrap max-xl:justify-center gap-6 pb-16 text-center justify-between lg:text-left">
        <div className="max-lg:mx-auto flex w-[366px] sm:h-[366px] flex-col items-center lg:items-start justify-center">
          <a
            href="/#hero"
            className="border h-full flex items-center w-full p-18 bg-white border-gray-2 rounded-md"
          >
            <img
              width={55}
              height={55}
              src="/logo.svg"
              alt="logo"
              className="object-cover select-none p-6 pointer-events-none w-full rounded-md"
            />
          </a>
        </div>
        <div className="flex flex-col border border-gray-2 p-4 lg:flex-row justify-center lg:justify-start max-lg:mx-auto w-[366px] gap-12 lg:gap-16">
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center w-full lg:items-start justify-center lg:justify-start mx-auto lg:mx-0">
            <div className="space-y-2 w-full flex flex-col items-center lg:items-start">
              <p className="text-base text-muted text-center mb-6">
                We specialize in providing hassle-free loans for every need,
                including personal loans, business loans, home loans and more.
              </p>
              <h4 className="text-base font-bold text-center w-full text-foreground">
                Subscribe For Newsletter
              </h4>
              {status === "success" ? (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-brand bg-brand/10 border border-brand/20 rounded-xl px-4 py-3 w-full">
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>You&apos;re subscribed. Thank you!</span>
                </div>
              ) : (
                <div className="w-full">
                  <div
                    className={`flex rounded-xl overflow-hidden border bg-background p-1.5 transition-colors w-full ${
                      status === "error" || status === "duplicate"
                        ? "border-red-500/50"
                        : "border-gray-2 focus-within:border-brand/40"
                    }`}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== "idle") setStatus("idle");
                      }}
                      onKeyDown={handleKeyDown}
                      disabled={status === "loading"}
                      className="bg-transparent text-sm px-3 py-1 outline-none w-full text-center lg:text-left text-foreground disabled:opacity-50"
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={status === "loading"}
                      className="bg-brand text-background text-sm font-bold px-4 rounded-lg hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap"
                    >
                      {status === "loading" ? (
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" d="M12 3a9 9 0 1 0 9 9" />
                        </svg>
                      ) : (
                        "SignUp"
                      )}
                    </button>
                  </div>
                  {(status === "error" || status === "duplicate") && (
                    <p className="text-xs text-red-400 mt-1 pl-1 text-center lg:text-left">
                      {errorMsg}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-3 pt-2 w-full">
              <div className="w-10 h-10 rounded-xl bg-brand-muted border border-brand/20 flex items-center justify-center text-brand shrink-0">
                <svg className="w-4 h-4 fill-[#87cefa]" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div className="space-y-0.5 text-center lg:text-left">
                <span className="text-sm text-center text-muted font-light block leading-none">
                  Call to Our Experts
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+918595332014"
                    className="text-sm font-bold text-foreground hover:text-brand transition-colors block"
                  >
                    +91 8595332014
                  </a>
                  <a
                    href="tel:+919990533555"
                    className="text-sm font-bold text-foreground hover:text-brand transition-colors block"
                  >
                    +91 9990533555
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-2 max-lg:mx-auto w-[366px] sm:h-[366px] gap-2 bg-gray-1 p-6 rounded-md">
          <h4
            className={` text-base w-full text-center border-b border-brand font-bold text-foreground tracking-wide`}
          >
            Our Products
          </h4>
          <div className="flex justify-between gap-1 mt-4">
            {LINK_SECTIONS.map((section, idx) => (
              <div
                key={idx}
                className="space-y-3 flex flex-col items-center lg:items-start w-full sm:w-auto"
              >
                <ul className="space-y-3 mt-2 w-full uppercase text-sm font-light text-muted flex flex-col items-center lg:items-start">
                  {section.links.map((link, linkIdx) => (
                    <li className="w-full" key={linkIdx}>
                      {link.label === "Privacy Policy" ? (
                        <button
                          type="button"
                          onClick={() => setIsPrivacyOpen(true)}
                          className="hover:text-brand text-center! transition-colors block w-full cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : link.label === "Terms & Sheet" ? (
                        <button
                          type="button"
                          onClick={() => setIsTermsOpen(true)}
                          className="hover:text-brand text-center! transition-colors block w-full cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="hover:text-brand text-center! transition-colors block"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`h-px bg-brand w-full mt-10`}></div>
          <div className="flex justify-between mt-4">
            <ul className="flex justify-between items-center w-full text-sm font-light text-muted">
              <li>
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-brand transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="hover:text-brand transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="border-t border-gray-2/20 py-6 flex items-center justify-center text-sm text-muted text-center">
          <div className="flex justify-center max-lg:flex-col w-full items-center gap-4">
            {/* <div className="flex gap-2">
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
            </div> */}

            <p className="border border-gray-2 bg-gray-1 p-3 rounded-md">
              <span className="font-bold underline">
                @Seaone Synergy Pvt Ltd.
              </span>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
}
