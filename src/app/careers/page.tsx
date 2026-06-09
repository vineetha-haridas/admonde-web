"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Clock, Briefcase, Upload, CheckCircle2, ArrowRight, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAREERS_EMAIL, CAREERS_EMAIL_HREF } from "@/lib/contact";

type Job = {
  id: number; title: string; department: string | null;
  type: string; location: string; description: string | null;
};

const perks = [
  { label: "Competitive Salary", sub: "Market-leading packages" },
  { label: "Career Growth", sub: "Clear progression paths" },
  { label: "Landmark Projects", sub: "GCC enterprise work" },
  { label: "Diverse Team", sub: "Multicultural environment" },
];

const experienceLevels = ["0 – 2 years", "3 – 5 years", "5 – 10 years", "10+ years"];

const inputCls =
  "w-full bg-white border border-[#E8E5E0] text-[#111111] placeholder:text-[#CCCCCC] px-4 py-3.5 text-[14px] rounded-xl focus:outline-none focus:border-[#999999] focus:bg-white transition-colors duration-200";

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [experience, setExperience] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .finally(() => setJobsLoading(false));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setUploadError("");
    setUploading(true);
    setCvUrl(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload/cv", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        setFileName("");
      } else {
        setCvUrl(data.url);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
      setFileName("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          position: selectedRole || (fd.get("position") as string) || null,
          experience: experience || null,
          coverLetter: fd.get("coverLetter") || null,
          cvUrl,
        }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 pt-20 sm:pt-24 pb-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 py-14 sm:py-20">
          <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
            Join the Team
          </p>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Build Your Career
            <br />
            With Us.
          </h1>
          <p className="text-[#666666] text-[14px] leading-relaxed max-w-lg">
            Be part of a passionate team creating extraordinary brands and
            experiences across the GCC. We&apos;re always looking for talented
            people who care about craft.
          </p>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
          {perks.map((p) => (
            <div key={p.label} className="bg-[#f0ede6] rounded-2xl px-6 py-7">
              <p className="font-heading font-semibold text-[#111111] text-[14px] mb-1.5">
                {p.label}
              </p>
              <p className="text-[#888888] text-[12px]">{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 py-12 sm:py-14">
          <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-3">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
            Open Positions
          </p>
          <h2
            className="font-display font-bold text-[#111111] mb-8"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Current Openings
          </h2>

          <div className="border-t border-[#E8E4DC]">
            {jobsLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-5 h-5 border-2 border-[#CCCCCC] border-t-[#111111] rounded-full animate-spin" />
              </div>
            ) : jobs.length === 0 ? (
              <p className="text-[#AAAAAA] text-[13px] text-center py-16 leading-relaxed">
                No open positions at the moment. Check back soon or send a
                speculative application below.
              </p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedRole(job.title)}
                  className={cn(
                    "group py-7 border-b border-[#E8E4DC] cursor-pointer transition-all duration-300",
                    selectedRole === job.title ? "opacity-100" : "opacity-80 hover:opacity-100"
                  )}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3
                          className={cn(
                            "font-heading font-semibold text-[15px] transition-colors duration-300",
                            selectedRole === job.title
                              ? "text-[#111111]"
                              : "text-[#111111]"
                          )}
                        >
                          {job.title}
                        </h3>
                        {job.department && (
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[#AAAAAA] font-semibold border border-[#D8D5CE] px-2.5 py-0.5 rounded-md">
                            {job.department}
                          </span>
                        )}
                      </div>
                      {job.description && (
                        <p className="text-[#888888] text-[13px] leading-relaxed max-w-2xl">
                          {job.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-5 mt-4 text-[11px] text-[#AAAAAA]">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" strokeWidth={1.5} /> {job.type}
                        </span>
                        {job.department && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} /> {job.department}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 mt-1">
                      {selectedRole === job.title ? (
                        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#111111] bg-[#E8E4DC] px-3 py-1.5 rounded-lg">
                          Selected
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-[#CCCCCC] group-hover:text-[#111111] group-hover:translate-x-1 transition-all duration-300" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section className="px-3 sm:px-5 lg:px-8 py-3 pb-4">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ backgroundColor: "#111111" }}>
          <div className="grid lg:grid-cols-[5fr_7fr]">

            {/* Left: Dark panel */}
            <div className="px-8 sm:px-10 lg:px-12 2xl:px-16 3xl:px-20 py-12 lg:py-16 flex flex-col">
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-white/40 mb-4">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                Apply Now
              </p>
              <h2
                className="font-display font-bold text-white leading-[1.08] mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                Join the
                <br />
                ad.monde Team.
              </h2>
              <p className="text-white/50 text-[13px] leading-relaxed mb-10">
                Don&apos;t see your ideal role? Send your CV anyway — we review all
                applications and are always keen to meet talented individuals.
              </p>
              <a
                href={CAREERS_EMAIL_HREF}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] transition-colors duration-200 mb-10"
              >
                {CAREERS_EMAIL}
              </a>
              <ul className="flex flex-col gap-4 mt-auto">
                {[
                  "Response within 5 business days",
                  "All applications reviewed personally",
                  "Fully confidential process",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white/60" strokeWidth={2.5} />
                    </span>
                    <span className="text-[13px] text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: White form card */}
            <div className="bg-white rounded-3xl m-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-20 px-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#f0ede6] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#666666]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-3">
                    Application Received!
                  </h3>
                  <p className="text-[#777777] text-[13px] max-w-xs leading-relaxed">
                    Thank you for your interest in joining ad.monde. We&apos;ll review
                    your application and be in touch within 5 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFileName("");
                      setCvUrl(null);
                      setSelectedRole("");
                      setExperience("");
                    }}
                    className="mt-8 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#888888] border border-[#E0DDD8] px-6 py-3 rounded-xl hover:text-[#111111] hover:border-[#999999] transition-colors duration-200"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 sm:px-10 py-10 lg:py-12 flex flex-col gap-7">

                  {/* Personal Info */}
                  <div className="bg-[#FAFAF8] rounded-2xl p-6 flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                      Personal Info
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#888888]">Full Name *</label>
                        <input required name="name" placeholder="Your full name" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#888888]">Email *</label>
                        <input required name="email" type="email" placeholder="you@email.com" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-[#888888]">Phone *</label>
                        <input required name="phone" placeholder="+966 XX XXX XXXX" className={inputCls} />
                      </div>
                    </div>
                  </div>

                  {/* Role & Experience */}
                  <div className="bg-[#FAFAF8] rounded-2xl p-6 flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                      Role &amp; Experience
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#888888]">Position Applying For *</label>
                      <input
                        required
                        name="position"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        placeholder="e.g. Graphic Designer"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[11px] font-semibold text-[#888888]">Years of Experience</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {experienceLevels.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setExperience(lvl === experience ? "" : lvl)}
                            className={cn(
                              "py-2.5 text-[12px] font-semibold rounded-xl border transition-all duration-200",
                              experience === lvl
                                ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                                : "bg-white text-[#777777] border-[#E8E5E0] hover:border-[#AAAAAA] hover:text-[#333333]"
                            )}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="bg-[#FAFAF8] rounded-2xl p-6 flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                      Cover Letter
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#888888]">Why do you want to join us?</label>
                      <textarea
                        name="coverLetter"
                        rows={4}
                        placeholder="Tell us about yourself, your experience, and what excites you about joining ad.monde..."
                        className={cn(inputCls, "resize-none")}
                      />
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div
                    onClick={() => !uploading && fileRef.current?.click()}
                    className={cn(
                      "relative border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 group overflow-hidden",
                      cvUrl
                        ? "border-[#BBBBBB] bg-[#FAFAF8]"
                        : uploadError
                        ? "border-red-300 bg-red-50/30"
                        : "border-[#E0DDD8] hover:border-[#AAAAAA] bg-[#FAFAF8] hover:bg-[#F5F3EF]"
                    )}
                  >
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    <div className="flex items-center gap-5 px-6 py-5">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                        cvUrl ? "bg-[#111111]" : "bg-[#E8E5E0] group-hover:bg-[#111111]"
                      )}>
                        {uploading
                          ? <Loader2 className="w-5 h-5 text-white animate-spin" strokeWidth={1.5} />
                          : cvUrl
                          ? <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                          : <Upload className="w-5 h-5 text-[#888888] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        {uploading ? (
                          <>
                            <p className="text-[13px] font-semibold text-[#333333]">Uploading…</p>
                            <p className="text-[11px] text-[#AAAAAA] truncate">{fileName}</p>
                          </>
                        ) : cvUrl ? (
                          <>
                            <p className="text-[13px] font-semibold text-[#111111] truncate">{fileName}</p>
                            <p className="text-[11px] text-[#AAAAAA]">Uploaded — click to replace</p>
                          </>
                        ) : (
                          <>
                            <p className="text-[13px] font-semibold text-[#333333]">Attach your CV / Resume</p>
                            <p className="text-[11px] text-[#AAAAAA]">PDF, DOC, DOCX — up to 10 MB</p>
                          </>
                        )}
                      </div>
                      {!uploading && !cvUrl && (
                        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#888888] border border-[#E0DDD8] px-3.5 py-2 rounded-lg shrink-0 group-hover:border-[#999999] group-hover:text-[#111111] transition-colors duration-200">
                          Browse
                        </span>
                      )}
                    </div>
                    {uploadError && (
                      <p className="px-6 pb-4 text-red-500 text-[11px]">{uploadError}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-[#2A2A2A] text-white text-[11px] font-semibold tracking-[0.14em] uppercase py-4 rounded-xl transition-colors duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" />Submitting…</>
                    ) : (
                      <>Submit Application <ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                  </button>

                  <p className="text-[11px] text-[#CCCCCC] text-center">
                    Your information is kept private and never shared.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
