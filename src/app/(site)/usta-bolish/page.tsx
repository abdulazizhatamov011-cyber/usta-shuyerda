import type { Metadata } from "next";
import { Banknote, CalendarClock, Users } from "lucide-react";
import { MasterForm } from "@/components/forms/MasterForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Usta bo‘lish",
  description: "UstaTop ustalari safiga qo‘shiling: yangi mijozlar, qulay jadval va halol daromad.",
};

const perks = [
  { icon: Users, title: "Doimiy mijozlar oqimi", text: "Reklamaga pul sarflamang, buyurtmalar o‘zi keladi." },
  { icon: CalendarClock, title: "O‘zingiz jadval tuzasiz", text: "Qachon va qayerda ishlashni o‘zingiz hal qilasiz." },
  { icon: Banknote, title: "Shaffof to‘lov", text: "Daromadingiz va komissiya hisobda aniq ko‘rinadi." },
];

export default function BecomeMasterPage() {
  return (
    <div className="bg-surface">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Usta sifatida <span className="text-brand-600">daromadingizni oshiring</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Arizani to‘ldiring, moderatorimiz profilingizni tasdiqlaydi va
            birinchi buyurtmalar kela boshlaydi. Boshlang‘ich tarif bepul.
          </p>
          <ul className="mt-10 space-y-6">
            {perks.map((perk) => (
              <li key={perk.title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <perk.icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">{perk.title}</h2>
                  <p className="text-muted">{perk.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <MasterForm />
      </Container>
    </div>
  );
}
