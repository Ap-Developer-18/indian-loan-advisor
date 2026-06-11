"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building,
  HardHat,
  Home,
  Landmark,
  Layers,
  User,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  FileQuestion,
} from "lucide-react";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import Badge from "@/components/common/badge";
import Button from "@/components/common/button";
import { productsData } from "@/utils/products";
import ConsultationModal from "@/components/popups/consultation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { slides } from "@/utils/hero";

export interface ProductData {
  slug: string;
  icon: React.ElementType;
  badge: string;
  tag: string;
  title: string;
  tagline: string;
  heroDesc: string;
  about: string;
  benefitsTitle: string;
  benefits: string[];
  extraSections?: { title: string; items: string[] }[];
  whoCanApply?: string[];
  img: string;
  accentColor: string;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = productsData[id];
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!product) notFound();

  const Icon = product.icon;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <section
          id="product-hero"
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
              <Badge text={product.badge} icon={<Icon className="size-4" />} />
            </motion.div>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 lg:mb-6 text-white-100 leading-[1.15]"
            >
              {product.title}
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mb-10 font-normal leading-relaxed opacity-95"
            >
              {product.heroDesc}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center justify-center gap-2 sm:gap-4 w-full"
            >
              <Button className="w-fit!" onClick={() => setIsModalOpen(true)}>
                Apply Now
              </Button>
              <a href="tel:+918595332014">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call an Expert
                </Button>
              </a>
            </motion.div>
          </motion.div>
          <div className="container">
            <div className="relative z-10 w-full h-90 sm:h-120 md:h-130 lg:h-150 rounded-xl overflow-hidden shadow-2xl border border-gray-2/20 bg-gray-2 backdrop-blur-sm">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
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

        <section className="py-24">
          <div className="container space-y-4">
            <Badge text="Why Us" icon={<FileQuestion size={16} />} />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              {product.benefitsTitle}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-muted sm:col-span-2 leading-relaxed lg:text-lg"
              >
                {product.about}
              </motion.p>
              {product.benefits.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 bg-background/60 border border-gray-2/60 rounded-xl p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-brand" />
                  <span className="text-muted lg:text-lg leading-relaxed">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FormField({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-muted font-medium uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-background/60 border border-gray-2 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-brand/50 transition-colors"
      />
    </div>
  );
}
