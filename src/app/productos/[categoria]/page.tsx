import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getBrands, getProductsByCategory } from "@/data/products";
import ProductGridFilterable from "@/components/product-grid-filterable";
import { CatalogSkeleton } from "@/components/store-skeletons";

export function generateStaticParams() {
  return categories.map((category) => ({ categoria: category.slug }));
}

type Params = { categoria: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);

  if (!category) {
    return { title: "Categoría no encontrada" };
  }

  return {
    title: `${category.name} — ${category.tagline}`,
    description: category.description,
    alternates: {
      canonical: `/productos/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Extreme Board Shop`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);
  const brands = getBrands(products);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        / <span className="text-paper">{category.name}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold tracking-[0.3em] text-acid uppercase">
          {category.tagline}
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
          {category.name}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim">
          {category.description}
        </p>
      </header>

      <Suspense fallback={<CatalogSkeleton gridOnly />}>
        <ProductGridFilterable products={products} brands={brands} />
      </Suspense>
    </section>
  );
}
