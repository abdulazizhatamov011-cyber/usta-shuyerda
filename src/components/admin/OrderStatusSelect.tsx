"use client";

import { useTransition } from "react";
import { setOrderStatusAction } from "@/app/admin/actions";
import { cn } from "@/lib/cn";
import type { OrderStatus } from "@/types";
import { orderStatusLabels, orderStatusTone } from "./status";

export function OrderStatusSelect({ id, status }: { id: number; status: OrderStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label="Buyurtma holati"
      defaultValue={status}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value;
        startTransition(() => setOrderStatusAction(id, next));
      }}
      className={cn(
        "cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-bold outline-none ring-1 ring-inset transition focus-visible:ring-2 focus-visible:ring-brand-600 disabled:opacity-60",
        orderStatusTone[status],
      )}
    >
      {(Object.keys(orderStatusLabels) as OrderStatus[]).map((value) => (
        <option key={value} value={value}>
          {orderStatusLabels[value]}
        </option>
      ))}
    </select>
  );
}
