import type { Faq, RoadmapStep } from "@/types";

export const roadmap: RoadmapStep[] = [
  {
    period: "2026 · Q4",
    title: "MVP va Toshkent pilotini ishga tushirish",
    items: [
      "Veb-sayt va buyurtma berish oqimi",
      "5 ta asosiy kategoriya, 200 ta tasdiqlangan usta",
      "Moderatsiya va hujjatlarni qo‘lda tekshirish",
    ],
    status: "current",
  },
  {
    period: "2027 · Q1",
    title: "Xavfsiz to‘lov va Telegram bot",
    items: [
      "Payme, Click va Uzum orqali himoyalangan to‘lov",
      "Telegram bot: buyurtma va xabarnomalar",
      "Reyting va sharhlar tizimi, 30 kunlik kafolat",
    ],
    status: "next",
  },
  {
    period: "2027 · Q2",
    title: "Mobil ilova va yangi shaharlar",
    items: [
      "iOS va Android ilovalar",
      "Samarqand, Buxoro va Andijonga kengayish",
      "Ustalar uchun shaxsiy kabinet va daromad hisoboti",
    ],
    status: "next",
  },
  {
    period: "2027 · Q3",
    title: "Biznes uchun yechimlar",
    items: [
      "Kompaniyalar va ofislar uchun B2B hisoblar",
      "Pro va Biznes obuna tariflari",
      "Doimiy mijozlar uchun obuna xizmatlari",
    ],
    status: "next",
  },
  {
    period: "2027 · Q4",
    title: "Butun O‘zbekiston bo‘ylab",
    items: [
      "Barcha viloyatlar, 10 000+ usta",
      "Rus va ingliz tillari",
      "Ochiq API va hamkorlik dasturi",
    ],
    status: "next",
  },
];

export const faqs: Faq[] = [
  {
    question: "UstaTop orqali buyurtma berish pullikmi?",
    answer:
      "Yo‘q. Buyurtma berish, ustalarni ko‘rish va ular bilan bog‘lanish mijozlar uchun mutlaqo bepul. Faqat ish bajarilgandan keyin usta bilan kelishilgan summani to‘laysiz.",
  },
  {
    question: "Ustalar qanday tekshiriladi?",
    answer:
      "Har bir usta pasport, telefon raqami va tajribasi bo‘yicha tekshiruvdan o‘tadi. Tekshirilgan ustalar profilida “Tasdiqlangan” belgisi paydo bo‘ladi. Keyingi bosqichda mijoz sharhlari ham reytingga ta’sir qiladi.",
  },
  {
    question: "Agar ish sifatsiz bajarilsa-chi?",
    answer:
      "Har bir ishga 30 kunlik kafolat beriladi. Muammo bo‘lsa, qo‘llab-quvvatlash xizmatiga murojaat qiling: usta ishni bepul tuzatadi yoki to‘lov sizga qaytariladi.",
  },
  {
    question: "To‘lovni qanday amalga oshiraman?",
    answer:
      "Naqd yoki Payme, Click, Uzum orqali. 2027-yil boshidan himoyalangan to‘lov ishga tushadi: pul ish tugagandan keyingina ustaga o‘tkaziladi.",
  },
  {
    question: "Men ustaman. Qanday qilib mijoz topaman?",
    answer:
      "“Usta bo‘lish” sahifasida qisqa ariza qoldiring. Profilingiz tasdiqlangach, sizga yaqin shahar va kategoriyadagi buyurtmalar kela boshlaydi. Boshlang‘ich tarif bepul.",
  },
  {
    question: "UstaTop qaysi shaharlarda ishlaydi?",
    answer:
      "2026-yil oxirida Toshkentdan boshlaymiz. 2027-yil davomida Samarqand, Buxoro, Andijon va boshqa viloyatlarga kengayamiz.",
  },
];

export const plans = [
  {
    name: "Boshlang‘ich",
    price: "Bepul",
    period: "",
    commission: "10% komissiya",
    highlight: false,
    features: [
      "Profil va narxlar ro‘yxati",
      "Oyiga 10 tagacha buyurtma",
      "Asosiy qo‘llab-quvvatlash",
    ],
  },
  {
    name: "Pro",
    price: "99 000",
    period: "so‘m / oy",
    commission: "6% komissiya",
    highlight: true,
    features: [
      "Cheksiz buyurtmalar",
      "Qidiruvda yuqori o‘rinlar",
      "“Pro” belgisi va portfolio",
      "Daromad statistikasi",
    ],
  },
  {
    name: "Biznes",
    price: "299 000",
    period: "so‘m / oy",
    commission: "4% komissiya",
    highlight: false,
    features: [
      "Jamoa uchun 5 tagacha hisob",
      "Korporativ buyurtmalar (B2B)",
      "Shaxsiy menejer",
      "Hisob-faktura va hujjatlar",
    ],
  },
] as const;
