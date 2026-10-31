import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Ko‘p so‘raladigan savollar",
  description:
    "UstaTop haqida savollar: narx, ustalarni tekshirish, kafolat, to‘lov va usta bo‘lib qo‘shilish.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Savollaringizga javoblar"
        description="Kerakli javobni topolmasangiz, Telegram orqali yozing, tez javob beramiz."
      />
      <FaqSection />
      <CtaBand />
    </>
  );
}
