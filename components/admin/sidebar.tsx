"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Enquiries",
    href: "/admin/queries",
    icon: MessageSquare,
  },
  {
    name: "Newsletter",
    href: "/admin/newsletter",
    icon: Mail,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin-logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 shrink-0 border-r border-gray-2 bg-gray-1 min-h-screen flex flex-col justify-between p-4 fixed left-0 top-0 bottom-0 z-40 hidden md:flex">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-lg tracking-tight text-white">
            Admin Portal
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-brand text-black shadow-sm font-semibold"
                    : "text-muted hover:text-white hover:bg-[#1f1f1f]"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer / Logout */}
      <div className="border-t border-gray-2 pt-4 space-y-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-background border border-gray-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Admin</p>
              <p className="text-[10px] text-muted truncate">
                admin@portal.com
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 text-muted hover:text-red-400 transition-colors rounded-lg hover:bg-gray-1"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
