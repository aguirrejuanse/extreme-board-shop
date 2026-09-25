import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductBySlug, getProductsByCategory, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { getInstallmentPlan } from "@/lib/payments";
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

  return {
    title: `${product.name} — ${product.brand}`,
    description: `${product.shortDescription} ${formatPrice(product.price)} · Envíos a todo el país.`,
    alternates: {
      canonical: `/productos/${product.category}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${product.brand}`,
      description: product.shortDescription,
      images: [
        {
          url: `${SITE_URL}${product.image}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
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

  const productUrl = `${SITE_URL}/productos/${product.category}/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: category.name,
            item: `${SITE_URL}/productos/${category.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
      {
        "@type": "Product",
        name: product.name,
        sku: product.id,
        category: category.name,
        brand: { "@type": "Brand", name: product.brand },
        description: product.description,
        image: `${SITE_URL}${product.image}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "ARS",
          price: product.price,
          priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          url: productUrl,
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "AR",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 5,
                unitCode: "DAY",
              },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "AR",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 10,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
        },
      },
    ],
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
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Zoomed crop of the same photo reads as a "detail" shot until
              real multi-angle photography exists. */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Image
              src={product.image}
              alt={`Detalle de ${product.name}`}
              fill
              sizes="22vw"
              className="scale-[1.6] object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Image
              src={category.image}
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
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <p className="font-display text-3xl text-paper">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice && (
              <>
                <p className="text-sm text-paper-dim line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
                <span className="rounded-full bg-blaze px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink uppercase">
                  -
                  {Math.round(
                    (1 - product.price / product.compareAtPrice) * 100
                  )}
                  % off
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-paper-dim">
            {getInstallmentPlan(product.price).count} cuotas sin interés de{" "}
            {formatPrice(getInstallmentPlan(product.price).perInstallment)} ·
            Precio de contado
          </p>

          <ul className="mt-6 flex flex-col gap-1.5 text-xs text-paper-dim">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="font-bold text-success">
                ✓
              </span>
              En stock — listo para retirar o enviar
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="font-bold text-success">
                ✓
              </span>
              Retiro gratis en nuestros locales de Mendoza y San Juan
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="font-bold text-success">
                ✓
              </span>
              Envíos a todo el país
            </li>
          </ul>

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
