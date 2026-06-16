"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();

      if (json.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(json.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md! bg-black/40 border border-gray-2 rounded-2xl p-6"
      >
        <h1 className="text-xl font-bold text-white mb-1">Admin Login</h1>
        <p className="text-white/50 text-sm mb-6">
          Enter password to access the dashboard.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-black/40 border border-gray-2 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--primary-brand)] transition-colors"
        />

        {error && (
          <p className="mt-2 text-xs text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50"
          style={{
            backgroundColor: "var(--primary-brand)",
            color: "var(--primary-dark)",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}