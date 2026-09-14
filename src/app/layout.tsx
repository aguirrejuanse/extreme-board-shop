import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Extreme Board Shop | Skate, Snow y Streetwear en Mendoza y San Juan",
    template: "%s | Extreme Board Shop",
  },
  description:
    "Tienda de skate, snowboard, ropa y calzado urbano en Mendoza y San Juan. Tablas completas, indumentaria técnica y accesorios de las mejores marcas.",
  keywords: [
    "skate Mendoza",
    "snowboard San Juan",
    "tienda de skate Argentina",
    "tablas de snowboard",
    "streetwear Mendoza",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Extreme Board Shop",
    title: "Extreme Board Shop | Skate, Snow y Streetwear",
    description:
      "Tablas, indumentaria y accesorios de skate y snowboard con despacho a Mendoza, San Juan y todo el país.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Extreme Board Shop",
    description:
      "Skate, snow y streetwear con identidad cuyana. Envíos a Mendoza, San Juan y todo el país.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${anton.variable} ${archivo.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
