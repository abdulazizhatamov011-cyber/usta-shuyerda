import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider",
            tone === "dark" ? "text-brand-600" : "text-accent-300",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-6 rounded-full",
              tone === "dark" ? "bg-accent-400" : "bg-accent-300",
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-7 sm:text-lg",
            tone === "dark" ? "text-muted" : "text-brand-100",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
