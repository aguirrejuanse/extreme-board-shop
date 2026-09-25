import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { PHONE, WHATSAPP, stores, type Store } from "@/data/stores";

export const metadata: Metadata = {
  title: "Locales en Mendoza y San Juan",
  description:
    "Encontrá tu local Extreme Board Shop: direcciones, horarios y contacto de nuestras sucursales en Mendoza y San Juan. Retirá tu compra online gratis.",
  alternates: {
    canonical: "/locales",
  },
};

const storesJsonLd = {
  "@context": "https://schema.org",
  "@graph": stores.map((store) => ({
    "@type": "SportingGoodsStore",
    name: `Extreme Board Shop — ${store.name}`,
    url: `${SITE_URL}/locales`,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressLocality: store.city,
      addressRegion: store.city,
      addressCountry: "AR",
    },
    openingHours: store.hoursSchema,
  })),
};

function mapsUrl(store: Store): string {
  const query = encodeURIComponent(
    `Extreme Board Shop ${store.address}, ${store.city}, Argentina`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export default function LocalesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storesJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-paper-dim">
        <Link href="/" className="hover:text-paper">
          Inicio
        </Link>{" "}
        / <span className="text-paper">Locales</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold tracking-[0.3em] text-acid uppercase">
          Vení a conocernos
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight text-paper sm:text-6xl">
          Locales
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim">
          Comprás online y retirás gratis en el local, o venís a probar y te
          asesora gente que anda en tabla. Los mismos precios que ves acá.
        </p>
      </header>

      {(["Mendoza", "San Juan"] as const).map((province) => (
        <section key={province} className="mb-12">
          <h2 className="mb-5 flex items-center gap-3 font-display text-2xl tracking-tight text-paper">
            {province}
            <span className="text-sm font-normal text-paper-dim">
              {stores.filter((s) => s.city === province).length} locales
            </span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores
              .filter((store) => store.city === province)
              .map((store) => (
                <article
                  key={store.name}
                  className="flex flex-col rounded-2xl border border-line bg-ink-soft p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold tracking-[0.2em] text-acid uppercase">
                      {store.city}
                    </p>
                    {store.badge && (
                      <span className="rounded-full bg-blaze px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink uppercase">
                        {store.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-2xl tracking-tight text-paper">
                    {store.name}
                  </h3>

                  <dl className="mt-4 flex flex-col gap-2 text-sm text-paper-dim">
                    <div>
                      <dt className="sr-only">Dirección</dt>
                      <dd>{store.address}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Horario</dt>
                      <dd>{store.hours}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={mapsUrl(store)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-acid px-5 py-2.5 text-xs font-bold tracking-wide text-ink uppercase transition-transform hover:-translate-y-0.5"
                    >
                      Cómo llegar
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-5 py-2.5 text-xs font-bold tracking-wide text-paper uppercase transition-colors hover:border-paper"
                    >
                      WhatsApp
                    </a>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}

      <div className="mt-10 rounded-2xl border border-line bg-ink-soft p-6">
        <h2 className="font-display text-xl tracking-tight text-paper">
          Retiro gratis en local
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
          Elegí “Retiro en local” en el checkout y te avisamos cuando tu pedido
          esté listo. Lo retirás con tu DNI y número de orden, sin costo de
          envío.
        </p>
      </div>
    </section>
  );
}
