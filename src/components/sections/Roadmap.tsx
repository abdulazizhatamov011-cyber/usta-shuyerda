import { Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roadmap } from "@/data/content";
import { cn } from "@/lib/cn";

export function Roadmap() {
  return (
    <section id="yol-xaritasi" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Yo‘l xaritasi"
          title="2026–2027: Toshkentdan butun O‘zbekistongacha"
          description="Har chorakda aniq natija. Qadam-baqadam o‘sib boramiz."
        />

        <ol className="relative mx-auto mt-16 max-w-3xl border-l-2 border-dashed border-brand-200 pl-8 sm:pl-12">
          {roadmap.map((step) => {
            const current = step.status === "current";
            return (
              <li key={step.period} className="relative pb-12 last:pb-0">
                <span
                  className={cn(
                    "absolute -left-[2.9rem] top-0 flex size-9 items-center justify-center rounded-full ring-8 ring-white sm:-left-[4.1rem] sm:size-10",
                    current
                      ? "bg-accent-400 text-ink"
                      : "bg-brand-100 text-brand-700",
                  )}
                  aria-hidden
                >
                  {current ? (
                    <Rocket className="size-5" />
                  ) : (
                    <span className="size-2.5 rounded-full bg-brand-500" />
                  )}
                </span>

                <div
                  className={cn(
                    "rounded-3xl border p-6 transition duration-300 hover:shadow-lg hover:shadow-brand-900/10",
                    current
                      ? "border-brand-300 bg-brand-50"
                      : "border-line bg-white",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                      {step.period}
                    </span>
                    {current && (
                      <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-600">
                        Hozirgi bosqich
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-muted">
                    {step.items.map((item) => (
                      <li key={item} className="flex gap-2.5 leading-6">
                        <span
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-400"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
