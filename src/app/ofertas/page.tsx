import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getBrands, getSaleProducts } from "@/data/products";
import ProductGridFilterable from "@/components/product-grid-filterable";
import { CatalogSkeleton } from "@/components/store-skeletons";

export const metadata: Metadata = {
  title: "Ofertas y descuentos en skate, snow y streetwear",
  description:
    "Todos los productos en oferta de Extreme Board Shop: tablas, ropa, calzado y accesorios con descuento. Envíos a todo el país y retiro en local.",
  alternates: {
    canonical: "/ofertas",
  },
};

export default function OfertasPage() {
  const saleProducts = getSaleProducts();
  const brands = getBrands(saleProducts);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        / <span className="text-paper">Sale</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold tracking-[0.3em] text-blaze uppercase">
          Últimas unidades
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
          Sale
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim">
          Productos con descuento real, ordenados de mayor a menor rebaja.
          Mismo stock que en el local — cuando se acaba, se acabó.
        </p>
      </header>

      {saleProducts.length === 0 ? (
        <p className="rounded-2xl border border-line bg-ink-soft p-10 text-center text-sm text-paper-dim">
          No hay ofertas activas en este momento. Volvé pronto.
        </p>
      ) : (
        <Suspense fallback={<CatalogSkeleton gridOnly />}>
          <ProductGridFilterable products={saleProducts} brands={brands} />
        </Suspense>
      )}
    </section>
  );
}
