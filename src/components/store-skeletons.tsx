import type { ReactNode } from "react";

function Block({ className = "" }: { className?: string }) {
  return <div className={`skeleton-block ${className}`} />;
}

function Skeleton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

export function CatalogSkeleton({ gridOnly = false }: { gridOnly?: boolean }) {
  return (
    <Skeleton label="Cargando catálogo">
      {!gridOnly && (
        <div className="mb-10 space-y-4">
          <Block className="h-4 w-32" />
          <Block className="h-14 w-2/3" />
          <Block className="h-10 max-w-2xl" />
        </div>
      )}
      <div className="mb-8 flex gap-3"><Block className="h-10 w-40" /><Block className="h-10 w-40" /></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Block className="aspect-square" />
            <div className="space-y-3 p-4">
              <Block className="h-3 w-16" /><Block className="h-8 w-full" />
              <Block className="h-6 w-24" /><Block className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </Skeleton>
  );
}

export function ProductSkeleton() {
  return (
    <Skeleton label="Cargando producto">
      <Block className="mb-8 h-4 w-2/3" />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <Block className="col-span-2 aspect-square" />
          <Block className="aspect-square" /><Block className="aspect-square" />
        </div>
        <div className="space-y-6">
          <Block className="h-4 w-24" /><Block className="h-24 w-full" />
          <Block className="h-9 w-36" /><Block className="h-20 w-full" />
          <Block className="h-28 w-full" />
          <div className="border-t border-line pt-8"><Block className="h-11 w-36" /><Block className="mt-6 h-12 w-64 max-w-full" /></div>
        </div>
      </div>
    </Skeleton>
  );
}

function SummaryShape() {
  return (
    <div className="h-max space-y-5 rounded-2xl border border-line bg-ink-soft p-6">
      <Block className="h-8 w-40" />
      <Block className="h-12 w-full" /><Block className="h-12 w-full" />
      <div className="border-t border-line pt-4"><Block className="h-8 w-full" /></div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <Skeleton label="Cargando carrito">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="h-max divide-y divide-line rounded-2xl border border-line bg-ink-soft">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-4 p-4 sm:p-5">
              <Block className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
              <div className="flex-1 space-y-3"><Block className="h-4 w-3/4" /><Block className="h-5 w-full" /><Block className="h-11 w-32" /></div>
            </div>
          ))}
        </div>
        <div className="space-y-5"><SummaryShape /><Block className="h-12 w-full" /></div>
      </div>
    </Skeleton>
  );
}

export function CheckoutSkeleton() {
  return (
    <Skeleton label="Cargando checkout">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Block className="h-7 w-40" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3, 4].map((i) => <Block key={i} className={`h-16 ${i === 4 ? "sm:col-span-2" : ""}`} />)}
          </div>
          <Block className="h-7 w-40" />
          {[0, 1, 2].map((i) => <Block key={i} className="h-12 w-full" />)}
          <Block className="h-12 w-full" />
        </div>
        <SummaryShape />
      </div>
    </Skeleton>
  );
}

export function ConfirmationSkeleton() {
  return (
    <Skeleton label="Cargando confirmación del pedido">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6 rounded-2xl border border-line bg-ink-soft p-8">
          <Block className="h-12 w-12 rounded-full" /><Block className="h-14 w-full" />
          <Block className="h-12 w-full" /><Block className="h-10 w-44" />
          <Block className="h-20 w-full" /><Block className="h-12 w-44" />
        </div>
        <SummaryShape />
      </div>
    </Skeleton>
  );
}
