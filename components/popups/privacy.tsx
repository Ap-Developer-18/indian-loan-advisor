"use client";
import React, { useEffect } from "react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "When you submit an enquiry, book a consultation, or apply for a loan product through Seaone Synergy, we collect details such as your name, phone number, email address, state, and the loan type you're interested in. We may also collect technical information like your browser type and IP address to keep our website secure and functioning correctly.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your details to connect you with our financial advisors, process consultation requests, share relevant loan offers from our partner banks and NBFCs, and send updates if you've subscribed to our newsletter. We never use your information for anything beyond facilitating your loan or advisory journey with us.",
  },
  {
    title: "Sharing With Partner Institutions",
    body: "To help you secure the right loan product, we may share your enquiry details with our partner banks and NBFCs (such as Axis Bank, IIFL Finance, LendingKart, and others in our network) strictly for the purpose of processing your application or consultation request.",
  },
  {
    title: "Data Security",
    body: "Your information is stored using industry-standard safeguards. Access is limited to authorised personnel and partner institutions directly involved in your loan or consultation request. We do not sell your personal data to third parties.",
  },
  {
    title: "Your Choices",
    body: "You can unsubscribe from our newsletter at any time, and you may request that we update or delete your personal information by writing to us at contact@seaonesynergy.com.",
  },
  {
    title: "Cookies",
    body: "Our website uses cookies to remember your preferences and understand how visitors use our site, helping us improve your experience. You can disable cookies through your browser settings at any time.",
  },
  {
    title: "Policy Updates",
    body: "We may update this policy periodically to reflect changes in our practices or legal requirements. The latest version will always be available on this page.",
  },
];

export default function PrivacyPolicyModal({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) {
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
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-2 p-6 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Privacy Policy
            </h3>
            <p className="text-muted text-sm mt-1">
              Last updated: June 16, 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy policy"
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
          className="flex-1 overflow-y-auto min-h-0 px-6 py-5 space-y-5"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-muted leading-relaxed">
            Seaone Synergy respects your privacy. This policy explains what
            information we collect when you use our website or apply for loan
            consultation services, and how we use, store, and protect it.
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
              Questions about this policy? Reach us at{" "}
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
