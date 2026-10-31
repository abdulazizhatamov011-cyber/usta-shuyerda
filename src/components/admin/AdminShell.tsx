import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { Logo } from "@/components/layout/Logo";
import { AdminNav } from "./AdminNav";

export function AdminShell({
  email,
  badges,
  children,
}: {
  email: string;
  badges: { orders: number; applications: number };
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="flex flex-col gap-4 bg-brand-950 p-4 lg:sticky lg:top-0 lg:h-screen lg:gap-8 lg:p-6">
        <div className="flex items-center justify-between gap-4">
          <Logo light />
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent-300">
            Admin
          </span>
        </div>

        <AdminNav badges={badges} />

        <div className="mt-auto hidden flex-col gap-3 border-t border-white/10 pt-5 lg:flex">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-sm font-semibold text-brand-200 transition hover:text-white"
          >
            <ExternalLink className="size-4" aria-hidden />
            Saytni ochish
          </Link>
          <p className="truncate text-xs text-brand-300" title={email}>
            {email}
          </p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <LogOut className="size-4" aria-hidden />
              Chiqish
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 lg:hidden">
          <p className="truncate text-sm text-muted">{email}</p>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-bold text-brand-700">
              Chiqish
            </button>
          </form>
        </div>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
