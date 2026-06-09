"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Events & Exhibitions",
  "Store & Office Branding",
  "Print & Production",
  "POP / POS Displays",
  "Fleet & Uniform Branding",
];

const projects = [
  {
    title: "LIV Golf Event Signage",
    client: "LIV Golf, Saudi Arabia",
    category: "Events & Exhibitions",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    year: "2024",
  },
  {
    title: "LG Retail Brand Experience",
    client: "LG Electronics, KSA",
    category: "Store & Office Branding",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    year: "2024",
  },
  {
    title: "Samsung POP Display Campaign",
    client: "Samsung, GCC",
    category: "POP / POS Displays",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    year: "2024",
  },
  {
    title: "Bupa Arabia Office Branding",
    client: "Bupa Arabia, Saudi Arabia",
    category: "Store & Office Branding",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80",
    year: "2024",
  },
  {
    title: "Decathlon In-Store Displays",
    client: "Decathlon, KSA",
    category: "POP / POS Displays",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    year: "2024",
  },
  {
    title: "Nike Retail POP Campaign",
    client: "Nike, Saudi Arabia",
    category: "POP / POS Displays",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    year: "2023",
  },
  {
    title: "Corporate Fleet Wrap",
    client: "National Fleet, Saudi Arabia",
    category: "Fleet & Uniform Branding",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    year: "2023",
  },
  {
    title: "Almarai Brand Activation",
    client: "Almarai, KSA",
    category: "Events & Exhibitions",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f0?w=900&q=80",
    year: "2023",
  },
  {
    title: "TCL Retail Signage Rollout",
    client: "TCL, GCC",
    category: "Store & Office Branding",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80",
    year: "2023",
  },
  {
    title: "Corporate Print Campaign",
    client: "Tamer Group, KSA",
    category: "Print & Production",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80",
    year: "2022",
  },
  {
    title: "Uniform & Staff Branding",
    client: "Nahdi Medical, Saudi Arabia",
    category: "Fleet & Uniform Branding",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    year: "2022",
  },
  {
    title: "Art Jameel Event Installation",
    client: "Art Jameel, Saudi Arabia",
    category: "Events & Exhibitions",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80",
    year: "2022",
  },
];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 pt-20 sm:pt-24 pb-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 py-14 sm:py-20">
          <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
            Our Work
          </p>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Portfolio
          </h1>
          <p className="text-[#999999] text-[13px] leading-relaxed max-w-lg">
            500+ projects delivered across the GCC — from large-scale event installations
            to retail branding and fleet campaigns.
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-lg transition-all duration-200",
                  active === cat
                    ? "bg-[#111111] text-white"
                    : "text-[#888888] border border-[#D8D5CE] hover:text-[#111111] hover:border-[#999999]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
              {filtered.map((project, i) => (
                <div key={`${project.title}-${i}`} className="group">
                  <div
                    className="overflow-hidden rounded-2xl bg-[#E8E4DC] mb-3"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start justify-between px-1">
                    <div>
                      <span className="font-heading font-medium text-[#111111] text-[13px] sm:text-[14px] block">
                        {project.title}
                      </span>
                      <span className="text-[#888888] text-[12px]">{project.client}</span>
                    </div>
                    <span className="text-[#AAAAAA] text-[11px] font-medium shrink-0 ml-2 mt-0.5">
                      {project.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-[#AAAAAA] text-[13px]">
              No projects in this category.
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-3 sm:px-5 lg:px-8 py-3 pb-4">
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
                Want to See More?
              </h2>
              <p className="text-white/70 text-[13px] leading-relaxed mt-3 max-w-sm">
                Contact us to request our full project portfolio or discuss your upcoming project.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-[#111111] text-[11px] font-semibold tracking-[0.12em] uppercase px-7 sm:px-9 py-4 rounded-xl hover:bg-[#F5F5F5] transition-colors duration-300 whitespace-nowrap"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
