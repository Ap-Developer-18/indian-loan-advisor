// components/sections/services.tsx
"use client";
import { motion } from "framer-motion";
import {
  Briefcase,
  Home,
  User,
  Layers,
  HardHat,
  Building,
  Landmark,
  Users,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { staggerContainer, scaleUp } from "../framer/variants";
import Link from "next/link";
import SectionHeader from "../common/section-header";

const SERVICES_DATA = [
  {
    title: "OD / CC Business Lines",
    desc: "Need working capital for your business? Our Overdraft (OD) and Cash Credit (CC) facilities provide seamless financial support to keep your business running smoothly.",
    icon: Briefcase,
    price: "Low Premium",
    counter: "+1.2k Active",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Home Architecture Loans",
    desc: "Our home loan solutions come with low-interest rates, flexible repayment options, and quick approvals, so you can move into your dream home.",
    icon: Home,
    price: "Prime Rates",
    counter: "+840 Profiles",
    img: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Personal Capital Matrix",
    desc: "Our Personal Loan solutions help you cover medical emergencies, travel, education, wedding expenses, or any urgent needs with fast approvals & minimal paperwork.",
    icon: User,
    price: "Instant Disp",
    counter: "+3.1k Users",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Business Scale Packages",
    desc: "Our Business Loan solutions provide quick funding, low-interest rates, and flexible repayment options to support your entrepreneurial journey.",
    icon: Layers,
    price: "Custom Cap",
    counter: "+410 Agencies",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Project Deployment Funds",
    desc: "Whether you’re launching a new venture, expanding an existing business, or funding large-scale projects, we provide high-value loans with flexible terms and quick approvals to support your goals.",
    icon: HardHat,
    price: "Project Plan",
    counter: "+150 Projects",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Loan Against High Asset",
    desc: "Need funds for business expansion, education, medical emergencies, or personal needs? Get a high-value loan by leveraging your property at low interest rates and flexible repayment options.",
    icon: Building,
    price: "Asset Value",
    counter: "+680 Assets",
    img: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Govt Subsidy Assistance",
    desc: "Looking for expert guidance on government subsidies? We help businesses and individuals navigate and avail government subsidy schemes to reduce financial burdens and boost growth.",
    icon: Landmark,
    price: "Govt Verified",
    counter: "+920 Grants",
    img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80",
  },
];

export default function Services() {
  return (
    <section id="services" className="g-background relative overflow-hidden">
      <div className="absolute -left-48 top-1/3 size-125 bg-brand/4 pointer-events-none blur-3xl" />
      <div className="absolute -right-48 bottom-1/4 size-125 bg-brand/4 pointer-events-none blur-3xl" />

      <div className="container space-y-8 relative z-20">
        <SectionHeader
          badgeText="Our Vertical Offerings"
          badgeIcon={Sparkles}
          title="Trusted Solutions – Designed For Growth"
          subtitle="We structure capital interfaces to accelerate corporate growth and secure personal assets with absolute clarity."
          alignment="left"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {SERVICES_DATA.slice(0, 4).map((srv, idx) => (
            <ServiceCard key={idx} srv={srv} />
          ))}
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2"
        >
          {SERVICES_DATA.slice(4, 7).map((srv, idx) => (
            <ServiceCard key={idx} srv={srv} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ srv }: { srv: any }) {
  const CardIcon = srv.icon;
  return (
    <motion.div
      variants={scaleUp}
      whileHover={{ y: -4, borderColor: "rgba(163,220,47,0.3)" }}
      className="bg-black/1 border border-gray-2 rounded-xl overflow-hidden flex flex-col justify-between space-y-1 backdrop-blur-md shadow-lg relative group transition-colors duration-300"
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
        <p className="text-muted text-xs font-light line-clamp-2 leading-relaxed">
          {srv.desc}
        </p>
      </div>
      <div className="px-5">
        <div className="bg-gray-2/50 h-px w-full" />
      </div>
      <div className="p-5 flex items-center justify-between text-xs">
        <span className="text-muted flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-brand" />
          {srv.counter}
        </span>
        <Link
          href="/"
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
