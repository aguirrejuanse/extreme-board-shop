import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getInstallmentPlan } from "@/lib/payments";

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <Link
      href={`/productos/${product.category}/${product.slug}`}
      className="card-tilt group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft"
    >
      <div className="relative aspect-square overflow-hidden bg-ink">
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover image-zoom"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-acid px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink uppercase">
            Nuevo
          </span>
        )}
        {discount !== null && (
          <span className="absolute top-3 right-3 rounded-full bg-blaze px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink uppercase">
            -{discount}%
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
        <p className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="font-display text-lg tracking-wide text-paper">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-paper-dim line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>
        <p className="text-[11px] text-paper-dim">
          {getInstallmentPlan(product.price).count} cuotas sin interés de{" "}
          {formatPrice(getInstallmentPlan(product.price).perInstallment)}
        </p>
      </div>
    </Link>
  );
}
