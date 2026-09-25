/**
 * Canonical site URL, shared across metadata, robots.txt, sitemap.xml and
 * structured data (JSON-LD) so it only has to be updated in one place.
 */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://extreme-board-shop.vercel.app"
).origin;
