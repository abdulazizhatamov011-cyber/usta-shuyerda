import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Master } from "@/types";
import { Avatar } from "./Avatar";
import { Rating } from "./Rating";

export function MasterCard({ master }: { master: Master }) {
  return (
    <Link
      href={`/ustalar/${master.id}`}
      className="group relative flex flex-col rounded-3xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div className="flex items-start gap-4">
        <Avatar name={master.name} tone={master.tone} />
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 truncate font-display text-lg font-bold text-ink">
            {master.name}
            {master.verified && (
              <BadgeCheck
                className="size-5 shrink-0 fill-brand-500 text-white"
                aria-label="Tasdiqlangan usta"
              />
            )}
          </h3>
          <p className="truncate text-sm text-muted">{master.profession}</p>
        </div>
        <ArrowUpRight
          className="size-5 shrink-0 text-brand-300 transition group-hover:text-brand-600"
          aria-hidden
        />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted">
          <MapPin className="size-4 text-brand-500" aria-hidden />
          <dt className="sr-only">Shahar</dt>
          <dd>{master.city}</dd>
        </div>
        <div className="flex items-center gap-1.5 text-muted">
          <Clock className="size-4 text-brand-500" aria-hidden />
          <dt className="sr-only">Javob vaqti</dt>
          <dd>~{master.responseMinutes} daqiqa</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <div>
          <Rating value={master.rating} count={master.reviewCount} />
          <p className="mt-0.5 text-xs text-muted">
            {master.completedJobs} ta bajarilgan ish
          </p>
        </div>
        <p className="text-right">
          <span className="block text-xs text-muted">dan boshlab</span>
          <span className="font-display text-base font-extrabold text-brand-800">
            {formatPrice(master.priceFrom)}
          </span>
        </p>
      </div>
    </Link>
  );
}
