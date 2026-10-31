"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { categories, getCategory } from "@/data/categories";
import { cities } from "@/data/cities";
import { postJson } from "@/lib/api-client";
import { fieldErrors, orderSchema, orderTimes } from "@/lib/validation";
import { Field, inputClass } from "./Field";

interface PickedMaster {
  id: string;
  name: string;
  profession: string;
  city: string;
  category: string;
}

export function OrderForm({
  master,
  categorySlug,
}: {
  master?: PickedMaster;
  categorySlug?: string;
}) {
  const initialCategory = master?.category ?? categorySlug ?? "";

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ name: string; category: string } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      category: String(data.get("category") ?? ""),
      city: String(data.get("city") ?? ""),
      time: String(data.get("time") ?? ""),
      details: String(data.get("details") ?? ""),
      masterId: master?.id ?? "",
    };

    setFormError("");
    const parsed = orderSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});

    setPending(true);
    const result = await postJson("/api/orders", payload);
    setPending(false);

    if (result.ok) {
      setDone({ name: payload.name.trim(), category: getCategory(payload.category)?.name ?? "" });
    } else {
      setErrors(result.errors);
      setFormError(result.message ?? "");
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-xl shadow-brand-900/10 sm:p-12">
        <CheckCircle2 className="mx-auto size-16 text-brand-600" aria-hidden />
        <h2 className="mt-5 font-display text-2xl font-extrabold text-ink">
          Rahmat, {done.name}!
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted">
          «{done.category}» bo‘yicha buyurtmangiz qabul qilindi. Usta tez orada
          siz bilan bog‘lanadi.
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
      {master && (
        <p className="mb-6 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
          Tanlangan usta: <strong>{master.name}</strong> · {master.profession}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ismingiz" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Masalan, Azizbek"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field label="Telefon raqamingiz" htmlFor="phone" error={errors.phone}>
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

        <Field label="Xizmat turi" htmlFor="category" error={errors.category}>
          <select
            id="category"
            name="category"
            defaultValue={initialCategory}
            aria-invalid={!!errors.category}
            className={inputClass}
          >
            <option value="">Tanlang...</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Shahar" htmlFor="city" error={errors.city}>
          <select
            id="city"
            name="city"
            defaultValue={master?.city ?? ""}
            aria-invalid={!!errors.city}
            className={inputClass}
          >
            <option value="">Tanlang...</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Qachon kerak?" htmlFor="time" className="sm:col-span-2">
          <select id="time" name="time" className={inputClass}>
            {orderTimes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field
          label="Muammoni tasvirlab bering"
          htmlFor="details"
          error={errors.details}
          hint="Qanchalik aniq yozsangiz, usta shunchalik to‘g‘ri narx aytadi."
          className="sm:col-span-2"
        >
          <textarea
            id="details"
            name="details"
            rows={5}
            placeholder="Masalan: oshxonadagi kran oqyapti, almashtirish kerak."
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
            className={inputClass}
          />
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
        {pending ? "Yuborilmoqda..." : "Buyurtma yuborish"}
      </button>
      <p className="mt-4 text-center text-xs text-muted">
        Yuborish orqali siz foydalanish shartlariga rozilik bildirasiz.
      </p>
    </form>
  );
}
