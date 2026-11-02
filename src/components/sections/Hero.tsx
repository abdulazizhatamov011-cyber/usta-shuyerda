import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Lock,
  Search,
  Zap,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { categories } from "@/data/categories";
import { HeroLocationFields } from "./HeroLocationFields";

const quickLinks = categories.slice(0, 5);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 via-white to-white">
      <div className="pattern-star absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
      <div className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-200/50 blur-3xl" aria-hidden />
      <div className="absolute -left-24 top-60 size-80 rounded-full bg-accent-200/40 blur-3xl" aria-hidden />

      <Container className="relative grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-28 lg:pt-20">
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

        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none">
      <div className="absolute inset-6 rotate-3 rounded-[2.5rem] bg-linear-to-br from-brand-500 to-brand-800" aria-hidden />
      <div className="pattern-star-light absolute inset-6 rotate-3 rounded-[2.5rem]" aria-hidden />

      <div className="relative mx-auto w-[88%] rounded-[2rem] border border-line bg-white p-5 shadow-2xl shadow-brand-950/20">
        <div className="flex items-center justify-between">
          <p className="font-display font-bold text-ink">Buyurtma #1284</p>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
            Yo‘lda
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface p-3">
          <Avatar name="Jasur Karimov" tone={0} />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 truncate font-bold text-ink">
              Jasur Karimov
              <BadgeCheck className="size-4 shrink-0 fill-brand-500 text-white" aria-hidden />
            </p>
            <p className="text-sm text-muted">Santexnik · Toshkent</p>
          </div>
          <Rating value={4.9} />
        </div>

        <ol className="mt-5 space-y-3">
          {[
            ["Buyurtma qabul qilindi", true],
            ["Usta yo‘lga chiqdi", true],
            ["Ish bajarilmoqda", false],
            ["To‘lov va sharh", false],
          ].map(([label, done]) => (
            <li key={label as string} className="flex items-center gap-3 text-sm">
              <span
                className={`flex size-6 items-center justify-center rounded-full ${
                  done ? "bg-brand-600 text-white" : "border-2 border-line text-transparent"
                }`}
              >
                <CheckCircle2 className="size-4" aria-hidden />
              </span>
              <span className={done ? "font-semibold text-ink" : "text-muted"}>
                {label as string}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted">Kelishilgan narx</span>
          <span className="font-display text-lg font-extrabold text-brand-800">
            180 000 so‘m
          </span>
        </div>
      </div>

      <FloatingChip className="-left-1 top-10 sm:-left-4" delay="0s" icon={<Zap className="size-4 text-accent-600" />}>
        12 daqiqada javob
      </FloatingChip>
      <FloatingChip className="-right-1 top-1/2 sm:-right-4" delay="1.5s" icon={<Lock className="size-4 text-brand-600" />}>
        Xavfsiz to‘lov
      </FloatingChip>
      <FloatingChip className="-bottom-2 left-4 sm:left-8" delay="3s" icon={<Clock className="size-4 text-brand-600" />}>
        Bugun, 18:30 da
      </FloatingChip>
    </div>
  );
}

function FloatingChip({
  children,
  icon,
  className,
  delay,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className: string;
  delay: string;
}) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`absolute flex animate-float items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 text-sm font-bold text-ink shadow-xl shadow-brand-900/10 ${className}`}
    >
      {icon}
      {children}
    </div>
  );
}
