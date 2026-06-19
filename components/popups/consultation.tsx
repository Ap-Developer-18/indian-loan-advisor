"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import Image from "next/image";
import Button from "../common/button";

const consultationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  state: z.string().min(2, "Please select your state"),
  phone: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number"),
  loanType: z.string().min(1, "Please select a product type"),
});

type ConsultationForm = z.infer<typeof consultationSchema>;
type FormErrors = Partial<Record<keyof ConsultationForm, string>>;

const LOAN_OPTIONS = [
  { value: "cash-credit", label: "Cash Credit Limit" },
  { value: "overdraft", label: "Over Draft Limit" },
  { value: "home-loan", label: "Home Loan" },
  { value: "personal-loan", label: "Personal Loan" },
  { value: "business-loan", label: "Business Loan" },
  { value: "project-loan", label: "Project Loan" },
  { value: "loan-against-property", label: "Loan Against Property" },
  { value: "govt-subsidy", label: "Govt Subsidy" },
];

const INDIAN_STATES = [
  "Andeman Nikobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra Nagar Haveli Daman Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  options: { value: string; label: string }[];
  placeholder: string;
}

function CustomDropdown({
  value,
  onChange,
  error,
  options,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    } else {
      setSearchTerm("");
    }
  }, [open]);

  const selected = options.find((o) => o.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleScrollThru = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between bg-background/50 border rounded-xl px-4 py-4 text-sm transition-colors focus:outline-none ${
          error
            ? "border-red-500/60"
            : open
              ? "border-brand"
              : "border-gray-2/40"
        }`}
      >
        <span className={selected ? "text-white-100" : "text-muted/50"}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-muted shrink-0"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-2/40 bg-black shadow-2xl z-50 overflow-hidden flex flex-col"
            onWheel={handleScrollThru}
            onTouchMove={handleScrollThru}
          >
            <div className="p-2 border-b border-gray-2/20 bg-black">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full bg-background/40 border border-gray-2/30 rounded-lg px-3 py-2 text-xs text-white-100 placeholder:text-muted/40 focus:outline-none focus:border-brand/60"
              />
            </div>

            <div
              className="max-h-45 overflow-y-auto overscroll-contain"
              style={{
                scrollbarWidth: "thin",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${
                      value === opt.value
                        ? "text-brand bg-brand/10"
                        : "text-muted hover:text-white-100 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                    {value === opt.value && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-brand shrink-0"
                      >
                        <path
                          d="M2.5 7l3.5 3.5 5.5-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-muted/50 text-center">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [form, setForm] = useState<ConsultationForm>({
    fullName: "",
    state: "",
    phone: "",
    loanType: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setForm({ fullName: "", state: "", phone: "", loanType: "" });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const result = consultationSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ConsultationForm;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      onClose();
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const set =
    (field: keyof ConsultationForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={isSubmitting ? undefined : onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-visible rounded-xl border border-gray-1 bg-black p-6 shadow-2xl z-10"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl text-start font-bold text-white-100 tracking-tight">
              Book Free Consultation
            </h3>
            <p className="text-muted text-start text-sm mt-1">
              Enter your details and our financial expert will call you back
              shortly.
            </p>
          </div>
          <div className="shrink-0">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={52}
              height={52}
              className="size-13 rounded-full object-contain"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Your Name */}
          <div>
            <label className="text-muted text-sm">Your Name</label>
            <input
              type="text"
              disabled={isSubmitting}
              value={form.fullName}
              onChange={set("fullName")}
              placeholder="e.g., Aman Kumar"
              className={`w-full bg-background/50 mt-2 border rounded-xl px-4 py-4 text-sm text-white-100 placeholder:text-muted/50 focus:outline-none transition-colors disabled:opacity-50 ${
                errors.fullName
                  ? "border-red-500/60"
                  : "border-gray-2/40 focus:border-brand"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>
            )}
          </div>

          {/* Your State */}
          <div>
            <label className="text-muted text-sm">Your State</label>
            <div className="mt-2">
              <CustomDropdown
                value={form.state}
                onChange={(val) => {
                  setForm((p) => ({ ...p, state: val }));
                  if (errors.state)
                    setErrors((p) => ({ ...p, state: undefined }));
                }}
                error={errors.state}
                options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                placeholder="Select your state"
              />
            </div>
          </div>

          {/* Product Type */}
          <div>
            <label className="text-muted text-sm">Product Type</label>
            <div className="mt-2">
              <CustomDropdown
                value={form.loanType}
                onChange={(val) => {
                  setForm((p) => ({ ...p, loanType: val }));
                  if (errors.loanType)
                    setErrors((p) => ({ ...p, loanType: undefined }));
                }}
                error={errors.loanType}
                options={LOAN_OPTIONS}
                placeholder="Select product type"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-muted text-sm">Phone Number</label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted font-medium">
                +91
              </span>
              <input
                type="tel"
                disabled={isSubmitting}
                value={form.phone}
                onChange={set("phone")}
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                className={`w-full bg-background/50 border rounded-xl pl-14 pr-4 py-4 text-sm text-white-100 placeholder:text-muted/50 focus:outline-none transition-colors disabled:opacity-50 ${
                  errors.phone
                    ? "border-red-500/60"
                    : "border-gray-2/40 focus:border-brand"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              roundedNormal
              onClick={onClose}
              name="cancel"
              variant="outline"
              className="w-full!"
              disabled={isSubmitting} // लोडिंग के समय कैंसिल बटन भी लॉक हो जायेगा
            >
              Cancel
            </Button>

            <Button
              name="submit"
              roundedNormal
              className="w-full! text-nowrap flex items-center justify-center gap-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  {/* CSS SVG स्पिनर */}
                  <svg
                    className="animate-spin h-4 w-4 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                "Quick Apply"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
