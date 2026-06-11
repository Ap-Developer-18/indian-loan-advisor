"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, MessageSquare } from "lucide-react";
import SectionHeader from "../common/section-header";

import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS_DATA = [
  {
    name: "Amit Khanna",
    role: "Real Estate Developer",
    review:
      "Securing project funding through Indian Loan Advisor was lightning fast. Their automated pipeline and expert alignment saved us millions in capital deployment delays. Absolute game-changer for infrastructure projects.",
    rating: 5,
    avatar: "A",
  },
  {
    name: "Rahul Mehra",
    role: "SaaS Founder & Entrepreneur",
    review:
      "The working capital OD/CC integration process is unparalleled. Minimal documentation combined with elite professional transparency. They understand the speed that modern businesses require.",
    rating: 5,
    avatar: "R",
  },
  {
    name: "Priya Sharma",
    role: "Commercial Property Investor",
    review:
      "Unlocking equity through a Loan Against Property was smooth and completely stress-free. The interest rates offered were perfectly optimized for our cash-flow matrices.",
    rating: 5,
    avatar: "P",
  },
  {
    name: "Vikram Malhotra",
    role: "Industrialist",
    review:
      "Navigating government subsidy schemes felt impossible until we consulted their team. They secured our federal credits flawlessly, reducing our balance sheet stress significantly.",
    rating: 5,
    avatar: "V",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="pb-24 bg-background relative overflow-hidden"
    >
      <div className="absolute -left-32 top-1/4 w-96 h-96 bg-radial-glow opacity-25 pointer-events-none blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 size-125 bg-radial-glow opacity-35 pointer-events-none blur-3xl z-10" />

      <div className="container space-y-4 lg:space-y-12 relative z-20">
        <SectionHeader
          badgeText="Client Endorsements"
          badgeIcon={MessageSquare}
          title="What Our Clients Say"
          subtitle="Join thousands of happy enterprise builders who trust our framework for their high-end financial deployment solutions."
          alignment="left"
        />

        <div className="w-full pt-2">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full pb-14"
          >
            {TESTIMONIALS_DATA.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto flex">
                <div className="bg-gray-1/40 border border-gray-2/80 rounded-xl p-6 md:p-8 flex flex-col justify-between flex-1 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-brand/40 hover:bg-gray-1/60 transition-all duration-300 relative group">
                  <div className="text-4xl md:text-5xl font-serif text-brand/10 group-hover:text-brand/20 transition-colors pointer-events-none absolute top-4 left-6 select-none">
                    “
                  </div>

                  <p className="text-gray-5 font-light line-clamp-4 text-xs md:text-base leading-relaxed flex-1 relative z-10">
                    {item.review}
                  </p>

                  <div className="border-t border-gray-2/40 flex flex-col gap-4 mt-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm shadow-[0_0_15px_rgba(163,220,47,0.1)]">
                        {item.avatar}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-base font-bold text-foreground leading-none">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted font-light">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-1/80 border border-gray-2 w-fit px-2.5 py-1.5 rounded-lg shadow-inner">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-accent-yellow text-accent-yellow drop-shadow-[0_0_4px_rgba(255,199,0,0.4)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination flex justify-center items-center gap-2 mt-4" />
        </div>
      </div>
    </section>
  );
}
