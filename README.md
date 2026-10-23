# Extreme Board Shop

Storefront demo for a board shop — skate, snowboard, apparel and
footwear catalog with a persistent cart and a simulated checkout flow.

**Live demo:** https://extreme-board-shop.vercel.app

## What it does

- **Full storefront** — home, category listings, product detail, cart,
  checkout form and order confirmation.
- **Persistent cart** — survives reloads via `localStorage`; add items
  from any page and the header badge stays in sync.
- **Simulated checkout** — complete order flow end to end without a
  backend or payment gateway.
- **SEO-ready** — statically generated catalog pages, `sitemap.ts`,
  `robots.ts`, Open Graph and Twitter card images.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Zustand · Playwright · npm

## Engineering notes

- **Zustand + `persist` for the cart** — the cart is read and written
  from unrelated places (header badge, product page, cart, checkout).
  Zustand lets each component subscribe only to the slice it needs, with
  no Provider wrapper and no Context + `useReducer` boilerplate. `persist`
  handles `localStorage` sync for free.
- **Server Components by default** — listing and detail pages are
  statically generated (`generateStaticParams`); client components are
  used only where interactivity demands it.
- **Hydration-safe cart** — a `useHydrated` hook prevents SSR/CSR markup
  mismatches on cart-dependent UI.
- **Design tokens** — brand colors live as CSS variables in
  `globals.css`, mapped to Tailwind via `@theme inline`; one edit retints
  the whole site.

## Getting started

No database, no environment variables, no API keys.

```bash
npm install
npm run dev      # http://localhost:3000 (falls back to 3001 if busy)
```

Other scripts: `npm run build` (production build), `npm run lint`,
`npm run test:e2e` (Playwright).

## Project layout

```
src/
  app/
    page.tsx                          Home
    productos/[categoria]/page.tsx    Category listing
    productos/[categoria]/[slug]/     Product detail
    carrito/page.tsx                  Cart
    checkout/page.tsx                 Simulated checkout form
    checkout/confirmacion/page.tsx    Order confirmation
    sitemap.ts / robots.ts            SEO metadata routes
    globals.css                       Design tokens
  components/                         Header, footer, cards, forms
  data/
    categories.ts                     Fixed category list
    products.ts                       Sample product catalog
  store/
    cart-store.ts                     Cart state (Zustand + persist)
  lib/                                Types, formatting, order helpers
  hooks/
    use-hydrated.ts                   localStorage hydration guard
```
