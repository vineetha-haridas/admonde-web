import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, EMAIL_HREF, ADDRESS_LINE1, ADDRESS_CITY, ADDRESS_COUNTRY } from "@/lib/contact";

const footerServices = [
  { label: "Interior Fit-Out", href: "/services/interior-fitout" },
  { label: "Carpentry & Fabrication", href: "/services/carpentry-fabrication" },
  { label: "MEP Works", href: "/services/mep-works" },
  { label: "Print & Production", href: "/services/printing-branding" },
  { label: "Events & Exhibitions", href: "/services/exhibition-booths" },
];

const footerCompany = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/about#process" },
  { label: "Projects", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EEEEEE] mt-4">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 2xl:px-28 py-14 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1: Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="block mb-5">
              <Image src="/Admonde Black.png" alt="Admonde" width={180} height={40} className="h-7 w-auto object-contain" />
            </Link>
            <p className="text-[#AAAAAA] text-[12px] leading-relaxed mb-6 max-w-[220px]">
              Carpentry, fit-out, MEP contracting, and print production across the GCC since 1996.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E0DDD8] flex items-center justify-center text-[#BBBBBB] hover:text-[#111111] hover:border-[#CCCCCC] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E0DDD8] flex items-center justify-center text-[#BBBBBB] hover:text-[#111111] hover:border-[#CCCCCC] transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E0DDD8] flex items-center justify-center text-[#BBBBBB] hover:text-[#111111] hover:border-[#CCCCCC] transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AAAAAA] mb-5">
              Services
            </p>
            <nav className="flex flex-col gap-3">
              {footerServices.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] text-[#888888] hover:text-[#111111] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Company */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AAAAAA] mb-5">
              Company
            </p>
            <nav className="flex flex-col gap-3">
              {footerCompany.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] text-[#888888] hover:text-[#111111] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AAAAAA] mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={PHONE_HREF} className="text-[12px] text-[#888888] hover:text-[#111111] transition-colors duration-200">{PHONE_NUMBER}</a>
              <a href={EMAIL_HREF} className="text-[12px] text-[#888888] hover:text-[#111111] transition-colors duration-200">{EMAIL}</a>
              <p className="text-[12px] text-[#888888] leading-relaxed">
                {ADDRESS_LINE1}<br />{ADDRESS_CITY}, {ADDRESS_COUNTRY}
              </p>
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AAAAAA] mb-5">
              Newsletter
            </p>
            <p className="text-[12px] text-[#AAAAAA] leading-relaxed mb-4">
              Stay updated with our latest projects and offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-[#ECEAE5] text-[#111111] placeholder-[#BBBBBB] text-[12px] px-3.5 py-2.5 rounded-lg border border-[#E0DDD8] focus:outline-none focus:border-[#CCCCCC] transition-colors duration-200"
              />
              <button
                type="button"
                className="bg-[#72b043] text-white p-2.5 rounded-lg hover:bg-[#5a9035] transition-colors duration-200 shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 2xl:px-28 py-4">
          <p className="text-center text-[11px] text-[#BBBBBB] tracking-wide">
            © {new Date().getFullYear()} Admonde. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
