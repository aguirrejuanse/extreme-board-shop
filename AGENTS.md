# Extreme Board Shop

Next.js 15 (App Router) storefront with Tailwind CSS 4. Spanish (es-AR) UI copy.

## Commands

- `npm run dev` — dev server (falls back to port 3001 if 3000 is busy)
- `npm run build` — production build; must pass before opening a PR
- `npm run lint`

## Conventions

- **Colors**: defined as CSS variables in `src/app/globals.css` and mapped to Tailwind tokens via `@theme inline`. `acid` is the neon pink from the logo (`#ff2d8c`), `blaze` is the orange (`#ff7a1f`). Changing the variables retints the whole site, but also search for hardcoded `rgba(` values (gradients, `box-shadow`) that would keep the old color.
- **Buttons**: Tailwind 4 does not set a pointer cursor on `<button>`. Every button needs an explicit `cursor-pointer`, plus `disabled:cursor-not-allowed` when it can be disabled.
- **Brand assets**: `public/logo.jpg` (header), `src/app/icon.jpg` (favicon), `src/app/opengraph-image.png` and `src/app/twitter-image.png` (social previews). Next.js picks the `src/app` ones up by filename.

## Git

- Default branch: `main`. Open PRs against `main` from a feature branch, never commit to `main` directly.
- Conventional commits.
