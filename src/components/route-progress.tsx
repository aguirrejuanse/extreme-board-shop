"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Top navigation progress bar. Since App Router has no global "navigation
 * started" event, we kick the bar off on clicks on internal anchors and
 * complete it when the pathname actually changes. Purely cosmetic — pages
 * are static, so this mostly shows on slower connections.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;
    function stop() {
      clearTimeout(showTimer);
      clearTimeout(safetyTimer);
      setVisible(false);
    }
    function start(href: string) {
      const url = new URL(href, window.location.href);
      if (url.origin !== location.origin) return;
      stop();
      if (url.pathname === location.pathname && url.search === location.search) return;
      showTimer = setTimeout(() => setVisible(true), 180);
      safetyTimer = setTimeout(stop, 8000);
    }
    function onNavigate(event: Event) {
      start((event as CustomEvent<string>).detail);
    }
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      start(anchor.href);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") stop();
    }
    stop();
    window.addEventListener("store:navigate", onNavigate);
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", stop);
    window.addEventListener("hashchange", stop);
    window.addEventListener("pagehide", stop);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("store:navigate", onNavigate);
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", stop);
      window.removeEventListener("hashchange", stop);
      window.removeEventListener("pagehide", stop);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pathname, searchParams]);

  return (
    <div aria-hidden="true" data-visible={visible} className="route-progress pointer-events-none fixed top-0 left-0 z-[100] h-0.5 w-full overflow-hidden">
      <div className="h-full w-1/3 bg-acid" />
    </div>
  );
}
