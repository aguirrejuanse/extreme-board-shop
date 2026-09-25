"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_INTERVAL_MS = 6000;
const FADE_MS = 500;

/**
 * Crossfading background for the home hero. Decorative only (aria-hidden).
 *
 * The first slide is the LCP candidate, so it renders as a static base
 * layer: eager, high fetch priority, and — critically — without any
 * opacity transition that would delay its paint. Rotated slides fade in
 * (and out) as overlays on top of it. Under prefers-reduced-motion the
 * rotation is disabled and only the base layer is ever shown.
 */
export default function HeroCarousel({ images }: { images: string[] }) {
  const [{ current, leaving }, setDisplay] = useState<{
    current: number;
    leaving: number | null;
  }>({ current: 0, leaving: null });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;

    function syncMotion() {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      if (preference.matches) {
        setDisplay({ current: 0, leaving: null });
      } else if (images.length > 1) {
        timer = setInterval(() => {
          setDisplay((display) => ({
            current: (display.current + 1) % images.length,
            leaving: display.current,
          }));
          clearTimeout(fadeTimer);
          fadeTimer = setTimeout(
            () => setDisplay((display) => ({ ...display, leaving: null })),
            FADE_MS
          );
        }, SLIDE_INTERVAL_MS);
      }
    }
    syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      preference.removeEventListener("change", syncMotion);
    };
  }, [images.length]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src={images[0]}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      {/* leaving === 0 needs no overlay: the base layer is already showing it */}
      {leaving !== null && leaving !== 0 && leaving !== current && (
        <Image
          key={`leaving-${leaving}`}
          src={images[leaving]}
          alt=""
          fill
          sizes="100vw"
          className="hero-fade-out object-cover"
        />
      )}
      {current !== 0 && (
        <Image
          key={`current-${current}`}
          src={images[current]}
          alt=""
          fill
          sizes="100vw"
          className="hero-fade-in object-cover"
        />
      )}
    </div>
  );
}
