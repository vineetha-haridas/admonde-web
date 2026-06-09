"use client";

import { useState } from "react";

export type BrandClient = { name: string; logoUrl: string };

function BrandLogo({ name, logoUrl }: BrandClient) {
  const [hovered, setHovered] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="shrink-0 flex items-center justify-center w-24 h-10 3xl:w-32 3xl:h-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {errored ? (
        <span
          className="text-[11px] font-bold tracking-widest uppercase select-none"
          style={{ color: hovered ? "#111111" : "#CCCCCC", transition: "color 0.3s" }}
        >
          {name}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          className="object-contain max-h-[38px] w-auto transition-all duration-300"
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
    <div className="flex items-center gap-16 flex-1 min-w-0 overflow-hidden px-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 h-6 rounded-md bg-[#E8E4DC] animate-pulse"
          style={{ width: `${[72, 88, 64, 96, 80, 68][i]}px`, opacity: 1 - i * 0.12 }}
        />
      ))}
    </div>
  );
}

export function BrandMarquee({ clients }: { clients: BrandClient[] }) {
  if (clients.length === 0) return <MarqueeSkeleton />;

  // With few logos, skip the marquee and just show them in a static row
  if (clients.length < 6) {
    return (
      <div className="flex items-center gap-16 flex-1 min-w-0 overflow-hidden px-2">
        {clients.map((b) => (
          <BrandLogo key={b.name} name={b.name} logoUrl={b.logoUrl} />
        ))}
      </div>
    );
  }

  // Enough logos — double for seamless infinite scroll
  const looped = [...clients, ...clients];

  return (
    <div className="overflow-hidden flex-1 min-w-0">
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
