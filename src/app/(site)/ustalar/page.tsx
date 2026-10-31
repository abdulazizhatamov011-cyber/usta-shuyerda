import type { Metadata } from "next";
import { Suspense } from "react";
import { MasterExplorer } from "@/components/masters/MasterExplorer";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { getPublicMasters } from "@/server/masters";

export const metadata: Metadata = {
  title: "Ustalar",
  description:
    "Tasdiqlangan ustalarni reyting, narx va shahar bo‘yicha solishtiring: santexnik, elektrik, ta’mirlash, tozalash va boshqalar.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default function MastersPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="bg-surface">
      <section className="relative overflow-hidden bg-brand-900 pb-24 pt-14 sm:pt-20">
        <div className="pattern-star-light absolute inset-0" aria-hidden />
        <Container className="relative">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ustalarni toping
          </h1>
          <p className="mt-4 max-w-xl text-lg text-brand-100">
            Reyting, narx va tajriba bo‘yicha solishtiring, so‘ng bir bosishda
            buyurtma bering.
          </p>
        </Container>
      </section>

      <Container className="-mt-14 pb-24">
        <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl bg-white" />}>
          <ExplorerLoader searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}

async function ExplorerLoader({ searchParams }: { searchParams: SearchParams }) {
  const [params, masters] = await Promise.all([searchParams, getPublicMasters()]);
  const category = first(params.kategoriya);
  const city = first(params.shahar);

  return (
    <MasterExplorer
      masters={masters}
      initialQuery={first(params.q)}
      initialCity={(cities as readonly string[]).includes(city) ? city : ""}
      initialCategory={categories.some((item) => item.slug === category) ? category : ""}
    />
  );
}
