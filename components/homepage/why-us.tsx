"use client";
import { motion } from "framer-motion";
import { Zap, Percent, Shield, HelpCircle, Focus } from "lucide-react";
import { slideInLeft, slideInRight } from "../framer/variants";
import SectionHeader from "../common/section-header";

const whyData = [
  {
    icon: Zap,
    title: "Less Time in the Process",
    desc: "Automated underwriting protocols reduce standard validation queues by 80%.",
  },
  {
    icon: Percent,
    title: "More Efficient System",
    desc: "Dynamic asset profiling maps clean interest structures direct to profiles.",
  },
  {
    icon: Shield,
    title: "Longer Lasting Security",
    desc: "Sustained liquidity terms configured safely around volatile business cycles.",
  },
  {
    icon: HelpCircle,
    title: "More Comfortable Experience",
    desc: "Transparent non-hidden pricing tiers managed by senior advisers.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="container">
      <div className="grid grid-cols-1 scroll-mt-52 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="col-span-6 xl:col-span-7 space-y-6"
        >
          <SectionHeader
            badgeIcon={Focus}
            badgeText="Operational Strategy"
            title="Why Choose Us?"
            subtitle="We make borrowing simple, fast, and stress-free! Here's why we are your best choice for loans and financial consultation."
            alignment="left"
          />
          <div className="space-y-3">
            {whyData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-xl border border-gray-2 bg-background/50 backdrop-blur-sm items-start"
                >
                  <div className="p-2.5 bg-brand-muted border border-brand/20 rounded-xl text-brand shrink-0">
                    <Icon className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="md:text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted text-xs md:text-base font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="col-span-6 xl:col-span-5 h-90 sm:h-120 lg:h-full lg:border-r-4 lg:border-t-4 lg:border-brand lg:rounded-tl-[150px] max-lg:rounded-xl lg:rounded-br-[150px] relative w-full overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=30"
            alt="Expert Consultation Experience"
            className="w-full object-cover h-full filter brightness-90"
          />
        </motion.div>
      </div>
    </section>
  );
}
