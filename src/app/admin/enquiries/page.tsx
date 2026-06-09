"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Trash2, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Enquiry = {
  id: number; name: string; company: string | null; email: string; phone: string | null;
  service: string | null; budget: string | null; message: string; status: string; createdAt: string;
};

const STATUSES = ["all", "new", "read", "replied", "archived"];
const STATUS_STYLES: Record<string, string> = {
  new:      "bg-[#111111]/8 text-[#111111]",
  read:     "bg-[#72b043]/12 text-[#4a7a2a]",
  replied:  "bg-blue-50 text-blue-600",
  archived: "bg-[#E8E4DC] text-[#AAAAAA]",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const qs = new URLSearchParams({ status, search }).toString();
    const data = await fetch(`/api/admin/enquiries?${qs}`).then((r) => r.json());
    setEnquiries(data);
    setLoading(false);
  }, [status, search]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: number, newStatus: string) {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) { setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: newStatus } : e)); toast.success(`Marked as ${newStatus}`); }
    else { toast.error("Failed to update status"); }
  }

  async function deleteEnquiry(id: number) {
    if (!confirm("Delete this enquiry?")) return;
    const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
    if (res.ok) { setEnquiries((prev) => prev.filter((e) => e.id !== id)); toast.success("Enquiry deleted"); }
    else { toast.error("Failed to delete enquiry"); }
  }

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Inbox</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Enquiries</h1>
        </div>
        <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-4 flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email…"
            className="w-full bg-white border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#999999]"
          />
        </div>
        <div className="flex gap-1">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={cn("px-3 py-2 text-xs font-medium uppercase tracking-wider border transition-colors",
                status === s ? "border-[#72b043] text-[#72b043] bg-[#72b043]/8" : "border-[#E0DDD8] text-[#888888] hover:text-[#111111] hover:border-[#999999]"
              )}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
            <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
          </div>
        ) : enquiries.length === 0 ? (
          <p className="text-center text-[#AAAAAA] text-sm py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">No enquiries found</p>
        ) : (
          <div className="divide-y divide-[#EEEBE6]">
            {/* Column headers */}
            <div className="hidden lg:grid grid-cols-[auto_1fr_1fr_1fr_140px_100px_auto] gap-4 px-5 py-3 text-[10px] text-[#AAAAAA] uppercase tracking-widest bg-[#FAFAF8]">
              <span className="w-8">#</span><span>Name</span><span>Email</span><span>Service</span><span>Date</span><span>Status</span><span>Actions</span>
            </div>

            {enquiries.map((e) => (
              <div key={e.id}>
                <div
                  className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_1fr_1fr_140px_100px_auto] gap-4 px-5 py-4 items-center hover:bg-[#FAFAF8] cursor-pointer transition-colors"
                  onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                >
                  <span className="text-[#AAAAAA] text-xs font-mono w-8">{e.id}</span>
                  <div className="min-w-0">
                    <p className="text-[#111111] text-sm font-medium truncate">{e.name}</p>
                    <p className="text-[#999999] text-xs mt-0.5 lg:hidden">{e.email}</p>
                  </div>
                  <p className="text-[#555555] text-sm hidden lg:block truncate">{e.email}</p>
                  <p className="text-[#999999] text-sm hidden lg:block">{e.service ?? "—"}</p>
                  <p className="text-[#AAAAAA] text-xs hidden lg:block">
                    {new Date(e.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <div className="hidden lg:block" onClick={(ev) => ev.stopPropagation()}>
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      className={cn("text-[11px] font-medium px-2.5 py-1 uppercase tracking-wider border-0 cursor-pointer focus:outline-none rounded-full appearance-none", STATUS_STYLES[e.status] ?? STATUS_STYLES.new)}
                    >
                      {STATUSES.slice(1).map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2" onClick={(ev) => ev.stopPropagation()}>
                    <button onClick={() => deleteEnquiry(e.id)} className="p-1.5 text-[#CCCCCC] hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expanded === e.id ? <ChevronUp className="w-4 h-4 text-[#AAAAAA]" /> : <ChevronDown className="w-4 h-4 text-[#AAAAAA]" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === e.id && (
                  <div className="px-5 pb-5 bg-[#FAFAF8] border-t border-[#EEEBE6] grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      ["Company", e.company], ["Phone", e.phone], ["Budget", e.budget], ["Date", new Date(e.createdAt).toLocaleString("en-GB")],
                    ].map(([label, val]) => (
                      <div key={label} className="mt-4">
                        <p className="text-[#AAAAAA] text-[10px] uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-[#555555] text-sm">{val ?? "—"}</p>
                      </div>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-4 mt-4">
                      <p className="text-[#AAAAAA] text-[10px] uppercase tracking-widest mb-2">Message</p>
                      <p className="text-[#555555] text-sm leading-relaxed whitespace-pre-wrap bg-[#F7F5F2] p-4 border border-[#EAEAE4]">{e.message}</p>
                    </div>
                    <div className="lg:col-span-4 mt-2 flex gap-2">
                      {STATUSES.slice(1).map((s) => (
                        <button key={s} onClick={() => updateStatus(e.id, s)}
                          className={cn("px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider border rounded-lg transition-colors",
                            e.status === s ? "border-[#111111] text-[#111111] bg-[#111111]/8" : "border-[#E0DDD8] text-[#888888] hover:border-[#999999] hover:text-[#555555]"
                          )}
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
