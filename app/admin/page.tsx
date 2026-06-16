"use client";
import AdminNav from "@/components/admin/navbar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Consultation {
  _id: string;
  fullName: string;
  state: string;
  phone: string;
  loanType: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Consultation[];
  total: number;
  page: number;
  totalPages: number;
  loanTypes?: string[];
}

const ITEMS_PER_PAGE = 10;

function SkeletonRow() {
  return (
    <tr className="border-t border-gray-2 animate-pulse">
      <td className="px-4 py-4 md:px-6">
        <div className="h-4 w-32 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-4 md:px-6">
        <div className="h-4 w-24 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-4 md:px-6">
        <div className="h-4 w-28 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-4 md:px-6">
        <div className="h-6 w-24 rounded-full bg-gray-700" />
      </td>
      <td className="px-4 py-4 md:px-6">
        <div className="h-4 w-20 rounded bg-gray-700" />
      </td>
    </tr>
  );
}

function StatCard({
  label,
  value,
  loading,
}: {
  label: string;
  value: number | string;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl bg-gray-1 p-5 md:p-6">
      <p className="text-sm text-muted">{label}</p>
      {loading ? (
        <div className="mt-2 h-9 w-16 animate-pulse rounded-lg bg-gray-700" />
      ) : (
        <h2 className="mt-2 text-3xl font-bold text-brand md:text-4xl">
          {value}
        </h2>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [data, setData] = useState<Consultation[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loanTypes, setLoanTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loanFilter, setLoanFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [loanFilter]);

  const fetchData = useCallback(async () => {
    const isFirstLoad = page === 1 && !debouncedSearch && loanFilter === "all";
    if (isFirstLoad) setLoading(true);
    else setPageLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(ITEMS_PER_PAGE),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(loanFilter !== "all" && { loanType: loanFilter }),
      });

      const res = await fetch(`/api/consultation?${params}`);
      const json: ApiResponse = await res.json();

      if (json.success) {
        setData(json.data || []);
        setTotal(json.total ?? 0);
        setTotalPages(json.totalPages ?? 0);
        if (json.loanTypes) setLoanTypes(json.loanTypes);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }, [page, debouncedSearch, loanFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  }, [page, totalPages]);

  const isTableLoading = loading || pageLoading;

  return (
    <div className="min-h-screen bg-background p-4 text-white md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Nav */}
        <div className="mb-6 md:mb-8">
          <AdminNav />
        </div>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">
            Consultation Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted md:mt-2 md:text-base">
            Manage all consultation requests
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3 md:mb-8 md:gap-5">
          <StatCard label="Total Leads" value={total} loading={loading} />
          <StatCard
            label="This Page"
            value={isTableLoading ? "—" : data.length}
            loading={loading}
          />
          <StatCard
            label="Loan Types"
            value={loanTypes.length}
            loading={loading}
          />
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 md:mb-8 md:flex-row md:gap-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl bg-gray-1 pl-10 pr-4 text-white outline-none transition-all focus:ring-2 focus:ring-brand/20 md:h-12"
            />
            {search !== debouncedSearch && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>
            )}
          </div>

          <div ref={dropdownRef} className="relative md:min-w-60">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-full items-center justify-between rounded-xl bg-gray-1 px-4 text-white transition-all hover:bg-[#1a1a1a] md:h-12"
            >
              <span className="truncate text-sm md:text-base">
                {loanFilter === "all" ? "All Loan Types" : loanFilter}
              </span>
              <svg
                className={`ml-2 h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute top-14 z-50 w-full overflow-hidden rounded-xl border border-gray-2 bg-gray-1 shadow-xl">
                <button
                  onClick={() => {
                    setLoanFilter("all");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#1a1a1a]"
                >
                  All Loan Types
                </button>
                {loanTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setLoanFilter(type);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#1a1a1a]"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div
          className={`overflow-x-auto touch-pan-x rounded-2xl border border-gray-2 bg-gray-1 transition-opacity ${
            pageLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-200 w-full text-sm md:text-base">
              <thead className="bg-[#171717]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                    State
                  </th>
                  <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                    Loan Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {isTableLoading ? (
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-gray-2 transition-colors hover:bg-[#1a1a1a]"
                    >
                      <td className="px-4 py-3 font-medium md:px-6 md:py-4">
                        {item.fullName}
                      </td>
                      <td className="px-4 py-3 text-muted md:px-6 md:py-4">
                        {item.state || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted md:px-6 md:py-4">
                        {item.phone}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                          {item.loanType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted md:px-6 md:py-4">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-muted">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>No consultation requests found</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 border-t border-gray-2 p-4 sm:flex-row sm:justify-between">
              <span className="text-xs text-muted sm:text-sm">
                Showing{" "}
                <span className="font-semibold text-white">
                  {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, total)}
                </span>{" "}
                of <span className="font-semibold text-white">{total}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1 || pageLoading}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg bg-gray-2 px-3 py-1.5 text-sm font-semibold transition-all hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>
                {pageNumbers[0] > 1 && (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-[#1a1a1a]"
                    >
                      1
                    </button>
                    {pageNumbers[0] > 2 && (
                      <span className="px-1 text-muted">…</span>
                    )}
                  </>
                )}
                {pageNumbers.map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${n === page ? "bg-brand text-black" : "hover:bg-[#1a1a1a]"}`}
                  >
                    {n}
                  </button>
                ))}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                      <span className="px-1 text-muted">…</span>
                    )}
                    <button
                      onClick={() => setPage(totalPages)}
                      className="rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-[#1a1a1a]"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  disabled={page === totalPages || pageLoading}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg bg-gray-2 px-3 py-1.5 text-sm font-semibold transition-all hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
