import Link from "next/link";
import { Check } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plans } from "@/data/content";
import { cn } from "@/lib/cn";

export function ForMasters() {
  return (
    <section
      id="ustalar-uchun"
      className="relative overflow-hidden bg-brand-900 py-20 sm:py-28"
    >
      <div className="pattern-star-light absolute inset-0" aria-hidden />
      <div className="absolute -left-20 top-0 size-96 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />

      <Container className="relative">
        <SectionHeading
          tone="light"
          eyebrow="Ustalar uchun"
          title="Mijozlar o‘zi sizni topadi"
          description="Reklama va qidiruvga vaqt sarflamang. Profil oching, narxlarni belgilang, buyurtmalarni qabul qiling."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-3xl p-8",
                plan.highlight
                  ? "bg-white text-ink shadow-2xl shadow-black/30 lg:-translate-y-4"
                  : "border border-white/15 bg-white/5 text-white backdrop-blur",
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-400 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-ink">
                  Eng ommabop
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold">
                  {plan.price}
                </span>
                <span className={plan.highlight ? "text-muted" : "text-brand-200"}>
                  {plan.period}
                </span>
              </p>
              <p
                className={cn(
                  "mt-1 text-sm font-semibold",
                  plan.highlight ? "text-brand-700" : "text-accent-300",
                )}
              >
                {plan.commission}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "mt-0.5 size-5 shrink-0",
                        plan.highlight ? "text-brand-600" : "text-accent-300",
                      )}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/usta-bolish"
                className={buttonStyles({
                  variant: plan.highlight ? "primary" : "light",
                  size: "lg",
                  className: "mt-8 w-full",
                })}
              >
                Boshlash
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-brand-200">
          Tariflar pilot bosqich uchun rejalashtirilgan va o‘zgarishi mumkin.
        </p>
      </Container>
    </section>
  );
}
