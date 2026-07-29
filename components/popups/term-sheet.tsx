"use client";
import React, { useEffect } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "About These Terms",
    body: "These Terms & Conditions govern your use of the Seaone Synergy website and any consultation, enquiry, or loan-facilitation service you request through it. By submitting your details or booking a consultation, you agree to these terms.",
  },
  {
    title: "Our Role",
    body: "Seaone Synergy (operated by Seaone Synergy) acts as a loan advisory and facilitation service. We connect you with partner banks and NBFCs and assist with documentation and guidance. We are not a bank or lender, and final loan approval, interest rates, and terms are decided solely by the respective financial institution.",
  },
  {
    title: "Eligibility",
    body: "Our services are intended for individuals and businesses based in India who are at least 18 years of age and capable of entering into a legally binding agreement. Information submitted through our forms must be accurate and belong to you.",
  },
  {
    title: "No Guarantee of Approval",
    body: "Submitting an enquiry, consultation request, or application through our website does not guarantee loan approval. Approval, disbursal amount, interest rate, and tenure are determined entirely at the discretion of the partner bank or NBFC, based on their own credit policies.",
  },
  {
    title: "Fees & Charges",
    body: "Any advisory fee, if applicable, will be communicated to you transparently before you proceed. Processing fees, interest rates, and other charges levied by the lending institution are separate from our advisory services and governed by the lender's own terms.",
  },
  {
    title: "Your Responsibilities",
    body: "You agree to provide accurate, current information, to use the website only for lawful purposes, and not to misuse our consultation or newsletter forms for spam or fraudulent submissions.",
  },
  {
    title: "Third-Party Links & Partners",
    body: "Our website may reference or link to partner banks, NBFCs, or other third-party services. We are not responsible for the content, policies, or practices of these third parties once you leave our platform or engage with them directly.",
  },
  {
    title: "Limitation of Liability",
    body: "Seaone Synergy and Seaone Synergy are not liable for any loss arising from a lender's decision, delay, or change in loan terms. Our role is limited to advisory and facilitation; the lending relationship is solely between you and the financial institution.",
  },
  {
    title: "Changes to These Terms",
    body: "We may revise these terms from time to time to reflect changes in our services or applicable law. Continued use of the website after changes are posted constitutes acceptance of the updated terms.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts in Faridabad, Haryana.",
  },
];

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl h-[85vh] rounded-xl border border-gray-2 bg-gray-1 shadow-2xl z-10 flex flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-gray-2 p-6 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Terms &amp; Conditions
            </h3>
            <p className="text-muted text-sm mt-1">
              Last updated: June 16, 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="shrink-0 w-9 h-9 rounded-lg bg-background/50 border border-gray-2 flex items-center justify-center text-muted hover:text-brand hover:border-brand/40 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5 min-h-0"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-muted leading-relaxed">
            Please read these Terms &amp; Conditions carefully before using the
            Seaone Synergy website or submitting any enquiry, consultation
            request, or loan application through our platform.
          </p>

          {SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {section.title}
              </h4>
              <p className="text-sm text-muted leading-relaxed pl-3.5">
                {section.body}
              </p>
            </div>
          ))}

          <div className="rounded-xl border border-gray-2 bg-background/40 p-4 mt-2">
            <p className="text-sm text-muted leading-relaxed">
              Questions about these terms? Reach us at{" "}
              <a
                href="mailto:contact@seaonesynergy.com"
                className="text-brand font-medium hover:underline"
              >
                contact@seaonesynergy.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919355545155"
                className="text-brand font-medium hover:underline"
              >
                +91 9355545155
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-2 p-4 shrink-0 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-brand text-background text-sm font-bold px-6 py-3 rounded-xl hover:opacity-95 transition-opacity cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
