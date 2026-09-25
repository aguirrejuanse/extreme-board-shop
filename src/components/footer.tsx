import Link from "next/link";
import { categories } from "@/data/categories";
import NewsletterForm from "@/components/newsletter-form";

export default function Footer() {
  return (
    <footer className="defer-render border-t border-line bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight text-paper">
            EXTREME <span className="text-acid">BOARD SHOP</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-dim">
            Skate, snow y streetwear con identidad cuyana. Desde Mendoza y San
            Juan para toda la Argentina.
          </p>
          <div className="mt-5 max-w-xs">
            <p className="text-xs font-bold tracking-[0.18em] text-acid uppercase">
              Novedades y ofertas
            </p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
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
            Tienda
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/marcas" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Marcas
              </Link>
            </li>
            <li>
              <Link href="/ofertas" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Sale
              </Link>
            </li>
            <li>
              <Link href="/locales" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Locales
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Mi carrito
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-acid uppercase">
            Ayuda
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/ayuda#envios" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Envíos
              </Link>
            </li>
            <li>
              <Link href="/ayuda#devoluciones" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Cambios y devoluciones
              </Link>
            </li>
            <li>
              <Link href="/ayuda#arrepentimiento" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Botón de arrepentimiento
              </Link>
            </li>
            <li>
              <Link href="/ayuda#faq" className="text-sm text-paper-dim transition-colors hover:text-paper">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <a
                href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-paper-dim transition-colors hover:text-paper"
              >
                Defensa del Consumidor
              </a>
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
