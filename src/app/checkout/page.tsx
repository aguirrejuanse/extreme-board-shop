import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Completá tus datos para finalizar tu compra en Extreme Board Shop.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="mb-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
        Checkout
      </h1>
      <p className="mb-10 text-sm text-paper-dim">
        Pedido simulado — no se realiza ningún cobro real.
      </p>
      <CheckoutForm />
    </section>
  );
}
