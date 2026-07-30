"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Phone, FileQuestion, ArrowRight } from "lucide-react";
import Badge from "@/components/common/badge";
import Button from "@/components/common/button";
import ConsultationModal from "@/components/popups/consultation";
import { ProductData } from "@/app/products/[id]/page";
import { productsData } from "@/utils/products";
import Link from "next/link";

const ProductDetails = ({
  product,
  setIsModalOpen,
  isModalOpen,
}: {
  product: ProductData;
  setIsModalOpen: any;
  isModalOpen: boolean;
}) => {
  const otherProducts = Object.entries(productsData)
    .filter(([id]) => id !== product.slug)
    .map(([id, data]) => ({ id, ...data }));

  return (
    <>
      <section className="relative min-h-[calc(100vh-106px)] overflow-hidden flex gap-16 pt-24 flex-col items-center justify-center text-center">
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
            className="mb-2"
          >
            <Badge text="Product Details" />
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
            <Link href="tel:+919355545155">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call an Expert
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <div className="container">
          <div className="relative z-10 bg-white w-full aspect-4/3 rounded-xl overflow-hidden shadow-2xl border border-gray-2/20 backdrop-blur-sm">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-full object-cover object-top"
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

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24">
        <div className="container space-y-4">
          <Badge
            text={product.benefitsTitle}
            icon={<FileQuestion size={16} />}
          />

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

      <div className="container pb-24 space-y-8">
        <div className="flex justify-center">
          <Badge text="Explore More" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherProducts.map((otherProd, idx) => {
            const OtherIcon = otherProd.icon;
            return (
              <motion.a
                key={idx}
                href={`/products/${otherProd.id}#product-hero`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{
                  y: -4,
                  borderColor: "#87cefa",
                }}
                className="flex items-center justify-between p-4 sm:p-5 bg-background/40 border border-gray-2/50 rounded-xl group transition-all duration-300 hover:bg-background/80 cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 w-fit rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black transition-colors duration-300">
                    {OtherIcon && <OtherIcon className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold uppercase text-foreground group-hover:text-brand transition-colors text-sm sm:text-base line-clamp-1">
                      {otherProd.title}
                    </h4>
                    <p className="text-xs text-muted font-light mt-0.5">
                      Click For More Details
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-brand max-sm:hidden transition-transform duration-300 transform group-hover:translate-x-1" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
