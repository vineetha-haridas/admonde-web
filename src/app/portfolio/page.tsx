export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PortfolioGrid, type PortfolioItem } from "@/components/portfolio/PortfolioGrid";

const staticProjects: PortfolioItem[] = [
  {
    id: -1,
    title: "LIV Golf Event Signage",
    category: "Exhibition & Events",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    location: "LIV Golf, Saudi Arabia",
    year: "2024",
  },
  {
    id: -2,
    title: "LG Retail Brand Experience",
    category: "Interior Fit-Out",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    location: "LG Electronics, KSA",
    year: "2024",
  },
  {
    id: -3,
    title: "Samsung POP Display Campaign",
    category: "Print & Branding",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    location: "Samsung, GCC",
    year: "2024",
  },
  {
    id: -4,
    title: "Bupa Arabia Office Branding",
    category: "Interior Fit-Out",
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80",
    location: "Bupa Arabia, Saudi Arabia",
    year: "2024",
  },
  {
    id: -5,
    title: "Corporate Fleet Wrap",
    category: "Fleet & Uniform",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    location: "National Fleet, Saudi Arabia",
    year: "2023",
  },
  {
    id: -6,
    title: "Almarai Brand Activation",
    category: "Exhibition & Events",
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f0?w=900&q=80",
    location: "Almarai, KSA",
    year: "2023",
  },
];

export default async function PortfolioPage() {
  let dbProjects: PortfolioItem[] = [];
  try {
    dbProjects = await prisma.portfolioProject.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    // DB unreachable — fall back to static data below
  }

  const projects = dbProjects.length > 0 ? dbProjects : staticProjects;
  const categories = Array.from(new Set(projects.map((p) => p.category))).filter(Boolean);

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
          <PortfolioGrid projects={projects} categories={categories} />
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
