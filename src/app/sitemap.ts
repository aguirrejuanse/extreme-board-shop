import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { brandSlug, getAllBrands, products } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/ofertas`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/marcas`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/locales`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/ayuda`, changeFrequency: "monthly", priority: 0.4 },
    ...categories.map((category) => ({
      url: `${SITE_URL}/productos/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllBrands().map((brand) => ({
      url: `${SITE_URL}/marcas/${brandSlug(brand)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/productos/${product.category}/${product.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
