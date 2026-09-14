import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-outline text-8xl tracking-tight sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl tracking-tight text-paper sm:text-4xl">
        Esta página se cayó de la tabla
      </h1>
      <p className="mt-2 max-w-sm text-sm text-paper-dim">
        No encontramos lo que buscabas. Volvé al inicio o mirá el catálogo.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-acid px-6 py-3 text-sm font-bold tracking-wide text-ink uppercase"
        >
          Inicio
        </Link>
        <Link
          href="/productos/skate"
          className="rounded-full border border-paper-dim px-6 py-3 text-sm font-bold tracking-wide text-paper uppercase"
        >
          Catálogo
        </Link>
      </div>
    </section>
  );
}
