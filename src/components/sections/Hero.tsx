import Link from "next/link";
import { Search } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { getFeaturedMasters } from "@/server/masters";
import { HeroLocationFields } from "./HeroLocationFields";
import { HeroMasters, type HeroMaster } from "./HeroMasters";

const quickLinks = categories.slice(0, 5);

export async function Hero() {
  const featured = await getFeaturedMasters(4);
  const top: HeroMaster[] = featured.map(
    ({ id, name, profession, city, rating, reviewCount, completedJobs, experience, priceFrom, verified, responseMinutes, tone }) => ({
      id, name, profession, city, rating, reviewCount, completedJobs, experience, priceFrom, verified, responseMinutes, tone,
    }),
  );

  return (
    <section className="relative bg-linear-to-b from-brand-50 via-white to-white">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="pattern-star absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
        <div className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-200/50 blur-3xl" aria-hidden />
        <div className="absolute -left-24 top-60 size-80 rounded-full bg-accent-200/40 blur-3xl" aria-hidden />
      </div>

      <Container className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-800 shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
            </span>
            2026 oxirida Toshkentda ishga tushmoqda
          </p>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Ishonchli usta —{" "}
            <span className="relative whitespace-nowrap text-brand-600">
              bir necha daqiqada
              <svg
                className="absolute -bottom-2 left-0 w-full text-accent-400"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8c60-7 140-8 296-2"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Santexnik, elektrik, ta’mirchi, tozalash va repetitor. Tasdiqlangan
            ustalarni solishtiring, narxni oldindan biling va xavfsiz
            buyurtma bering.
          </p>

          <form
            action="/ustalar"
            className="mt-8 max-w-2xl rounded-3xl border border-line bg-white p-2 shadow-xl shadow-brand-900/10"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="flex flex-1 items-center gap-3 px-4 py-2">
                <Search className="size-5 shrink-0 text-brand-500" aria-hidden />
                <span className="sr-only">Qanday xizmat kerak?</span>
                <input
                  name="q"
                  type="search"
                  placeholder="Qanday xizmat kerak? Masalan, santexnik"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted/70"
                />
              </label>
              <button type="submit" className={buttonStyles({ variant: "primary", size: "lg" })}>
                Qidirish
              </button>
            </div>
            <div className="mt-2 flex flex-col border-t border-line pt-2 sm:flex-row sm:items-center">
              <HeroLocationFields />
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted">Mashhur:</span>
            {quickLinks.map((category) => (
              <Link
                key={category.slug}
                href={`/ustalar?kategoriya=${category.slug}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ["8+", "xizmat turi"],
              ["0 so‘m", "buyurtma berish"],
              ["30 kun", "ish kafolati"],
            ].map(([value, label]) => (
              <li key={label}>
                <p className="font-display text-2xl font-extrabold text-brand-700 sm:text-3xl">
                  {value}
                </p>
                <p className="text-sm text-muted">{label}</p>
              </li>
            ))}
          </ul>
        </div>

        {top.length > 0 && <HeroMasters masters={top} />}
      </Container>
    </section>
  );
}
