import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductBySlug, getProductsByCategory, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { placeholderImage } from "@/lib/image";
import { SITE_URL } from "@/lib/site";
import AddToCartForm from "@/components/add-to-cart-form";
import ProductCard from "@/components/product-card";

type Params = { categoria: string; slug: string };

export function generateStaticParams() {
  return products.map((product) => ({
    categoria: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { categoria, slug } = await params;
  const product = getProductBySlug(categoria, slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const image = placeholderImage(product.imageSeed, 800, 800, product.name);

  return {
    title: `${product.name} — ${product.brand}`,
    description: product.shortDescription,
    alternates: {
      canonical: `/productos/${product.category}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${product.brand}`,
      description: product.shortDescription,
      images: [{ url: image, width: 800, height: 800, alt: product.name }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { categoria, slug } = await params;
  const category = getCategoryBySlug(categoria);
  const product = getProductBySlug(categoria, slug);

  if (!category || !product) {
    notFound();
  }

  const related = getProductsByCategory(category.slug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    image: placeholderImage(product.imageSeed, 800, 800, product.name),
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/productos/${product.category}/${product.slug}`,
    },
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href={`/productos/${category.slug}`} className="hover:text-paper">
          {category.name}
        </Link>{" "}
        / <span className="text-paper">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-square overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Image
              src={placeholderImage(product.imageSeed, 900, 900, product.name)}
              alt={`${product.brand} ${product.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Image
              src={placeholderImage(
                `${product.imageSeed}-detalle`,
                500,
                500,
                product.name
              )}
              alt={`Detalle de ${product.name}`}
              fill
              sizes="22vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Image
              src={placeholderImage(
                `${product.imageSeed}-uso`,
                500,
                500,
                product.name
              )}
              alt={`${product.name} en uso`}
              fill
              sizes="22vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-bold tracking-[0.2em] text-acid-dim uppercase">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-paper sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-3xl text-paper">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-xs text-paper-dim">
            Hasta 3 cuotas sin interés · Precio de contado
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper-dim">
            {product.description}
          </p>

          <div className="mt-8 border-t border-line pt-8">
            <AddToCartForm key={product.id} product={product} />
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-8 text-xs text-paper-dim">
            <div>
              <dt className="font-semibold text-paper uppercase">Categoría</dt>
              <dd className="mt-1">{category.name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-paper uppercase">Marca</dt>
              <dd className="mt-1">{product.brand}</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-3xl tracking-tight text-paper">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}

      <p className="sr-only">
        Categorías disponibles: {categories.map((c) => c.name).join(", ")}
      </p>
    </section>
  );
}
