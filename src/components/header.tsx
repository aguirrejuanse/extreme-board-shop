"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/categories";
import { useCartStore, cartCount } from "@/store/cart-store";
import { useHasHydrated } from "@/hooks/use-hydrated";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const hydrated = useHasHydrated();
  const count = hydrated ? cartCount(items) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="bg-acid text-ink">
        <p className="mx-auto max-w-7xl overflow-hidden px-4 py-1.5 text-center text-[11px] font-semibold tracking-[0.18em] uppercase sm:text-xs">
          Envíos a Mendoza, San Juan y todo el país · Retirá en nuestro local de Ciudad
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-2xl leading-none tracking-tight text-paper sm:text-3xl">
            EXTREME
          </span>
          <span className="font-display text-2xl leading-none tracking-tight text-acid sm:text-3xl">
            BOARD SHOP
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/productos/${category.slug}`}
              className="text-sm font-semibold tracking-wide text-paper-dim uppercase transition-colors hover:text-acid"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/carrito"
            aria-label={`Carrito, ${count} ${count === 1 ? "producto" : "productos"}`}
            className="relative inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-acid hover:text-acid"
          >
            <CartIcon />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blaze px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-paper lg:hidden"
          >
            <span className="sr-only">Menú</span>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-ink px-4 pb-4 lg:hidden">
          <ul className="flex flex-col divide-y divide-line">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/productos/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm font-semibold tracking-wide text-paper uppercase hover:text-acid"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-4 w-4"
    >
      <path
        d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="21" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
