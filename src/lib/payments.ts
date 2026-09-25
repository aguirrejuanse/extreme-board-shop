/**
 * Payment & shipping rules for the demo storefront.
 *
 * Installment tiers mirror what local competitors advertise (Quiksilver AR
 * runs 3/9/12 cuotas by amount). Thresholds are commercial decisions, not
 * infrastructure — they live here so the announcement bar, product page,
 * cart and checkout all read from the same source.
 */
export const FREE_SHIPPING_THRESHOLD = 150_000;

const INSTALLMENT_TIERS = [
  { minTotal: 300_000, count: 12 },
  { minTotal: 150_000, count: 9 },
  { minTotal: 0, count: 3 },
] as const;

export interface InstallmentPlan {
  count: number;
  perInstallment: number;
}

export function getInstallmentPlan(amount: number): InstallmentPlan {
  const tier =
    INSTALLMENT_TIERS.find((t) => amount >= t.minTotal) ??
    INSTALLMENT_TIERS[INSTALLMENT_TIERS.length - 1];
  return { count: tier.count, perInstallment: Math.round(amount / tier.count) };
}

export interface ShippingEstimate {
  label: string;
  price: number;
}

/**
 * Simulated CP → shipping estimate. Mendoza CPs are 55xx and San Juan 54xx,
 * which gives the demo realistic local pricing instead of a flat number.
 */
export function estimateShipping(cp: string): ShippingEstimate | null {
  const normalized = cp.trim();
  if (!/^\d{4}$/.test(normalized)) return null;

  const isCuyo = normalized.startsWith("55") || normalized.startsWith("54");
  return isCuyo
    ? { label: `Envío a domicilio — CP ${normalized}`, price: 5900 }
    : { label: `Envío a domicilio — CP ${normalized}`, price: 8500 };
}
