"use client";

import { motion } from "framer-motion";
import { Users, ArrowUp, Sparkles } from "lucide-react";
import { staggerContainer, scaleUp } from "../framer/variants";
import Link from "next/link";
import SectionHeader from "../common/section-header";
import { servicesData } from "@/utils/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Services() {
  return (
    <section id="products" className="scroll-mt-48 pb-30 relative">
      <div className="absolute -left-48 top-1/3 size-125 bg-brand/4 pointer-events-none blur-3xl" />
      <div className="absolute -right-48 bottom-1/4 size-125 bg-brand/4 pointer-events-none blur-3xl" />

      <div className="container space-y-3 lg:space-y-8 relative z-20">
        <SectionHeader
          badgeText="Our Vertical Offerings"
          badgeIcon={Sparkles}
          title="Trusted Solutions – Designed For Growth"
          subtitle="We structure capital interfaces to accelerate corporate growth and secure personal assets with absolute clarity."
          alignment="left"
        />
        <div className="hidden xl:block mb-0!">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-4 gap-4"
          >
            {servicesData.slice(0, 4).map((srv, idx) => (
              <ServiceCard key={idx} srv={srv} isSlider={false} />
            ))}
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-3 gap-4 mt-4"
          >
            {servicesData.slice(4, 7).map((srv, idx) => (
              <ServiceCard key={idx} srv={srv} isSlider={false} />
            ))}
          </motion.div>
        </div>
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
                <ServiceCard srv={srv} isSlider={true} />
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
          background-color: var(--color-brand, #a3dc2f) !important;
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ srv, isSlider }: { srv: any; isSlider: boolean }) {
  const CardIcon = srv.icon;

  return (
    <motion.div
      variants={isSlider ? undefined : scaleUp}
      whileHover={{ y: -4, borderColor: "rgba(163,220,47,0.3)" }}
      className="bg-black/1 border border-gray-2 rounded-xl overflow-hidden flex flex-col justify-between space-y-1 backdrop-blur-md shadow-lg relative group transition-all duration-300 h-full"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-t-xl">
        <img
          src={srv.img}
          alt={srv.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-background/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-muted flex items-center gap-1.5 border border-gray-2/40">
          <CardIcon className="w-3.5 h-3.5 text-brand" />
          <span className="font-light">{srv.price}</span>
        </div>
      </div>
      <div className="space-y-1.5 flex-1 p-5">
        <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-brand transition-colors">
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
        <span className="text-muted flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-brand" />
          {srv.counter}
        </span>
        <Link
          href={`/products/${srv.slug}#product-hero`}
          className="text-brand flex items-center gap-1 font-bold group/btn"
        >
          Read More
          <ArrowUp
            size={14}
            className="rotate-45 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}
