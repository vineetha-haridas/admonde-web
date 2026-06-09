"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, Star, RefreshCw, X, Upload, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Project = {
  id: number; title: string; category: string; description: string | null;
  imageUrl: string | null; location: string | null; year: string | null;
  featured: boolean; sortOrder: number; createdAt: string;
};

type FormData = Omit<Project, "id" | "createdAt">;

const EMPTY: FormData = {
  title: "", category: "", description: "", imageUrl: "", location: "", year: "",
  featured: false, sortOrder: 0,
};

const CATEGORIES = ["Interior Fit-Out", "Carpentry & Fabrication", "MEP Works", "Print & Branding", "Exhibition & Events", "Fleet & Uniform", "Other"];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Project | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetch("/api/admin/portfolio").then((r) => r.json());
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm(EMPTY);
    setImageUploadError("");
    setModal({ open: true, editing: null });
  }

  function openEdit(p: Project) {
    setForm({ title: p.title, category: p.category, description: p.description ?? "", imageUrl: p.imageUrl ?? "", location: p.location ?? "", year: p.year ?? "", featured: p.featured, sortOrder: p.sortOrder });
    setImageUploadError("");
    setModal({ open: true, editing: p });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setImageUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setImageUploadError(data.error || "Upload failed");
        toast.error(data.error || "Image upload failed");
      } else {
        setForm((f) => ({ ...f, imageUrl: data.url }));
        toast.success("Image uploaded");
      }
    } catch {
      setImageUploadError("Upload failed. Please try again.");
      toast.error("Upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  }

  async function save() {
    setSaving(true);
    const payload = { ...form, sortOrder: Number(form.sortOrder) };
    try {
      if (modal.editing) {
        const res = await fetch(`/api/admin/portfolio/${modal.editing.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const updated = await res.json();
        if (!res.ok) { toast.error(updated.error || "Failed to update project"); }
        else { setProjects((prev) => prev.map((p) => p.id === modal.editing!.id ? updated : p)); toast.success("Project updated"); setModal({ open: false, editing: null }); }
      } else {
        const res = await fetch("/api/admin/portfolio", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (!res.ok) { toast.error(created.error || "Failed to add project"); }
        else { setProjects((prev) => [created, ...prev]); toast.success("Project added"); setModal({ open: false, editing: null }); }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: number) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    if (res.ok) { setProjects((prev) => prev.filter((p) => p.id !== id)); toast.success("Project deleted"); }
    else { toast.error("Failed to delete project"); }
  }

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Work</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Portfolio</h1>
          <p className="text-[#999999] text-sm mt-1">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
          <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">
          <p className="text-[#AAAAAA] text-sm mb-4">No projects yet</p>
          <button onClick={openAdd} className="text-[#777777] text-sm hover:underline">Add your first project</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((p) => (
            <div key={p.id} className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden group hover:shadow-sm transition-shadow">
              {/* Image */}
              <div className="aspect-video bg-[#F4F2EE] relative overflow-hidden">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#CCCCCC]">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] uppercase tracking-widest">No image</span>
                  </div>
                )}
                {p.featured && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#72b043] text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">
                    <Star className="w-2.5 h-2.5" /> Featured
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-[#111111] text-sm font-semibold leading-tight">{p.title}</p>
                  <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-[#BBBBBB] hover:text-[#111111] transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteProject(p.id)} className="p-1.5 text-[#CCCCCC] hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[#72b043] text-[11px] uppercase tracking-widest font-medium">{p.category}</p>
                {(p.location || p.year) && (
                  <p className="text-[#AAAAAA] text-xs mt-1.5">{[p.location, p.year].filter(Boolean).join(" · ")}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-[#E8E4DC] rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC] sticky top-0 bg-white z-10">
              <h2 className="text-[#111111] font-semibold text-sm">{modal.editing ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-[#AAAAAA] hover:text-[#111111] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Title</label>
                <input
                  value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. LG Retail Showroom — Riyadh"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Category</label>
                <select
                  value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors"
                >
                  <option value="">Select category…</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Project Image</label>
                <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="hidden" />
                {form.imageUrl ? (
                  <div className="relative group/img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.imageUrl} alt="Preview" className="w-full h-44 object-cover" />
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-sm font-medium"
                    >
                      <Upload className="w-4 h-4" /> Replace Image
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => !imageUploading && imageInputRef.current?.click()}
                    className={cn(
                      "border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
                      imageUploading ? "border-[#72b043]/30 bg-[#72b043]/5" : "border-[#E0DDD8] hover:border-[#AAAAAA]"
                    )}
                  >
                    {imageUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 mx-auto mb-2 text-[#72b043] animate-spin" />
                        <p className="text-sm text-[#888888]">Uploading…</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mx-auto mb-2 text-[#CCCCCC]" />
                        <p className="text-sm text-[#AAAAAA]">Click to upload image</p>
                        <p className="text-xs text-[#CCCCCC] mt-1">JPEG, PNG, WebP — up to 8MB</p>
                      </>
                    )}
                  </div>
                )}
                {imageUploadError && <p className="text-red-500 text-xs mt-1.5">{imageUploadError}</p>}
              </div>

              {/* Location + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Location</label>
                  <input value={form.location ?? ""} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Riyadh, KSA"
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors" />
                </div>
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Year</label>
                  <input value={form.year ?? ""} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="2024"
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3} placeholder="Brief project description…"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors resize-none"
                />
              </div>

              {/* Sort order */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2.5 text-sm focus:outline-none focus:border-[#999999] transition-colors" />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={cn("w-12 h-6 rounded-full transition-colors duration-200 relative shrink-0 focus:outline-none",
                    form.featured ? "bg-[#72b043]" : "bg-[#D5D0CA]"
                  )}
                >
                  <span className={cn("absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                    form.featured ? "translate-x-6.5" : "translate-x-0.5"
                  )} />
                </button>
                <span className={cn("text-sm font-medium transition-colors", form.featured ? "text-[#111111]" : "text-[#999999]")}>
                  {form.featured ? "Featured on homepage" : "Not featured"}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setModal({ open: false, editing: null })} className="flex-1 py-2.5 rounded-lg border border-[#E0DDD8] text-[#888888] hover:text-[#111111] hover:border-[#AAAAAA] text-sm transition-colors">
                Cancel
              </button>
              <button onClick={save} disabled={saving || imageUploading || !form.title || !form.category}
                className="flex-1 py-2.5 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50">
                {saving ? "Saving…" : modal.editing ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
