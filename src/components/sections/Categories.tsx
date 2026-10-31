import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/format";

export function Categories() {
  return (
    <section id="xizmatlar" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Xizmatlar"
          title="Kerakli xizmatni tanlang"
          description="Kundalik muammolardan tortib katta ta’mirgacha — har bir yo‘nalishda sinalgan ustalar."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/ustalar?kategoriya=${category.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-50/60 hover:shadow-xl hover:shadow-brand-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition duration-300 group-hover:rotate-6 group-hover:bg-brand-600 group-hover:text-white">
                  <CategoryIcon name={category.icon} className="size-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {category.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {category.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="font-semibold text-brand-800">
                    {formatPrice(category.priceFrom)} dan
                  </span>
                  <ArrowRight
                    className="size-5 text-brand-400 transition group-hover:translate-x-1 group-hover:text-brand-700"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
