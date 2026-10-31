import { BadgeCheck, Headset, ShieldCheck, WalletCards } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Tasdiqlangan ustalar",
    text: "Pasport, telefon va tajriba tekshiriladi. Yolg‘on profillarga yo‘l yo‘q.",
  },
  {
    icon: WalletCards,
    title: "Shaffof narxlar",
    text: "Xizmat narxlari oldindan ko‘rinadi. Ish oxirida kutilmagan hisob bo‘lmaydi.",
  },
  {
    icon: ShieldCheck,
    title: "30 kun kafolat",
    text: "Sifatsiz ish bo‘lsa, usta uni bepul tuzatadi yoki pulingiz qaytariladi.",
  },
  {
    icon: Headset,
    title: "Tezkor yordam",
    text: "Telegram va telefon orqali o‘zbek va rus tilida yordam beramiz.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Nega UstaTop"
            title="Ishonch — bizning asosiy mahsulotimiz"
            description="Ustani topishdagi eng katta qiyinchilik — ishonch. Biz uni jarayonning har bir bosqichiga joylaymiz."
          />
          <div className="mt-8 inline-flex items-center gap-4 rounded-3xl border border-brand-200 bg-white p-5 shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-100 font-display text-2xl font-extrabold text-accent-600">
              4.8
            </span>
            <p className="text-sm leading-6 text-muted">
              Pilot ustalarimiz uchun maqsad:
              <br />
              <strong className="text-ink">o‘rtacha reyting kamida 4.8 / 5</strong>
            </p>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <reason.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{reason.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
