"use client";
import { Landmark } from "lucide-react";
import Badge from "../common/badge";

const bankLogos = [
  {
    name: "Anand Rathi Bank",
    logo: "/anand-rathi.php",
  },
  {
    name: "Axis Bank",
    logo: "/axis-bank.png",
  },
  {
    name: "Capri Bank",
    logo: "/capri.png",
  },
  {
    name: "IIFL Finance",
    logo: "/iifl.png",
  },
  {
    name: "LendingKart",
    logo: "/landing-cart.png",
  },
  {
    name: "Equitas",
    logo: "/equitas.png",
  },
];
export default function AssociateBanks() {
  return (
    <section className="bg-background pt-24 relative overflow-hidden">
      <div className="container relative z-20">
        <div className="relative w-full flex overflow-x-hidden mask-gradient">
          <div className="animate-marquee flex whitespace-nowrap items-center gap-6 shrink-0">
            {[...bankLogos, ...bankLogos, ...bankLogos].map((bank, idx) => (
              <div
                key={idx}
                className="w-44 h-16 bg-gray-1/40 border border-gray-2 rounded-xl flex items-center justify-center p-3 backdrop-blur-md shadow-lg hover:border-brand/30 transition-all duration-300 group shrink-0"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-full h-full object-cover rounded-lg opacity-100 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
