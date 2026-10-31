"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveMasterAction, type MasterFormState } from "@/app/admin/actions";
import { Field, inputClass } from "@/components/forms/Field";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import type { Master } from "@/types";
import { SubmitButton } from "./SubmitButton";

export function MasterEditor({ master }: { master?: Master }) {
  const [state, action] = useActionState<MasterFormState, FormData>(saveMasterAction, {});
  const errors = state.errors ?? {};

  // Xatoda foydalanuvchi kiritgan qiymatlar saqlanib qoladi.
  const value = (key: string, fallback: string | number | undefined) =>
    state.values?.[key] ?? String(fallback ?? "");

  const servicesText =
    master?.services.map((service) => `${service.name} | ${service.price}`).join("\n") ?? "";

  const verified = state.values ? state.values.verified === "on" : (master?.verified ?? false);

  return (
    <form action={action} className="space-y-6 rounded-3xl border border-line bg-white p-6 sm:p-8">
      {master && <input type="hidden" name="id" value={master.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ism va familiya" htmlFor="name" error={errors.name}>
          <input id="name" name="name" defaultValue={value("name", master?.name)} aria-invalid={!!errors.name} className={inputClass} />
        </Field>
        <Field label="Telefon" htmlFor="phone" error={errors.phone} hint="Saytda ko‘rinmaydi, faqat admin uchun.">
          <input id="phone" name="phone" type="tel" defaultValue={value("phone", master?.phone)} placeholder="+998 90 123 45 67" aria-invalid={!!errors.phone} className={inputClass} />
        </Field>
        <Field label="Kasbi (sarlavha)" htmlFor="profession" error={errors.profession}>
          <input id="profession" name="profession" defaultValue={value("profession", master?.profession)} placeholder="Masalan, Santexnik" aria-invalid={!!errors.profession} className={inputClass} />
        </Field>
        <Field label="Yo‘nalish" htmlFor="category" error={errors.category}>
          <select id="category" name="category" defaultValue={value("category", master?.category)} aria-invalid={!!errors.category} className={inputClass}>
            <option value="">Tanlang...</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Shahar" htmlFor="city" error={errors.city}>
          <select id="city" name="city" defaultValue={value("city", master?.city)} aria-invalid={!!errors.city} className={inputClass}>
            <option value="">Tanlang...</option>
            {cities.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Tajriba (yil)" htmlFor="experience" error={errors.experience}>
          <input id="experience" name="experience" type="number" min={0} max={60} defaultValue={value("experience", master?.experience ?? 0)} aria-invalid={!!errors.experience} className={inputClass} />
        </Field>
        <Field label="Boshlang‘ich narx (so‘m)" htmlFor="priceFrom" error={errors.priceFrom}>
          <input id="priceFrom" name="priceFrom" type="number" min={0} step={1000} defaultValue={value("priceFrom", master?.priceFrom ?? 0)} aria-invalid={!!errors.priceFrom} className={inputClass} />
        </Field>
        <Field label="O‘rtacha javob vaqti (daqiqa)" htmlFor="responseMinutes" error={errors.responseMinutes}>
          <input id="responseMinutes" name="responseMinutes" type="number" min={1} max={1440} defaultValue={value("responseMinutes", master?.responseMinutes ?? 30)} aria-invalid={!!errors.responseMinutes} className={inputClass} />
        </Field>
      </div>

      <Field label="Usta haqida" htmlFor="bio" error={errors.bio}>
        <textarea id="bio" name="bio" rows={4} defaultValue={value("bio", master?.bio)} aria-invalid={!!errors.bio} className={inputClass} />
      </Field>

      <Field label="Ko‘nikmalar" htmlFor="skills" error={errors.skills} hint="Vergul bilan ajrating: Quvur almashtirish, Avariya, ...">
        <input id="skills" name="skills" defaultValue={value("skills", master?.skills.join(", "))} className={inputClass} />
      </Field>

      <Field label="Xizmatlar va narxlar" htmlFor="services" error={errors.services} hint="Har qatorda bitta: Nomi | narx (so‘mda). Masalan: Kran almashtirish | 80000">
        <textarea id="services" name="services" rows={5} defaultValue={value("services", servicesText)} className={`${inputClass} font-mono text-sm`} />
      </Field>

      <div className="flex flex-wrap items-center gap-6 rounded-2xl bg-surface p-4">
        <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
          <input type="checkbox" name="verified" defaultChecked={verified} className="size-5 cursor-pointer rounded accent-brand-600" />
          Tasdiqlangan usta
        </label>
        <label className="inline-flex items-center gap-3 text-sm font-semibold text-ink">
          Holati
          <select name="status" defaultValue={value("status", master?.status ?? "active")} className={`${inputClass} w-auto py-2`}>
            <option value="active">Saytda ko‘rinadi</option>
            <option value="hidden">Yashirin</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <SubmitButton>{master ? "Saqlash" : "Usta qo‘shish"}</SubmitButton>
        <Link href="/admin/ustalar" className={buttonStyles({ variant: "outline", size: "lg" })}>
          Bekor qilish
        </Link>
      </div>
    </form>
  );
}
