"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, RefreshCw, X, MapPin, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Job = {
  id: number; title: string; department: string | null; location: string;
  type: string; description: string | null; requirements: string | null;
  active: boolean; createdAt: string;
};

type FormData = Omit<Job, "id" | "createdAt">;

const EMPTY: FormData = {
  title: "", department: "", location: "Kingdom of Saudi Arabia", type: "Full-time",
  description: "", requirements: "", active: true,
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const DEPARTMENTS = ["Design & Creative", "Carpentry & Fabrication", "Interior Fit-Out", "MEP & Engineering", "Print Production", "Project Management", "Sales & Business Development", "Operations", "Administration", "Other"];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Job | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetch("/api/admin/jobs").then((r) => r.json());
    setJobs(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm(EMPTY);
    setModal({ open: true, editing: null });
  }

  function openEdit(j: Job) {
    setForm({ title: j.title, department: j.department ?? "", location: j.location, type: j.type, description: j.description ?? "", requirements: j.requirements ?? "", active: j.active });
    setModal({ open: true, editing: j });
  }

  async function save() {
    setSaving(true);
    try {
      if (modal.editing) {
        const res = await fetch(`/api/admin/jobs/${modal.editing.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
        });
        const updated = await res.json();
        if (!res.ok) { toast.error(updated.error || "Failed to update job"); }
        else { setJobs((prev) => prev.map((j) => j.id === modal.editing!.id ? updated : j)); toast.success("Job updated"); setModal({ open: false, editing: null }); }
      } else {
        const res = await fetch("/api/admin/jobs", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
        });
        const created = await res.json();
        if (!res.ok) { toast.error(created.error || "Failed to post job"); }
        else { setJobs((prev) => [created, ...prev]); toast.success("Job posted"); setModal({ open: false, editing: null }); }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function deleteJob(id: number) {
    if (!confirm("Delete this job opening?")) return;
    const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    if (res.ok) { setJobs((prev) => prev.filter((j) => j.id !== id)); toast.success("Job deleted"); }
    else { toast.error("Failed to delete job"); }
  }

  async function toggleActive(id: number, active: boolean) {
    const res = await fetch(`/api/admin/jobs/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active }),
    });
    if (res.ok) { setJobs((prev) => prev.map((j) => j.id === id ? { ...j, active } : j)); toast.success(active ? "Job listing shown" : "Job listing hidden"); }
    else { toast.error("Failed to update visibility"); }
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
          <h1 className="text-2xl font-bold text-[#111111] font-display">Job Openings</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200">
            <Plus className="w-4 h-4" /> Post Job
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
          <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">
          <p className="text-[#AAAAAA] text-sm mb-4">No job openings yet</p>
          <button onClick={openAdd} className="text-[#777777] text-sm hover:underline">Post your first opening</button>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden divide-y divide-[#EEEBE6]">
          {/* Header row */}
          <div className="hidden lg:grid grid-cols-[1fr_180px_120px_100px_auto] gap-4 px-5 py-3 text-[10px] text-[#AAAAAA] uppercase tracking-widest bg-[#FAFAF8]">
            <span>Title</span><span>Department</span><span>Type</span><span>Status</span><span>Actions</span>
          </div>
          {jobs.map((j) => (
            <div key={j.id} className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_180px_120px_100px_auto] gap-4 px-5 py-4 items-center hover:bg-[#FAFAF8] transition-colors">
              <div className="min-w-0">
                <p className="text-[#111111] text-sm font-medium">{j.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[#999999] text-xs">
                    <MapPin className="w-3 h-3" />{j.location}
                  </span>
                  <span className="flex items-center gap-1 text-[#999999] text-xs lg:hidden">
                    <Briefcase className="w-3 h-3" />{j.type}
                  </span>
                </div>
              </div>
              <p className="text-[#888888] text-sm hidden lg:block">{j.department ?? "—"}</p>
              <p className="text-[#888888] text-sm hidden lg:block">{j.type}</p>
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => toggleActive(j.id, !j.active)}
                  title={j.active ? "Active — click to deactivate" : "Inactive — click to activate"}
                  className={cn("w-12 h-6 rounded-full transition-colors duration-200 relative focus:outline-none",
                    j.active ? "bg-[#72b043]" : "bg-[#D5D0CA]"
                  )}
                >
                  <span className={cn("absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                    j.active ? "translate-x-6.5" : "translate-x-0.5"
                  )} />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(j)} className="p-1.5 text-[#BBBBBB] hover:text-[#111111] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteJob(j.id)} className="p-1.5 text-[#CCCCCC] hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-[#E8E4DC] rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC] sticky top-0 bg-white z-10">
              <h2 className="text-[#111111] font-semibold text-sm">{modal.editing ? "Edit Job Opening" : "Post Job Opening"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-[#AAAAAA] hover:text-[#111111] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Job Title</label>
                <input
                  value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Senior Interior Designer"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Department</label>
                  <select
                    value={form.department ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                  >
                    <option value="">Select…</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                  >
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Location</label>
                <input
                  value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Kingdom of Saudi Arabia"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4} placeholder="Role overview and responsibilities…"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Requirements</label>
                <textarea
                  value={form.requirements ?? ""} onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
                  rows={4} placeholder="Skills, experience, qualifications…"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors resize-none"
                />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                  className={cn("w-12 h-6 rounded-full transition-colors duration-200 relative shrink-0 focus:outline-none",
                    form.active ? "bg-[#72b043]" : "bg-[#D5D0CA]"
                  )}
                >
                  <span className={cn("absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                    form.active ? "translate-x-6.5" : "translate-x-0.5"
                  )} />
                </button>
                <span className={cn("text-sm font-medium transition-colors", form.active ? "text-[#111111]" : "text-[#999999]")}>
                  {form.active ? "Visible on careers page" : "Hidden from careers page"}
                </span>
              </div>
            </div>
            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setModal({ open: false, editing: null })} className="flex-1 py-2.5 rounded-lg border border-[#E0DDD8] text-[#888888] hover:text-[#111111] hover:border-[#AAAAAA] text-sm transition-colors">
                Cancel
              </button>
              <button onClick={save} disabled={saving || !form.title}
                className="flex-1 py-2.5 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50">
                {saving ? "Saving…" : modal.editing ? "Save Changes" : "Post Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
