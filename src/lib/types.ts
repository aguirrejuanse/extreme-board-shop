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
  imageSeed: string;
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
  imageSeed: string;
  variantLabel?: string;
  variants?: ProductVariant[];
  featured?: boolean;
  isNew?: boolean;
}
