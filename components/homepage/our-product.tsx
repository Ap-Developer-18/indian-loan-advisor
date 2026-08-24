"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { staggerContainer, scaleUp } from "../framer/variants";
import SectionHeader from "../common/section-header";
import { servicesData } from "@/utils/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ConsultationModal from "../popups/consultation";
import { useState } from "react";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const handleQuickApply = (slug: string) => {
    setSelectedLoanType(slug);
    setIsModalOpen(true);
  };

  return (
    <section id="products" className="scroll-mt-30 pb-30 relative">
      <div className="absolute -left-48 top-1/3 size-125 bg-brand/4 pointer-events-none blur-3xl" />
      <div className="absolute -right-48 bottom-1/4 size-125 bg-brand/4 pointer-events-none blur-3xl" />

      <div className="container space-y-3 lg:space-y-8 relative z-20">
        <SectionHeader
          badgeText="Products"
          badgeIcon={Sparkles}
          title="Trusted Solutions – Designed For Growth"
          subtitle="We structure capital interfaces to accelerate corporate growth and secure personal assets with absolute clarity."
          alignment="left"
        />

        {/* Desktop View */}
        <div className="hidden xl:block mb-0!">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-4 gap-4"
          >
            {servicesData.map((srv, idx) => (
              <ServiceCard
                key={idx}
                srv={srv}
                isSlider={false}
                onQuickApply={() => handleQuickApply(srv.slug || srv.title)}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile & Tablet Slider */}
        <div className="block xl:hidden w-full pb-none">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "srv-custom-bullet",
              bulletActiveClass: "srv-custom-bullet-active",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full overflow-visible"
          >
            {servicesData.map((srv, idx) => (
              <SwiperSlide key={idx} className="h-full py-2">
                <ServiceCard
                  srv={srv}
                  isSlider={true}
                  onQuickApply={() => handleQuickApply(srv.slug || srv.title)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 24px;
          display: flex;
          justify-content: center;
          gap: 6px;
          width: 100% !important;
        }
        .srv-custom-bullet {
          height: 6px;
          width: 6px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }
        .srv-custom-bullet-active {
          width: 20px;
          background-color: var(--color-brand, #87cefa) !important;
        }
      `}</style>

      <AnimatePresence>
        {isModalOpen && (
          <ConsultationModal
            key={selectedLoanType || "modal"}
            isOpen={isModalOpen}
            defaultLoanType={selectedLoanType}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedLoanType("");
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({
  srv,
  isSlider,
  onQuickApply,
}: {
  srv: any;
  isSlider: boolean;
  onQuickApply: () => void;
}) {
  return (
    <motion.div
      variants={isSlider ? undefined : scaleUp}
      whileHover={{ y: -4, borderColor: "rgba(135,206,250,0.3)" }}
      className="bg-black/1 border border-gray-2 rounded-xl overflow-hidden flex flex-col justify-between space-y-1 backdrop-blur-md shadow-lg relative group transition-all duration-300 h-full"
    >
      <a
        href={`/products/${srv.slug}#product-hero`}
        className="text-brand w-full inline-block group/btn"
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-t-xl">
          <img
            src={srv.img}
            alt={srv.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
          />
        </div>
      </a>
      <div className="space-y-1.5 flex-1 p-5">
        <h3 className="text-base uppercase font-bold text-foreground line-clamp-1 group-hover:text-brand transition-colors">
          {srv.title}
        </h3>
        <p className="text-muted text-sm font-light line-clamp-2 leading-relaxed">
          {srv.desc}
        </p>
      </div>
      <div className="px-5">
        <div className="bg-gray-2/50 h-px w-full" />
      </div>
      <div className="p-5 flex items-center justify-between text-sm mt-auto">
        <button
          type="button"
          onClick={onQuickApply}
          className="text-brand cursor-pointer underline flex items-center gap-1 font-bold group/btn"
        >
          Quick Apply
        </button>
        <a
          href={`/products/${srv.slug}#product-hero`}
          className="text-brand flex items-center gap-1 font-bold group/btn"
        >
          More Details
          <ArrowUp
            size={14}
            className="rotate-45 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}
