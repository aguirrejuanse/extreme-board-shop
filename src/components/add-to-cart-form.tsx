"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCartStore, MAX_LINE_QUANTITY } from "@/store/cart-store";

export default function AddToCartForm({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants?.find((v) => v.id === variantId);

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        category: product.category,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        variantId: variant?.id,
        variantLabel: variant?.label,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="flex flex-col gap-6">
      {product.variants && product.variants.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-paper-dim uppercase">
            {product.variantLabel ?? "Variante"}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                aria-pressed={variantId === v.id}
                className={`min-h-11 min-w-11 cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                  variantId === v.id
                    ? "border-acid bg-acid text-ink"
                    : "border-line bg-ink-soft text-paper hover:border-paper-dim"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-bold tracking-[0.2em] text-paper-dim uppercase">
          Cantidad
        </p>
        <div className="inline-flex items-center rounded-lg border border-line bg-ink-soft">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Restar cantidad"
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-lg text-paper transition-colors hover:text-acid"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-paper" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((q) => Math.min(MAX_LINE_QUANTITY, q + 1))
            }
            disabled={quantity >= MAX_LINE_QUANTITY}
            aria-label="Sumar cantidad"
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-lg text-paper transition-colors hover:text-acid disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-paper"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleAdd}
          className="cursor-pointer rounded-full bg-acid px-8 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,45,140,0.6)]"
        >
          Agregar al carrito
        </button>

        {added && (
          <Link
            href="/carrito"
            className="text-sm font-semibold text-acid underline decoration-2 underline-offset-4"
          >
            ✓ Agregado — ver carrito
          </Link>
        )}
      </div>
    </div>
  );
}
