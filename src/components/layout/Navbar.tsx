"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/site";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition duration-300",
        scrolled || open
          ? "border-line bg-white/85 backdrop-blur-xl"
          : "border-transparent bg-white/60 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Asosiy menyu" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-brand-50 hover:text-brand-800",
                isActive(link.href) ? "bg-brand-50 text-brand-800" : "text-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/usta-bolish" className={buttonStyles({ variant: "ghost" })}>
            Usta bo‘lish
          </Link>
          <Link href="/buyurtma" className={buttonStyles({ variant: "primary" })}>
            Buyurtma berish
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-ink transition hover:bg-brand-50 lg:hidden"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-2xl px-4 py-3 text-base font-semibold text-ink transition hover:bg-brand-50",
                isActive(link.href) && "bg-brand-50 text-brand-800",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href="/usta-bolish"
              onClick={close}
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Usta bo‘lish
            </Link>
            <Link
              href="/buyurtma"
              onClick={close}
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Buyurtma
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
