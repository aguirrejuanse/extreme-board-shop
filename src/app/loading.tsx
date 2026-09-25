export default function Loading() {
  return (
    <div
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6"
      role="status"
      aria-label="Cargando página"
    >
      <div className="h-4 w-32 animate-pulse rounded bg-ink-soft" />
      <div className="mt-4 h-14 w-2/3 animate-pulse rounded-xl bg-ink-soft" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-ink-soft" />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft"
          >
            <div className="aspect-square animate-pulse bg-ink" />
            <div className="flex flex-col gap-2 p-4">
              <div className="h-3 w-16 animate-pulse rounded bg-ink" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-ink" />
              <div className="mt-2 h-5 w-20 animate-pulse rounded bg-ink" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
