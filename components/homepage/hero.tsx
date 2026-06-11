"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Badge from "../common/badge";
import Button from "../common/button";
import { slides } from "@/utils/hero";
import ConsultationModal from "../popups/consultation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import HighlightWords from "../common/animated-headline";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative scroll-mt-32 min-h-[calc(100vh-106px)] overflow-hidden flex gap-16 pt-24 flex-col items-center justify-center text-center"
    >
      <div className="absolute -top-30 lg:top-0 left-1/2 -translate-x-1/2 size-225 bg-radial-glow pointer-events-none z-0 opacity-75" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
        className="container relative z-10 flex flex-col items-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mb-4 lg:mb-6"
        >
          <Badge
            pillText="Trusted"
            text="Struggling With Finance"
            showArrow={true}
          />
        </motion.div>
        <HighlightWords
          words={["Get", "The", "Perfect", "Stress", "Free", "Loan"]}
        />
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mb-10 font-normal leading-relaxed opacity-95"
        >
          Get low-interest Home Loans, Business Capital, and Loans Against
          Property with custom repayment plans, quick documentation, and 100%
          transparent processing.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex items-center justify-center gap-2 sm:gap-4 w-full"
        >
          <Button
            className="w-fit!"
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
          >
            Book Free Consultation
          </Button>
        </motion.div>
      </motion.div>
      <div className="container">
        <div className="relative z-10 w-full h-90 sm:h-120 md:h-130 lg:h-150 rounded-xl overflow-hidden shadow-2xl border border-gray-2/20 bg-gray-2 backdrop-blur-sm">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect={"fade"}
            fadeEffect={{ crossFade: true }}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-custom-bullet",
              bulletActiveClass: "swiper-custom-bullet-active",
            }}
            className="w-full h-full p-0!"
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="relative w-full h-full overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="object-cover object-center h-full w-full opacity-70 select-none pointer-events-none"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-left bg-linear-to-t from-background via-background/80 to-transparent flex flex-col justify-end h-1/2 z-10">
                  <h3 className="text-lg sm:text-2xl font-bold text-white-100 mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-muted text-xs sm:text-base max-w-xl font-normal opacity-90">
                    {slide.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <style jsx global>{`
          .swiper-pagination {
            bottom: 24px !important;
            right: 24px !important;
            left: auto !important;
            width: auto !important;
            display: flex;
            gap: 8px;
          }
          @media (min-width: 640px) {
            .swiper-pagination {
              bottom: 40px !important;
              right: 40px !important;
            }
          }
          .swiper-custom-bullet {
            height: 6px;
            width: 6px;
            border-radius: 9999px;
            background-color: rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
            display: inline-block;
          }
          .swiper-custom-bullet-active {
            width: 24px;
            background-color: var(--color-brand, #a3dc2f) !important;
          }
        `}</style>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ConsultationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
