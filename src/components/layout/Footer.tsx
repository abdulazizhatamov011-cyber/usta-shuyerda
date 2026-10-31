import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <div className="pattern-star-light absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-6 text-brand-200">
              O‘zbekistondagi eng ishonchli ustalarni bir joyda jamlaymiz. Tez,
              xavfsiz va halol xizmat.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Xizmatlar
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/ustalar?kategoriya=${category.slug}`}
                    className="transition hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Kompaniya
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/qanday-ishlaydi" className="transition hover:text-white">
                  Qanday ishlaydi
                </Link>
              </li>
              <li>
                <Link href="/yol-xaritasi" className="transition hover:text-white">
                  Yo‘l xaritasi
                </Link>
              </li>
              <li>
                <Link href="/ustalar-uchun" className="transition hover:text-white">
                  Ustalar uchun
                </Link>
              </li>
              <li>
                <Link href="/usta-bolish" className="transition hover:text-white">
                  Usta bo‘lish
                </Link>
              </li>
              <li>
                <Link href="/savollar" className="transition hover:text-white">
                  Ko‘p so‘raladigan savollar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Aloqa
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-accent-300" aria-hidden />
                {site.contact.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-accent-300" aria-hidden />
                {site.contact.email}
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="size-4 text-accent-300" aria-hidden />
                {site.contact.telegram}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. Barcha huquqlar himoyalangan.</p>
          <p>Saytdagi ustalar va sharhlar — demo ma’lumotlar</p>
        </div>
      </Container>
    </footer>
  );
}
