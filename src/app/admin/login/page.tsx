import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/layout/Logo";
import { getAdmin } from "@/server/session";

export const metadata: Metadata = {
  title: "Admin · Kirish",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 px-4 py-12">
      <div className="pattern-star-light absolute inset-0" aria-hidden />
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo light />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-black/30 sm:p-10">
          <h1 className="font-display text-2xl font-extrabold text-ink">Admin panelga kirish</h1>
          <p className="mb-7 mt-2 text-sm text-muted">Faqat vakolatli xodimlar uchun.</p>
          <LoginForm />
        </div>
      </div>

      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
    </div>
  );
}

async function RedirectIfSignedIn() {
  if (await getAdmin()) redirect("/admin");
  return null;
}
