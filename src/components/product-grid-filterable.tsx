"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/product-card";

type SortOption = "relevancia" | "precio-asc" | "precio-desc";

const SORT_OPTIONS: SortOption[] = ["relevancia", "precio-asc", "precio-desc"];

function isSortOption(value: string): value is SortOption {
  return (SORT_OPTIONS as string[]).includes(value);
}

export default function ProductGridFilterable({
  products,
  brands,
}: {
  products: Product[];
  brands: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawBrand = searchParams.get("marca");
  const brandFilter =
    rawBrand && brands.includes(rawBrand) ? rawBrand : "todas";

  const rawSort = searchParams.get("orden");
  const sort: SortOption =
    rawSort && isSortOption(rawSort) ? rawSort : "relevancia";

  function updateParam(key: "marca" | "orden", value: string, defaultValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  const filtered = useMemo(() => {
    const base =
      brandFilter === "todas"
        ? products
        : products.filter((product) => product.brand === brandFilter);

    if (sort === "precio-asc") {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sort === "precio-desc") {
      return [...base].sort((a, b) => b.price - a.price);
    }
    return base;
  }, [products, brandFilter, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <FilterSelect
          label="Marca"
          value={brandFilter}
          onChange={(value) => updateParam("marca", value, "todas")}
          options={[
            { value: "todas", label: "Todas las marcas" },
            ...brands.map((brand) => ({ value: brand, label: brand })),
          ]}
        />
        <FilterSelect
          label="Orden"
          value={sort}
          onChange={(value) => updateParam("orden", value, "relevancia")}
          options={[
            { value: "relevancia", label: "Relevancia" },
            { value: "precio-asc", label: "Precio: menor a mayor" },
            { value: "precio-desc", label: "Precio: mayor a menor" },
          ]}
        />
        <p className="ml-auto text-xs text-paper-dim">
          {filtered.length}{" "}
          {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-line bg-ink-soft p-10 text-center text-sm text-paper-dim">
          No encontramos productos con ese filtro.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-2 text-xs font-semibold tracking-wide text-paper-dim uppercase">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-paper focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-ink-soft text-paper">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
