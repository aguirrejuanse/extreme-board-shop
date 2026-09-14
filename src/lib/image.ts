/**
 * Generates a branded placeholder image as an inline SVG data URI.
 *
 * This project doesn't have real product photography yet, so instead of
 * pulling random stock photos from a third-party service (picsum.photos,
 * unsplash, etc. — which returned completely unrelated images like
 * highways or landscapes), we render a small on-brand placeholder locally:
 * a solid/gradient background using the site's own palette (ink + acid)
 * and the product name centered as text. No network request, no external
 * dependency, 100% deterministic per product.
 *
 * The `seed` is reused to deterministically pick which background tone to
 * use, so the same product always renders with the same placeholder.
 */

const PALETTE_VARIANTS = [
  { from: "#0b0b0c", to: "#17171a", text: "#d7ff3b" }, // ink -> ink-soft, acid text
  { from: "#17171a", to: "#0b0b0c", text: "#a8cc1f" }, // ink-soft -> ink, acid-dim text
  { from: "#0b0b0c", to: "#1f2405", text: "#d7ff3b" }, // ink -> olive-black, acid text
] as const;

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Greedily wraps `text` into lines that fit within `maxChars` characters
 * (an approximation of pixel width, good enough for short product names).
 */
function wrapLines(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  return lines;
}

/**
 * Builds a deterministic branded placeholder (SVG data URI) for a product.
 *
 * @param seed  Stable identifier (e.g. product.imageSeed) used to pick the
 *              background tone, so the same product always looks the same.
 * @param width  Rendered width in px.
 * @param height Rendered height in px.
 * @param label  Text to center in the placeholder — usually the product
 *               name, optionally prefixed with the brand.
 */
export function placeholderImage(
  seed: string,
  width = 800,
  height = 800,
  label = ""
): string {
  const variant = PALETTE_VARIANTS[hashSeed(seed) % PALETTE_VARIANTS.length];
  const gradientId = `g-${hashSeed(seed)}`;
  const fontSize = Math.max(14, Math.round(Math.min(width, height) * 0.055));
  const maxChars = Math.max(8, Math.round(width / (fontSize * 0.55)));
  const lines = label ? wrapLines(label, maxChars).slice(0, 4) : [];
  const lineHeight = fontSize * 1.3;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  const textSvg = lines
    .map(
      (line, i) =>
        `<text x="50%" y="${startY + i * lineHeight}" text-anchor="middle" dominant-baseline="middle" font-family="Archivo, Helvetica, Arial, sans-serif" font-weight="700" font-size="${fontSize}" fill="${variant.text}">${escapeXml(
          line
        )}</text>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${variant.from}" />
        <stop offset="100%" stop-color="${variant.to}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#${gradientId})" />
    <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="${variant.text}" stroke-opacity="0.15" stroke-width="${Math.max(
      2,
      Math.round(width * 0.01)
    )}" />
    ${textSvg}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
