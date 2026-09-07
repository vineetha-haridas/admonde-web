"use client";

import { useEffect, useState } from "react";

export function ServiceImageCarousel({
  images,
  alt,
  className,
  bgColor,
  intervalMs = 4000,
}: {
  images: string[];
  alt: string;
  className?: string;
  bgColor?: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return <div className={className} style={{ background: bgColor }} />;
  }

  return (
    <div className={className} style={{ background: bgColor, position: "relative", overflow: "hidden" }}>
      {images.map((url, i) => (
        <div
          key={url + i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          {/* Blurred, filled backdrop — never leaves dead space, but the real
              photo (below) is always shown in full, uncropped. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            aria-hidden
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "blur(40px) brightness(0.55)", transform: "scale(1.15)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
