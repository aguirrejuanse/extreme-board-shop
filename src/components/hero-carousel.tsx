"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_INTERVAL_MS = 5000;

/**
 * Crossfading background for the home hero. Decorative only (aria-hidden);
 * the rotation pauses entirely under prefers-reduced-motion, showing the
 * first slide.
 */
export default function HeroCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      SLIDE_INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
