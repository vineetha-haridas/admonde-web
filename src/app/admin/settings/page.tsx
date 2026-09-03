"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Loader2, X, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Settings = {
  hero_image_url: string;
  hero_label: string;
  hero_headline: string;
  hero_subtext: string;
};

const DEFAULTS: Settings = {
  hero_image_url: "",
  hero_label: "Advertising & Printing Solutions",
  hero_headline: "We Build Brands\nThat People\nRemember.",
  hero_subtext: "Custom carpentry, complete fit-out, MEP contracting, and precision printing — built to specification, delivered on time.",
};

const inputCls = "w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#999999] transition-colors";

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>(DEFAULTS);
  const [saved, setSavedForm] = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    if (res.ok) {
      const merged = { ...DEFAULTS, ...data };
      setForm(merged);
      setSavedForm(merged);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const merged = { ...DEFAULTS, ...data };
        setForm(merged);
        setSavedForm(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "hero");
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        toast.error(data.error || "Image upload failed");
      } else {
        setForm((f) => ({ ...f, hero_image_url: data.url }));
        toast.success("Hero image uploaded");
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSavedForm(form);
      toast.success("Settings saved");
    } else {
      toast.error("Failed to save settings");
    }
  }

  const previewLines = form.hero_headline.split("\n").filter(Boolean);

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Site</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Settings</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={save}
            disabled={saving || !isDirty}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#111111]"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
          <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* Left: Form */}
          <div className="space-y-6">

            {/* Hero section */}
            <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6">
              <h2 className="text-[#111111] font-semibold text-sm mb-5 pb-4 border-b border-[#EEEBE6]">
                Hero Section
              </h2>
              <div className="space-y-4">

                {/* Image upload */}
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-2">Hero Image</label>
                  {form.hero_image_url ? (
                    <div className="relative rounded-xl overflow-hidden h-44 bg-[#F7F5F2]">
                      <img src={form.hero_image_url} alt="Hero" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setForm((f) => ({ ...f, hero_image_url: "" }))}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 border border-[#E0DDD8] flex items-center justify-center text-[#AAAAAA] hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-[#E0DDD8] text-[#555555] text-xs font-medium hover:bg-white transition-colors"
                      >
                        <Upload className="w-3 h-3" /> Replace
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="w-full h-44 rounded-xl border-2 border-dashed border-[#E0DDD8] hover:border-[#AAAAAA] flex flex-col items-center justify-center gap-2 transition-colors text-[#AAAAAA] hover:text-[#555555]"
                    >
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span className="text-[11px]">Click to upload hero image</span>
                          <span className="text-[10px] text-[#CCCCCC]">PNG, JPG, WebP · max 8MB · recommended 1400×900px</span>
                        </>
                      )}
                    </button>
                  )}
                  {uploadError && <p className="text-red-500 text-[11px] mt-1">{uploadError}</p>}
                  <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleUpload} />
                </div>

                {/* Label */}
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Eyebrow Label</label>
                  <input value={form.hero_label} onChange={(e) => setForm((f) => ({ ...f, hero_label: e.target.value }))} className={inputCls} placeholder="Advertising & Printing Solutions" />
                </div>

                {/* Headline */}
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">
                    Headline <span className="text-[#CCCCCC] normal-case tracking-normal text-[10px]">(use new line to split across lines)</span>
                  </label>
                  <textarea
                    value={form.hero_headline}
                    onChange={(e) => setForm((f) => ({ ...f, hero_headline: e.target.value }))}
                    rows={3}
                    className={inputCls + " resize-none font-medium"}
                    placeholder={"We Build Brands\nThat People\nRemember."}
                  />
                </div>

                {/* Subtext */}
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Subtext</label>
                  <textarea
                    value={form.hero_subtext}
                    onChange={(e) => setForm((f) => ({ ...f, hero_subtext: e.target.value }))}
                    rows={3}
                    className={inputCls + " resize-none"}
                    placeholder="Brief description…"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live preview */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5">
              <p className="text-[#888888] text-[11px] uppercase tracking-widest mb-4">Preview</p>
              <div className="bg-[#f0ede6] rounded-2xl overflow-hidden">
                {/* Mini hero preview */}
                <div className="p-5">
                  <p className="text-[7px] tracking-[0.3em] uppercase text-[#AAAAAA] mb-2 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#72b043]" />
                    {form.hero_label || "Label"}
                  </p>
                  <div className="font-bold leading-tight mb-2" style={{ fontSize: "clamp(0.9rem, 3vw, 1.2rem)", color: "#111111" }}>
                    {previewLines.map((line, i) => <div key={i}>{line}</div>)}
                  </div>
                  <p className="text-[8px] leading-relaxed text-[#999999] mb-3 line-clamp-2">{form.hero_subtext}</p>
                  {form.hero_image_url && (
                    <div className="rounded-xl overflow-hidden h-28">
                      <img src={form.hero_image_url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {!form.hero_image_url && (
                    <div className="rounded-xl h-28 bg-[#E8E4DC] flex items-center justify-center">
                      <span className="text-[#BBBBBB] text-[10px]">No image</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[#CCCCCC] text-[10px] text-center mt-3">Changes apply on next page load</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
