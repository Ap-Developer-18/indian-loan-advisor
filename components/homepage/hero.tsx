// components/sections/hero.tsx
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import Button from "../common/button";
import Badge from "../common/badge";
import { slideInLeft } from "../framer/variants";

import "swiper/css";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    title: "Get the Perfect Loan, Stress-Free!",
    tag: "Instant Verifications Active",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    title: "Scale Corporate Ventures With Liquidity.",
    tag: "Tailored Interest Matrices",
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative py-34 overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 size-200 bg-radial-glow pointer-events-none z-10" />

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-20">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-4"
        >
          <Badge
            text="Struggling with Finances?"
            icon={<ShieldCheck className="w-3 h-3" />}
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Indian Loan Advisor <br />
            <span className="text-brand">Financial Mastery</span>
          </h1>
          <p className="text-muted text-sm md:text-base font-light max-w-lg leading-relaxed">
            Fixing financial growth paths with absolute precision and unmatched
            deployment speeds. Access structural capital frameworks on demand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="primary">Secure Loan Now</Button>
            <Button variant="outline">Consultation</Button>
          </div>
        </motion.div>

        <div className="lg:col-span-6 w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-2 bg-gray-1/40 p-2">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-full rounded-xl"
          >
            {SLIDES.map((slide, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <img
                  src={slide.img}
                  alt="Premium Finance"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-gray-1/90 border border-gray-2/60 rounded-xl backdrop-blur-md">
                  <span className="text-[10px] text-brand font-bold block mb-1">
                    ⚡ {slide.tag}
                  </span>
                  <p className="text-xs text-foreground font-medium">
                    {slide.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
