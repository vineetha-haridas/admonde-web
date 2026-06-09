"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ACCENT = "#72b043";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "/portfolio" },
  { label: "CAREERS", href: "/careers" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 2xl:px-28">
        <div className="flex items-center justify-between h-20 xl:h-24">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/Admonde Black.png"
              alt="Admonde"
              width={180}
              height={40}
              className="h-11 sm:h-12 xl:h-14 2xl:h-16 3xl:h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 text-[11.5px] xl:text-[12.5px] font-medium tracking-[0.14em] transition-colors duration-200",
                  isActive(link.href)
                    ? "text-[#111111]"
                    : "text-[#999999] hover:text-[#111111]"
                )}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-5 right-5 h-[1.5px] transition-all duration-300 origin-left",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{ backgroundColor: ACCENT }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — filled */}
          <div className="hidden lg:block shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase bg-[#72b043] text-white px-5 py-2.5 rounded-lg hover:bg-[#5a9035] transition-colors duration-300"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden text-[#555555] p-2 bg-transparent border-0 cursor-pointer transition-colors hover:text-[#111111]">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-[#EEEEEE] w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="px-7 py-6 border-b border-[#EEEEEE]">
                  <span className="text-[20px] font-bold text-[#111111] tracking-[0.08em] font-display">
                    ADMONDÉ
                  </span>
                  <p className="text-[7px] tracking-[0.3em] text-[#AAAAAA] uppercase mt-0.5">
                    Advertising &amp; Printing
                  </p>
                </div>
                <nav className="flex-1 overflow-y-auto py-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center px-7 py-4 text-[12px] font-medium tracking-[0.12em] transition-colors",
                        isActive(link.href)
                          ? "text-[#111111]"
                          : "text-[#888888] hover:text-[#111111]"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="px-7 py-6 border-t border-[#EEEEEE]">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full border border-[#111111] text-[#111111] font-semibold text-[12px] tracking-[0.15em] uppercase py-3.5 hover:bg-[#111111] hover:text-white transition-all duration-300"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
