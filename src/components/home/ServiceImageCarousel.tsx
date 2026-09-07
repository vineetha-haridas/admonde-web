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
    <div className={className} style={{ background: bgColor, position: "relative" }}>
      {images.map((url, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={url + i}
          src={url}
          alt={alt}
          loading={i === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
