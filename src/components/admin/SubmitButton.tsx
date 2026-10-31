"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { buttonStyles } from "@/components/ui/buttonStyles";

export function SubmitButton({
  children,
  pendingText = "Saqlanmoqda...",
  className,
}: {
  children: ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={buttonStyles({ variant: "primary", size: "lg", className })}
    >
      {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
      {pending ? pendingText : children}
    </button>
  );
}
