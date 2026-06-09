import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Store, Hammer, Wrench, Printer, Calendar, Truck, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeUp } from "@/components/home/FadeUp";

export const metadata: Metadata = {
  title: "Services | Admonde",
  description:
    "Carpentry & fabrication, interior fit-out, MEP contracting, printing, events, and HSE branding — complete project solutions by Admonde.",
};

const services: {
  Icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
  href: string;
  image: string;
}[] = [
  {
    Icon: Store,
    title: "Interior Fit-Out",
    desc: "Complete interior contracting from concept to handover. Retail stores, offices, showrooms, and commercial spaces built to specification.",
    features: [
      "Retail & Shop Fit-Out",
      "Office & Corporate Interiors",
      "Showroom & Exhibition Fit-Out",
      "False Ceiling & Partition Works",
    ],
    href: "/services/interior-fitout",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80",
  },
  {
    Icon: Hammer,
    title: "Carpentry & Fabrication",
    desc: "Premium custom carpentry, joinery, and metal fabrication. Bespoke furniture, shopfittings, and structural builds crafted to precision.",
    features: [
      "Custom Joinery & Furniture",
      "Metal Works & Welding",
      "Shopfittings & Display Units",
      "Structural Fabrication",
    ],
    href: "/services/carpentry-fabrication",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
  },
  {
    Icon: Wrench,
    title: "MEP Works",
    desc: "Full mechanical, electrical, and plumbing contracting for fit-out and construction projects across commercial and industrial sectors.",
    features: [
      "Electrical Installation & Wiring",
      "Plumbing & Drainage Systems",
      "HVAC & Mechanical Works",
      "Fire Fighting & Safety Systems",
    ],
    href: "/services/mep-works",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&q=80",
  },
  {
    Icon: Printer,
    title: "Print & Production",
    desc: "Premium print collateral at any volume. Brochures, packaging, stationery, and high-impact marketing materials produced to the highest standard.",
    features: [
      "Brochures, Folders & Booklets",
      "Packaging & Food Boxes",
      "Business Stationery & Calendars",
      "Labels, Tags & Danglers",
    ],
    href: "/services/printing-branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
  },
  {
    Icon: Calendar,
    title: "Events & Exhibitions",
    desc: "Large-scale event builds that command attention. From exhibition booths and mall podiums to stadium advertising and full event fabrication.",
    features: [
      "Exhibition Booths & Mall Podiums",
      "Stadium & Arena Advertising",
      "Outdoor & Indoor Stages",
      "Carpentry & Metal Works",
    ],
    href: "/services/exhibition-booths",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  },
  {
    Icon: Truck,
    title: "Fleet & Uniform Branding",
    desc: "Brand consistency on every surface. Vehicle wraps, branded uniforms, lanyards, ID cards, and promotional merchandise.",
    features: [
      "Vehicle Wraps & Fleet Graphics",
      "Branded Uniforms & Coveralls",
      "Lanyard & ID Cards",
      "Promo T-Shirts & Caps",
    ],
    href: "/services/fleet-uniform",
    image: "https://images.unsplash.com/photo-1416339684178-3a239570f315?w=900&q=80",
  },
  {
    Icon: ShieldCheck,
    title: "HSE & Safety Branding",
    desc: "Complete safety branding solutions for workplaces. Compliant safety signage, helmet branding, and high-visibility reflective workwear.",
    features: [
      "Safety Signs & Boards",
      "Safety Helmet Branding",
      "Reflective Vest Branding",
      "Reflective Jacket Branding",
    ],
    href: "/services/hse-safety",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  },
];

export default function ServicesPage() {
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group bg-[#f0ede6] rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3">
                    <div
                      className="w-full overflow-hidden rounded-xl"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div className="px-6 pb-7 flex flex-col flex-1 gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#e6e1d6] flex items-center justify-center">
                      <s.Icon
                        className="w-5 h-5 text-[#888888] group-hover:text-[#111111] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-[#111111] text-[15px] sm:text-[16px] mb-2">
                        {s.title}
                      </h3>
                      <p className="text-[#666666] text-[13px] leading-relaxed mb-4">{s.desc}</p>
                      <ul className="flex flex-col gap-1.5">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-[12px] text-[#888888]"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#BBBBBB] shrink-0" />
                            {f}
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
            ))}
          </div>
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
