"use client";

import { useState } from "react";

export type BrandClient = { name: string; logoUrl: string };

function BrandLogo({ name, logoUrl }: BrandClient) {
  const [hovered, setHovered] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="shrink-0 flex items-center justify-center w-28 h-14 sm:w-36 sm:h-16 lg:w-44 lg:h-20 3xl:w-52 3xl:h-24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {errored ? (
        <span
          className="text-[13px] sm:text-[16px] font-bold tracking-widest uppercase select-none"
          style={{ color: hovered ? "#111111" : "#CCCCCC", transition: "color 0.3s" }}
        >
          {name}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          className="object-contain max-h-11 sm:max-h-14 lg:max-h-18 3xl:max-h-22 w-auto transition-all duration-300"
          style={{
            filter: hovered ? "grayscale(0) opacity(1)" : "grayscale(1) opacity(0.3)",
          }}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

function MarqueeSkeleton() {
  return (
    <div className="flex items-center gap-10 sm:gap-20 lg:gap-24 w-full sm:flex-1 min-w-0 overflow-hidden px-6 sm:px-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 h-9 sm:h-12 lg:h-14 rounded-md bg-[#E8E4DC] animate-pulse"
          style={{ width: `${[90, 108, 80, 120, 98, 84][i]}px`, opacity: 1 - i * 0.12 }}
        />
      ))}
    </div>
  );
}

export function BrandMarquee({ clients }: { clients: BrandClient[] }) {
  if (clients.length === 0) return <MarqueeSkeleton />;

  // With few logos, skip the marquee and just show them in a static row.
  // overflow-x-auto is a safety net: on the narrowest phones the full set may
  // still not fit even at the smaller mobile logo size, so it scrolls instead
  // of silently clipping logos out of view.
  if (clients.length < 6) {
    return (
      <div className="flex items-center gap-10 sm:gap-20 lg:gap-24 w-full sm:flex-1 min-w-0 overflow-x-auto px-6 sm:px-2">
        {clients.map((b) => (
          <BrandLogo key={b.name} name={b.name} logoUrl={b.logoUrl} />
        ))}
      </div>
    );
  }

  // Enough logos — double for seamless infinite scroll
  const looped = [...clients, ...clients];

  return (
    <div className="overflow-hidden w-full sm:flex-1 min-w-0">
      <div
        className="flex items-center animate-marquee"
        style={{ animationDuration: `${Math.max(20, clients.length * 2.5)}s`, gap: "4rem" }}
      >
        {looped.map((b, i) => (
          <BrandLogo key={i} name={b.name} logoUrl={b.logoUrl} />
        ))}
      </div>
    </div>
  );
}
