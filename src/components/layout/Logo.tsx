import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
      aria-label={`${site.name} — bosh sahifa`}
    >
      <span className="relative inline-flex size-10 items-center justify-center">
        <svg viewBox="0 0 40 40" className="size-10" aria-hidden>
          <rect width="40" height="40" rx="12" className="fill-brand-600" />
          <g fill="none" stroke="#ffcb4d" strokeWidth="1.6">
            <rect x="10" y="10" width="20" height="20" />
            <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" />
          </g>
          <circle cx="20" cy="20" r="3.2" fill="#fff" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-ink",
        )}
      >
        Usta<span className={light ? "text-accent-300" : "text-brand-600"}>Top</span>
      </span>
    </Link>
  );
}
