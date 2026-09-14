"use client";

import { useEffect, useState } from "react";

/**
 * Zustand's persisted store starts empty on the server and only fills in
 * from localStorage after mount. Components that render cart-derived counts
 * (e.g. the header badge) use this hook to avoid a hydration mismatch by
 * rendering the "empty" state until the client has caught up.
 */
export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
