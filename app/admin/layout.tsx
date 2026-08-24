"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X,
} from "lucide-react";

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Saare Hooks hamesha unconditionally top par run honge
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin-logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Hooks call hone ke baad conditional render check
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col md:flex-row">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-gray-2 bg-gray-1 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-lg tracking-tight text-white">
                Seaone Synergy
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-muted hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href;

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

        <div className="border-t border-gray-2 pt-4 space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-background border border-gray-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold text-xs shrink-0">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  Logout Admin
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-red-600 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <header className="h-16 border-b border-gray-2 bg-gray-1/50 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-muted hover:text-white md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-medium text-muted">
              Queries Management System
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted hover:text-white rounded-xl hover:bg-gray-1 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full ring-2 ring-gray-1" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
