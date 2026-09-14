import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight text-paper">
            EXTREME <span className="text-acid">BOARD SHOP</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-dim">
            Skate, snow y streetwear con identidad cuyana. Desde Mendoza y San
            Juan para toda la Argentina.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-acid uppercase">
            Categorías
          </h2>
          <ul className="mt-4 space-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/productos/${category.slug}`}
                  className="text-sm text-paper-dim transition-colors hover:text-paper"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-acid uppercase">
            Locales
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-paper-dim">
            <li>Mendoza Capital — Av. San Martín 1234</li>
            <li>San Juan Capital — Av. Libertador 890</li>
            <li>Lun a Sáb, 10 a 20 hs</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-acid uppercase">
            Ayuda
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/carrito" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Mi carrito
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Finalizar compra
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-6 sm:px-6">
        <p className="mx-auto max-w-7xl text-xs text-paper-dim">
          © {new Date().getFullYear()} Extreme Board Shop. Sitio demo —
          catálogo y precios de ejemplo, sin procesamiento de pagos real.
        </p>
      </div>
    </footer>
  );
}
