# Extreme Board Shop — Demo

Ecommerce demo para pitch en frío. Catálogo de skate, snowboard, ropa,
calzado y accesorios, carrito persistente y checkout simulado. Next.js 15
(App Router) + TypeScript + Tailwind CSS 4.

## Cómo correr

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). No hace falta ningún
paso manual adicional (sin base de datos, sin variables de entorno, sin
claves de API).

```bash
npm run build   # build de producción
npm run lint    # eslint
```

## Estructura de carpetas

```
src/
  app/
    page.tsx                          Home
    productos/[categoria]/page.tsx    Listado por categoría
    productos/[categoria]/[slug]/     Detalle de producto
    carrito/page.tsx                  Carrito
    checkout/page.tsx                 Formulario de checkout simulado
    checkout/confirmacion/page.tsx    Confirmación de pedido
    sitemap.ts / robots.ts            Metadata routes para SEO
    globals.css                       Tokens de diseño (colores, fuentes)
  components/                         UI: header, footer, cards, forms
  data/
    categories.ts                     5 categorías fijas
    products.ts                       24 productos de ejemplo
  store/
    cart-store.ts                     Estado del carrito (Zustand + persist)
  lib/
    types.ts, format.ts, image.ts, order.ts
  hooks/
    use-hydrated.ts                   Evita mismatch de hidratación con localStorage
```

## Decisiones técnicas

- **Estado del carrito — Zustand + `persist`**: el carrito se lee y escribe
  desde varios lugares no relacionados (badge del header, página de
  producto, carrito, checkout). Zustand permite que cada componente se
  suscriba solo al slice que necesita, sin envolver el árbol en un
  Provider ni re-renderizar componentes que no dependen del carrito. El
  middleware `persist` da persistencia en `localStorage` sin escribir a
  mano el `useEffect` de lectura/escritura que pediría un Context +
  useReducer. Para un MVP de este tamaño es la opción con menos código y
  menos superficie de bugs.
- **Server Components por defecto**: las páginas de listado y detalle de
  producto son Server Components — el catálogo es estático (`generateStaticParams`)
  y no necesita JS del lado del cliente para renderizarse. Solo los
  componentes con interactividad real (selector de talle, cantidad, carrito,
  formulario de checkout, filtros) son Client Components.
- **SEO**: `generateMetadata` por página y por producto (title, description,
  OpenGraph), JSON-LD `Product` en cada página de detalle, `sitemap.ts` y
  `robots.ts` dinámicos, URLs limpias (`/productos/[categoria]/[slug]`),
  imágenes con `next/image` y HTML semántico (`nav`, `header`, `main`,
  `footer`, `dl`, breadcrumbs).
- **Imágenes**: placeholders de `picsum.photos` con seed estable por
  producto (mismo producto = misma imagen siempre). Configurado el
  `remotePattern` correspondiente en `next.config.ts`.
- **Tipografía**: `Anton` (display) + `Archivo` (texto), cargadas con
  `next/font/google` — sin layout shift, sin fuentes genéricas tipo Inter.

## Qué es simulado

- El **checkout no procesa ningún pago real**. No hay integración con
  Mercado Pago, Stripe ni ninguna pasarela.
- Al confirmar el pedido se genera un número de orden en el cliente y se
  guarda en `localStorage` únicamente para poder mostrarlo en la pantalla
  de confirmación.
- No hay backend ni base de datos: todo el catálogo es un archivo estático
  TypeScript (`src/data/products.ts`).

## Próximos pasos para producción

- Pasarela de pago real (Mercado Pago es lo más común en Argentina).
- Backend/API + base de datos para catálogo, stock y órdenes.
- Autenticación de usuarios y panel de "mis pedidos".
- Panel de administración para cargar productos e imágenes reales.
- Imágenes reales de producto (hoy son placeholders de picsum.photos).
- Integración con un servicio de envíos (Correo Argentino / Andreani) para
  cotizar y trackear pedidos reales.
- Tests automatizados (unitarios de la lógica de carrito, E2E del flujo de
  compra).
