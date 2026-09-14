import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Maximum quantity allowed for a single cart line. This is the single
 * source of truth for the cap — it lives in the store (not in individual
 * components) so every caller (product page stepper, cart page +/- button,
 * or any future entry point) is protected regardless of how it mutates
 * the cart.
 */
export const MAX_LINE_QUANTITY = 10;

export interface CartItem {
  productId: string;
  slug: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  imageSeed: string;
  variantId?: string;
  variantLabel?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  setQuantity: (
    productId: string,
    quantity: number,
    variantId?: string
  ) => void;
  clear: () => void;
}

function sameLine(
  item: CartItem,
  productId: string,
  variantId?: string
): boolean {
  return item.productId === productId && item.variantId === variantId;
}

// State management note: the cart uses Zustand with the `persist` middleware
// instead of Context + useReducer. For a small ecommerce demo the cart is
// read and written from many unrelated places (header badge, product page,
// cart page, checkout) — Zustand lets each component subscribe only to the
// slice it needs without wrapping the tree in a provider or causing
// re-renders across unrelated components. The `persist` middleware gives us
// localStorage persistence "for free" (serialize/deserialize + storage sync)
// which would otherwise be a hand-rolled useEffect pair with Context.
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((line) =>
            sameLine(line, item.productId, item.variantId)
          );

          if (existing) {
            return {
              items: state.items.map((line) =>
                sameLine(line, item.productId, item.variantId)
                  ? {
                      ...line,
                      quantity: Math.min(
                        MAX_LINE_QUANTITY,
                        line.quantity + quantity
                      ),
                    }
                  : line
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...item, quantity: Math.min(MAX_LINE_QUANTITY, quantity) },
            ],
          };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (line) => !sameLine(line, productId, variantId)
          ),
        })),
      setQuantity: (productId, quantity, variantId) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (line) => !sameLine(line, productId, variantId)
                )
              : state.items.map((line) =>
                  sameLine(line, productId, variantId)
                    ? {
                        ...line,
                        quantity: Math.min(MAX_LINE_QUANTITY, quantity),
                      }
                    : line
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "ebs-cart",
      version: 1,
    }
  )
);

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + line.quantity, 0);
}
