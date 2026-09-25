"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { useCartStore, cartCount } from "@/store/cart-store";
import { useHasHydrated } from "@/hooks/use-hydrated";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/payments";
import { formatPrice } from "@/lib/format";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuTrigger.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  const [bump, setBump] = useState(false);
  const items = useCartStore((state) => state.items);
  const hydrated = useHasHydrated();
  const count = hydrated ? cartCount(items) : 0;

  // Pulse the badge when the cart grows. The ref stays null until hydration
  // finishes so a pre-existing persisted cart doesn't pop on page load.
  const prevCountRef = useRef<number | null>(null);
  useEffect(() => {
    if (!hydrated) return;
    if (prevCountRef.current !== null && count > prevCountRef.current) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 450);
      prevCountRef.current = count;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = count;
  }, [count, hydrated]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="bg-acid text-ink">
        <p className="mx-auto max-w-7xl overflow-hidden px-4 py-1.5 text-center text-[11px] font-semibold tracking-[0.18em] uppercase sm:text-xs">
          Envío gratis desde {formatPrice(FREE_SHIPPING_THRESHOLD)} · Hasta 12
          cuotas sin interés · Retiro gratis en local
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.jpg"
            alt="Extreme Board Shop"
            width={44}
            height={44}
            priority
            className="rounded-full"
          />
          <span className="font-display text-xl leading-none tracking-tight text-paper sm:text-3xl">
            EXTREME <span className="text-acid">BOARD SHOP</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/productos/${category.slug}`}
              className="text-sm font-semibold tracking-wide text-paper-dim uppercase transition-colors hover:text-acid"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/marcas"
            className="text-sm font-semibold tracking-wide text-paper-dim uppercase transition-colors hover:text-acid"
          >
            Marcas
          </Link>
          <Link
            href="/ofertas"
            className="text-sm font-semibold tracking-wide text-blaze uppercase transition-colors hover:text-paper"
          >
            Sale
          </Link>
          <Link
            href="/locales"
            className="text-sm font-semibold tracking-wide text-paper-dim uppercase transition-colors hover:text-acid"
          >
            Locales
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {/* Live region for screen readers: the visible badge is only
              rendered when count > 0, so announcements need a persistent,
              visually-hidden element outside the link's accessible name. */}
          <span aria-live="polite" role="status" className="sr-only">
            {count > 0
              ? `${count} ${count === 1 ? "producto" : "productos"} en el carrito`
              : ""}
          </span>
          <Link
            href="/carrito"
            aria-label={`Carrito, ${count} ${count === 1 ? "producto" : "productos"}`}
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-acid hover:text-acid"
          >
            <CartIcon />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span
                className={`absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blaze px-1 text-[11px] font-bold text-ink ${
                  bump ? "animate-badge-pop" : ""
                }`}
              >
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            ref={menuTrigger}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="motion-press inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-paper lg:hidden"
          >
            <span className="sr-only">Menú</span>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className="mobile-menu lg:hidden" data-open={menuOpen} inert={!menuOpen} aria-hidden={!menuOpen}>
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="bg-ink">
          <ul className="flex flex-col divide-y divide-line border-t border-line px-4 pb-4">
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
            {[
              { href: "/marcas", label: "Marcas" },
              { href: "/ofertas", label: "Sale" },
              { href: "/locales", label: "Locales" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm font-semibold tracking-wide text-paper uppercase hover:text-acid"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
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
