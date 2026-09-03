"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  location: string | null;
  year: string | null;
};

export function PortfolioGrid({
  projects,
  categories,
}: {
  projects: PortfolioItem[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...categories].map((cat) => (
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
          {filtered.map((project) => (
            <div key={project.id} className="group">
              <div
                className="overflow-hidden rounded-2xl bg-[#E8E4DC] mb-3"
                style={{ aspectRatio: "4/3" }}
              >
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#CCCCCC]">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between px-1">
                <div>
                  <span className="font-heading font-medium text-[#111111] text-[13px] sm:text-[14px] block">
                    {project.title}
                  </span>
                  {project.location && (
                    <span className="text-[#888888] text-[12px]">{project.location}</span>
                  )}
                </div>
                {project.year && (
                  <span className="text-[#AAAAAA] text-[11px] font-medium shrink-0 ml-2 mt-0.5">
                    {project.year}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-[#AAAAAA] text-[13px]">
          No projects in this category.
        </div>
      )}
    </>
  );
}
