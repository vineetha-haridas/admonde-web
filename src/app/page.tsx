export const dynamic = "force-dynamic";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Award,
  Users,
  PhoneCall,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { HeroSection } from "@/components/home/HeroSection";
import { FadeUp } from "@/components/home/FadeUp";
import { ServicesStack, type ServiceItem } from "@/components/home/ServicesStack";
import { BrandMarquee } from "@/components/home/BrandMarquee";


const whyFeatures: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Shield,
    title: "Precision Production",
    desc: "Advanced equipment and skilled craftsmanship ensure perfect results on every project.",
  },
  {
    Icon: Zap,
    title: "Modern Design Standards",
    desc: "Creative solutions tailored to strengthen your brand identity and market presence.",
  },
  {
    Icon: Clock,
    title: "Reliable Project Delivery",
    desc: "On-time delivery with dedication to quality and complete client satisfaction.",
  },
  {
    Icon: Award,
    title: "Full Responsibility",
    desc: "We own every task from start to finish — no passing the buck, no excuses.",
  },
  {
    Icon: PhoneCall,
    title: "Available at Any Time",
    desc: "Our team is always reachable — ready to respond, support, and keep your project moving.",
  },
];

const stats: { Icon: LucideIcon; value: string; label: string }[] = [
  { Icon: Award, value: "30+", label: "Years of Excellence" },
  { Icon: Users, value: "500+", label: "Projects Completed" },
  { Icon: Zap, value: "200+", label: "Happy Clients" },
];


const staticClients = [
  { name: "LG",          logoUrl: "https://logo.clearbit.com/lg.com" },
  { name: "Samsung",     logoUrl: "https://logo.clearbit.com/samsung.com" },
  { name: "Bupa",        logoUrl: "https://logo.clearbit.com/bupa.com" },
  { name: "TCL",         logoUrl: "https://logo.clearbit.com/tcl.com" },
  { name: "Hisense",     logoUrl: "https://logo.clearbit.com/hisense.com" },
  { name: "Nike",        logoUrl: "https://logo.clearbit.com/nike.com" },
  { name: "Decathlon",   logoUrl: "https://logo.clearbit.com/decathlon.com" },
  { name: "Pepsi",       logoUrl: "https://logo.clearbit.com/pepsi.com" },
  { name: "Almarai",     logoUrl: "https://logo.clearbit.com/almarai.com" },
  { name: "Centrepoint", logoUrl: "https://logo.clearbit.com/centrepointstores.com" },
  { name: "Heineken",    logoUrl: "https://logo.clearbit.com/heineken.com" },
  { name: "AutoZone",    logoUrl: "https://logo.clearbit.com/autozone.com" },
];

const staticPortfolio = [
  {
    title: "Fleet Wrap Campaign",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=85",
  },
  {
    title: "Office Fit-Out",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=85",
  },
  {
    title: "Retail Signage",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=85",
  },
  {
    title: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85",
  },
];

export default async function HomePage() {
  let dbProjects: { title: string; imageUrl: string | null }[] = [];
  let dbClients: { name: string; logoUrl: string }[] = [];
  let dbServices: ServiceItem[] = [];
  const [settings] = await Promise.all([getSiteSettings()]);
  try {
    [dbProjects, dbClients, dbServices] = await Promise.all([
      prisma.portfolioProject.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], take: 4 }),
      prisma.client.findMany({ where: { active: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
      prisma.service.findMany({ where: { active: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    ]);
  } catch {
    // DB unreachable — fall back to static data
  }

  const portfolio =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({ title: p.title, image: p.imageUrl ?? "" }))
      : staticPortfolio;

  const clients = dbClients;

  return (
    <div className="bg-white">
      {/* ── 1. HERO ── */}
      <HeroSection
        imageUrl={settings.hero_image_url}
        label={settings.hero_label}
        headline={settings.hero_headline}
        subtext={settings.hero_subtext}
      />

      {/* ── 2. PREFERRED BY LEADING BRANDS ── */}
      <section className="px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-2xl py-5 overflow-hidden">
          <div className="flex items-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AAAAAA] whitespace-nowrap px-8 sm:px-12 lg:px-16 shrink-0">
              PREFERRED BY LEADING BRANDS
            </p>
            <div className="w-px h-5 bg-[#E0DDD8] shrink-0 mr-10 hidden sm:block" />
            <BrandMarquee clients={clients} />
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES ── */}
      <ServicesStack services={dbServices} />

      {/* ── 4. ABOUT CARD ── */}
      <section className="px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <FadeUp>
          <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-[2fr_3fr]">

              {/* Left: image */}
              <div className="h-[260px] sm:h-[320px] lg:h-full p-4">
                <div className="w-full h-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85"
                    alt="Admonde studio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: text + stats */}
              <div className="px-8 sm:px-12 lg:px-14 2xl:px-20 3xl:px-28 py-12 lg:py-14 flex flex-col justify-center">
                <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#72b043" }} />
                  Who We Are
                  <span className="w-px h-3 bg-[#DDDDDD]" />
                  <span className="text-[#72b043]">Est. 1996</span>
                </p>
                <h2
                  className="font-display font-bold text-[#111111] leading-tight mb-5"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
                >
                  Built to Build.
                  <br />
                  Crafted to Last.
                </h2>
                <p className="text-[#555555] text-[14px] leading-relaxed mb-8 max-w-[420px] 2xl:max-w-[520px]">
                  From precision carpentry and complete interior fit-out to MEP
                  contracting and offset printing — Admonde delivers end-to-end
                  contracting and production solutions across the GCC since 1996.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111111] mb-10 hover:opacity-60 transition-opacity duration-200 w-fit"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Stats */}
                <div className="flex flex-wrap gap-2.5 pt-8 border-t border-[#E8E4DC]">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-3 border "
                    >
                      <div className="bg-[#e6e1d6] p-2 rounded-full flex items-center justify-center">
                      <s.Icon className="w-4 h-4 text-[#BBBBBB]  shrink-0" strokeWidth={1.5} />

                        </div>
                      <div>
                        <p className="font-heading font-bold text-[#111111] text-sm leading-none mb-0.5">
                          {s.value}
                        </p>
                        <p className="text-[#AAAAAA] text-[10px] leading-none">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── 5. PORTFOLIO ── */}
      <section className="px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#72b043" }} />
                  Our Work
                </p>
                <h2
                  className="font-display font-bold text-[#111111]"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                >
                  Selected Works
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden sm:inline-flex items-center gap-2 text-[11px] font-medium border border-[#D8D5CE] text-[#888888] hover:text-[#111111] hover:border-[#999999] px-4 py-2 rounded-lg transition-colors duration-200"
              >
                View All Projects <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {portfolio.slice(0, 4).map((item, i) => (
              <FadeUp key={item.title + i} delay={i * 0.07}>
                <Link href="/portfolio" className="group block">
                  <div
                    className="overflow-hidden rounded-2xl bg-[#E8E4DC] mb-3"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="font-heading font-medium text-[#111111] text-[13px] sm:text-[14px]">
                      {item.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CCCCCC] group-hover:text-[#111111] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          <Link
            href="/portfolio"
            className="sm:hidden mt-6 flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#999999] hover:text-[#111111] transition-colors duration-200"
          >
            View All Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US ── */}
      <section className="px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <FadeUp>
          <div
            className="max-w-7xl mx-auto rounded-3xl px-8 sm:px-12 lg:px-16 2xl:px-24 py-14 sm:py-16"
            style={{ backgroundColor: "#111111" }}
          >
            <div className="grid lg:grid-cols-[2fr_3fr] gap-4 lg:gap-6 3xl:gap-8 items-start">

              <div>
                <p
                  className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4 flex items-center gap-2"
                  style={{ color: "#888888" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#72b043" }} />
                  This is how we do it
                </p>
                <h2
                  className="font-display font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                >
                  One Call.
                  <br />
                  Every Trade.
                  <br />
                  Delivered Right.
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                {whyFeatures.map((f) => (
                  <div key={f.title}>
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-4">
                      <f.Icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading font-semibold text-white text-[13px] mb-2">
                      {f.title}
                    </h3>
                    <p className="text-white/60 text-[12px] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── 7. CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 py-3 pb-4">
        <FadeUp>
          <div
            className="max-w-7xl mx-auto rounded-3xl px-8 sm:px-12 lg:px-16 py-14 sm:py-16"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <p className="text-white/50 text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Have an idea?</p>
                <h2
                  className="font-display font-bold text-white leading-[1.08]"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                >
                  Let&apos;s bring it to life.
                </h2>
              </div>
              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#111111] text-[11px] font-semibold tracking-[0.12em] uppercase px-7 sm:px-9 py-4 rounded-xl hover:bg-[#F5F5F5] transition-colors duration-300 whitespace-nowrap"
                >
                  Get in touch
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
