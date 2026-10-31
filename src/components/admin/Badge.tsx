import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset",
        tone,
      )}
    >
      {children}
    </span>
  );
}
