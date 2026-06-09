"use client";

import { useState, useRef } from "react";
import {
  ArrowRight, MapPin, Phone, Mail, Clock,
  Upload, CheckCircle2, Check, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, EMAIL_HREF, ADDRESS_LINE1, ADDRESS_LINE2, ADDRESS_CITY, ADDRESS_COUNTRY, WHATSAPP_HREF, BUSINESS_HOURS } from "@/lib/contact";

const services = [
  "Events & Exhibitions",
  "Store & Office Branding",
  "Print & Production",
  "POP / POS Displays",
  "Fleet & Uniform Branding",
  "HSE & Safety Branding",
  "Other",
];

const budgetRanges = ["< SAR 5K", "SAR 5K–20K", "SAR 20K–50K", "SAR 50K+"];

const contactInfo = [
  {
    Icon: MapPin,
    title: "Our Office",
    lines: [ADDRESS_LINE1, ADDRESS_LINE2, ADDRESS_CITY, ADDRESS_COUNTRY],
  },
  {
    Icon: Phone,
    title: "Phone",
    lines: [PHONE_NUMBER],
    href: PHONE_HREF,
  },
  {
    Icon: Mail,
    title: "Email",
    lines: [EMAIL],
    href: EMAIL_HREF,
  },
  {
    Icon: Clock,
    title: "Business Hours",
    lines: [BUSINESS_HOURS],
  },
];

const inputCls =
  "w-full bg-white border border-[#E8E5E0] text-[#111111] placeholder:text-[#CCCCCC] px-4 py-3.5 text-[14px] rounded-xl focus:outline-none focus:border-[#999999] transition-colors duration-200";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          company: fd.get("company") || null,
          email: fd.get("email"),
          phone: fd.get("phone"),
          service: selectedService || null,
          budget: selectedBudget || null,
          message: fd.get("message"),
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
            Get in Touch
          </p>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Let&apos;s Start
            <br />
            Your Project.
          </h1>
          <p className="text-[#666666] text-[14px] leading-relaxed max-w-lg">
            Ready to start your project? Our team responds within 24 hours.
          </p>
        </div>
      </section>

     

      {/* ── Contact Card ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3 pb-4">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ backgroundColor: "#111111" }}>
          <div className="grid lg:grid-cols-[5fr_7fr]">

            {/* Left: Dark info panel */}
            <div className="px-8 sm:px-10 lg:px-12 2xl:px-16 3xl:px-20 py-12 lg:py-16 flex flex-col">
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-white/40 mb-4">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                Contact Details
              </p>
              <h2
                className="font-display font-bold text-white leading-[1.08] mb-8"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                We&apos;d Love to
                <br />
                Hear From You.
              </h2>

              <div className="flex flex-col gap-6 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-1">
                          {item.title}
                        </p>
                        {item.lines.map((line) => (
                          <p key={line} className="text-white/70 text-[13px]">
                            {item.href ? (
                              <a href={item.href} className="hover:text-white transition-colors duration-200">
                                {line}
                              </a>
                            ) : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-3 rounded-xl transition-colors duration-200 w-fit"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Right: White form card */}
            <div className="bg-white rounded-3xl m-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-20 px-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#f0ede6] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#666666]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-3">
                    Enquiry Sent!
                  </h3>
                  <p className="text-[#777777] text-[13px] max-w-xs leading-relaxed">
                    Our team will review your enquiry and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFileName("");
                      setSelectedService("");
                      setSelectedBudget("");
                    }}
                    className="mt-8 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#888888] border border-[#E0DDD8] px-6 py-3 rounded-xl hover:text-[#111111] hover:border-[#999999] transition-colors duration-200"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 sm:px-10 py-10 lg:py-12 flex flex-col gap-6">

                  {/* Your Details */}
                  <div className="bg-[#FAFAF8] rounded-2xl p-6 flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                      Your Details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#888888]">Full Name *</label>
                        <input required name="name" placeholder="Your full name" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#888888]">Company</label>
                        <input name="company" placeholder="Your company" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#888888]">Email *</label>
                        <input required name="email" type="email" placeholder="you@email.com" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#888888]">Phone *</label>
                        <input required name="phone" placeholder="+966 XX XXX XXXX" className={inputCls} />
                      </div>
                    </div>
                  </div>

                  {/* Service & Budget */}
                  <div className="bg-[#FAFAF8] rounded-2xl p-6 flex flex-col gap-5">
                    <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                      Service &amp; Budget
                    </p>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-semibold text-[#888888]">Service Required</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
                        {services.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedService(s === selectedService ? "" : s)}
                            className={cn(
                              "px-3 py-2.5 text-[12px] font-semibold rounded-xl border text-left transition-all duration-200 leading-snug",
                              selectedService === s
                                ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                                : "bg-white text-[#666666] border-[#E8E5E0] hover:border-[#AAAAAA] hover:text-[#333333]"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="bg-[#FAFAF8] rounded-2xl p-6 flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                      Project Details
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#888888]">Tell us about your project *</label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="Describe your project — scope, location, timeline, and any specific requirements..."
                        className={cn(inputCls, "resize-none")}
                      />
                    </div>
                  </div>

                  {/* File Attachment */}
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={cn(
                      "relative border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 group overflow-hidden",
                      fileName
                        ? "border-[#BBBBBB] bg-[#FAFAF8]"
                        : "border-[#E0DDD8] hover:border-[#AAAAAA] bg-[#FAFAF8] hover:bg-[#F5F3EF]"
                    )}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-5 px-6 py-5">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                        fileName ? "bg-[#111111]" : "bg-[#E8E5E0] group-hover:bg-[#111111]"
                      )}>
                        {fileName
                          ? <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                          : <Upload className="w-5 h-5 text-[#888888] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        {fileName ? (
                          <>
                            <p className="text-[13px] font-semibold text-[#111111] truncate">{fileName}</p>
                            <p className="text-[11px] text-[#AAAAAA]">Attached — click to replace</p>
                          </>
                        ) : (
                          <>
                            <p className="text-[13px] font-semibold text-[#333333]">Attach drawings, brief, or references</p>
                            <p className="text-[11px] text-[#AAAAAA]">PDF, DOC, JPG, PNG, ZIP — up to 20 MB</p>
                          </>
                        )}
                      </div>
                      {!fileName && (
                        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#888888] border border-[#E0DDD8] px-3.5 py-2 rounded-lg shrink-0 group-hover:border-[#999999] group-hover:text-[#111111] transition-colors duration-200">
                          Browse
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-[#2A2A2A] text-white text-[11px] font-semibold tracking-[0.14em] uppercase py-4 rounded-xl transition-colors duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" />Sending Enquiry…</>
                    ) : (
                      <>Send Enquiry <ArrowRight className="w-3.5 h-3.5" /></>
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

       {/* ── Map ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl overflow-hidden h-[340px] 2xl:h-[420px] 3xl:h-[500px]">
          <iframe
            src="https://maps.google.com/maps?q=Riyadh,Saudi+Arabia&z=13&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) contrast(0.9) opacity(0.85)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Admonde Location"
          />
        </div>
      </section>
    </div>
  );
}
