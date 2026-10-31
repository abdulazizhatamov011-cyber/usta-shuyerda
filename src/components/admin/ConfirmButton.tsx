"use client";

import type { ReactNode } from "react";

/** Server action'ni (ixtiyoriy tasdiqlash bilan) tugma sifatida chaqiradi. */
export function ConfirmButton({
  action,
  fields,
  confirmText,
  className,
  title,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields: Record<string, string | number>;
  confirmText?: string;
  className?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (confirmText && !window.confirm(confirmText)) event.preventDefault();
      }}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button type="submit" title={title} className={className}>
        {children}
      </button>
    </form>
  );
}
