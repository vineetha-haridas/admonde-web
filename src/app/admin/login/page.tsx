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
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [setupToken, setSetupToken] = useState("");
  const [setupEmail, setSetupEmail] = useState("admin@admonde.com");
  const [setupError, setSetupError] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupResult, setSetupResult] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/setup")
      .then((r) => r.json())
      .then((d) => setSetupNeeded(d.needed === true));
  }, []);

  async function handleSetup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSetupError("");
    setSetupLoading(true);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: setupToken, email: setupEmail }),
      });
      const d = await res.json();
      if (!res.ok) {
        setSetupError(d.error || "Setup failed");
      } else {
        setSetupResult({ email: d.email, password: d.password });
        setSetupNeeded(false);
      }
    } catch {
      setSetupError("Network error. Please try again.");
    } finally {
      setSetupLoading(false);
    }
  }

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

        {setupResult && (
          <div className="bg-white border border-[#E8E4DC] shadow-sm p-6 mt-6">
            <p className="text-[#111111] font-semibold text-sm mb-1">Admin account created</p>
            <p className="text-[#999999] text-xs mb-4">
              Save this password now — it won&apos;t be shown again. Change it from Settings
              right after you sign in.
            </p>
            <div className="space-y-2">
              <div>
                <label className="block text-[#888888] text-[10px] uppercase tracking-widest mb-1">Email</label>
                <input readOnly value={setupResult.email} className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-[#888888] text-[10px] uppercase tracking-widest mb-1">Password</label>
                <input readOnly value={setupResult.password} className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] font-mono px-3 py-2 text-sm" />
              </div>
            </div>
            <button
              onClick={() => {
                setEmail(setupResult.email);
                setSetupResult(null);
              }}
              className="w-full mt-4 text-[#888888] hover:text-[#111111] text-xs underline"
            >
              I&apos;ve saved it — go to sign in
            </button>
          </div>
        )}

        {setupNeeded && !setupResult && (
          <div className="mt-6">
            {!showSetupForm ? (
              <p className="text-center text-[#BBBBBB] text-xs">
                First time?{" "}
                <button onClick={() => setShowSetupForm(true)} className="text-[#888888] hover:underline">
                  Run setup
                </button>
              </p>
            ) : (
              <form onSubmit={handleSetup} className="bg-white border border-[#E8E4DC] shadow-sm p-6 space-y-3">
                <p className="text-[#111111] font-semibold text-sm mb-1">Create the first admin account</p>
                <p className="text-[#999999] text-xs mb-2">
                  Requires the setup token configured in this deployment&apos;s environment.
                </p>
                <div>
                  <label className="block text-[#888888] text-[10px] uppercase tracking-widest mb-1">Setup Token</label>
                  <input
                    type="password"
                    required
                    value={setupToken}
                    onChange={(e) => setSetupToken(e.target.value)}
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2 text-sm focus:outline-none focus:border-[#999999]"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] text-[10px] uppercase tracking-widest mb-1">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={setupEmail}
                    onChange={(e) => setSetupEmail(e.target.value)}
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2 text-sm focus:outline-none focus:border-[#999999]"
                  />
                </div>
                {setupError && <p className="text-red-600 text-xs bg-red-50 border border-red-200 px-3 py-2">{setupError}</p>}
                <button
                  type="submit"
                  disabled={setupLoading}
                  className="w-full bg-[#111111] hover:bg-[#2A2A2A] text-white font-semibold text-xs py-3 transition-colors duration-300 disabled:opacity-50"
                >
                  {setupLoading ? "Creating…" : "Create Admin Account"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
