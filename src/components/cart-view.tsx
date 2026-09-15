"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, cartTotal, MAX_LINE_QUANTITY } from "@/store/cart-store";
import { useHasHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/format";
import { placeholderImage } from "@/lib/image";

export default function CartView() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const hydrated = useHasHydrated();

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-line bg-ink-soft p-10 text-center text-sm text-paper-dim">
        Cargando carrito…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-ink-soft p-14 text-center">
        <p className="font-display text-3xl tracking-tight text-paper">
          Tu carrito está vacío
        </p>
        <p className="mt-2 text-sm text-paper-dim">
          Todavía no agregaste ningún producto.
        </p>
        <Link
          href="/productos/skate"
          className="mt-6 inline-block rounded-full bg-acid px-7 py-3 text-sm font-bold tracking-wide text-ink uppercase transition-transform hover:-translate-y-0.5"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  const total = cartTotal(items);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-ink-soft">
        {items.map((line) => (
          <li
            key={`${line.productId}-${line.variantId ?? "base"}`}
            className="flex gap-4 p-4 sm:p-5"
          >
            <Link
              href={`/productos/${line.category}/${line.slug}`}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-ink sm:h-24 sm:w-24"
            >
              <Image
                src={placeholderImage(line.imageSeed, 200, 200, line.name)}
                alt={line.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-acid-dim uppercase">
                    {line.brand}
                  </p>
                  <Link
                    href={`/productos/${line.category}/${line.slug}`}
                    className="text-sm font-semibold text-paper hover:text-acid"
                  >
                    {line.name}
                  </Link>
                  {line.variantLabel && (
                    <p className="text-xs text-paper-dim">
                      Talle: {line.variantLabel}
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold text-paper">
                  {formatPrice(line.price * line.quantity)}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <div className="inline-flex items-center rounded-lg border border-line bg-ink">
                  <button
                    type="button"
                    aria-label={`Restar cantidad de ${line.name}`}
                    onClick={() =>
                      setQuantity(
                        line.productId,
                        Math.max(1, line.quantity - 1),
                        line.variantId
                      )
                    }
                    disabled={line.quantity <= 1}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center text-paper transition-colors hover:text-acid disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-paper"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-paper">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Sumar cantidad de ${line.name}`}
                    onClick={() =>
                      setQuantity(line.productId, line.quantity + 1, line.variantId)
                    }
                    disabled={line.quantity >= MAX_LINE_QUANTITY}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center text-paper transition-colors hover:text-acid disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-paper"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(line.productId, line.variantId)}
                  className="cursor-pointer text-xs font-semibold text-paper-dim underline decoration-blaze decoration-2 underline-offset-4 hover:text-blaze"
                >
                  Quitar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-max rounded-2xl border border-line bg-ink-soft p-6">
        <h2 className="font-display text-2xl tracking-tight text-paper">
          Resumen
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-paper-dim">
            <dt>Subtotal</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between text-paper-dim">
            <dt>Envío</dt>
            <dd>A calcular en checkout</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-2xl tracking-tight text-paper">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block rounded-full bg-acid px-6 py-3.5 text-center text-sm font-bold tracking-wide text-ink uppercase transition-transform hover:-translate-y-0.5"
        >
          Ir a checkout
        </Link>
      </aside>
    </div>
  );
}
