import { Categories } from "@/components/sections/Categories";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TopMasters } from "@/components/sections/TopMasters";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <TopMasters />
      <CtaBand />
    </>
  );
}
