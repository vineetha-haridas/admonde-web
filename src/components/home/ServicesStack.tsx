import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceIcon } from "@/lib/serviceIcons";

export type ServiceItem = {
  title: string; desc: string; slug: string; tags: string;
  theme: string; imageUrl: string | null; sortOrder: number;
};

const THEME = {
  light: { bg: "#F5F3EF", textPrimary: "#111111", textMuted: "#AAAAAA", lineColor: "#D8D4CC" },
  dark:  { bg: "#0D0D0D", textPrimary: "#F5F3EF", textMuted: "#555555", lineColor: "#2A2A2A" },
};

const STATIC_SERVICES: ServiceItem[] = [
  {
    title: "Interior\nFit-Out", desc: "Complete interior contracting from concept to handover — retail stores, offices, showrooms, and commercial spaces built to specification.",
    slug: "interior-fitout", tags: "Retail | Office | Hospitality | Showroom", theme: "light",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=85", sortOrder: 0,
  },
  {
    title: "Carpentry &\nFabrication", desc: "Custom joinery, bespoke furniture, metal works, and structural fabrication crafted to precision for every project.",
    slug: "carpentry-fabrication", tags: "Joinery | Metal Works | Shopfittings | Millwork", theme: "dark",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85", sortOrder: 1,
  },
  {
    title: "MEP\nContracting", desc: "Full mechanical, electrical, and plumbing works for fit-out and construction projects across the GCC.",
    slug: "mep-works", tags: "Electrical | Plumbing | HVAC | Fire Safety", theme: "light",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85", sortOrder: 2,
  },
];

export function ServicesStack({ services }: { services?: ServiceItem[] }) {
  const items = services && services.length > 0 ? services : STATIC_SERVICES;

  return (
    <section className="px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="relative" style={{ height: `${items.length * 100}vh` }}>
          {items.map((s, i) => {
            const th = THEME[s.theme as keyof typeof THEME] ?? THEME.light;
            const Icon = getServiceIcon(s.slug);
            const tags = s.tags.split("|").map((t) => t.trim()).filter(Boolean);
            const num = String(i + 1).padStart(2, "0");
            const titleLines = s.title.split("\n");

            return (
              <div
                key={s.slug}
                className="sticky top-0 h-screen w-full flex overflow-hidden rounded-3xl"
                style={{ zIndex: i + 1, backgroundColor: th.bg }}
              >
                {/* LEFT PANEL */}
                <div className="w-full lg:w-[52%] h-full flex flex-col justify-between pt-24 pb-10 px-8 sm:px-14 lg:px-20 xl:px-28 2xl:px-36 relative">
                  {/* Top bar */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-px" style={{ backgroundColor: "#72b043" }} />
                      <span className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: th.textMuted }}>Our Services</span>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] font-medium tabular-nums" style={{ color: th.textMuted }}>
                      {num} <span style={{ opacity: 0.4 }}>/ {String(items.length).padStart(2, "0")}</span>
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center py-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ border: "1px solid rgba(114,176,67,0.4)" }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: "#72b043" }} strokeWidth={1.5} />
                      </div>
                    </div>
                    <h2 className="font-display font-bold leading-[0.88] mb-8" style={{ fontSize: "clamp(3rem, 5.5vw, 7rem)", color: th.textPrimary }}>
                      {titleLines.map((line, j) => <span key={j} className="block">{line}</span>)}
                    </h2>
                    <p className="text-[14px] sm:text-[15px] leading-[1.75] mb-10" style={{ color: th.textMuted, maxWidth: "44ch" }}>
                      {s.desc}
                    </p>
                    <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-4 w-fit">
                      <span className="w-8 h-px transition-all duration-500 group-hover:w-16" style={{ backgroundColor: "#72b043" }} />
                      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: th.textPrimary }}>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: th.textPrimary }} />
                    </Link>
                  </div>

                  {/* Tags */}
                  <div className="relative z-10 flex items-center gap-2 flex-wrap">
                    {tags.map((tag, j) => (
                      <span key={tag}>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: th.textMuted }}>{tag}</span>
                        {j < tags.length - 1 && <span className="mx-2 opacity-30" style={{ color: th.textMuted }}>·</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT PANEL: Image */}
                <div className="hidden lg:block flex-1 h-full relative overflow-hidden">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover scale-[1.03] transition-transform duration-700" loading={i === 0 ? "eager" : "lazy"} />
                  ) : (
                    <div className="w-full h-full" style={{ background: th.lineColor }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/5" />
                  <div className="absolute bottom-8 right-8 font-display font-bold leading-none select-none pointer-events-none text-white" style={{ fontSize: "clamp(5rem, 10vw, 9rem)", opacity: 0.08 }}>
                    {num}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
