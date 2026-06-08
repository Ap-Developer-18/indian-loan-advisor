"use client";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Button from "../common/button";
import SectionHeader from "../common/section-header";
import { fadeIn, staggerContainer } from "../framer/variants";

export default function About() {
  return (
    <section
      id="about"
      className="pb-16 md:pb-24 lg:pb-30 relative overflow-hidden"
    >
      <div className="absolute -left-40 top-1/4 w-96 h-96 bg-brand/5 pointer-events-none blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 w-96 h-96 bg-brand/5 pointer-events-none blur-3xl" />

      <div className="container relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={fadeIn}
            className="relative w-full aspect-square max-h-110 rounded-xl overflow-hidden border border-gray-2 bg-gray-1/40 p-2"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
              alt="Bespoke Consultation"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>
          <motion.div variants={fadeIn} className="space-y-4 text-left">
            <SectionHeader
              badgeText="About Us"
              badgeIcon={Shield}
              title="Fast, Reliable, and Hassle-Free Loans – Anytime, Anywhere!"
              subtitle="Welcome to Capital Connect Labs (formerly Indian Loan Advisor), your trusted partner in premium financial ecosystems. We specialize in structuring high-liquidity solutions for every requirement, including personal infrastructure, asset acquisition, high-scale corporate deployment, and global project capital."
              alignment="left"
            />

            <p className="text-muted font-light leading-relaxed text-xs sm:text-sm">
              With an unyielding commitment to transparency, velocity, and
              optimized interest matrices, we empower innovators and firms with
              minimal data overhead.
            </p>

            <div className="pt-2">
              <Button variant="secondary">Read More</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
