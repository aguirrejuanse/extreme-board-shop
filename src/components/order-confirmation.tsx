"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readLastOrder, shippingMethodLabels, type Order } from "@/lib/order";
import { formatPrice } from "@/lib/format";
import OrderLineRow from "@/components/order-line-row";

export default function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(readLastOrder());
  }, []);

  if (order === undefined) {
    return null;
  }

  if (order === null) {
    return (
      <div className="rounded-2xl border border-line bg-ink-soft p-14 text-center">
        <p className="font-display text-3xl tracking-tight text-paper">
          No encontramos ningún pedido reciente
        </p>
        <p className="mt-2 text-sm text-paper-dim">
          Probá iniciar una compra desde el catálogo.
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="rounded-2xl border border-acid/50 bg-ink-soft p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-acid text-xl font-bold text-ink">
          ✓
        </span>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-paper sm:text-5xl">
          ¡Pedido recibido!
        </h1>
        <p className="mt-2 text-sm text-paper-dim">
          Guardá tu número de orden. Te vamos a contactar a{" "}
          <span className="text-paper">{order.customer.email}</span> para
          coordinar {shippingMethodLabels[order.customer.shippingMethod].toLowerCase()}.
        </p>

        <p className="mt-6 inline-block rounded-lg border border-line bg-ink px-4 py-2 font-mono text-sm tracking-wider text-acid">
          {order.orderNumber}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-xs text-paper-dim sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-paper uppercase">Destinatario</dt>
            <dd className="mt-1">{order.customer.fullName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-paper uppercase">Ciudad</dt>
            <dd className="mt-1">{order.customer.city}</dd>
          </div>
          <div>
            <dt className="font-semibold text-paper uppercase">Envío</dt>
            <dd className="mt-1">
              {shippingMethodLabels[order.customer.shippingMethod]}
            </dd>
          </div>
        </dl>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-paper-dim px-6 py-3 text-sm font-bold tracking-wide text-paper uppercase transition-colors hover:border-paper"
        >
          Volver al inicio
        </Link>
      </div>

      <aside className="h-max rounded-2xl border border-line bg-ink-soft p-6">
        <h2 className="font-display text-2xl tracking-tight text-paper">
          Resumen del pedido
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {order.items.map((line) => (
            <OrderLineRow
              key={`${line.productId}-${line.variantId ?? "base"}`}
              line={line}
            />
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-2xl tracking-tight text-paper">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </aside>
    </div>
  );
}
