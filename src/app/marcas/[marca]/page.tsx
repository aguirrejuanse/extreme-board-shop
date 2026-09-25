import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  brandSlug,
  getAllBrands,
  getBrandBySlug,
  getBrandImage,
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

      <header className="relative mb-10 overflow-hidden rounded-2xl border border-line">
        <Image
          src={getBrandImage(brand)}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="relative max-w-2xl px-6 pt-32 pb-8 sm:px-8 sm:pt-40">
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
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brandProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
