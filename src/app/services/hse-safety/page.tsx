import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/home/FadeUp";

export const metadata: Metadata = {
  title: "HSE & Safety Branding | Admonde",
  description:
    "Complete workplace safety branding solutions — compliant safety signage, helmet branding, and high-visibility reflective workwear across the GCC.",
};

const features = [
  "Safety Signs & Boards",
  "Safety Helmet Branding",
  "Reflective Vest Branding",
  "Reflective Jacket Branding",
  "Site Hoarding & Barrier Branding",
  "Emergency Evacuation Signage",
  "PPE Labelling & Branding",
  "HSE Compliance Boards",
];

const projects = [
  {
    title: "Site Safety Signage Package",
    client: "Construction Group, KSA",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  },
  {
    title: "Reflective Workwear Branding",
    client: "Industrial Group, Saudi Arabia",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80",
  },
  {
    title: "Facility HSE Board Installation",
    client: "Petrochemical Co., KSA",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80",
  },
];

export default function HSESafetyPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="px-3 sm:px-5 lg:px-8 pt-20 sm:pt-24 pb-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 py-14 sm:py-20">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/services"
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#AAAAAA] hover:text-[#111111] transition-colors"
            >
              Services
            </Link>
            <span className="text-[#CCCCCC] text-[10px]">/</span>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#111111]">
              HSE &amp; Safety Branding
            </span>
          </div>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            HSE &amp; Safety
            <br />
            Branding
          </h1>
          <p className="text-[#666666] text-[14px] leading-relaxed max-w-lg">
            Complete safety branding solutions for workplaces. Compliant safety signage,
            helmet branding, and high-visibility reflective workwear for industrial and
            construction environments.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-3 sm:px-5 lg:px-8 py-3">
        <FadeUp>
          <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.15fr]">
              {/* Left */}
              <div className="px-8 sm:px-12 lg:px-14 py-12 lg:py-14 border-b lg:border-b-0 lg:border-r border-[#E8E4DC] flex flex-col justify-center">
                <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
                  The Service
                </p>
                <h2
                  className="font-display font-bold text-[#111111] leading-tight mb-5"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
                >
                  Safety Branding
                  <br />
                  that Complies
                </h2>
                <p className="text-[#555555] text-[14px] leading-relaxed mb-4">
                  Workplace safety is non-negotiable — and how you communicate it matters.
                  Our HSE branding service delivers fully compliant safety signage, branded
                  PPE, and high-visibility workwear that meets GCC regulatory standards
                  while reinforcing your brand identity on-site.
                </p>
                <p className="text-[#777777] text-[13px] leading-relaxed mb-8">
                  From construction sites and industrial facilities to petrochemical plants
                  and logistics hubs, we supply and install complete HSE branding packages
                  across Saudi Arabia and the wider GCC — fast and to specification.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10">
                  {features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#BBBBBB] mt-2 shrink-0" />
                      <span className="text-[13px] text-[#666666]">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-[#111111] hover:bg-[#2A2A2A] text-white text-[11px] font-semibold tracking-[0.12em] uppercase px-7 py-4 rounded-xl transition-colors duration-300 w-fit"
                >
                  Request a Quote
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Right: images */}
              <div className="p-4 flex flex-col gap-3">
                <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {projects.slice(1).map((p) => (
                    <div key={p.title}>
                      <div className="overflow-hidden rounded-xl mb-2" style={{ aspectRatio: "4/3" }}>
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[13px] font-medium text-[#111111] leading-snug">{p.title}</p>
                      <p className="text-[11px] text-[#888888]">{p.client}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── CTA ── */}
      <section className="px-3 sm:px-5 lg:px-8 py-3 pb-4">
        <FadeUp>
          <div
            className="max-w-7xl mx-auto rounded-3xl px-8 sm:px-12 lg:px-16 py-14 sm:py-16"
            style={{ backgroundColor: "#111111" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2
                  className="font-display font-bold text-white leading-[1.08]"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                >
                  Keep Your Site
                  <br />
                  Safe &amp; Branded.
                </h2>
                <p className="text-white/60 text-[13px] leading-relaxed mt-3 max-w-sm">
                  Tell us your site requirements and we&apos;ll deliver a complete
                  compliant HSE branding package.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#111111] text-[11px] font-semibold tracking-[0.12em] uppercase px-7 sm:px-9 py-4 rounded-xl hover:bg-[#F5F5F5] transition-colors duration-300 whitespace-nowrap"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-[11px] font-semibold tracking-[0.12em] uppercase px-7 py-4 rounded-xl hover:border-white/50 transition-colors duration-300 whitespace-nowrap"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
