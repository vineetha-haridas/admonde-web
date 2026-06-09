"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Trash2, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Application = {
  id: number; name: string; email: string; phone: string | null;
  position: string | null; experience: string | null; coverLetter: string | null;
  status: string; createdAt: string;
};

const STATUSES = ["all", "new", "reviewing", "shortlisted", "rejected"];
const STATUS_STYLES: Record<string, string> = {
  new:        "bg-[#111111]/8 text-[#111111]",
  reviewing:  "bg-[#72b043]/12 text-[#4a7a2a]",
  shortlisted:"bg-blue-50 text-blue-600",
  rejected:   "bg-red-50 text-red-500",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const qs = new URLSearchParams({ status, search }).toString();
    const data = await fetch(`/api/admin/applications?${qs}`).then((r) => r.json());
    setApplications(data);
    setLoading(false);
  }, [status, search]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: number, newStatus: string) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) { setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a)); toast.success(`Marked as ${newStatus}`); }
    else { toast.error("Failed to update status"); }
  }

  async function deleteApplication(id: number) {
    if (!confirm("Delete this application?")) return;
    const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    if (res.ok) { setApplications((prev) => prev.filter((a) => a.id !== id)); toast.success("Application deleted"); }
    else { toast.error("Failed to delete application"); }
  }

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Careers</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Applications</h1>
        </div>
        <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-4 flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, position…"
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
        ) : applications.length === 0 ? (
          <p className="text-center text-[#AAAAAA] text-sm py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">No applications found</p>
        ) : (
          <div className="divide-y divide-[#EEEBE6]">
            {/* Column headers */}
            <div className="hidden lg:grid grid-cols-[auto_1fr_1fr_1fr_140px_100px_auto] gap-4 px-5 py-3 text-[10px] text-[#AAAAAA] uppercase tracking-widest bg-[#FAFAF8]">
              <span className="w-8">#</span><span>Name</span><span>Email</span><span>Position</span><span>Date</span><span>Status</span><span>Actions</span>
            </div>

            {applications.map((a) => (
              <div key={a.id}>
                <div
                  className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_1fr_1fr_140px_100px_auto] gap-4 px-5 py-4 items-center hover:bg-[#FAFAF8] cursor-pointer transition-colors"
                  onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                >
                  <span className="text-[#AAAAAA] text-xs font-mono w-8">{a.id}</span>
                  <div className="min-w-0">
                    <p className="text-[#111111] text-sm font-medium truncate">{a.name}</p>
                    <p className="text-[#999999] text-xs mt-0.5 lg:hidden">{a.email}</p>
                  </div>
                  <p className="text-[#555555] text-sm hidden lg:block truncate">{a.email}</p>
                  <p className="text-[#999999] text-sm hidden lg:block">{a.position ?? "—"}</p>
                  <p className="text-[#AAAAAA] text-xs hidden lg:block">
                    {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <div className="hidden lg:block" onClick={(ev) => ev.stopPropagation()}>
                    <select
                      value={a.status}
                      onChange={(ev) => updateStatus(a.id, ev.target.value)}
                      className={cn("text-[11px] font-medium px-2.5 py-1 uppercase tracking-wider border-0 cursor-pointer focus:outline-none rounded-full appearance-none", STATUS_STYLES[a.status] ?? STATUS_STYLES.new)}
                    >
                      {STATUSES.slice(1).map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2" onClick={(ev) => ev.stopPropagation()}>
                    <button onClick={() => deleteApplication(a.id)} className="p-1.5 text-[#CCCCCC] hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expanded === a.id ? <ChevronUp className="w-4 h-4 text-[#AAAAAA]" /> : <ChevronDown className="w-4 h-4 text-[#AAAAAA]" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === a.id && (
                  <div className="px-5 pb-5 bg-[#FAFAF8] border-t border-[#EEEBE6] grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      ["Phone", a.phone], ["Experience", a.experience], ["Position", a.position], ["Date", new Date(a.createdAt).toLocaleString("en-GB")],
                    ].map(([label, val]) => (
                      <div key={label} className="mt-4">
                        <p className="text-[#AAAAAA] text-[10px] uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-[#555555] text-sm">{val ?? "—"}</p>
                      </div>
                    ))}
                    {a.coverLetter && (
                      <div className="sm:col-span-2 lg:col-span-4 mt-4">
                        <p className="text-[#AAAAAA] text-[10px] uppercase tracking-widest mb-2">Cover Letter</p>
                        <p className="text-[#555555] text-sm leading-relaxed whitespace-pre-wrap bg-[#F7F5F2] p-4 border border-[#EAEAE4]">{a.coverLetter}</p>
                      </div>
                    )}
                    <div className="lg:col-span-4 mt-2 flex gap-2">
                      {STATUSES.slice(1).map((s) => (
                        <button key={s} onClick={() => updateStatus(a.id, s)}
                          className={cn("px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider border rounded-lg transition-colors",
                            a.status === s ? "border-[#111111] text-[#111111] bg-[#111111]/8" : "border-[#E0DDD8] text-[#888888] hover:border-[#999999] hover:text-[#555555]"
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
