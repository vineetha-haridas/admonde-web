"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setState("idle");
      } else {
        setState("done");
      }
    } catch {
      setError("Network error. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 text-[12px] text-[#72b043] font-medium">
        <Check className="w-4 h-4 shrink-0" /> You&apos;re subscribed — thank you!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 min-w-0 bg-[#ECEAE5] text-[#111111] placeholder-[#BBBBBB] text-[12px] px-3.5 py-2.5 rounded-lg border border-[#E0DDD8] focus:outline-none focus:border-[#CCCCCC] transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="bg-[#72b043] text-white p-2.5 rounded-lg hover:bg-[#5a9035] transition-colors duration-200 shrink-0 disabled:opacity-60"
          aria-label="Subscribe"
        >
          {state === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-[11px] mt-2">{error}</p>}
    </form>
  );
}
