import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  brandSlug,
  getAllBrands,
  getBrandImage,
  getProductsByBrand,
} from "@/data/products";

export const metadata: Metadata = {
  title: "Marcas",
  description:
    "Todas las marcas oficiales de Extreme Board Shop: Element, Santa Cruz, Burton, Vans, Volcom y más. Distribuidores oficiales en Mendoza y San Juan.",
  alternates: {
    canonical: "/marcas",
  },
};

export default function BrandsPage() {
  const brands = getAllBrands();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        / <span className="text-paper">Marcas</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold tracking-[0.3em] text-acid uppercase">
          Distribuidores oficiales
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
          Marcas
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim">
          Trabajamos directo con los distribuidores oficiales de cada marca.
          Elegí la tuya y mirá todo lo que tenemos disponible.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => {
          const count = getProductsByBrand(brand).length;
          return (
            <li key={brand}>
              <Link
                href={`/marcas/${brandSlug(brand)}`}
                className="card-tilt group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl border border-line"
              >
                <Image
                  src={getBrandImage(brand)}
                  alt={brand}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity group-hover:from-ink/95" />
                <div className="relative flex flex-col gap-1 p-5">
                  <span className="font-display text-2xl tracking-tight text-paper">
                    {brand}
                  </span>
                  <span className="text-xs text-paper-dim">
                    {count} {count === 1 ? "producto" : "productos"}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
