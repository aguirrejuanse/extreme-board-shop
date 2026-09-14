import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { placeholderImage } from "@/lib/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/productos/${product.category}/${product.slug}`}
      className="card-tilt group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft"
    >
      <div className="relative aspect-square overflow-hidden bg-ink">
        <Image
          src={placeholderImage(product.imageSeed, 600, 600, product.name)}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-acid px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink uppercase">
            Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-acid-dim uppercase">
          {product.brand}
        </p>
        <h3 className="text-sm leading-snug font-semibold text-paper">
          {product.name}
        </h3>
        <p className="mt-auto pt-3 font-display text-lg tracking-wide text-paper">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
