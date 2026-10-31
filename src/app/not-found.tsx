import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="flex flex-col items-center py-28 text-center">
          <p className="font-display text-8xl font-extrabold text-brand-200">404</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">
            Sahifa topilmadi
          </h1>
          <p className="mt-3 max-w-md text-muted">
            Siz izlagan sahifa ko&apos;chirilgan yoki mavjud emas. Bosh sahifadan davom eting.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/" className={buttonStyles({ variant: "primary", size: "lg" })}>
              Bosh sahifa
            </Link>
            <Link href="/ustalar" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Ustalarni ko‘rish
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
