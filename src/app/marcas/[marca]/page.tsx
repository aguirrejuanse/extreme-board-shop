import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  brandSlug,
  getAllBrands,
  getBrandBySlug,
  getProductsByBrand,
} from "@/data/products";
import ProductCard from "@/components/product-card";

type Params = { marca: string };

export function generateStaticParams() {
  return getAllBrands().map((brand) => ({ marca: brandSlug(brand) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { marca } = await params;
  const brand = getBrandBySlug(marca);

  if (!brand) {
    return { title: "Marca no encontrada" };
  }

  return {
    title: `${brand} en Mendoza y San Juan`,
    description: `Todos los productos ${brand} disponibles en Extreme Board Shop. Distribuidor oficial, retiro en local y envíos a todo el país.`,
    alternates: {
      canonical: `/marcas/${marca}`,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { marca } = await params;
  const brand = getBrandBySlug(marca);

  if (!brand) {
    notFound();
  }

  const brandProducts = getProductsByBrand(brand);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/marcas" className="hover:text-paper">
          Marcas
        </Link>{" "}
        / <span className="text-paper">{brand}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold tracking-[0.3em] text-acid uppercase">
          Marca oficial
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
          {brand}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim">
          {brandProducts.length}{" "}
          {brandProducts.length === 1 ? "producto disponible" : "productos disponibles"}{" "}
          con retiro en local y envíos a todo el país.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brandProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
