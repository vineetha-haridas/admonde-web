export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FadeUp } from "@/components/home/FadeUp";
import { getServiceIcon } from "@/lib/serviceIcons";

export const metadata: Metadata = {
  title: "Services | Admonde",
  description:
    "Carpentry & fabrication, interior fit-out, MEP contracting, printing, events, and HSE branding — complete project solutions by Admonde.",
};

function flatten(text: string) {
  return text.replace(/\n/g, " ");
}

export default async function ServicesPage() {
  let services: {
    title: string; desc: string; slug: string; tags: string; imageUrl: string | null;
  }[] = [];
  try {
    services = await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { title: true, desc: true, slug: true, tags: true, imageUrl: true },
    });
  } catch {
    // DB unreachable — render an empty grid below rather than crash the page
  }

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 pt-20 sm:pt-24 pb-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 py-14 sm:py-20">
          <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
            What We Offer
          </p>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Our Services
          </h1>
          <p className="text-[#666666] text-[14px] leading-relaxed max-w-lg">
            From carpentry and fit-out contracting to MEP works, precision printing,
            and brand activation — all delivered by one dedicated team.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto">
          {services.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {services.map((s, i) => {
                const Icon = getServiceIcon(s.slug);
                const tags = s.tags.split("|").map((t) => t.trim()).filter(Boolean);
                return (
                  <FadeUp key={s.slug} delay={i * 0.08}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group bg-[#f0ede6] rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="p-3">
                        <div
                          className="w-full overflow-hidden rounded-xl bg-[#e6e1d6]"
                          style={{ aspectRatio: "16/9" }}
                        >
                          {s.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={s.imageUrl}
                              alt={flatten(s.title)}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          )}
                        </div>
                      </div>
                      <div className="px-6 pb-7 flex flex-col flex-1 gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#e6e1d6] flex items-center justify-center">
                          <Icon
                            className="w-5 h-5 text-[#888888] group-hover:text-[#111111] transition-colors duration-300"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-[#111111] text-[15px] sm:text-[16px] mb-2">
                            {flatten(s.title)}
                          </h3>
                          <p className="text-[#666666] text-[13px] leading-relaxed mb-4">{s.desc}</p>
                          <ul className="flex flex-col gap-1.5">
                            {tags.map((t) => (
                              <li
                                key={t}
                                className="flex items-center gap-2 text-[12px] text-[#888888]"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#BBBBBB] shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#AAAAAA] group-hover:text-[#111111] transition-colors duration-300">
                          Learn More
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </FadeUp>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 text-[#AAAAAA] text-[13px]">
              Services coming soon.
            </div>
          )}
        </div>
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
                  Not Sure Which
                  <br />
                  Service You Need?
                </h2>
                <p className="text-white/70 text-[13px] leading-relaxed mt-3 max-w-sm">
                  Our team will assess your requirements and recommend the right
                  solution for your project.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#111111] text-[11px] font-semibold tracking-[0.12em] uppercase px-7 sm:px-9 py-4 rounded-xl hover:bg-[#F5F5F5] transition-colors duration-300 whitespace-nowrap"
                >
                  Talk to Our Experts
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
