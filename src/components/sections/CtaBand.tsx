import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

export function CtaBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-center sm:px-16">
          <div className="pattern-star-light absolute inset-0" aria-hidden />
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-accent-400/30 blur-3xl" aria-hidden />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Bugun muammoni hal qiling, ertaga kutmang
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-brand-100">
              Birinchi buyurtmangizni bering — bu bepul va hech qanday majburiyatsiz.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/buyurtma" className={buttonStyles({ variant: "accent", size: "lg" })}>
                Buyurtma berish
                <ArrowRight className="size-5" aria-hidden />
              </Link>
              <Link href="/usta-bolish" className={buttonStyles({ variant: "light", size: "lg" })}>
                Usta sifatida qo‘shilish
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
