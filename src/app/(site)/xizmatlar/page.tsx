import type { Metadata } from "next";
import { Categories } from "@/components/sections/Categories";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Xizmatlar",
  description:
    "UstaTop xizmatlari: santexnik, elektrik, ta’mirlash, tozalash, repetitor, yuk tashish, maishiy texnika va konditsioner ustalari.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Uy va ish uchun kerakli barcha ustalar"
        description="Sakkiz yo‘nalishdagi tasdiqlangan mutaxassislar. Yo‘nalishni tanlang va narx, reyting bo‘yicha solishtiring."
      />
      <Categories />
      <CtaBand />
    </>
  );
}
