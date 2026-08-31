"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Contact2 } from "lucide-react";
import SectionHeader from "@/components/common/section-header";

const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3509.898953788261!2d77.30854097549197!3d28.392119775796857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDIzJzMxLjYiTiA3N8KwMTgnNDAuMCJF!5e0!3m2!1sen!2sin!4v1785333680037!5m2!1sen!2sin";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value:
      "S1, 2nd Floor, Ganga Palace, Krishna Nagar, Sector 20B, Faridabad, 121001, Haryana.",
    phone: { label: "0129 414 7979", href: "tel:01294147979" },
    href: undefined,
  },
  {
    icon: Mail,
    label: "Mail Us",
    value: "contact@seaonesynergy.com",
    href: "mailto:contact@seaonesynergy.com",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: [
      { label: "+91 8595332014", href: "tel:+918595332014" },
      { label: "+91 9990533555", href: "tel:+919990533555" },
    ],
    href: undefined,
  },
  {
    icon: Globe,
    label: "Website",
    value: "seaonesynergy.com",
    href: "https://seaonesynergy.com",
  },
];

export default function ContactPage() {
  return (
    <section id="contact-us" className="scroll-mt-30">
      <div className="container">
        <SectionHeader
          badgeText="Get In Touch"
          badgeIcon={Contact2}
          title="Contact Us"
          subtitle="If you have any query, please reach out to us. We specialize in providing hassle-free loans for every need."
          alignment="left"
        />
      </div>
      <div className="pb-24 mt-6 relative z-10">
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
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Seaone Synergy Location"
            />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactDetails.map(
              ({ icon: Icon, label, value, href, phone }, i) => {
                const isMultiValue = Array.isArray(value);
                const isAddress = label === "Address";
                const Wrapper =
                  isMultiValue || isAddress ? motion.div : motion.a;
                const wrapperProps =
                  isMultiValue || isAddress
                    ? {}
                    : {
                        href,
                        target: href?.startsWith("http") ? "_blank" : undefined,
                        rel: href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined,
                      };

                return (
                  <Wrapper
                    key={i}
                    {...wrapperProps}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col gap-3 bg-gray-1/60 border border-gray-2 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-widest font-medium mb-1">
                        {label}
                      </p>
                      {isMultiValue ? (
                        <div className="flex items-center gap-3">
                          {value.map((phoneItem) => (
                            <a
                              key={phoneItem.href}
                              href={phoneItem.href}
                              className="text-sm font-bold text-foreground hover:text-brand transition-colors"
                            >
                              {phoneItem.label}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-foreground font-medium leading-relaxed group-hover:text-brand transition-colors">
                            {value}
                          </p>
                          {phone && (
                            <a
                              href={phone.href}
                              className="inline-block mt-2 text-sm font-bold text-foreground hover:text-brand transition-colors"
                            >
                              {phone.label}
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </Wrapper>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
