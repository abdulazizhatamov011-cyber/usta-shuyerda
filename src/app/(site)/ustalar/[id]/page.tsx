import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Clock,
  MapPin,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { getCategory } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { getPublicMaster, getPublicMasters } from "@/server/masters";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return (await getPublicMasters()).map((master) => ({ id: master.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const master = await getPublicMaster(id);
  if (!master) return { title: "Usta topilmadi" };
  return {
    title: `${master.name} — ${master.profession}, ${master.city}`,
    description: master.bio,
  };
}

export default async function MasterPage({ params }: { params: Params }) {
  const { id } = await params;
  const master = await getPublicMaster(id);
  if (!master) notFound();

  const category = getCategory(master.category);
  const orderHref = `/buyurtma?usta=${master.id}&kategoriya=${master.category}`;

  const stats = [
    {
      icon: ThumbsUp,
      label: "Reyting",
      value: master.reviewCount > 0 ? master.rating.toFixed(1) : "Yangi",
    },
    { icon: Briefcase, label: "Bajarilgan ish", value: String(master.completedJobs) },
    { icon: ShieldCheck, label: "Tajriba", value: `${master.experience} yil` },
    { icon: Clock, label: "Javob vaqti", value: `~${master.responseMinutes} daq.` },
  ];

  return (
    <div className="bg-surface pb-24">
      <Container className="pt-8">
        <Link
          href="/ustalar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-900"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Barcha ustalar
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Avatar name={master.name} tone={master.tone} size="lg" />
                <div>
                  <h1 className="flex flex-wrap items-center gap-2 font-display text-3xl font-extrabold text-ink">
                    {master.name}
                    {master.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                        <BadgeCheck className="size-4" aria-hidden />
                        Tasdiqlangan
                      </span>
                    )}
                  </h1>
                  <p className="mt-1 text-lg text-muted">{master.profession}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4 text-brand-500" aria-hidden />
                      {master.city}
                    </span>
                    <Rating value={master.rating} count={master.reviewCount} />
                    {category && (
                      <Link
                        href={`/ustalar?kategoriya=${category.slug}`}
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        {category.name}
                      </Link>
                    )}
                  </p>
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-surface p-4">
                    <stat.icon className="size-5 text-brand-500" aria-hidden />
                    <dd className="mt-2 font-display text-xl font-extrabold text-ink">
                      {stat.value}
                    </dd>
                    <dt className="text-xs text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">Usta haqida</h2>
              <p className="mt-3 leading-7 text-muted">{master.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {master.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">Xizmatlar va narxlar</h2>
              {master.services.length > 0 ? (
                <ul className="mt-4 divide-y divide-line">
                  {master.services.map((service) => (
                    <li
                      key={service.name}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <span className="text-ink">{service.name}</span>
                      <span className="shrink-0 font-display font-extrabold text-brand-800">
                        {formatPrice(service.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-muted">
                  Narxlar ro‘yxati hali to‘ldirilmagan. Buyurtma bering, usta narxni o‘zi aytadi.
                </p>
              )}
              <p className="mt-3 text-xs text-muted">
                Yakuniy narx ish hajmiga qarab usta bilan kelishiladi.
              </p>
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Mijozlar sharhlari
              </h2>
              {master.reviews.length > 0 ? (
                <>
                  <ul className="mt-5 space-y-4">
                    {master.reviews.map((review) => (
                      <li key={review.author + review.date} className="rounded-2xl bg-surface p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-bold text-ink">{review.author}</p>
                          <Rating value={review.rating} />
                        </div>
                        <p className="mt-2 leading-7 text-muted">{review.text}</p>
                        <p className="mt-2 text-xs text-muted/80">{review.date}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted">Demo sharhlar — namunaviy ma’lumot.</p>
                </>
              ) : (
                <p className="mt-3 text-muted">Hali sharhlar yo‘q. Birinchi bo‘lib baho bering!</p>
              )}
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-brand-200 bg-white p-6 shadow-xl shadow-brand-900/10">
              <p className="text-sm text-muted">Xizmat narxi</p>
              <p className="font-display text-3xl font-extrabold text-brand-800">
                {formatPrice(master.priceFrom)}
                <span className="ml-1 text-base font-semibold text-muted">dan</span>
              </p>

              <Link
                href={orderHref}
                className={buttonStyles({ variant: "primary", size: "lg", className: "mt-5 w-full" })}
              >
                Buyurtma berish
              </Link>

              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                  Ishga 30 kunlik kafolat
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                  Odatda ~{master.responseMinutes} daqiqada javob beradi
                </li>
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                  To‘lov ish tugagandan keyin
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
