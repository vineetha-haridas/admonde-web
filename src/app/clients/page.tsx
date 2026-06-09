import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "ad.monde proudly serves leading corporations, consumer brands, and healthcare companies across the GCC.",
};

const clientCategories = [
  {
    sector: "Consumer Electronics",
    clients: ["LG", "Samsung", "TCL", "Hisense"],
  },
  {
    sector: "Sports & Retail",
    clients: ["Nike", "Decathlon", "Centrepoint", "Sun & Sand Sports"],
  },
  {
    sector: "Healthcare & Pharma",
    clients: ["Bupa Arabia", "Johnson & Johnson", "Nahdi Medical"],
  },
  {
    sector: "Food & Beverage",
    clients: ["Almarai", "Hellmann"],
  },
  {
    sector: "Industrial & Corporate",
    clients: ["Hempel", "Tamer Group", "Art Jameel"],
  },
];

export default function ClientsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white pt-36 pb-20 border-b border-[#eeeeee]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#72b043]" />
            <span className="text-[#72b043] text-[11px] tracking-[0.35em] uppercase font-medium">
              Trusted By
            </span>
          </div>
          <h1
            className="font-bold text-[#111111] font-display leading-[0.9] mb-8"
            style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
          >
            Our Clients
          </h1>
          <p className="text-[#888888] max-w-xl leading-relaxed">
            We are proud to partner with some of the most respected names in
            consumer electronics, retail, healthcare, and food &amp; beverage
            across the GCC.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="border-b border-[#eeeeee] bg-[#f8f8f8] grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#eeeeee]">
        {[
          { value: "200+", label: "Clients Served" },
          { value: "30+", label: "Years in Business" },
          { value: "10+", label: "Industry Sectors" },
          { value: "GCC", label: "Regional Coverage" },
        ].map((s) => (
          <div key={s.label} className="px-8 lg:px-12 py-6">
            <p className="text-3xl font-bold text-[#72b043] font-heading">
              {s.value}
            </p>
            <p className="text-[#aaaaaa] text-[10px] uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Client Sectors ── */}
      <section className="bg-white py-24 border-b border-[#eeeeee]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 2xl:px-16 3xl:px-20">
          <div className="flex items-center gap-3 mb-16">
            <span className="w-8 h-px bg-[#72b043]" />
            <span className="text-[#72b043] text-[11px] tracking-[0.35em] uppercase font-medium">
              Across Industries
            </span>
          </div>

          <div className="space-y-14">
            {clientCategories.map((cat) => (
              <div key={cat.sector}>
                <p className="text-[#aaaaaa] text-[10px] uppercase tracking-[0.3em] font-medium mb-5 border-b border-[#eeeeee] pb-4">
                  {cat.sector}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#eeeeee]">
                  {cat.clients.map((client) => (
                    <div
                      key={client}
                      className="bg-white px-5 py-8 hover:bg-[#f8f8f8] transition-colors flex items-center justify-center"
                    >
                      <p className="text-[#666666] font-medium text-sm text-center leading-snug hover:text-[#111111] transition-colors">
                        {client}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand logos grid (all clients) ── */}
      <section className="bg-[#f8f8f8] py-24 border-b border-[#eeeeee]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 2xl:px-16 3xl:px-20">
          <div className="flex items-center gap-3 mb-14">
            <span className="w-8 h-px bg-[#72b043]" />
            <span className="text-[#72b043] text-[11px] tracking-[0.35em] uppercase font-medium">
              Our Partners
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12 gap-px bg-[#e8e8e8]">
            {[
              "LG", "Samsung", "Bupa Arabia", "TCL",
              "Nike", "Decathlon", "Almarai", "J & J",
              "Hempel", "Centrepoint", "Hellmann", "Tamer Group",
              "Hisense", "Nahdi", "Art Jameel", "Sun & Sand",
            ].map((name) => (
              <div
                key={name}
                className="bg-white aspect-square flex items-center justify-center hover:bg-[#f0f0f0] transition-colors"
              >
                <span className="text-[#999999] font-medium text-[11px] text-center px-2 leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#111111] py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="font-bold text-white font-display"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
              >
                Join Our Growing
                <br />
                <span className="text-[#72b043] italic">Client Family</span>
              </h2>
              <p className="text-white/35 mt-4 max-w-sm text-sm leading-relaxed">
                Partner with ad.monde for your next advertising, branding, or
                exhibition project.
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-[#72b043] text-white font-semibold text-sm px-8 py-4 hover:bg-white hover:text-[#111111] transition-colors duration-300"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
