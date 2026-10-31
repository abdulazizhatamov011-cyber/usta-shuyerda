"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard, UserPlus, Users } from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  { href: "/admin", label: "Boshqaruv", icon: LayoutDashboard, exact: true },
  { href: "/admin/buyurtmalar", label: "Buyurtmalar", icon: ClipboardList, badge: "orders" },
  { href: "/admin/arizalar", label: "Arizalar", icon: UserPlus, badge: "applications" },
  { href: "/admin/ustalar", label: "Ustalar", icon: Users },
] as const;

export function AdminNav({ badges }: { badges: { orders: number; applications: number } }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin menyu" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {items.map((item) => {
        const active = "exact" in item ? pathname === item.href : pathname.startsWith(item.href);
        const count = "badge" in item ? badges[item.badge] : 0;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition",
              active
                ? "bg-white/15 text-white"
                : "text-brand-200 hover:bg-white/10 hover:text-white",
            )}
          >
            <item.icon className="size-5" aria-hidden />
            {item.label}
            {count > 0 && (
              <span className="ml-auto rounded-full bg-accent-400 px-2 py-0.5 text-xs font-extrabold text-ink">
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
