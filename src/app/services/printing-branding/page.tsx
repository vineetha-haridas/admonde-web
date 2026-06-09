import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/home/FadeUp";

export const metadata: Metadata = {
  title: "Print & Production | Admonde",
  description:
    "Premium print collateral at any volume — brochures, packaging, stationery, and marketing materials across the GCC.",
};

const features = [
  "Brochures, Folders & Booklets",
  "Packaging & Food Boxes",
  "Business Stationery & Calendars",
  "Labels, Tags & Danglers",
  "Canvas & Backdrops",
  "UV & Digital Printing",
  "Offset Printing",
  "Calendars & Diaries",
];

const projects = [
  {
    title: "Almarai Print Campaign",
    client: "Almarai, KSA",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
  },
  {
    title: "Corporate Stationery Suite",
    client: "Tamer Group, Saudi Arabia",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80",
  },
  {
    title: "Product Packaging Design",
    client: "F&B Brand, KSA",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=900&q=80",
  },
];

export default function PrintProductionPage() {
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
              Print &amp; Production
            </span>
          </div>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Print &amp;
            <br />
            Production
          </h1>
          <p className="text-[#666666] text-[14px] leading-relaxed max-w-lg">
            Premium print collateral at any volume — brochures, packaging, stationery,
            and high-impact marketing materials produced to the highest standard.
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
                <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                  The Service
                </p>
                <h2
                  className="font-display font-bold text-[#111111] leading-tight mb-5"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
                >
                  Print that Commands
                  <br />
                  Attention
                </h2>
                <p className="text-[#555555] text-[14px] leading-relaxed mb-4">
                  Your printed materials represent your brand as much as any digital
                  touchpoint. Our print production team combines state-of-the-art printing
                  technology with expert design to create materials that are consistent,
                  impactful, and true to your brand vision — at any scale.
                </p>
                <p className="text-[#777777] text-[13px] leading-relaxed mb-8">
                  From short-run digital prints to high-volume offset campaigns, we deliver
                  everything from brochures and packaging to large-format banners — on
                  time, every time.
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
                  Elevate Your
                  <br />
                  Brand Today.
                </h2>
                <p className="text-white/60 text-[13px] leading-relaxed mt-3 max-w-sm">
                  Share your brief and we&apos;ll provide a detailed proposal within 48
                  hours.
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
