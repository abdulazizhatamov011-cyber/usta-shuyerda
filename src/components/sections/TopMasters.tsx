import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { MasterCard } from "@/components/ui/MasterCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedMasters } from "@/server/masters";

export async function TopMasters() {
  const featured = await getFeaturedMasters(4);
  if (featured.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Eng yaxshilar"
          title="Yuqori reytingli ustalar"
          description="Mijozlar eng ko‘p tavsiya qilgan tasdiqlangan mutaxassislar."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((master) => (
            <li key={master.id}>
              <MasterCard master={master} />
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/ustalar" className={buttonStyles({ variant: "outline", size: "lg" })}>
            Barcha ustalarni ko‘rish
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
