"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, RefreshCw, X, Upload, Loader2, ImageIcon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Client = {
  id: number; name: string; logoUrl: string; website: string | null;
  active: boolean; sortOrder: number; createdAt: string;
};

type FormData = Omit<Client, "id" | "createdAt">;

const EMPTY: FormData = { name: "", logoUrl: "", website: "", active: true, sortOrder: 0 };

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [modal, setModal] = useState<{ open: boolean; editing: Client | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/clients");
    const data = await res.json();
    setClients(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm(EMPTY);
    setUploadError("");
    setModal({ open: true, editing: null });
  }

  function openEdit(c: Client) {
    setForm({ name: c.name, logoUrl: c.logoUrl, website: c.website ?? "", active: c.active, sortOrder: c.sortOrder });
    setUploadError("");
    setModal({ open: true, editing: c });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "clients");
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setUploadError(data.error || "Upload failed"); toast.error(data.error || "Logo upload failed"); }
      else { setForm((f) => ({ ...f, logoUrl: data.url })); toast.success("Logo uploaded"); }
    } catch {
      setUploadError("Upload failed. Please try again.");
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function save() {
    if (!form.name || !form.logoUrl) return;
    setSaving(true);
    const payload = { ...form, sortOrder: Number(form.sortOrder) };
    try {
      if (modal.editing) {
        const res = await fetch(`/api/admin/clients/${modal.editing.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const updated = await res.json();
        if (!res.ok) { toast.error(updated.error || "Failed to update client"); }
        else { setClients((prev) => prev.map((c) => c.id === modal.editing!.id ? updated : c)); toast.success("Client updated"); setModal({ open: false, editing: null }); }
      } else {
        const res = await fetch("/api/admin/clients", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (!res.ok) { toast.error(created.error || "Failed to add client"); }
        else { setClients((prev) => [...prev, created]); toast.success("Client added"); setModal({ open: false, editing: null }); }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function deleteClient(id: number) {
    if (!confirm("Delete this client?")) return;
    const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    if (res.ok) { setClients((prev) => prev.filter((c) => c.id !== id)); toast.success("Client deleted"); }
    else { toast.error("Failed to delete client"); }
  }

  async function toggleActive(id: number, active: boolean) {
    const res = await fetch(`/api/admin/clients/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active }),
    });
    if (res.ok) { setClients((prev) => prev.map((c) => c.id === id ? { ...c, active } : c)); toast.success(active ? "Client shown" : "Client hidden"); }
    else { toast.error("Failed to update visibility"); }
  }

  const filtered = clients.filter((c) =>
    filter === "all" ? true : filter === "active" ? c.active : !c.active
  );

  const FILTERS: { key: typeof filter; label: string }[] = [
    { key: "all", label: `All (${clients.length})` },
    { key: "active", label: `Active (${clients.filter((c) => c.active).length})` },
    { key: "inactive", label: `Inactive (${clients.filter((c) => !c.active).length})` },
  ];

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#EEEBE6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#CCCCCC]" />
            <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Branding</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] font-display">Client Logos</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-[#AAAAAA] hover:text-[#111111] border border-[#E0DDD8] hover:border-[#999999] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-4 mb-6 flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-colors duration-150",
              filter === f.key
                ? "border-[#72b043] text-[#72b043] bg-[#72b043]/8"
                : "border-[#E0DDD8] text-[#888888] hover:border-[#AAAAAA] hover:text-[#555555]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[#E8E4DC] bg-white">
          <div className="w-5 h-5 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[#E8E4DC] bg-[#FAFAF8]">
          <p className="text-[#AAAAAA] text-sm mb-4">No clients yet</p>
          <button onClick={openAdd} className="text-[#777777] text-sm hover:underline">Add your first client</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className={cn(
              "bg-white border rounded-2xl p-4 flex flex-col items-center gap-3 group hover:shadow-md transition-shadow",
              c.active ? "border-[#E8E4DC]" : "border-[#E8E4DC] opacity-50"
            )}>
              {/* Logo preview */}
              <div className="w-full h-16 flex items-center justify-center rounded-xl bg-[#F7F5F2] p-3">
                <img
                  src={c.logoUrl}
                  alt={c.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* Name */}
              <p className="text-[#111111] text-[12px] font-medium text-center leading-tight">{c.name}</p>
              {/* Status + Actions */}
              <div className="flex items-center justify-between w-full pt-2 border-t border-[#F0EDE8]">
                <button
                  onClick={() => toggleActive(c.id, !c.active)}
                  title={c.active ? "Active" : "Inactive"}
                  className={cn("w-9 h-5 rounded-full transition-colors duration-200 relative focus:outline-none shrink-0",
                    c.active ? "bg-[#72b043]" : "bg-[#D5D0CA]"
                  )}
                >
                  <span className={cn("absolute top-0.5 left-0 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                    c.active ? "translate-x-4.5" : "translate-x-0.5"
                  )} />
                </button>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(c)} className="p-1 text-[#BBBBBB] hover:text-[#111111] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteClient(c.id)} className="p-1 text-[#CCCCCC] hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-[#E8E4DC] rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC] sticky top-0 bg-white z-10">
              <h2 className="text-[#111111] font-semibold text-sm">{modal.editing ? "Edit Client" : "Add Client"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-[#AAAAAA] hover:text-[#111111] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Logo upload */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-2">Logo *</label>
                {form.logoUrl ? (
                  <div className="relative rounded-xl border border-[#E0DDD8] bg-[#F7F5F2] p-4 flex items-center justify-center h-28">
                    <img src={form.logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                    <button
                      onClick={() => setForm((f) => ({ ...f, logoUrl: "" }))}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-[#E0DDD8] flex items-center justify-center text-[#AAAAAA] hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-full h-28 rounded-xl border-2 border-dashed border-[#E0DDD8] hover:border-[#AAAAAA] flex flex-col items-center justify-center gap-2 transition-colors text-[#AAAAAA] hover:text-[#555555]"
                  >
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span className="text-[11px]">Click to upload logo</span>
                        <span className="text-[10px] text-[#CCCCCC]">PNG, JPG, WebP · max 8MB</span>
                      </>
                    )}
                  </button>
                )}
                {uploadError && <p className="text-red-500 text-[11px] mt-1">{uploadError}</p>}
                <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleUpload} />
              </div>

              {/* Name */}
              <div>
                <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Client Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Samsung"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#999999] transition-colors"
                />
              </div>

              {/* Website */}
              <div>
                <label className="flex items-center gap-1.5 text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">
                  <Globe className="w-3 h-3" /> Website <span className="text-[#CCCCCC] normal-case tracking-normal text-[10px]">(optional)</span>
                </label>
                <input
                  value={form.website ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] placeholder:text-[#CCCCCC] px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#999999] transition-colors"
                />
              </div>

              {/* Sort order + Active */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Sort Order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
                    className="w-full bg-[#F7F5F2] border border-[#E0DDD8] text-[#111111] px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#999999] transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-[#888888] text-[11px] uppercase tracking-widest mb-1.5">Visible</label>
                  <div className="flex items-center gap-3 flex-1">
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
                    <span className={cn("text-sm font-medium", form.active ? "text-[#111111]" : "text-[#999999]")}>
                      {form.active ? "Show" : "Hide"}
                    </span>
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
                disabled={saving || !form.name || !form.logoUrl}
                className="flex-1 py-2.5 rounded-lg bg-[#111111] hover:bg-[#72b043] text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50"
              >
                {saving ? "Saving…" : modal.editing ? "Save Changes" : "Add Client"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
