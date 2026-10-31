import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { Roadmap } from "@/components/sections/Roadmap";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Yo‘l xaritasi",
  description:
    "UstaTop 2026–2027 yo‘l xaritasi: Toshkent pilotidan butun O‘zbekiston bo‘ylab kengayishgacha, chorakma-chorak.",
};

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        title="Biz qayerga ketyapmiz"
        description="2026-yil oxiridan 2027-yil oxirigacha bo‘lgan rejalarimiz. Har chorakda aniq natija."
      />
      <Roadmap />
      <CtaBand />
    </>
  );
}
