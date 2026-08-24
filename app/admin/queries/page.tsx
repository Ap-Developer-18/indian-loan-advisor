"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Inbox,
} from "lucide-react";

interface Consultation {
  _id: string;
  fullName: string;
  state: string;
  phone: string;
  loanType: string;
  createdAt: string;
}

const LIMIT = 10;

function QueriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const loanFilter = searchParams.get("loanType") || "all";

  const [result, setResult] = useState<{
    data: Consultation[];
    total: number;
    totalPages: number;
    loanTypes: string[];
  }>({ data: [], total: 0, totalPages: 0, loanTypes: [] });

  const [loading, setLoading] = useState(true);

  const updateQuery = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "" || val === "all") params.delete(key);
      else params.set(key, String(val));
    });
    router.replace(`/admin/queries?${params.toString()}`);
  };

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const params = new URLSearchParams({
      page: String(page),
      limit: String(LIMIT),
      ...(search && { search }),
      ...(loanFilter !== "all" && { loanType: loanFilter }),
    });

    fetch(`/api/consultation?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        if (!ignore && json.success) {
          setResult({
            data: json.data,
            total: json.total,
            totalPages: json.totalPages,
            loanTypes: json.loanTypes,
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page, search, loanFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Customer Enquiries
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted">
          Server-paginated consultation requests directly synced with Sanity.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search by name or phone..."
            defaultValue={search}
            onChange={(e) => updateQuery({ search: e.target.value, page: 1 })}
            className="h-11 w-full rounded-xl bg-gray-1 border border-gray-2 pl-10 pr-4 text-sm text-white outline-none focus:border-brand"
          />
        </div>

        <div className="relative sm:w-60">
          <select
            value={loanFilter}
            onChange={(e) => updateQuery({ loanType: e.target.value, page: 1 })}
            className="h-11 w-full appearance-none rounded-xl bg-gray-1 border border-gray-2 px-4 pr-10 text-sm text-white outline-none focus:border-brand cursor-pointer"
          >
            <option value="all">All Loan Types</option>
            {result.loanTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-2 bg-gray-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#171717] text-left text-muted border-b border-gray-2">
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
                  <td colSpan={5} className="py-16 text-center text-muted">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 size={24} className="animate-spin text-brand" />
                      <span>Fetching enquiries...</span>
                    </div>
                  </td>
                </tr>
              ) : result.data.length > 0 ? (
                result.data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-[#1a1a1a] transition-colors"
                  >
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
                  <td colSpan={5} className="py-16 text-center text-muted">
                    <div className="flex flex-col items-center gap-2">
                      <Inbox size={28} className="text-muted" />
                      <span>No enquiries match this criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {result.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-gray-2">
            <span className="text-xs text-muted">
              Showing {(page - 1) * LIMIT + 1}–
              {Math.min(page * LIMIT, result.total)} of {result.total}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1 || loading}
                onClick={() => updateQuery({ page: page - 1 })}
                className="p-1.5 rounded-lg border border-gray-2 bg-gray-1 text-white hover:bg-gray-2 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="px-3 py-1 text-xs font-medium text-white">
                Page {page} of {result.totalPages}
              </span>

              <button
                disabled={page >= result.totalPages || loading}
                onClick={() => updateQuery({ page: page + 1 })}
                className="p-1.5 rounded-lg border border-gray-2 bg-gray-1 text-white hover:bg-gray-2 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminQueriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20 text-muted gap-2">
          <Loader2 size={24} className="animate-spin text-brand" />
          <span>Loading...</span>
        </div>
      }
    >
      <QueriesContent />
    </Suspense>
  );
}
