import Link from "next/link";
import { Phone, Trash2 } from "lucide-react";
import { deleteOrderAction } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { PageHeader } from "@/components/admin/PageHeader";
import { orderStatusLabels } from "@/components/admin/status";
import { getCategory } from "@/data/categories";
import { cn } from "@/lib/cn";
import { formatDateTime } from "@/lib/format";
import { orderStatusSchema } from "@/lib/validation";
import { getOrders } from "@/server/admin-queries";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { status: raw } = await searchParams;
  const parsed = orderStatusSchema.safeParse(Array.isArray(raw) ? raw[0] : raw);
  const status = parsed.success ? parsed.data : undefined;
  const orders = await getOrders(status);

  const tabs = [
    { label: "Hammasi", href: "/admin/buyurtmalar", active: !status },
    ...(Object.keys(orderStatusLabels) as (keyof typeof orderStatusLabels)[]).map((value) => ({
      label: orderStatusLabels[value],
      href: `/admin/buyurtmalar?status=${value}`,
      active: status === value,
    })),
  ];

  return (
    <>
      <PageHeader title="Buyurtmalar" description="Mijozlardan kelgan so‘rovlar. Holatni shu yerdan o‘zgartiring." />

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              tab.active
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-line bg-white text-brand-900 hover:border-brand-400",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {orders.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-brand-300 bg-white px-6 py-16 text-center text-muted">
          Bu bo‘limda buyurtma yo‘q.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-line bg-white">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-bold">#</th>
                <th className="px-5 py-3 font-bold">Mijoz</th>
                <th className="px-5 py-3 font-bold">Xizmat</th>
                <th className="px-5 py-3 font-bold">Muammo</th>
                <th className="px-5 py-3 font-bold">Sana</th>
                <th className="px-5 py-3 font-bold">Holat</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((order) => (
                <tr key={order.id} className="align-top">
                  <td className="px-5 py-4 font-bold text-ink">{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{order.name}</p>
                    <a
                      href={`tel:${order.phone}`}
                      className="mt-0.5 inline-flex items-center gap-1.5 text-brand-700 hover:underline"
                    >
                      <Phone className="size-3.5" aria-hidden />
                      {order.phone}
                    </a>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{getCategory(order.category)?.name}</p>
                    <p className="text-muted">{order.city}</p>
                    <p className="text-xs text-muted">{order.timePref}</p>
                    {order.masterName && (
                      <p className="mt-1 text-xs font-semibold text-brand-700">→ {order.masterName}</p>
                    )}
                  </td>
                  <td className="max-w-xs px-5 py-4 text-muted">
                    <p className="line-clamp-3" title={order.details}>{order.details}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted">{formatDateTime(order.createdAt)}</td>
                  <td className="px-5 py-4">
                    <OrderStatusSelect key={`${order.id}-${order.status}`} id={order.id} status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ConfirmButton
                      action={deleteOrderAction}
                      fields={{ id: order.id }}
                      confirmText={`#${order.id} buyurtmani o‘chirishni tasdiqlaysizmi?`}
                      title="O‘chirish"
                      className="rounded-xl p-2 text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="size-4" aria-hidden />
                      <span className="sr-only">O‘chirish</span>
                    </ConfirmButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
