"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MailIcon, MessageSquareIcon } from "lucide-react";

const tabs = [
  {
    label: "Queries",
    href: "/admin",
    icon: MessageSquareIcon,
  },
  {
    label: "Emails",
    href: "/admin/newsletter",
    icon: MailIcon,
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-1 border border-gray-2 w-fit">
      {tabs.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isActive
                ? "bg-brand text-black"
                : "text-muted hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
