import { z } from "zod";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";

const categorySlugs = categories.map((category) => category.slug);

/** "+998 90 123 45 67" → "+998901234567". Noto‘g‘ri bo‘lsa null. */
export function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (/^998\d{9}$/.test(digits)) return `+${digits}`;
  if (/^\d{9}$/.test(digits)) return `+998${digits}`;
  return null;
}

const phone = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const normalized = normalizePhone(value);
    if (!normalized) {
      ctx.addIssue({ code: "custom", message: "Telefon raqami noto‘g‘ri. Masalan: +998 90 123 45 67" });
      return z.NEVER;
    }
    return normalized;
  });

const category = z
  .string()
  .refine((value) => categorySlugs.includes(value), "Xizmat turini tanlang");
const city = z
  .string()
  .refine((value) => (cities as readonly string[]).includes(value), "Shaharni tanlang");

export const orderTimes = [
  "Imkon qadar tezroq",
  "Bugun",
  "Ertaga",
  "Shu hafta ichida",
  "Vaqtni keyin kelishamiz",
] as const;

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Ismingizni kiriting").max(80, "Ism juda uzun"),
  phone,
  category,
  city,
  time: z.enum(orderTimes, "Vaqtni tanlang").catch(orderTimes[0]),
  details: z
    .string()
    .trim()
    .min(10, "Muammoni kamida 10 ta belgi bilan yozing")
    .max(1000, "Matn 1000 belgidan oshmasligi kerak"),
  masterId: z.string().trim().max(80).optional().or(z.literal("")),
});

export const experienceOptions = [
  "1 yildan kam",
  "1–3 yil",
  "3–5 yil",
  "5–10 yil",
  "10 yildan ko‘p",
] as const;

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Ism va familiyangizni kiriting").max(80, "Ism juda uzun"),
  phone,
  category: z
    .string()
    .refine((value) => categorySlugs.includes(value), "Yo‘nalishni tanlang"),
  city,
  experience: z.enum(experienceOptions).catch(experienceOptions[1]),
  telegram: z.string().trim().max(40, "Telegram nomi juda uzun").optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email noto‘g‘ri"),
  password: z.string().min(1, "Parolni kiriting").max(200),
});

export const masterSchema = z.object({
  name: z.string().trim().min(2, "Ism kiriting").max(80),
  phone: z.union([z.literal(""), phone]),
  profession: z.string().trim().min(2, "Kasbni kiriting").max(80),
  category,
  city,
  experience: z.coerce.number({ error: "Raqam kiriting" }).int().min(0).max(60),
  priceFrom: z.coerce.number({ error: "Raqam kiriting" }).int().min(0).max(100_000_000),
  responseMinutes: z.coerce.number({ error: "Raqam kiriting" }).int().min(1).max(1440),
  bio: z.string().trim().min(10, "Kamida 10 ta belgi yozing").max(600),
  skills: z.string().trim().max(300).default(""),
  services: z.string().trim().max(2000).default(""),
  verified: z.coerce.boolean().default(false),
  status: z.enum(["active", "hidden"]).default("active"),
});

export const orderStatusSchema = z.enum(["new", "in_progress", "done", "cancelled"]);

/** Zod xatolarini { maydon: "birinchi xabar" } ko‘rinishiga keltiradi. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in result)) result[key] = issue.message;
  }
  return result;
}

/** "Nomi | 120000" qatorlarini ro‘yxatga aylantiradi. */
export function parseServices(text: string): { name: string; price: number }[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, price] = line.split("|").map((part) => part.trim());
      return { name: name ?? "", price: Number((price ?? "").replace(/\D/g, "")) };
    })
    .filter((service) => service.name && Number.isFinite(service.price))
    .slice(0, 20);
}

export function parseSkills(text: string): string[] {
  return text
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)
    .slice(0, 12);
}
