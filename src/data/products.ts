import type { Product, ProductVariant } from "@/lib/types";

function sizeVariants(labels: string[]): ProductVariant[] {
  return labels.map((label) => ({ id: label.toLowerCase(), label }));
}

const ROPA_TALLES = sizeVariants(["S", "M", "L", "XL"]);
const CALZADO_TALLES = sizeVariants(["38", "39", "40", "41", "42", "43", "44"]);
const BOTA_SNOW_TALLES = sizeVariants(["40", "41", "42", "43", "44", "45"]);

export const products: Product[] = [
  // ---------- SKATE ----------
  {
    id: "skate-001",
    slug: "element-section-completa-8-0",
    name: "Tabla Completa Section 8.0",
    brand: "Element",
    category: "skate",
    price: 189000,
    shortDescription: "Completa lista para salir a rodar, maple canadiense de 7 capas.",
    description:
      "La Section es la completa de entrada que no te deja mal parado en ningún terreno: street, plaza o rampa. Deck de maple canadiense de 7 capas, trucks resistentes y ruedas de dureza media para rodar en cualquier superficie de Mendoza o San Juan sin sorpresas.",
    imageSeed: "element-section-80",
    featured: true,
  },
  {
    id: "skate-002",
    slug: "santa-cruz-classic-dot-completa-8-25",
    name: "Tabla Completa Classic Dot 8.25",
    brand: "Santa Cruz",
    category: "skate",
    price: 215000,
    shortDescription: "El clásico dot de Santa Cruz en una completa premium.",
    description:
      "Con el gráfico dot que ya es parte de la historia del skate, esta completa de 8.25\" combina un deck resistente con hardware de calidad para andar en la calle o en el skatepark todos los días de la semana.",
    imageSeed: "santacruz-classicdot-825",
    isNew: true,
  },
  {
    id: "skate-003",
    slug: "santa-cruz-screaming-hand-deck-8-375",
    name: "Deck Screaming Hand 8.375",
    brand: "Santa Cruz",
    category: "skate",
    price: 95000,
    compareAtPrice: 118000,
    shortDescription: "Deck solo, para armar tu setup a tu gusto.",
    description:
      "El gráfico Screaming Hand original en un deck de 8 capas de maple prensado, con el pop y la durabilidad que necesitás para trucos técnicos. Ideal si ya tenés trucks y ruedas y solo buscás renovar la madera.",
    imageSeed: "santacruz-screaminghand",
  },
  {
    id: "skate-004",
    slug: "independent-stage-11-trucks",
    name: "Trucks Stage 11 Standard",
    brand: "Independent",
    category: "skate",
    price: 78000,
    shortDescription: "El estándar de la industria en resistencia y giro.",
    description:
      "Los Stage 11 son el truck más probado del skate mundial. Base de aleación de alta resistencia, geometría pensada para grindar sin drama y un giro parejo que se banca cualquier terreno cuyano.",
    imageSeed: "independent-stage11",
  },
  {
    id: "skate-005",
    slug: "spitfire-formula-four-52mm",
    name: "Ruedas Formula Four 52mm",
    brand: "Spitfire",
    category: "skate",
    price: 45000,
    compareAtPrice: 56000,
    shortDescription: "Uretano de fórmula competitiva, 99a de dureza.",
    description:
      "Las Formula Four son las ruedas más rápidas y duraderas que vas a encontrar para street y park. Uretano de alto rendimiento que mantiene el filo durante mucho más tiempo que una rueda común.",
    imageSeed: "spitfire-formulafour",
  },
  {
    id: "skate-006",
    slug: "bones-reds-rodamientos",
    name: "Rodamientos Reds Ceramic Reduced",
    brand: "Bones",
    category: "skate",
    price: 22000,
    shortDescription: "El rodamiento más vendido del planeta skate.",
    description:
      "Los Bones Reds son sinónimo de velocidad accesible: rodamientos de acero de precisión reducida que aguantan polvo, agua y el trote diario sin perder velocidad.",
    imageSeed: "bones-reds",
  },
  {
    id: "skate-007",
    slug: "mob-grip-tape",
    name: "Grip Tape Mob 9x33",
    brand: "Mob Grip",
    category: "skate",
    price: 14000,
    shortDescription: "Agarre parejo de borde a borde, fácil de instalar.",
    description:
      "La lija más elegida por skaters de todos los niveles. Adhesivo fuerte, grano parejo y perforado para instalar sin burbujas en dos minutos.",
    imageSeed: "mob-griptape",
  },

  // ---------- SNOW ----------
  {
    id: "snow-001",
    slug: "burton-custom-flying-v-158",
    name: "Tabla de Snowboard Custom Flying V 158",
    brand: "Burton",
    category: "snow",
    price: 285000,
    shortDescription: "La tabla insignia de Burton, versátil para toda la montaña.",
    description:
      "La Custom Flying V es la tabla más icónica de Burton: perfil híbrido camber-rocker que responde en pista y flota en polvo. Pensada para el andarivel que vas a encontrar en Las Leñas o Penitentes en temporada alta.",
    imageSeed: "burton-custom-flyingv",
    featured: true,
  },
  {
    id: "snow-002",
    slug: "burton-process-flying-v-154",
    name: "Tabla de Snowboard Process Flying V 154",
    brand: "Burton",
    category: "snow",
    price: 265000,
    shortDescription: "Freestyle friendly, ideal para parque y freeride liviano.",
    description:
      "La Process es la elección de quienes buscan una tabla ágil para el parque sin resignar estabilidad en pista abierta. Core liviano y flex medio que perdona errores de aterrizaje.",
    imageSeed: "burton-process-flyingv",
    isNew: true,
  },
  {
    id: "snow-003",
    slug: "burton-cartel-x-bindings",
    name: "Bindings Cartel X",
    brand: "Burton",
    category: "snow",
    price: 168000,
    shortDescription: "Ajuste rápido y respuesta directa para todo tipo de terreno.",
    description:
      "Las Cartel X ofrecen la mejor relación entre comodidad y respuesta de la línea Burton. Sistema de ajuste rápido para no perder tiempo en la fila del andarivel.",
    imageSeed: "burton-cartelx",
  },
  {
    id: "snow-004",
    slug: "thirtytwo-lashed-botas",
    name: "Botas de Snowboard Lashed",
    brand: "ThirtyTwo",
    category: "snow",
    price: 175000,
    shortDescription: "Confort de entrada con soporte para todo el día en la montaña.",
    description:
      "Las Lashed son las botas más elegidas por quienes recién arrancan en el snowboard: liner térmico, buen soporte de tobillo y un precio que no te deja afuera de la temporada.",
    imageSeed: "thirtytwo-lashed",
    variantLabel: "Talle",
    variants: BOTA_SNOW_TALLES,
  },
  {
    id: "snow-005",
    slug: "anon-m4-goggles",
    name: "Antiparras M4 Toric",
    brand: "Anon",
    category: "snow",
    price: 62000,
    shortDescription: "Lente magnético intercambiable y visión sin distorsión.",
    description:
      "Las Anon M4 usan un sistema de lente magnético que se cambia en segundos según cambie la luz en la montaña. Doble lente térmica anti-vaho para no perderte nada de la bajada.",
    imageSeed: "anon-m4-goggles",
  },

  // ---------- ROPA ----------
  {
    id: "ropa-001",
    slug: "volcom-hydro-puff-jacket",
    name: "Campera Hydro Puff",
    brand: "Volcom",
    category: "ropa",
    price: 89000,
    shortDescription: "Campera técnica impermeable para nieve y días de frío intenso.",
    description:
      "La Hydro Puff combina relleno sintético con una membrana impermeable para bancarse una jornada entera en la nieve o una noche de invierno en la calle. Corte relajado, capucha ajustable.",
    imageSeed: "volcom-hydropuff",
    variantLabel: "Talle",
    variants: ROPA_TALLES,
    featured: true,
  },
  {
    id: "ropa-002",
    slug: "burton-dryride-pants",
    name: "Pantalón Dryride",
    brand: "Burton",
    category: "ropa",
    price: 85000,
    shortDescription: "Pantalón técnico para snowboard, costuras selladas.",
    description:
      "Tecnología Dryride que repele agua y viento sin perder transpirabilidad. Costuras selladas y refuerzos en zona de bota, pensado para las bajadas más largas.",
    imageSeed: "burton-dryride-pants",
    variantLabel: "Talle",
    variants: ROPA_TALLES,
  },
  {
    id: "ropa-003",
    slug: "element-cornell-hoodie",
    name: "Buzo Canguro Cornell",
    brand: "Element",
    category: "ropa",
    price: 42000,
    shortDescription: "Buzo de algodón grueso, el básico de todo skater.",
    description:
      "El Cornell es el buzo que no puede faltar en el placard: algodón grueso, bolsillo canguro y capucha forrada. Cómodo para andar en tabla y para el día a día.",
    imageSeed: "element-cornell-hoodie",
    variantLabel: "Talle",
    variants: ROPA_TALLES,
    isNew: true,
  },
  {
    id: "ropa-004",
    slug: "quiksilver-everyday-tee",
    name: "Remera Everyday",
    brand: "Quiksilver",
    category: "ropa",
    price: 24000,
    compareAtPrice: 30000,
    shortDescription: "Remera de algodón peinado, corte relajado.",
    description:
      "Básico de todos los días: algodón peinado de 180g, estampa al frente y corte que no aprieta. Aguanta lavado tras lavado sin perder forma.",
    imageSeed: "quiksilver-everyday-tee",
    variantLabel: "Talle",
    variants: ROPA_TALLES,
  },
  {
    id: "ropa-005",
    slug: "roxy-billie-polar",
    name: "Polar Billie",
    brand: "Roxy",
    category: "ropa",
    price: 38000,
    shortDescription: "Polar liviano ideal para las mañanas frías de Cuyo.",
    description:
      "Un polar liviano que suma calor sin volumen de más. Perfecto para usar solo en otoño o como capa media bajo la campera en invierno.",
    imageSeed: "roxy-billie-polar",
    variantLabel: "Talle",
    variants: ROPA_TALLES,
  },

  // ---------- CALZADO ----------
  {
    id: "calzado-001",
    slug: "vans-old-skool",
    name: "Zapatillas Old Skool",
    brand: "Vans",
    category: "calzado",
    price: 78000,
    shortDescription: "El clásico de la franja lateral que nunca pasa de moda.",
    description:
      "La Old Skool es la zapatilla que definió la estética skate desde 1977. Suela waffle para máximo agarre en la tabla y una durabilidad que aguanta rodadas y asfalto por igual.",
    imageSeed: "vans-oldskool",
    variantLabel: "Talle",
    variants: CALZADO_TALLES,
    featured: true,
  },
  {
    id: "calzado-002",
    slug: "vans-sk8-hi",
    name: "Zapatillas Sk8-Hi",
    brand: "Vans",
    category: "calzado",
    price: 85000,
    shortDescription: "Caña alta con refuerzo de tobillo para skate serio.",
    description:
      "La versión de caña alta de la Old Skool, pensada para quienes buscan protección extra de tobillo sin resignar el estilo callejero de siempre.",
    imageSeed: "vans-sk8hi",
    variantLabel: "Talle",
    variants: CALZADO_TALLES,
  },
  {
    id: "calzado-003",
    slug: "converse-chuck-70",
    name: "Zapatillas Chuck 70",
    brand: "Converse",
    category: "calzado",
    price: 72000,
    shortDescription: "La reedición premium del modelo más icónico del calzado urbano.",
    description:
      "Materiales más nobles y una suela con mejor amortiguación que la Chuck original, manteniendo la silueta que se volvió uniforme urbano en todo el mundo.",
    imageSeed: "converse-chuck70",
    variantLabel: "Talle",
    variants: CALZADO_TALLES,
    isNew: true,
  },
  {
    id: "calzado-004",
    slug: "dc-court-graffik",
    name: "Zapatillas Court Graffik",
    brand: "DC Shoes",
    category: "calzado",
    price: 68000,
    compareAtPrice: 84000,
    shortDescription: "Base ancha y suela de goma vulcanizada para skate técnico.",
    description:
      "Diseñada junto a skaters profesionales, la Court Graffik prioriza estabilidad y sensibilidad sobre la tabla, con una suela vulcanizada que responde en cada truco.",
    imageSeed: "dc-courtgraffik",
    variantLabel: "Talle",
    variants: CALZADO_TALLES,
  },

  // ---------- ACCESORIOS ----------
  {
    id: "accesorios-001",
    slug: "volcom-stone-snapback",
    name: "Gorra Stone Snapback",
    brand: "Volcom",
    category: "accesorios",
    price: 22000,
    shortDescription: "Gorra estructurada con logo bordado, ajuste snapback.",
    description:
      "Gorra de seis paneles con frente estructurado y logo Stone bordado. Cierre snapback ajustable para que quede a medida sin importar el corte de pelo del día.",
    imageSeed: "volcom-stone-snapback",
  },
  {
    id: "accesorios-002",
    slug: "burton-multipath-mochila",
    name: "Mochila Multipath 25L",
    brand: "Burton",
    category: "accesorios",
    price: 38000,
    shortDescription: "25 litros con compartimento para notebook y porta tabla.",
    description:
      "Pensada para el día completo: compartimento acolchado para notebook, bolsillo de acceso rápido y sistema de sujeción para llevar la tabla cuando el auto queda lejos.",
    imageSeed: "burton-multipath-mochila",
    featured: true,
  },
  {
    id: "accesorios-003",
    slug: "quiksilver-trucker-cap",
    name: "Gorra Trucker",
    brand: "Quiksilver",
    category: "accesorios",
    price: 18000,
    shortDescription: "Malla trasera transpirable, frente con logo clásico.",
    description:
      "La trucker de toda la vida: frente de algodón con logo bordado y malla trasera que deja circular el aire en los días de calor cuyano.",
    imageSeed: "quiksilver-trucker",
  },
  {
    id: "accesorios-004",
    slug: "vonzipper-anteojos-sol",
    name: "Anteojos de Sol Elmore",
    brand: "VonZipper",
    category: "accesorios",
    price: 32000,
    compareAtPrice: 40000,
    shortDescription: "Lente polarizado con protección UV400.",
    description:
      "Marco liviano de acetato y lente polarizado con protección UV400, ideal para los días de sol fuerte tanto en la ciudad como en la montaña.",
    imageSeed: "vonzipper-elmore",
    isNew: true,
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(
  category: string,
  slug: string
): Product | undefined {
  return products.find(
    (product) => product.category === category && product.slug === slug
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getBrands(productList: Product[]): string[] {
  return Array.from(new Set(productList.map((product) => product.brand))).sort();
}

export function getAllBrands(): string[] {
  return getBrands(products);
}

export function brandSlug(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getBrandBySlug(slug: string): string | undefined {
  return getAllBrands().find((brand) => brandSlug(brand) === slug);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((product) => product.brand === brand);
}

export function getSaleProducts(): Product[] {
  return products
    .filter((product) => product.compareAtPrice !== undefined)
    .sort(
      (a, b) =>
        1 - b.price / (b.compareAtPrice ?? b.price) -
        (1 - a.price / (a.compareAtPrice ?? a.price))
    );
}
