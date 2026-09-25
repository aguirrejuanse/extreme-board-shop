import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/productos/${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-line"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(min-width: 1024px) 20vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity group-hover:from-ink/95" />
      <div className="relative p-5">
        <p className="font-display text-2xl tracking-tight text-paper">
          {category.name}
        </p>
        {/* Always visible below lg (no reliable hover on touch); on desktop it
            keeps the reveal-on-hover treatment. */}
        <p className="mt-1 text-xs text-paper-dim transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
          {category.tagline}
        </p>
      </div>
    </Link>
  );
}
