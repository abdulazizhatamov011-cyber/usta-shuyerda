"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search, SearchX, SlidersHorizontal } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { MasterCard } from "@/components/ui/MasterCard";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { cn } from "@/lib/cn";
import { filterMasters, type MasterSort } from "@/lib/master-filter";
import type { Master } from "@/types";

type Sort = MasterSort;

const sortLabels: Record<Sort, string> = {
  rating: "Reyting bo‘yicha",
  price: "Arzonroq avval",
  experience: "Tajriba bo‘yicha",
};

export function MasterExplorer({
  masters,
  initialQuery = "",
  initialCity = "",
  initialCategory = "",
}: {
  masters: Master[];
  initialQuery?: string;
  initialCity?: string;
  initialCategory?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>("rating");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const results = useMemo(
    () => filterMasters(masters, { q: query, city, category, sort, onlyVerified }),
    [masters, query, city, category, sort, onlyVerified],
  );

  const reset = () => {
    setQuery("");
    setCity("");
    setCategory("");
    setOnlyVerified(false);
  };

  const controlClass =
    "h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

  return (
    <div>
      <div className="rounded-3xl border border-line bg-white p-4 shadow-lg shadow-brand-900/5 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr]">
          <label className="relative block">
            <span className="sr-only">Usta yoki xizmat qidirish</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-500"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ism, kasb yoki xizmat..."
              className={cn(controlClass, "pl-12")}
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Shahar</span>
            <MapPin
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-500"
              aria-hidden
            />
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={cn(controlClass, "cursor-pointer pl-12")}
            >
              <option value="">Barcha shaharlar</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="relative block">
            <span className="sr-only">Saralash</span>
            <SlidersHorizontal
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-500"
              aria-hidden
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className={cn(controlClass, "cursor-pointer pl-12")}
            >
              {(Object.keys(sortLabels) as Sort[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip active={category === ""} onClick={() => setCategory("")}>
            Hammasi
          </Chip>
          {categories.map((item) => (
            <Chip
              key={item.slug}
              active={category === item.slug}
              onClick={() => setCategory(item.slug)}
            >
              {item.name}
            </Chip>
          ))}
        </div>

        <label className="mt-4 inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(event) => setOnlyVerified(event.target.checked)}
            className="size-5 cursor-pointer rounded accent-brand-600"
          />
          Faqat tasdiqlangan ustalar
        </label>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        <strong className="text-ink">{results.length}</strong> ta usta topildi
      </p>

      {results.length > 0 ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((master) => (
            <li key={master.id}>
              <MasterCard master={master} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 flex flex-col items-center rounded-3xl border border-dashed border-brand-300 bg-brand-50/60 px-6 py-16 text-center">
          <SearchX className="size-12 text-brand-400" aria-hidden />
          <h2 className="mt-4 font-display text-xl font-bold text-ink">
            Hech narsa topilmadi
          </h2>
          <p className="mt-2 max-w-md text-muted">
            Filtrlarni o‘zgartirib ko‘ring yoki bizga buyurtma qoldiring, mos
            ustani o‘zimiz topamiz.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className={buttonStyles({ variant: "outline" })}>
              Filtrlarni tozalash
            </button>
            <Link href="/buyurtma" className={buttonStyles({ variant: "primary" })}>
              Buyurtma qoldirish
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25"
          : "border-line bg-white text-brand-900 hover:border-brand-400 hover:bg-brand-50",
      )}
    >
      {children}
    </button>
  );
}
