"use client";
import { Landmark } from "lucide-react";
import Badge from "../common/badge";

const bankLogos = [
  {
    name: "Apex Capital",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=240&h=80&q=80",
  },
  {
    name: "Vertex Trust",
    logo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=240&h=80&q=80",
  },
  {
    name: "Quantum Bank",
    logo: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=240&h=80&q=80",
  },
  {
    name: "Alpha Institutional",
    logo: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=240&h=80&q=80",
  },
  {
    name: "Nexus Credit",
    logo: "https://images.unsplash.com/photo-1634973357973-f2ed255753e1?auto=format&fit=crop&w=240&h=80&q=80",
  },
];

export default function AssociateBanks() {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-37 bg-radial-glow pointer-events-none opacity-30 blur-2xl z-10" />

      <div className="container space-y-8 relative z-20">
        <div className="flex justify-center">
          <Badge
            text="Institutional Integrations"
            icon={<Landmark className="w-3.5 h-3.5" />}
          />
        </div>
        <div className="relative w-full flex overflow-x-hidden mask-gradient py-4">
          <div className="animate-marquee flex whitespace-nowrap items-center gap-6 shrink-0">
            {[...bankLogos, ...bankLogos, ...bankLogos].map((bank, idx) => (
              <div
                key={idx}
                className="w-44 h-16 bg-gray-1/40 border border-gray-2 rounded-xl flex items-center justify-center p-3 backdrop-blur-md shadow-lg hover:border-brand/30 transition-all duration-300 group shrink-0"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
