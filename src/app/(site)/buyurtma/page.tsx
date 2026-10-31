import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/forms/OrderForm";
import { Container } from "@/components/ui/Container";
import { getPublicMaster } from "@/server/masters";

export const metadata: Metadata = {
  title: "Buyurtma berish",
  description: "Muammoni yozing — mos ustalar tez orada siz bilan bog‘lanadi. Bepul va majburiyatsiz.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function OrderPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="bg-surface">
      <Container className="max-w-3xl py-14 sm:py-20">
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Buyurtma bering
          </h1>
          <p className="mt-4 text-lg text-muted">
            Bir daqiqada to‘ldiring. Bepul va hech qanday majburiyatsiz.
          </p>
        </div>
        <Suspense fallback={<div className="h-[36rem] animate-pulse rounded-3xl bg-white" />}>
          <OrderFormLoader searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}

async function OrderFormLoader({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const usta = first(params.usta);
  const master = usta ? await getPublicMaster(usta) : undefined;

  return (
    <OrderForm
      master={master && { id: master.id, name: master.name, profession: master.profession, city: master.city, category: master.category }}
      categorySlug={first(params.kategoriya)}
    />
  );
}
