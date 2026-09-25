import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getAllBrands } from "@/data/products";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import { placeholderImage } from "@/lib/image";

export const metadata: Metadata = {
  title: "Skate, Snow y Streetwear en Mendoza y San Juan",
  description:
    "Tablas completas de skate y snowboard, indumentaria técnica y accesorios de las mejores marcas. Envíos a Mendoza, San Juan y todo el país.",
  alternates: {
    canonical: "/",
  },
};

const brands = getAllBrands();

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* HERO */}
      <section className="grain diagonal-edge relative overflow-hidden bg-ink-soft pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <Image
            src={placeholderImage("hero-cordillera-cuyo", 1600, 1200)}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-16 sm:px-6 sm:pt-24">
          <p className="animate-rise text-xs font-bold tracking-[0.35em] text-acid uppercase">
            Mendoza · San Juan · Argentina
          </p>

          <h1 className="animate-rise font-display text-[15vw] leading-[0.85] tracking-tight text-paper sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            RODAMOS
            <br />
            <span className="text-acid">DONDE</span> OTROS
            <br />
            <span className="text-outline">FRENAN</span>
          </h1>

          <p
            className="animate-rise max-w-md text-base leading-relaxed text-paper-dim"
            style={{ animationDelay: "0.15s" }}
          >
            Tablas, indumentaria y accesorios de skate y snowboard para calle,
            park y montaña. La cordillera es nuestro patio trasero.
          </p>

          <div
            className="animate-rise flex flex-wrap gap-4"
            style={{ animationDelay: "0.25s" }}
          >
            <Link
              href="/productos/skate"
              className="rounded-full bg-acid px-7 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,45,140,0.6)]"
            >
              Ver Skate
            </Link>
            <Link
              href="/productos/snow"
              className="rounded-full border border-paper-dim px-7 py-3.5 text-sm font-bold tracking-wide text-paper uppercase transition-colors hover:border-paper hover:bg-ink"
            >
              Ver Snow
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section
        aria-label="Marcas disponibles"
        className="overflow-hidden border-y border-line bg-ink py-4"
      >
        <div className="flex w-max animate-marquee gap-10 text-sm font-semibold tracking-[0.25em] text-paper-dim uppercase">
          {[...brands, ...brands].map((brand, index) => (
            <span key={`${brand}-${index}`} className="flex items-center gap-10">
              {brand}
              <span aria-hidden="true" className="text-acid">
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-tight text-paper sm:text-5xl">
            Categorías
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="grain relative bg-ink-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-acid uppercase">
                Elegidos por el equipo
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-paper sm:text-5xl">
                Destacados
              </h2>
            </div>
            <Link
              href="/productos/skate"
              className="text-sm font-semibold text-paper-dim underline decoration-acid decoration-2 underline-offset-4 transition-colors hover:text-paper"
            >
              Ver todo el catálogo
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <ValueProp
            title="Retiro en local"
            description="Retirá tu pedido en nuestras sucursales de Mendoza y San Juan sin esperar envío."
          />
          <ValueProp
            title="Asesoramiento real"
            description="Equipo que anda en tabla y te ayuda a elegir según tu nivel y terreno."
          />
          <ValueProp
            title="Marcas originales"
            description="Trabajamos directo con distribuidores oficiales de cada marca del catálogo."
          />
        </div>
      </section>
    </>
  );
}

function ValueProp({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-ink-soft p-6">
      <p className="font-display text-xl tracking-tight text-acid">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-paper-dim">
        {description}
      </p>
    </div>
  );
}
