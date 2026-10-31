import { Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  // Hali sharhi yo‘q yangi ustalar uchun 0.0 o‘rniga "Yangi" ko‘rsatamiz.
  if (count === 0) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-sm font-bold text-brand-700", className)}>
        <Sparkles className="size-4 text-accent-500" aria-hidden />
        Yangi usta
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1 text-sm font-bold", className)}
      aria-label={`Reyting ${value.toFixed(1)} / 5`}
    >
      <Star className="size-4 fill-accent-400 text-accent-400" aria-hidden />
      {value.toFixed(1)}
      {count !== undefined && (
        <span className="font-medium text-muted">({count})</span>
      )}
    </span>
  );
}
