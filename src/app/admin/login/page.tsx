"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupNeeded, setSetupNeeded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/setup")
      .then((r) => r.json())
      .then((d) => setSetupNeeded(d.needed === true));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Invalid credentials");
      } else {
        window.location.href = "/admin/dashboard";
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center px-4">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-2">
            <Image src="/Admonde Black.png" alt="Admonde" width={180} height={40} className="h-8 w-auto object-contain" priority />
            <p className="text-[#BBBBBB] text-xs tracking-[0.3em] uppercase">Admin Panel</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E8E4DC] shadow-sm p-8">
          <h2 className="text-[#111111] font-semibold text-lg mb-1">Sign in</h2>
          <p className="text-[#999999] text-sm mb-7">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@admonde.com"
                className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-4 py-3 text-sm focus:outline-none focus:border-[#999999] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-4 py-3 pr-10 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BBBBBB] hover:text-[#555555]"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] hover:bg-[#2A2A2A] text-white font-semibold text-sm py-3.5 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {setupNeeded && (
          <p className="text-center text-[#BBBBBB] text-xs mt-6">
            First time?{" "}
            <button
              onClick={() =>
                fetch("/api/admin/setup", { method: "POST" })
                  .then((r) => r.json())
                  .then((d) => {
                    alert(d.message || d.error);
                    setSetupNeeded(false);
                  })
              }
              className="text-[#888888] hover:underline"
            >
              Run setup
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
