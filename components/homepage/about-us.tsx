"use client";
import { motion } from "framer-motion";
import { User2 } from "lucide-react";
import SectionHeader from "../common/section-header";
import { fadeIn, staggerContainer } from "../framer/variants";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-48 py-18 lg:py-24 relative overflow-hidden"
    >
      <div className="absolute -left-40 top-1/4 w-96 h-96 bg-brand/5 pointer-events-none blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 w-96 h-96 bg-brand/5 pointer-events-none blur-3xl" />

      <div className="container relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-6 xl:gap-12 items-center"
        >
          <motion.div variants={fadeIn} className="space-y-4 text-left">
            <SectionHeader
              badgeText="About Us"
              badgeIcon={User2}
              title="Fast, Reliable, and Hassle-Free Loans – Anytime, Anywhere!"
              subtitle="Welcome to Indian Loan Advisor, your trusted partner in financial solutions. We specialize in providing hassle-free loans for every need, including personal loans, business loans, home loans, project loans, and more."
              alignment="left"
            />

            <p className="text-muted font-light leading-relaxed text-sm sm:text-base">
              With a commitment to transparency, reliability, and customer
              satisfaction, we help individuals and businesses secure the best
              loan options with quick approvals, minimal documentation, and
              competitive interest rates. Our team of financial experts guides
              you through every step, ensuring a smooth and stress-free
              borrowing experience.
            </p>
            <p className="text-muted font-light leading-relaxed text-sm sm:text-base">
              At Indian Loan Advisor, we believe in making finance simple and
              accessible. Whether you need funds for personal expenses, business
              growth, or a dream home, we are here to support your financial
              journey.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="relative max-sm:aspect-4/4 max-md:aspect-4/3 max-lg:aspect-4/2 w-full h-full rounded-xl overflow-hidden p-2 lg:p-3"
          >
            <motion.div
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-brand/40 blur-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
              alt="Bespoke Consultation"
              className="relative z-10 w-full h-full object-cover rounded-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
