import { CalendarCheck, ListChecks, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Xizmatni tanlang",
    text: "Kategoriya va shaharni belgilang yoki muammoni qisqacha yozing. Bir daqiqa ham ketmaydi.",
  },
  {
    icon: ListChecks,
    title: "Ustalarni solishtiring",
    text: "Reyting, sharhlar, tajriba va narxlarni ko‘ring. Sizga mosini o‘zingiz tanlaysiz.",
  },
  {
    icon: CalendarCheck,
    title: "Chaqiring va baholang",
    text: "Usta kelishilgan vaqtda keladi. Ish tugagach to‘laysiz va sharh qoldirasiz.",
  },
];

export function HowItWorks() {
  return (
    <section id="qanday" className="relative bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Qanday ishlaydi"
          title="Uch qadamda muammo hal"
          description="Telefon qilib, ustani qidirib, narx so‘rab yurish shart emas."
        />

        <ol className="relative mt-16 grid gap-6 lg:grid-cols-3">
          <div
            className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-brand-200 lg:block"
            aria-hidden
          />
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-line bg-white p-8 text-center shadow-sm"
            >
              <span className="relative mx-auto flex size-20 items-center justify-center rounded-3xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                <step.icon className="size-9" aria-hidden />
                <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-accent-400 font-display text-sm font-extrabold text-ink ring-4 ring-surface">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
