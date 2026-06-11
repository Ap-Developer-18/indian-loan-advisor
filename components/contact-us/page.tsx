"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Contact2 } from "lucide-react";
import SectionHeader from "@/components/common/section-header";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value:
      "Ganga place, Ajronda Rd, Krishna Nagar, New Industrial Township, Sector 20B, Faridabad, Haryana 121001",
    href: "https://maps.google.com/?q=Ganga+place+Ajronda+Rd+Sector+20B+Faridabad+Haryana+121001",
  },
  {
    icon: Mail,
    label: "Mail Us",
    value: "info@indianloanadvisor.com",
    href: "mailto:info@indianloanadvisor.com",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: "+91 8595 332 014",
    href: "tel:+918595332014",
  },
  {
    icon: Globe,
    label: "Website",
    value: "indianloanadvisor.com",
    href: "https://indianloanadvisor.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <div className="absolute top-0 -right-48 size-125 rounded-full blur-[140px] pointer-events-none opacity-10 bg-brand" />
        <div className="absolute bottom-1/3 -left-48 size-96 rounded-full blur-[120px] pointer-events-none opacity-8 bg-brand" />

        <section className="pt-36 pb-4 lg:pb-12 relative z-10">
          <div className="container">
            <SectionHeader
              badgeText="Get In Touch"
              badgeIcon={Contact2}
              title="Contact Us"
              subtitle="If you have any query, please reach out to us. We specialize in providing hassle-free loans for every need."
              alignment="center"
            />
          </div>
        </section>

        <section className="pb-24 relative z-10">
          <div className="container space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-xl overflow-hidden border border-gray-2 shadow-2xl"
              style={{ height: "420px" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.7138599547916!2d77.31113859999999!3d28.3921506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd42689799c5%3A0x61d560c21366abeb!2sILAFIN!5e1!3m2!1sen!2sin!4v1781143438946!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Indian Loan Advisor Location"
              />
            </motion.div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, borderColor: "rgba(163,220,47,0.3)" }}
                  className="flex flex-col gap-3 bg-gray-1/60 border border-gray-2 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-widest font-medium mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-foreground font-medium leading-relaxed group-hover:text-brand transition-colors">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
