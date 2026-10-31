import Link from "next/link";
import { BadgeCheck, Eye, EyeOff, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteMasterAction, setMasterStatusAction, toggleVerifiedAction } from "@/app/admin/actions";
import { Badge } from "@/components/admin/Badge";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { masterStatusLabels } from "@/components/admin/status";
import { Avatar } from "@/components/ui/Avatar";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { getCategory } from "@/data/categories";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { getAdminMasters } from "@/server/admin-queries";

const iconButton =
  "rounded-xl p-2 text-zinc-400 transition hover:bg-brand-50 hover:text-brand-700";

export default async function AdminMastersPage() {
  const masters = await getAdminMasters();

  return (
    <>
      <PageHeader
        title="Ustalar"
        description={`Jami ${masters.length} ta usta. Yashirin ustalar saytda ko‘rinmaydi.`}
        actions={
          <Link href="/admin/ustalar/yangi" className={buttonStyles({ variant: "primary" })}>
            <Plus className="size-4" aria-hidden />
            Yangi usta
          </Link>
        }
      />

      <div className="overflow-x-auto rounded-3xl border border-line bg-white">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-bold">Usta</th>
              <th className="px-5 py-3 font-bold">Yo‘nalish</th>
              <th className="px-5 py-3 font-bold">Reyting</th>
              <th className="px-5 py-3 font-bold">Narx</th>
              <th className="px-5 py-3 font-bold">Holat</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {masters.map((master) => (
              <tr key={master.id} className="align-middle">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={master.name} tone={master.tone} size="sm" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 font-semibold text-ink">
                        {master.name}
                        {master.verified && (
                          <BadgeCheck className="size-4 fill-brand-500 text-white" aria-label="Tasdiqlangan" />
                        )}
                      </p>
                      <p className="text-xs text-muted">{master.city}{master.phone && ` · ${master.phone}`}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted">{getCategory(master.category)?.name}</td>
                <td className="px-5 py-4 text-muted">
                  {master.reviewCount > 0 ? `${master.rating.toFixed(1)} (${master.reviewCount})` : "Yangi"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-muted">{formatPrice(master.priceFrom)}</td>
                <td className="px-5 py-4">
                  <Badge
                    tone={
                      master.status === "active"
                        ? "bg-brand-100 text-brand-800 ring-brand-200"
                        : "bg-zinc-100 text-zinc-600 ring-zinc-200"
                    }
                  >
                    {masterStatusLabels[master.status]}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-0.5">
                    <ConfirmButton
                      action={toggleVerifiedAction}
                      fields={{ id: master.id, verified: master.verified ? "0" : "1" }}
                      title={master.verified ? "Tasdiqni olib tashlash" : "Tasdiqlash"}
                      className={cn(iconButton, master.verified && "text-brand-600")}
                    >
                      <BadgeCheck className="size-4" aria-hidden />
                      <span className="sr-only">Tasdiqlash holatini almashtirish</span>
                    </ConfirmButton>
                    <ConfirmButton
                      action={setMasterStatusAction}
                      fields={{ id: master.id, status: master.status === "active" ? "hidden" : "active" }}
                      title={master.status === "active" ? "Yashirish" : "Saytda ko‘rsatish"}
                      className={iconButton}
                    >
                      {master.status === "active" ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                      <span className="sr-only">Ko‘rinishni almashtirish</span>
                    </ConfirmButton>
                    {master.status === "active" && (
                      <Link href={`/ustalar/${master.id}`} target="_blank" title="Saytda ochish" className={iconButton}>
                        <ExternalLink className="size-4" aria-hidden />
                        <span className="sr-only">Saytda ochish</span>
                      </Link>
                    )}
                    <Link href={`/admin/ustalar/${master.id}`} title="Tahrirlash" className={iconButton}>
                      <Pencil className="size-4" aria-hidden />
                      <span className="sr-only">Tahrirlash</span>
                    </Link>
                    <ConfirmButton
                      action={deleteMasterAction}
                      fields={{ id: master.id }}
                      confirmText={`${master.name} profilini butunlay o‘chirishni tasdiqlaysizmi?`}
                      title="O‘chirish"
                      className="rounded-xl p-2 text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="size-4" aria-hidden />
                      <span className="sr-only">O‘chirish</span>
                    </ConfirmButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
