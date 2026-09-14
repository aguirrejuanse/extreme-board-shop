import type { Metadata } from "next";
import OrderConfirmation from "@/components/order-confirmation";

export const metadata: Metadata = {
  title: "Pedido recibido",
  description: "Confirmación de tu pedido en Extreme Board Shop.",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <OrderConfirmation />
    </section>
  );
}
