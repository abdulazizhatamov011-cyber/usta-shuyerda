import Link from "next/link";
import { Check, Phone, Trash2, X } from "lucide-react";
import {
  approveApplicationAction,
  deleteApplicationAction,
  rejectApplicationAction,
} from "@/app/admin/actions";
import { Badge } from "@/components/admin/Badge";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { applicationStatusLabels, applicationStatusTone } from "@/components/admin/status";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { getCategory } from "@/data/categories";
import { formatDateTime } from "@/lib/format";
import { getApplications } from "@/server/admin-queries";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <>
      <PageHeader
        title="Usta arizalari"
        description="Tasdiqlasangiz, ariza asosida usta profili yaratiladi va saytda ko‘rinadi."
      />

      {applications.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-brand-300 bg-white px-6 py-16 text-center text-muted">
          Hozircha ariza yo‘q.
        </p>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {applications.map((application) => (
            <li key={application.id} className="flex flex-col rounded-3xl border border-line bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-bold text-ink">{application.name}</h2>
                  <p className="text-sm text-muted">
                    {getCategory(application.category)?.name} · {application.city}
                  </p>
                </div>
                <Badge tone={applicationStatusTone[application.status]}>
                  {applicationStatusLabels[application.status]}
                </Badge>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted">Telefon</dt>
                  <dd>
                    <a href={`tel:${application.phone}`} className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">
                      <Phone className="size-3.5" aria-hidden />
                      {application.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Tajriba</dt>
                  <dd className="font-semibold text-ink">{application.experience}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Telegram</dt>
                  <dd className="font-semibold text-ink">{application.telegram || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Yuborilgan</dt>
                  <dd className="font-semibold text-ink">{formatDateTime(application.createdAt)}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                {application.status === "pending" && (
                  <>
                    <ConfirmButton
                      action={approveApplicationAction}
                      fields={{ id: application.id }}
                      className={buttonStyles({ variant: "primary", size: "sm" })}
                    >
                      <Check className="size-4" aria-hidden />
                      Tasdiqlash
                    </ConfirmButton>
                    <ConfirmButton
                      action={rejectApplicationAction}
                      fields={{ id: application.id }}
                      confirmText="Arizani rad etasizmi?"
                      className={buttonStyles({ variant: "outline", size: "sm" })}
                    >
                      <X className="size-4" aria-hidden />
                      Rad etish
                    </ConfirmButton>
                  </>
                )}
                {application.masterId && (
                  <Link
                    href={`/admin/ustalar/${application.masterId}`}
                    className={buttonStyles({ variant: "outline", size: "sm" })}
                  >
                    Profilni tahrirlash
                  </Link>
                )}
                <div className="ml-auto">
                  <ConfirmButton
                    action={deleteApplicationAction}
                    fields={{ id: application.id }}
                    confirmText="Arizani o‘chirishni tasdiqlaysizmi?"
                    title="O‘chirish"
                    className="rounded-xl p-2 text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="size-4" aria-hidden />
                    <span className="sr-only">O‘chirish</span>
                  </ConfirmButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
