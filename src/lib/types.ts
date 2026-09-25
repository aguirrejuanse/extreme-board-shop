export type CategorySlug =
  | "skate"
  | "snow"
  | "ropa"
  | "calzado"
  | "accesorios";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  /** Path under /public — real curated photo, e.g. /images/categories/skate.webp */
  image: string;
}

export interface ProductVariant {
  id: string;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  /** Path under /public — real curated photo, e.g. /images/products/vans-old-skool.webp */
  image: string;
  variantLabel?: string;
  variants?: ProductVariant[];
  featured?: boolean;
  isNew?: boolean;
}
