"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, CheckCircle2, ArrowUpRight, Clock } from "lucide-react";

interface Consultation {
  _id: string;
  fullName: string;
  state: string;
  phone: string;
  loanType: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Consultation[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await fetch("/api/consultation?page=1&limit=5");
        const json = await res.json();
        if (json.success) {
          setData(json.data || []);
          setTotal(json.total ?? 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSummary();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-gray-2 bg-gray-1 p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-sm font-medium">New Enquiries</span>
            <MessageSquare size={18} className="text-brand" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-white">
            {loading ? "..." : total}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-2 bg-gray-1 p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-sm font-medium">Pending Review</span>
            <Clock size={18} className="text-amber-400" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-white">
            {loading ? "..." : total}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-2 bg-gray-1 p-5 sm:p-6 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-muted">
            <span className="text-sm font-medium">Resolved Enquiries</span>
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-white">
            0
          </h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-gray-2 bg-gray-1 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-2 flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold">
            Recent Customer Enquiries
          </h3>
          <Link
            href="/admin/queries"
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#171717] text-muted text-left border-b border-gray-2">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium whitespace-nowrap">
                  State
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium whitespace-nowrap">
                  Phone
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium whitespace-nowrap">
                  Loan Type
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-2">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted">
                    Loading recent enquiries...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id} className="hover:bg-[#1a1a1a]">
                    <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-white whitespace-nowrap">
                      {item.fullName}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-muted whitespace-nowrap">
                      {item.state || "—"}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-muted whitespace-nowrap">
                      {item.phone}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-brand/10 text-brand">
                        {item.loanType}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-muted whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted">
                    No enquiries found in Sanity yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
