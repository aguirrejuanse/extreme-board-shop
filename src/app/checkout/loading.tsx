import { CheckoutSkeleton } from "@/components/store-skeletons";

export default function Loading() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="mb-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">Checkout</h1>
      <p className="mb-10 text-sm text-paper-dim">Pedido simulado — no se realiza ningún cobro real.</p>
      <CheckoutSkeleton />
    </section>
  );
}
