import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "skate",
    name: "Skate",
    tagline: "Rodá donde nadie te espera",
    description:
      "Tablas completas, decks, trucks, ruedas, rodamientos y grip tape para calle, rampa y todo lo que se cruce en el camino.",
    image: "/images/categories/skate.webp",
  },
  {
    slug: "snow",
    name: "Snow",
    tagline: "Las Leñas y Penitentes te están esperando",
    description:
      "Tablas de snowboard, bindings, botas y accesorios para bajar la montaña como corresponde.",
    image: "/images/categories/snow.webp",
  },
  {
    slug: "ropa",
    name: "Ropa",
    tagline: "Uniforme de calle y de montaña",
    description:
      "Buzos, remeras, camperas y pantalones pensados para el frío cuyano y el asfalto.",
    image: "/images/categories/ropa.webp",
  },
  {
    slug: "calzado",
    name: "Calzado",
    tagline: "Suela que aguanta cualquier lija",
    description:
      "Zapatillas de skate y urbanas de las marcas que ya conocés, para durar y para lucir.",
    image: "/images/categories/calzado.webp",
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    tagline: "Los detalles cierran el look",
    description:
      "Gorras, mochilas y anteojos para completar el equipo, arriba y abajo de la tabla.",
    image: "/images/categories/accesorios.webp",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
