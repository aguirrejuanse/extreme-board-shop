"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, cartTotal } from "@/store/cart-store";
import { useHasHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/format";
import { generateOrderNumber } from "@/lib/format";
import { saveOrder, type ShippingDetails } from "@/lib/order";
import OrderLineRow from "@/components/order-line-row";
import { CheckoutSkeleton } from "@/components/store-skeletons";
import type { CartItem } from "@/store/cart-store";

const initialForm: ShippingDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  shippingMethod: "retiro-local",
};

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const hydrated = useHasHydrated();
  const [form, setForm] = useState<ShippingDetails>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingDetails, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [submittedItems, setSubmittedItems] = useState<CartItem[] | null>(null);
  const [submitError, setSubmitError] = useState("");
  const summaryItems = submittedItems ?? items;
  const total = cartTotal(summaryItems);

  function update<K extends keyof ShippingDetails>(key: K, value: ShippingDetails[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const requiredTextFields: (keyof ShippingDetails)[] = [
    "fullName",
    "email",
    "phone",
    "address",
    "city",
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || items.length === 0) return;

    const fieldErrors: Partial<Record<keyof ShippingDetails, string>> = {};
    for (const key of requiredTextFields) {
      if (form[key].trim().length === 0) {
        fieldErrors[key] = "Completá este campo";
      }
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      Array.from(event.currentTarget.querySelectorAll("input")).find((input) => !input.value.trim())?.focus();
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError("");

    const trimmedForm: ShippingDetails = {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
    };

    const order = {
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer: trimmedForm,
      items,
      total,
    };

    try {
      saveOrder(order);
    } catch {
      submittingRef.current = false;
      setSubmitting(false);
      setSubmitError("No pudimos guardar el pedido en este dispositivo. Tu carrito sigue intacto. Habilitá el almacenamiento del navegador y volvé a intentar.");
      return;
    }
    setSubmittedItems(items);
    clear();
    router.push("/checkout/confirmacion");
  }

  if (!hydrated) {
    return <CheckoutSkeleton />;
  }

  if (summaryItems.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-ink-soft p-10 text-center text-sm text-paper-dim">
        Tu carrito está vacío. Agregá productos antes de finalizar la compra.
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} aria-busy={submitting} className="flex flex-col gap-6">
        <fieldset disabled={submitting} className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-1 font-display text-xl tracking-tight text-paper sm:col-span-2">
            Datos de contacto
          </legend>

          <Field
            label="Nombre y apellido"
            required
            value={form.fullName}
            onChange={(v) => update("fullName", v)}
            autoComplete="name"
            error={errors.fullName}
          />
          <Field
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(v) => update("email", v)}
            autoComplete="email"
            error={errors.email}
          />
          <Field
            label="Teléfono"
            type="tel"
            required
            value={form.phone}
            onChange={(v) => update("phone", v)}
            autoComplete="tel"
            error={errors.phone}
          />
          <Field
            label="Ciudad"
            required
            value={form.city}
            onChange={(v) => update("city", v)}
            autoComplete="address-level2"
            error={errors.city}
          />
          <div className="sm:col-span-2">
            <Field
              label="Dirección de envío"
              required
              value={form.address}
              onChange={(v) => update("address", v)}
              autoComplete="street-address"
              error={errors.address}
            />
          </div>
        </fieldset>

        <fieldset disabled={submitting}>
          <legend className="mb-3 font-display text-xl tracking-tight text-paper">
            Método de envío
          </legend>
          <div className="flex flex-col gap-2">
            {(
              [
                ["retiro-local", "Retiro en local (gratis)"],
                ["envio-estandar", "Envío estándar (3 a 5 días hábiles)"],
                ["envio-express", "Envío express (24 a 48 hs)"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  form.shippingMethod === value
                    ? "border-acid bg-ink-soft text-paper"
                    : "border-line bg-ink-soft/60 text-paper-dim"
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value={value}
                  checked={form.shippingMethod === value}
                  onChange={() => update("shippingMethod", value)}
                  className="accent-[var(--acid)]"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="text-xs text-paper-dim">
          Este es un checkout simulado para fines de demostración. No se
          procesa ningún pago real.
        </p>

        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="cursor-pointer rounded-full bg-acid px-8 py-3.5 text-sm font-bold tracking-wide text-ink uppercase motion-press hover-lift disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Abriendo confirmación…" : "Confirmar pedido"}
        </button>
        <p role="alert" className="text-sm font-semibold text-blaze">{submitError}</p>
      </form>

      <aside className="h-max rounded-2xl border border-line bg-ink-soft p-6">
        <h2 className="font-display text-2xl tracking-tight text-paper">
          Tu pedido
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {summaryItems.map((line) => (
            <OrderLineRow
              key={`${line.productId}-${line.variantId ?? "base"}`}
              line={line}
            />
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-2xl tracking-tight text-paper">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = useId();
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-wide text-paper-dim uppercase">
      {label}
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`rounded-lg border bg-ink px-3.5 py-2.5 text-sm font-normal tracking-normal text-paper normal-case placeholder:text-paper-dim/60 focus:outline-none ${
          error
            ? "border-blaze focus:border-blaze"
            : "border-line focus:border-acid"
        }`}
      />
      {error && (
        <span id={errorId} className="text-[11px] font-semibold tracking-normal text-blaze normal-case">
          {error}
        </span>
      )}
    </label>
  );
}
