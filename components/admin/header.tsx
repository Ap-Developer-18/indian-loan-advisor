"use client";

import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="h-16 border-b border-gray-2 bg-gray-1/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-muted">
          Studio Management Portal
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-muted hover:text-white rounded-xl hover:bg-gray-1 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full ring-2 ring-gray-1" />
        </button>
      </div>
    </header>
  );
}
