"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type HeroProps = {
  imageUrl: string;
  label: string;
  headline: string;
  subtext: string;
};

export function HeroSection({ imageUrl, label, headline, subtext }: HeroProps) {
  const headlineLines = headline.split("\n").filter(Boolean);
  const DELAYS = [0.1, 0.18, 0.26, 0.34, 0.42];

  return (
    <section className="px-3 sm:px-5 lg:px-8 2xl:px-10 3xl:px-16 pt-20 sm:pt-24 pb-3">
      <div
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#f0ede6" }}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:max-h-screen">

          {/* Left: Content */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 2xl:px-20 3xl:px-28 py-10 sm:py-14 lg:py-20">

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#AAAAAA] mb-5 sm:mb-7 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#72b043]" />
              {label}
            </motion.p>

            <h1
              className="font-display font-bold text-[#111111] leading-[1.04] mb-4 sm:mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 5rem)" }}
            >
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: DELAYS[i] ?? 0.1, ease: EASE }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="text-[#999999] text-[13px] leading-relaxed max-w-sm 2xl:max-w-md 3xl:max-w-lg mb-8 sm:mb-10"
            >
              {subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 bg-[#111111] text-white text-[11px] font-semibold tracking-[0.1em] uppercase px-6 py-3.5 rounded-xl hover:bg-[#000000] transition-colors duration-300"
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
            className="h-52 sm:h-80 lg:h-full p-4 sm:p-6"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Admonde Creative Studio"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="w-full h-full bg-[#E8E4DC] animate-pulse" />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
