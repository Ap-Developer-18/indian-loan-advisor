"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useLayoutEffect, useState } from "react";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { productsData } from "@/utils/products";
import ProductDetails from "@/components/product-details";

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

  return (
    <article id="product-hero">
      <Navbar />
      <ProductDetails
        product={product}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <Footer />
    </article>
  );
}
