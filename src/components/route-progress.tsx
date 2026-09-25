"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Top navigation progress bar. Since App Router has no global "navigation
 * started" event, we kick the bar off on clicks on internal anchors and
 * complete it when the pathname actually changes. Purely cosmetic — pages
 * are static, so this mostly shows on slower connections.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pendingRef = useRef(false);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTrickle() {
    if (trickleRef.current) clearInterval(trickleRef.current);
    trickleRef.current = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 15 : p));
    }, 400);
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest("a");
      const href = anchor?.getAttribute("href");
      if (
        !href ||
        !href.startsWith("/") ||
        href === pathname ||
        anchor?.target === "_blank"
      ) {
        return;
      }
      pendingRef.current = true;
      setVisible(true);
      setProgress(20);
      startTrickle();
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    if (trickleRef.current) clearInterval(trickleRef.current);
    setProgress(100);
    const timer = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 350);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[100] h-0.5 bg-acid shadow-[0_0_8px_var(--acid)] transition-[width,opacity] duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: `${progress}%` }}
    />
  );
}
