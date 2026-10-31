import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

const tones = [
  "from-brand-500 to-brand-800",
  "from-accent-400 to-accent-600",
  "from-sky-500 to-indigo-700",
  "from-emerald-500 to-teal-800",
  "from-rose-400 to-rose-700",
];

const sizes = {
  sm: "size-10 text-sm",
  md: "size-14 text-lg",
  lg: "size-24 text-3xl",
} as const;

export function Avatar({
  name,
  tone = 0,
  size = "md",
  className,
}: {
  name: string;
  tone?: number;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl bg-linear-to-br font-display font-extrabold text-white shadow-md",
        tones[tone % tones.length],
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
