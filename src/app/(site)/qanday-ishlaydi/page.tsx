import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Qanday ishlaydi",
  description:
    "UstaTop orqali usta topish uch qadamda: xizmatni tanlang, ustalarni solishtiring, buyurtma bering. Kafolat va xavfsiz to‘lov.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="Usta topish hech qachon bunchalik oson bo‘lmagan"
        description="Buyurtmadan to ish tugagunicha har bir bosqichda sizni himoya qilamiz."
      />
      <HowItWorks />
      <WhyUs />
      <CtaBand />
    </>
  );
}
