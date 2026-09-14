import type { Metadata } from "next";
import CartView from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Carrito de compras",
  description: "Revisá los productos de tu carrito antes de finalizar la compra en Extreme Board Shop.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="mb-8 font-display text-5xl tracking-tight text-paper sm:text-6xl">
        Tu carrito
      </h1>
      <CartView />
    </section>
  );
}
