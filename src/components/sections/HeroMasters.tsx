"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Lock, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { Master } from "@/types";

export type HeroMaster = Pick<
  Master,
  | "id"
  | "name"
  | "profession"
  | "city"
  | "rating"
  | "reviewCount"
  | "completedJobs"
  | "experience"
  | "priceFrom"
  | "verified"
  | "responseMinutes"
  | "tone"
>;

const ROTATE_MS = 5000;

export function HeroMasters({ masters }: { masters: HeroMaster[] }) {
  const [activeId, setActiveId] = useState(masters[0]?.id);
  // Kursor/fokus kartada bo‘lsa vaqtincha, foydalanuvchi o‘zi tanlasa butunlay to‘xtaydi.
  const [hovered, setHovered] = useState(false);
  const [chosen, setChosen] = useState(false);
  const autoplay = masters.length > 1 && !hovered && !chosen;

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setActiveId((current) => {
        const index = masters.findIndex((master) => master.id === current);
        return masters[(index + 1) % masters.length].id;
      });
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [autoplay, masters]);

  const active = masters.find((master) => master.id === activeId) ?? masters[0];
  if (!active) return null;

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none"
    >
      <div className="absolute inset-6 rotate-3 rounded-[2.5rem] bg-linear-to-br from-brand-500 to-brand-800" aria-hidden />
      <div className="pattern-star-light absolute inset-6 rotate-3 rounded-[2.5rem]" aria-hidden />

      <div className="relative mx-auto w-[88%] rounded-[2rem] border border-line bg-white p-5 shadow-2xl shadow-brand-950/20">
        <div className="flex items-center justify-between">
          <p className="font-display font-bold text-ink">Eng yuqori reyting</p>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
            Top {masters.length}
          </span>
        </div>

        <div key={active.id} className="mt-4 animate-pop rounded-2xl bg-surface p-4">
          <div className="flex items-center gap-3">
            <Avatar name={active.name} tone={active.tone} />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 truncate font-bold text-ink">
                <span className="truncate">{active.name}</span>
                {active.verified && (
                  <BadgeCheck className="size-4 shrink-0 fill-brand-500 text-white" aria-hidden />
                )}
              </p>
              <p className="truncate text-sm text-muted">
                {active.profession} · {active.city}
              </p>
            </div>
            <Rating value={active.rating} count={active.reviewCount} />
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Tajriba" value={`${active.experience} yil`} />
            <Stat label="Ishlar" value={`${active.completedJobs} ta`} />
            <Stat label="Javob" value={`${active.responseMinutes} daq`} />
          </dl>
        </div>

        <ul className="mt-4 space-y-1.5" aria-label="Yuqori reytingli ustalar">
          {masters.map((master, index) => {
            const selected = master.id === active.id;
            return (
              <li key={master.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setActiveId(master.id);
                    setChosen(true);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-2.5 py-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                    selected
                      ? "border-brand-300 bg-brand-50"
                      : "border-transparent hover:bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                      selected ? "bg-brand-600 text-white" : "bg-surface text-muted",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-ink">{master.name}</span>
                    <span className="block truncate text-xs text-muted">{master.profession}</span>
                  </span>
                  <Rating value={master.rating} />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-brand-50 px-4 py-3">
          <div>
            <p className="text-xs text-muted">Boshlang‘ich narx</p>
            <p className="font-display text-lg font-extrabold text-brand-800">
              {formatPrice(active.priceFrom)}
            </p>
          </div>
          <Link
            href={`/ustalar/${active.id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            Profil
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <FloatingChip className="-top-4 left-6 sm:left-10" delay="0s" icon={<Zap className="size-4 text-accent-600" />}>
        {active.responseMinutes} daqiqada javob
      </FloatingChip>
      <FloatingChip className="-bottom-4 right-4 sm:right-8" delay="1.5s" icon={<Lock className="size-4 text-brand-600" />}>
        Xavfsiz to‘lov
      </FloatingChip>
      <FloatingChip className="-bottom-4 left-4 sm:left-8" delay="3s" icon={<Briefcase className="size-4 text-brand-600" />}>
        {active.completedJobs} ta ish bajarilgan
      </FloatingChip>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white px-2 py-2">
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className="text-sm font-extrabold text-ink">{value}</dd>
    </div>
  );
}

function FloatingChip({
  children,
  icon,
  className,
  delay,
}: {
  children: ReactNode;
  icon: ReactNode;
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
