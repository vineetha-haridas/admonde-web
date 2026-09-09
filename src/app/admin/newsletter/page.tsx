"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Trash2, RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";

type Subscriber = { id: number; email: string; createdAt: string };

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const qs = new URLSearchParams({ search }).toString();
    const data = await fetch(`/api/admin/newsletter?${qs}`).then((r) => r.json());
    setSubscribers(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [search]);

  useEffect(() => { load(); }, [load]);

  async function deleteSubscriber(id: number) {
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
    if (res.ok) { setSubscribers((prev) => prev.filter((s) => s.id !== id)); toast.success("Subscriber removed"); }
    else { toast.error("Failed to remove subscriber"); }
  }

  function exportCsv() {
    const rows = [["email", "subscribed_at"], ...subscribers.map((s) => [s.email, s.createdAt])];
    const csv = rows.map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Homepage Footer</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Newsletter Subscribers</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCsv}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0DDD8] text-[#555555] hover:text-[#111111] hover:border-[#999999] font-semibold text-sm transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email…"
            className="w-full bg-white border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#999999]"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
          <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">
          <p className="text-[#AAAAAA] text-sm">No subscribers yet</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden divide-y divide-[#EEEBE6]">
          <div className="hidden lg:grid grid-cols-[40px_1fr_200px_auto] gap-4 px-5 py-3 text-[10px] text-[#AAAAAA] uppercase tracking-widest bg-[#FAFAF8]">
            <span>#</span><span>Email</span><span>Subscribed</span><span>Actions</span>
          </div>
          {subscribers.map((s, i) => (
            <div key={s.id} className="grid grid-cols-[1fr_auto] lg:grid-cols-[40px_1fr_200px_auto] gap-4 px-5 py-4 items-center hover:bg-[#FAFAF8] transition-colors">
              <span className="text-[#CCCCCC] text-sm hidden lg:block">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[#111111] text-sm font-medium truncate">{s.email}</p>
              <p className="text-[#888888] text-xs hidden lg:block">
                {new Date(s.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <button onClick={() => deleteSubscriber(s.id)} className="p-1.5 text-[#CCCCCC] hover:text-red-500 transition-colors justify-self-end">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
