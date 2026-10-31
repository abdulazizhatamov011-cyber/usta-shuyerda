import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "santexnik",
    name: "Santexnik",
    description: "Quvur, kran, unitaz, suv isitgich o‘rnatish va ta’mirlash",
    icon: "wrench",
    priceFrom: 80_000,
  },
  {
    slug: "elektrik",
    name: "Elektrik",
    description: "Rozetka, o‘tkazgich, avtomat, yoritgich va shield ishlari",
    icon: "zap",
    priceFrom: 70_000,
  },
  {
    slug: "tamirlash",
    name: "Ta’mirlash ustasi",
    description: "Kvartira va uy ta’miri, kafel, gipsokarton, bo‘yoq",
    icon: "hammer",
    priceFrom: 150_000,
  },
  {
    slug: "tozalash",
    name: "Tozalash",
    description: "Uy, ofis va ta’mirdan keyingi professional tozalash",
    icon: "sparkles",
    priceFrom: 120_000,
  },
  {
    slug: "repetitor",
    name: "Repetitor",
    description: "Ingliz tili, matematika, IELTS va maktab fanlari",
    icon: "graduation",
    priceFrom: 90_000,
  },
  {
    slug: "yuk-tashish",
    name: "Yuk tashish",
    description: "Ko‘chirish, mebel va maishiy buyumlar tashish, yuk ko‘targichlar",
    icon: "truck",
    priceFrom: 100_000,
  },
  {
    slug: "maishiy-texnika",
    name: "Maishiy texnika",
    description: "Kir yuvish mashinasi, muzlatgich, changyutgich ta’miri",
    icon: "appliance",
    priceFrom: 60_000,
  },
  {
    slug: "konditsioner",
    name: "Konditsioner",
    description: "O‘rnatish, tozalash, freon to‘ldirish va ta’mirlash",
    icon: "snowflake",
    priceFrom: 90_000,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
