"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { postJson } from "@/lib/api-client";
import { applicationSchema, experienceOptions, fieldErrors } from "@/lib/validation";
import { Field, inputClass } from "./Field";

export function MasterForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [doneName, setDoneName] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      category: String(data.get("category") ?? ""),
      city: String(data.get("city") ?? ""),
      experience: String(data.get("experience") ?? ""),
      telegram: String(data.get("telegram") ?? ""),
    };

    setFormError("");
    const parsed = applicationSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});

    setPending(true);
    const result = await postJson("/api/applications", payload);
    setPending(false);

    if (result.ok) {
      setDoneName(payload.name.trim());
    } else {
      setErrors(result.errors);
      setFormError(result.message ?? "");
    }
  }

  if (doneName) {
    return (
      <div className="rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-xl shadow-brand-900/10 sm:p-12">
        <CheckCircle2 className="mx-auto size-16 text-brand-600" aria-hidden />
        <h2 className="mt-5 font-display text-2xl font-extrabold text-ink">
          Arizangiz qabul qilindi, {doneName}!
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted">
          Moderatorimiz 24 soat ichida siz bilan bog‘lanib, profilingizni
          tasdiqlaydi.
        </p>
        <Link href="/" className={buttonStyles({ variant: "primary", size: "lg", className: "mt-8" })}>
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ism va familiya" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Masalan, Jasur Karimov"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field label="Telefon raqami" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+998 90 123 45 67"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field label="Yo‘nalish" htmlFor="category" error={errors.category}>
          <select id="category" name="category" defaultValue="" aria-invalid={!!errors.category} className={inputClass}>
            <option value="">Tanlang...</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Shahar" htmlFor="city" error={errors.city}>
          <select id="city" name="city" defaultValue="" aria-invalid={!!errors.city} className={inputClass}>
            <option value="">Tanlang...</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tajriba" htmlFor="experience">
          <select id="experience" name="experience" defaultValue={experienceOptions[1]} className={inputClass}>
            {experienceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label="Telegram (ixtiyoriy)" htmlFor="telegram" error={errors.telegram}>
          <input id="telegram" name="telegram" placeholder="@username" className={inputClass} />
        </Field>
      </div>

      {formError && (
        <p role="alert" className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={buttonStyles({ variant: "primary", size: "lg", className: "mt-8 w-full" })}
      >
        {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
        {pending ? "Yuborilmoqda..." : "Ariza yuborish"}
      </button>
    </form>
  );
}
