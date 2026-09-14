import type { CartItem } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";

/**
 * Single order/cart line ("2× Product Name (M) ... $1.000"), shared by the
 * checkout summary and the order confirmation summary so both stay in sync
 * (key format, copy, price formatting) instead of duplicating the same
 * markup in each place.
 */
export default function OrderLineRow({ line }: { line: CartItem }) {
  return (
    <li
      key={`${line.productId}-${line.variantId ?? "base"}`}
      className="flex justify-between gap-2 text-paper-dim"
    >
      <span>
        {line.quantity}× {line.name}
        {line.variantLabel ? ` (${line.variantLabel})` : ""}
      </span>
      <span className="shrink-0 text-paper">
        {formatPrice(line.price * line.quantity)}
      </span>
    </li>
  );
}
