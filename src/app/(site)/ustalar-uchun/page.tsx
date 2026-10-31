import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { ForMasters } from "@/components/sections/ForMasters";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Ustalar uchun",
  description:
    "UstaTop ustalari uchun tariflar: bepul boshlang‘ich reja, Pro va Biznes. Yangi mijozlar, qulay jadval va shaffof daromad.",
};

export default function ForMastersPage() {
  return (
    <>
      <PageHero
        title="Mijoz izlamang, mijoz sizni topsin"
        description="Profil oching, narxlaringizni belgilang va buyurtmalarni qabul qiling. Boshlash bepul."
      />
      <ForMasters />
      <CtaBand />
    </>
  );
}
