import Link from "next/link";
import { ClipboardList, Hourglass, Inbox, UserCheck, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/admin/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { applicationStatusTone, orderStatusLabels, orderStatusTone } from "@/components/admin/status";
import { getCategory } from "@/data/categories";
import { formatDateTime } from "@/lib/format";
import { getDashboard } from "@/server/admin-queries";

export default async function DashboardPage() {
  const data = await getDashboard();
  const max = Math.max(1, ...data.perDay.map((day) => day.count));

  const stats: { label: string; value: number; icon: LucideIcon; href: string; tone: string }[] = [
    { label: "Yangi buyurtmalar", value: data.orders.new, icon: Inbox, href: "/admin/buyurtmalar?status=new", tone: "bg-accent-100 text-accent-600" },
    { label: "Jarayondagi ishlar", value: data.orders.in_progress, icon: Hourglass, href: "/admin/buyurtmalar?status=in_progress", tone: "bg-sky-50 text-sky-700" },
    { label: "Kutilayotgan arizalar", value: data.pendingApplications, icon: ClipboardList, href: "/admin/arizalar", tone: "bg-rose-50 text-rose-700" },
    { label: "Faol ustalar", value: data.masters.active, icon: UserCheck, href: "/admin/ustalar", tone: "bg-brand-100 text-brand-700" },
  ];

  return (
    <>
      <PageHeader title="Boshqaruv paneli" description="Platformadagi so‘nggi holat bir qarashda." />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link
              href={stat.href}
              className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/10"
            >
              <span className={`flex size-12 items-center justify-center rounded-2xl ${stat.tone}`}>
                <stat.icon className="size-6" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-3xl font-extrabold text-ink">{stat.value}</span>
                <span className="text-sm text-muted">{stat.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-3xl border border-line bg-white p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Buyurtmalar — 7 kun</h2>
            <p className="text-sm text-muted">Jami: {data.orders.total}</p>
          </div>
          <ul className="mt-6 flex h-44 items-end gap-3">
            {data.perDay.map((day) => (
              <li key={day.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-bold text-ink">{day.count}</span>
                <span
                  className="w-full rounded-t-xl bg-linear-to-t from-brand-600 to-brand-400"
                  style={{ height: `${Math.max(4, (day.count / max) * 100)}%`, opacity: day.count ? 1 : 0.25 }}
                />
                <span className="text-xs text-muted">{day.date.slice(8)}.{day.date.slice(5, 7)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-line bg-white p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Yangi arizalar</h2>
            <Link href="/admin/arizalar" className="text-sm font-semibold text-brand-700 hover:underline">
              Hammasi
            </Link>
          </div>
          {data.recentApplications.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Kutilayotgan ariza yo‘q.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {data.recentApplications.map((application) => (
                <li key={application.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{application.name}</p>
                    <p className="truncate text-sm text-muted">
                      {getCategory(application.category)?.name} · {application.city}
                    </p>
                  </div>
                  <Badge tone={applicationStatusTone.pending}>Yangi</Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-line bg-white p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold text-ink">So‘nggi buyurtmalar</h2>
          <Link href="/admin/buyurtmalar" className="text-sm font-semibold text-brand-700 hover:underline">
            Hammasi
          </Link>
        </div>
        {data.recentOrders.length === 0 ? (
          <p className="mt-6 text-sm text-muted">Hali buyurtma yo‘q. Saytdagi forma orqali birinchisini yuboring.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {data.recentOrders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">
                    #{order.id} · {order.name}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {getCategory(order.category)?.name} · {order.city} · {formatDateTime(order.createdAt)}
                  </p>
                </div>
                <Badge tone={orderStatusTone[order.status]}>{orderStatusLabels[order.status]}</Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
