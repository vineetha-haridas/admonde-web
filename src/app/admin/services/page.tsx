"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, RefreshCw, X, Upload, Loader2, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Service = {
  id: number; title: string; desc: string; slug: string; tags: string;
  theme: string; imageUrl: string | null; active: boolean; sortOrder: number; createdAt: string;
  heading: string; paragraph1: string; paragraph2: string; features: string;
  ctaHeading: string; ctaText: string;
  contentImageUrl: string | null;
  contentImage2Url: string | null; contentImage2Title: string | null; contentImage2Location: string | null;
  contentImage3Url: string | null; contentImage3Title: string | null; contentImage3Location: string | null;
};
type FormData = Omit<Service, "id" | "createdAt">;

const EMPTY: FormData = {
  title: "", desc: "", slug: "", tags: "", theme: "light", imageUrl: "", active: true, sortOrder: 0,
  heading: "", paragraph1: "", paragraph2: "", features: "", ctaHeading: "", ctaText: "",
  contentImageUrl: "", contentImage2Url: "", contentImage2Title: "", contentImage2Location: "",
  contentImage3Url: "", contentImage3Title: "", contentImage3Location: "",
};

function ImageUploadBox({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "services");
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Upload failed"); toast.error(data.error || "Image upload failed"); }
      else { onChange(data.url); toast.success("Image uploaded"); }
    } catch {
      setError("Upload failed. Please try again.");
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-2">{label}</label>
      {value ? (
        <div className="relative rounded-xl overflow-hidden h-28 bg-[#F7F5F2]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 border border-[#E0DDD8] flex items-center justify-center text-[#AAAAAA] hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full h-28 rounded-xl border-2 border-dashed border-[#E0DDD8] hover:border-[#AAAAAA] flex flex-col items-center justify-center gap-1.5 transition-colors text-[#AAAAAA] hover:text-[#555555]"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <>
              <Upload className="w-4 h-4" />
              <span className="text-[10px]">Click to upload</span>
            </>
          )}
        </button>
      )}
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
      <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleUpload} />
    </div>
  );
}

const THEME_STYLES = {
  light: { bg: "#F5F3EF", text: "#111111", muted: "#AAAAAA" },
  dark:  { bg: "#0D0D0D", text: "#F5F3EF", muted: "#555555" },
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Service | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm(EMPTY);
    setModal({ open: true, editing: null });
  }

  function openEdit(s: Service) {
    setForm({
      title: s.title, desc: s.desc, slug: s.slug, tags: s.tags, theme: s.theme, imageUrl: s.imageUrl ?? "", active: s.active, sortOrder: s.sortOrder,
      heading: s.heading, paragraph1: s.paragraph1, paragraph2: s.paragraph2, features: s.features,
      ctaHeading: s.ctaHeading, ctaText: s.ctaText,
      contentImageUrl: s.contentImageUrl ?? "",
      contentImage2Url: s.contentImage2Url ?? "", contentImage2Title: s.contentImage2Title ?? "", contentImage2Location: s.contentImage2Location ?? "",
      contentImage3Url: s.contentImage3Url ?? "", contentImage3Title: s.contentImage3Title ?? "", contentImage3Location: s.contentImage3Location ?? "",
    });
    setModal({ open: true, editing: s });
  }

  async function save() {
    if (!form.title || !form.slug) return;
    setSaving(true);
    const payload = { ...form, sortOrder: Number(form.sortOrder) };
    try {
      if (modal.editing) {
        const res = await fetch(`/api/admin/services/${modal.editing.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const updated = await res.json();
        if (!res.ok) { toast.error(updated.error || "Failed to update service"); }
        else { setServices((prev) => prev.map((s) => s.id === modal.editing!.id ? updated : s)); toast.success("Service updated"); setModal({ open: false, editing: null }); }
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (!res.ok) { toast.error(created.error || "Failed to add service"); }
        else { setServices((prev) => [...prev, created]); toast.success("Service added"); setModal({ open: false, editing: null }); }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(id: number) {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (res.ok) { setServices((prev) => prev.filter((s) => s.id !== id)); toast.success("Service deleted"); }
    else { toast.error("Failed to delete service"); }
  }

  async function toggleActive(id: number, active: boolean) {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active }),
    });
    if (res.ok) { setServices((prev) => prev.map((s) => s.id === id ? { ...s, active } : s)); toast.success(active ? "Service shown" : "Service hidden"); }
    else { toast.error("Failed to update visibility"); }
  }

  const inputCls = "w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#999999] transition-colors";

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Homepage</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Services</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
          <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">
          <p className="text-[#AAAAAA] text-sm mb-4">No services yet</p>
          <button onClick={openAdd} className="text-[#777777] text-sm hover:underline">Add your first service</button>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden divide-y divide-[#EEEBE6]">
          <div className="hidden lg:grid grid-cols-[40px_1fr_160px_100px_80px_auto] gap-4 px-5 py-3 text-[10px] text-[#AAAAAA] uppercase tracking-widest bg-[#FAFAF8]">
            <span>#</span><span>Service</span><span>Slug</span><span>Theme</span><span>Status</span><span>Actions</span>
          </div>
          {services.map((s) => {
            const th = THEME_STYLES[s.theme as keyof typeof THEME_STYLES] ?? THEME_STYLES.light;
            return (
              <div key={s.id} className="grid grid-cols-[1fr_auto] lg:grid-cols-[40px_1fr_160px_100px_80px_auto] gap-4 px-5 py-4 items-center hover:bg-[#FAFAF8] transition-colors">
                <span className="text-[#CCCCCC] text-sm hidden lg:block">{String(s.sortOrder + 1).padStart(2, "0")}</span>
                <div className="flex items-center gap-3 min-w-0">
                  {s.imageUrl && (
                    <div className="w-12 h-9 rounded-lg overflow-hidden shrink-0" style={{ background: th.bg }}>
                      <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[#111111] text-sm font-medium truncate">{s.title}</p>
                    <p className="text-[#999999] text-xs truncate">{s.desc.slice(0, 60)}…</p>
                  </div>
                </div>
                <p className="text-[#888888] text-xs hidden lg:block font-mono">/services/{s.slug}</p>
                <div className="hidden lg:flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full border border-[#E0DDD8]" style={{ background: th.bg }} />
                  <span className="text-[#888888] text-xs capitalize">{s.theme}</span>
                </div>
                <div className="hidden lg:flex items-center">
                  <button
                    onClick={() => toggleActive(s.id, !s.active)}
                    className={cn("w-12 h-6 rounded-full transition-colors duration-200 relative focus:outline-none", s.active ? "bg-[#72b043]" : "bg-[#D5D0CA]")}
                  >
                    <span className={cn("absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200", s.active ? "translate-x-6.5" : "translate-x-0.5")} />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-[#BBBBBB] hover:text-[#111111] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteService(s.id)} className="p-1.5 text-[#CCCCCC] hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white border border-[#E8E4DC] rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC] sticky top-0 bg-white z-10">
              <h2 className="text-[#111111] font-semibold text-sm">{modal.editing ? "Edit Service" : "Add Service"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-[#AAAAAA] hover:text-[#111111] transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image upload */}
              <ImageUploadBox
                label="Service Image (used on the overview card)"
                value={form.imageUrl ?? ""}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              />

              {/* Title */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: modal.editing ? f.slug : slugify(e.target.value),
                  }))}
                  placeholder="e.g. Interior Fit-Out"
                  className={inputCls}
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">URL Slug *</label>
                <div className="flex items-center gap-0 bg-[#F7F5F2] border border-[#E0DDD8] rounded-lg overflow-hidden focus-within:border-[#999999] transition-colors">
                  <span className="text-[#BBBBBB] text-xs px-3 border-r border-[#E0DDD8] py-2.5 shrink-0">/services/</span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                    placeholder="interior-fitout"
                    className="flex-1 bg-transparent text-[#111111] px-3 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Description *</label>
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                  rows={3}
                  placeholder="Brief description of this service…"
                  className={inputCls + " resize-none"}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">
                  Tags <span className="text-[#CCCCCC] normal-case tracking-normal text-[10px]">(separated by |, shown on the overview card)</span>
                </label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="Retail | Office | Hospitality | Showroom"
                  className={inputCls}
                />
              </div>

              {/* Theme + Sort + Active */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Theme</label>
                  <div className="flex gap-2">
                    {(["light", "dark"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, theme: t }))}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors",
                          form.theme === t ? "border-[#111111] bg-[#111111] text-white" : "border-[#E0DDD8] text-[#888888] hover:border-[#AAAAAA]"
                        )}
                      >
                        {t === "light" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Visible</label>
                  <div className="flex items-center gap-2 h-[42px]">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                      className={cn("w-12 h-6 rounded-full transition-colors duration-200 relative shrink-0 focus:outline-none", form.active ? "bg-[#72b043]" : "bg-[#D5D0CA]")}
                    >
                      <span className={cn("absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200", form.active ? "translate-x-6.5" : "translate-x-0.5")} />
                    </button>
                    <span className={cn("text-sm font-medium", form.active ? "text-[#111111]" : "text-[#999999]")}>{form.active ? "Show" : "Hide"}</span>
                  </div>
                </div>
              </div>

              {/* Detail page content */}
              <div className="pt-4 border-t border-[#EEEBE6]">
                <p className="text-[#111111] text-xs font-semibold uppercase tracking-widest mb-4">Detail Page — /services/{form.slug || "…"}</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Section Heading</label>
                    <input
                      value={form.heading}
                      onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))}
                      placeholder="Spaces that Speak Your Brand"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Main Paragraph</label>
                    <textarea
                      value={form.paragraph1}
                      onChange={(e) => setForm((f) => ({ ...f, paragraph1: e.target.value }))}
                      rows={3}
                      placeholder="Main descriptive paragraph…"
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Secondary Paragraph</label>
                    <textarea
                      value={form.paragraph2}
                      onChange={(e) => setForm((f) => ({ ...f, paragraph2: e.target.value }))}
                      rows={2}
                      placeholder="Supporting paragraph, e.g. client proof…"
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">
                      Detailed Feature Checklist <span className="text-[#CCCCCC] normal-case tracking-normal text-[10px]">(separated by |)</span>
                    </label>
                    <textarea
                      value={form.features}
                      onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                      rows={2}
                      placeholder="Indoor & Outdoor Signage | Interior Wall Graphics | 3D Interior Design"
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">CTA Heading</label>
                      <input
                        value={form.ctaHeading}
                        onChange={(e) => setForm((f) => ({ ...f, ctaHeading: e.target.value }))}
                        placeholder="Transform Your Space Today."
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">CTA Text</label>
                      <input
                        value={form.ctaText}
                        onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))}
                        placeholder="Share your requirements…"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Gallery Images</p>
                    <div className="grid grid-cols-3 gap-3">
                      <ImageUploadBox
                        label="Main"
                        value={form.contentImageUrl ?? ""}
                        onChange={(url) => setForm((f) => ({ ...f, contentImageUrl: url }))}
                      />
                      <ImageUploadBox
                        label="Second"
                        value={form.contentImage2Url ?? ""}
                        onChange={(url) => setForm((f) => ({ ...f, contentImage2Url: url }))}
                      />
                      <ImageUploadBox
                        label="Third"
                        value={form.contentImage3Url ?? ""}
                        onChange={(url) => setForm((f) => ({ ...f, contentImage3Url: url }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <input
                        value={form.contentImage2Title ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, contentImage2Title: e.target.value }))}
                        placeholder="Second image caption"
                        className={inputCls}
                      />
                      <input
                        value={form.contentImage2Location ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, contentImage2Location: e.target.value }))}
                        placeholder="Second image client / location"
                        className={inputCls}
                      />
                      <input
                        value={form.contentImage3Title ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, contentImage3Title: e.target.value }))}
                        placeholder="Third image caption"
                        className={inputCls}
                      />
                      <input
                        value={form.contentImage3Location ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, contentImage3Location: e.target.value }))}
                        placeholder="Third image client / location"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setModal({ open: false, editing: null })} className="flex-1 py-2.5 rounded-lg border border-[#E0DDD8] text-[#888888] hover:text-[#111111] hover:border-[#AAAAAA] text-sm transition-colors">
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving || !form.title || !form.slug}
                className="flex-1 py-2.5 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50"
              >
                {saving ? "Saving…" : modal.editing ? "Save Changes" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
