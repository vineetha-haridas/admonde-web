import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Award, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeUp } from "@/components/home/FadeUp";

export const metadata: Metadata = {
  title: "About Us | ad.monde",
  description:
    "Admonde — specialists in carpentry, interior fit-out, MEP contracting, and print production across the GCC since 1996. Formerly Al-Qadi Advertising.",
};

const values: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Target,
    title: "Precision",
    desc: "Every detail matters. Our skilled craftsmen ensure your requirements receive the utmost attention at every stage of the process.",
  },
  {
    Icon: Eye,
    title: "Integrated Approach",
    desc: "From concept to creation, we deliver products that resonate with your brand identity and leave a lasting impact on your audience.",
  },
  {
    Icon: Heart,
    title: "Partnership",
    desc: "We are your partners in success — building relationships based on trust, reliability, and mutual growth.",
  },
];

const team: { name: string; role: string; image: string; linkedin?: string }[] = [
  {
    name: "Abdullah Al-Qadi",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Khalid Al-Rashid",
    role: "Head of Production",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sara Mahmoud",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Omar Nasser",
    role: "Client Relations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    linkedin: "https://linkedin.com",
  },
];

const milestones = [
  { year: "1996", event: "Founded as Al-Qadi Advertising in the Kingdom of Saudi Arabia" },
  { year: "2000", event: "Expanded into large-scale events and exhibitions fabrication" },
  { year: "2010", event: "Launched full offset print production and branding division" },
  { year: "2015", event: "Re-branded as ad.monde — Beyond Advertising" },
  { year: "2020", event: "Serving 100+ enterprise clients across the GCC" },
  { year: "2024", event: "500+ projects and 200+ clients served" },
];

const stats: { Icon: LucideIcon; value: string; label: string }[] = [
  { Icon: Award, value: "28+", label: "Years of Excellence" },
  { Icon: Users, value: "500+", label: "Projects Completed" },
  { Icon: Zap, value: "200+", label: "Happy Clients" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 pt-20 sm:pt-24 pb-3">
        <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 2xl:px-20 py-14 sm:py-20">
          <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
            Our Story
            <span className="w-px h-3 bg-[#DDDDDD]" />
            <span className="text-[#72b043]">Est. 1996</span>
          </p>
          <h1
            className="font-display font-bold text-[#111111] leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Beyond
            <br />
            Advertising.
          </h1>
          <p className="text-[#666666] text-[14px] leading-relaxed max-w-lg">
            Admonde — specialists in carpentry, interior fit-out, MEP contracting,
            and print production. Two and a half decades of building excellence across
            the GCC since 1996.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <FadeUp>
          <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              <div className="h-[260px] sm:h-[340px] lg:h-full p-4">
                <div className="w-full h-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80"
                    alt="Admonde team at work"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="px-8 sm:px-12 lg:px-14 2xl:px-20 3xl:px-28 py-12 lg:py-14 flex flex-col justify-center">
                <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                  Who We Are
                  <span className="w-px h-3 bg-[#DDDDDD]" />
                  <span className="text-[#72b043]">Est. 1996</span>
                </p>
                <h2
                  className="font-display font-bold text-[#111111] leading-tight mb-5"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
                >
                  A Studio Built on
                  <br />
                  Craft &amp; Precision.
                </h2>
                <p className="text-[#555555] text-[14px] leading-relaxed mb-4">
                  Formerly known as Al-Qadi Advertising, Admonde has grown into one of
                  the GCC&apos;s most trusted contracting and production companies since
                  1996. We specialise in interior fit-out, carpentry and fabrication, MEP
                  contracting, and commercial printing — serving clients from global
                  corporations and government entities to retail brands.
                </p>
                <p className="text-[#777777] text-[13px] leading-relaxed mb-8">
                  Our in-house teams of engineers, craftsmen, and designers bring full
                  project control under one roof — from design and fabrication through
                  to installation and commissioning.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-8 border-t border-[#E8E4DC]">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-3 border"
                    >
                      <div className="bg-[#e6e1d6] p-2 rounded-full flex items-center justify-center">
                        <s.Icon className="w-4 h-4 text-[#BBBBBB] shrink-0" strokeWidth={1.5} />
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

      {/* ── Values ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-8">
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-3">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
              Our Philosophy
            </p>
            <h2
              className="font-display font-bold text-[#111111]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              What Drives Us
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-3 3xl:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08}>
                <div className="bg-[#f0ede6] rounded-2xl p-8 sm:p-10 flex flex-col gap-5 h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#e6e1d6] flex items-center justify-center">
                    <v.Icon className="w-5 h-5 text-[#888888]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#111111] text-[15px] sm:text-[16px] mb-3">
                      {v.title}
                    </h3>
                    <p className="text-[#666666] text-[13px] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-4">
          <FadeUp>
            <div className="bg-[#f0ede6] rounded-2xl p-8 sm:p-10 h-full">
              <div className="w-11 h-11 rounded-xl bg-[#e6e1d6] flex items-center justify-center mb-6">
                <Target className="w-5 h-5 text-[#888888]" strokeWidth={1.5} />
              </div>
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                Our Mission
              </p>
              <h3
                className="font-heading font-bold text-[#111111] mb-4"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
              >
                Deliver World-Class Results
              </h3>
              <p className="text-[#555555] text-[14px] leading-relaxed">
                We are a full-service contracting and production company — your partners
                from first concept through final handover. Our commitment extends to
                building lasting relationships based on trust, reliability, and mutual
                growth, delivering fit-out, fabrication, MEP, and print solutions that
                exceed expectations.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="bg-[#f0ede6] rounded-2xl p-8 sm:p-10 h-full">
              <div className="w-11 h-11 rounded-xl bg-[#e6e1d6] flex items-center justify-center mb-6">
                <Eye className="w-5 h-5 text-[#888888]" strokeWidth={1.5} />
              </div>
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
                Our Vision
              </p>
              <h3
                className="font-heading font-bold text-[#111111] mb-4"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
              >
                Lead the Region
              </h3>
              <p className="text-[#555555] text-[14px] leading-relaxed">
                To be the leading full-service advertising and branding company in the
                GCC region — recognised for our innovation, craftsmanship, and the
                lasting impact we create for clients and communities.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3">
        <FadeUp>
          <div className="max-w-7xl mx-auto bg-[#f0ede6] rounded-3xl px-8 sm:px-12 lg:px-16 2xl:px-20 py-12 sm:py-14">
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.4em] uppercase text-[#AAAAAA] mb-3">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
              Our Journey
            </p>
            <h2
              className="font-display font-bold text-[#111111] mb-10"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Milestones
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {milestones.map((m) => (
                <div key={m.year}>
                  <p className="font-heading font-bold text-[#111111] text-2xl leading-none mb-2">
                    {m.year}
                  </p>
                  <div className="w-6 h-px bg-[#CCCCCC] mb-3" />
                  <p className="text-[#AAAAAA] text-[11px] leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>


      {/* ── CTA ── */}
      <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-14 py-3 pb-4">
        <FadeUp>
          <div
            className="max-w-7xl mx-auto rounded-3xl px-8 sm:px-12 lg:px-16 2xl:px-20 py-14 sm:py-16"
            style={{ backgroundColor: "#111111" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <h2
                className="font-display font-bold text-white leading-[1.08]"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
              >
                Ready to Work
                <br />
                Together?
              </h2>
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
        </FadeUp>
      </section>
    </div>
  );
}
