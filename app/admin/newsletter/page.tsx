"use client";

import AdminNav from "@/components/admin/navbar";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Subscriber[];
  total: number;
  page: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 10;

function SkeletonRow() {
  return (
    <tr className="border-t border-gray-2 animate-pulse">
      <td className="px-4 py-4 md:px-6">
        <div className="h-4 w-48 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-4 md:px-6">
        <div className="h-4 w-28 rounded bg-gray-700" />
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

export default function NewsletterPage() {
  const [data, setData] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchData = useCallback(async () => {
    const isFirstLoad = page === 1 && !debouncedSearch;
    if (isFirstLoad) setLoading(true);
    else setPageLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(ITEMS_PER_PAGE),
        ...(debouncedSearch && { search: debouncedSearch }),
      });

      const res = await fetch(`/api/newsletter?${params}`);
      const json: ApiResponse = await res.json();

      if (json.success) {
        setData(json.data || []);
        setTotal(json.total ?? 0);
        setTotalPages(json.totalPages ?? 0);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            Newsletter Subscribers
          </h1>
          <p className="mt-1 text-sm text-muted md:mt-2 md:text-base">
            Manage all newsletter subscriptions
          </p>
        </div>

        {/* Search */}
        <div className="mb-5 md:mb-8">
          <div className="relative max-w-md">
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
              placeholder="Search by email..."
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
        </div>

        {/* Table */}
        <div
          className={`overflow-x-auto touch-pan-x rounded-2xl border border-gray-2 bg-gray-1 transition-opacity ${
            pageLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          <table className="w-full text-sm md:text-base">
            <thead className="bg-[#171717]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold md:px-6 md:py-4">
                  Subscribed On
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
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.email}</span>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.email);
                          }}
                          title="Copy Email"
                          className="rounded-md p-1.5 transition hover:bg-[#2a2a2a]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V5a2 2 0 012-2h7a2 2 0 012 2v7a2 2 0 01-2 2h-2M8 7H7a2 2 0 00-2 2v10a2 2 0 002 2h7a2 2 0 002-2v-1M8 7h7a2 2 0 012 2v7a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted md:px-6 md:py-4">
                      {new Date(item.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-16 text-center text-muted">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>No subscribers found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

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
