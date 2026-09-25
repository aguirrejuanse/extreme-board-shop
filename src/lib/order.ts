import type { CartItem } from "@/store/cart-store";

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  shippingMethod: "retiro-local" | "envio-estandar" | "envio-express";
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  customer: ShippingDetails;
  items: CartItem[];
  total: number;
}

const STORAGE_KEY = "ebs-last-order";

// The checkout is fully simulated: there is no backend or payment gateway.
// We persist the "order" to localStorage purely so the confirmation page
// can render a summary after the client-side redirect.
export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export const shippingMethodLabels: Record<ShippingDetails["shippingMethod"], string> = {
  "retiro-local": "Retiro en local (gratis)",
  "envio-estandar": "Envío estándar (3 a 5 días hábiles)",
  "envio-express": "Envío express (24 a 48 hs)",
};

function isValidOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") return false;
  const order = value as Record<string, unknown>;

  if (typeof order.orderNumber !== "string") return false;
  if (typeof order.createdAt !== "string") return false;
  if (typeof order.total !== "number") return false;
  if (!Array.isArray(order.items)) return false;

  const customer = order.customer;
  if (!customer || typeof customer !== "object") return false;
  const c = customer as Record<string, unknown>;

  if (typeof c.fullName !== "string") return false;
  if (typeof c.email !== "string") return false;
  if (typeof c.phone !== "string") return false;
  if (typeof c.address !== "string") return false;
  if (typeof c.city !== "string") return false;
  if (
    typeof c.shippingMethod !== "string" ||
    !(c.shippingMethod in shippingMethodLabels)
  ) {
    return false;
  }

  return true;
}

export function readLastOrder(): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidOrder(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
