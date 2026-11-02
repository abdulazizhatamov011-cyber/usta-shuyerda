export const site = {
  name: "UstaTop",
  tagline: "Ishonchli usta — bir necha daqiqada",
  description:
    "UstaTop — O‘zbekistondagi tasdiqlangan ustalarni topish va xavfsiz buyurtma berish platformasi: santexnik, elektrik, ta’mirlash, tozalash, repetitor va boshqa xizmatlar.",
  url: "https://ustatop.example",
  // Quyidagi aloqa maʼlumotlari namunaviy. Haqiqiy loyihada almashtiring.
  contact: {
    email: "salom@ustatop.example",
    phone: "+998 50 020 06 84",
    telegram: "@abo_coder",
  },
} as const;

export const navLinks = [
  { href: "/xizmatlar", label: "Xizmatlar" },
  { href: "/qanday-ishlaydi", label: "Qanday ishlaydi" },
  { href: "/ustalar", label: "Ustalar" },
  { href: "/ustalar-uchun", label: "Ustalar uchun" },
  { href: "/yol-xaritasi", label: "Yo‘l xaritasi" },
] as const;
