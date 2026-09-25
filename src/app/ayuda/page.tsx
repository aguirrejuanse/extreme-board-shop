import type { Metadata } from "next";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/payments";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Ayuda: envíos, cambios y devoluciones",
  description:
    "Todo sobre envíos a todo el país, retiro en local, cambios, devoluciones y el botón de arrepentimiento. Extreme Board Shop — Mendoza y San Juan.",
  alternates: {
    canonical: "/ayuda",
  },
};

const faqs = [
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, enviamos a toda la Argentina por correo. El costo depende de tu código postal y lo calculás desde el carrito antes de confirmar la compra.",
  },
  {
    question: "¿Puedo retirar mi pedido en el local?",
    answer:
      "Sí. Elegí “Retiro en local” en el checkout y retirás tu pedido sin costo en cualquiera de nuestros locales de Mendoza o San Juan con tu DNI y número de orden.",
  },
  {
    question: "¿Cómo funcionan las cuotas sin interés?",
    answer:
      "Todas las compras tienen 3 cuotas sin interés. En compras desde $150.000 accedés a 9 cuotas, y desde $300.000 a 12 cuotas sin interés.",
  },
  {
    question: "¿Cuánto tengo para cambios?",
    answer:
      "Tenés 10 días corridos desde que recibiste el producto para pedir cambio o devolución, sin costo y sin dar explicaciones, como marca la Ley de Defensa del Consumidor.",
  },
  {
    question: "¿Los precios online son los mismos que en el local?",
    answer:
      "Sí. Los precios publicados son los mismos que encontrás en nuestros locales de Mendoza y San Juan.",
  },
];

export default function AyudaPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        / <span className="text-paper">Ayuda</span>
      </nav>

      <header className="mb-12">
        <p className="text-xs font-bold tracking-[0.3em] text-acid uppercase">
          Estamos para ayudarte
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
          Ayuda
        </h1>
      </header>

      <div className="flex flex-col gap-10">
        <section id="envios" aria-labelledby="envios-title">
          <h2
            id="envios-title"
            className="font-display text-2xl tracking-tight text-paper"
          >
            Envíos
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-paper-dim">
            <li>
              • Envío gratis en compras desde{" "}
              {formatPrice(FREE_SHIPPING_THRESHOLD)}.
            </li>
            <li>
              • Envío estándar a todo el país: 3 a 5 días hábiles. Express en
              Mendoza y San Juan: 24 a 48 hs.
            </li>
            <li>
              • El costo se calcula por código postal desde el carrito, antes de
              pagar.
            </li>
            <li>
              • Retiro gratis en nuestros locales:{" "}
              <Link
                href="/locales"
                className="text-paper underline decoration-acid decoration-2 underline-offset-4"
              >
                ver direcciones y horarios
              </Link>
              .
            </li>
          </ul>
        </section>

        <section id="devoluciones" aria-labelledby="devoluciones-title">
          <h2
            id="devoluciones-title"
            className="font-display text-2xl tracking-tight text-paper"
          >
            Cambios y devoluciones
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-paper-dim">
            <li>
              • Tenés 10 días corridos desde la recepción para cambiar o
              devolver, sin costo.
            </li>
            <li>
              • El producto debe estar sin uso, con etiquetas y en su empaque
              original.
            </li>
            <li>
              • Podés hacer el cambio en cualquiera de nuestros locales o por
              correo — te enviamos la etiqueta de devolución.
            </li>
          </ul>
        </section>

        <section id="arrepentimiento" aria-labelledby="arrepentimiento-title">
          <h2
            id="arrepentimiento-title"
            className="font-display text-2xl tracking-tight text-paper"
          >
            Botón de arrepentimiento
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-paper-dim">
            Si te arrepentís de tu compra, tenés hasta 10 días corridos desde
            que recibiste el producto para cancelarla y recibir el reintegro
            total, sin costo ni trámites extra. Escribinos a{" "}
            <a
              href="mailto:ventaonline@extremeboardshop.com.ar"
              className="text-paper underline decoration-acid decoration-2 underline-offset-4"
            >
              ventaonline@extremeboardshop.com.ar
            </a>{" "}
            con tu número de orden. Es tu derecho por la Ley 24.240 de Defensa
            del Consumidor.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper-dim">
            Para reclamos ante Defensa del Consumidor:{" "}
            <a
              href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-acid decoration-2 underline-offset-4"
            >
              ingresá al formulario oficial
            </a>
            .
          </p>
        </section>

        <section id="faq" aria-labelledby="faq-title">
          <h2
            id="faq-title"
            className="font-display text-2xl tracking-tight text-paper"
          >
            Preguntas frecuentes
          </h2>
          <dl className="mt-4 flex flex-col gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-line bg-ink-soft p-5"
              >
                <dt className="text-sm font-semibold text-paper">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}
