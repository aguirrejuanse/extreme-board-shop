import { CartSkeleton } from "@/components/store-skeletons";

export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="mb-8 font-display text-5xl tracking-tight text-paper sm:text-6xl">Tu carrito</h1>
      <CartSkeleton />
    </section>
  );
}
