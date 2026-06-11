"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../common/button";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-gray-1 bg-black p-6 shadow-2xl backdrop-blur-xs z-10 origin-center"
      >
        <div className="mb-6 text-left">
          <h3 className="text-xl font-bold text-white-100 tracking-tight">
            Book Free Consultation
          </h3>
          <p className="text-muted text-sm mt-1">
            Enter your details and our financial expert will call you back
            shortly.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 text-left"
        >
          <div>
            <label className="text-muted">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Aman Kumar"
              className="w-full bg-background/50 mt-2 border border-gray-2/40 rounded-xl px-4 py-4 text-sm text-white-100 placeholder:text-muted/50 focus:outline-hidden focus:border-brand transition-colors"
            />
          </div>

          <div>
            <label className="text-muted">Phone Number</label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted font-medium">
                +91
              </span>
              <input
                type="tel"
                required
                pattern="[6-9][0-9]{9}"
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-background/50 border border-gray-2/40 rounded-xl pl-14 pr-4 py-4 text-sm text-white-100 placeholder:text-muted/50 focus:outline-hidden focus:border-brand transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              roundedNormal
              onClick={onClose}
              name="cancel"
              variant="outline"
              className="w-full!"
            >
              Cancel
            </Button>
            <Button
              name="submit"
              roundedNormal
              className="w-full! text-nowrap"
              type="submit"
            >
              Request Callback
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
