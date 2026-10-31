# UstaTop

O‘zbekistondagi ishonchli ustalarni (santexnik, elektrik, ta’mirlash, tozalash, repetitor va h.k.)
topish va xavfsiz buyurtma berish platformasi. **2026–2027** yillar uchun startap loyihasi.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 ·
SQLite (`node:sqlite`) · Zod · lucide-react

> Loyihada Next.js 16 ishlatilgan. Kod yozishdan oldin `node_modules/next/dist/docs/` ni ko‘ring,
> chunki ba’zi API lar eski versiyalardan farq qiladi (`AGENTS.md`).

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # keyin SESSION_SECRET va ADMIN_PASSWORD ni to‘ldiring
npm run dev
```

- Sayt: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin> (email/parol — `.env.local` dagi `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

Birinchi ishga tushishda `data/ustatop.db` yaratiladi, 9 ta **demo usta** bilan to‘ldiriladi va
`.env.local` dagi admin yaratiladi. Baza fayli git ga kirmaydi.

Production: `npm run build && npm start`.

## Tuzilma

```
src/
  app/
    (site)/            ommaviy sahifalar:
                         /  /xizmatlar  /qanday-ishlaydi  /ustalar  /ustalar/[id]
                         /ustalar-uchun  /yol-xaritasi  /savollar  /buyurtma  /usta-bolish
    admin/
      login/           kirish sahifasi
      (panel)/         himoyalangan sahifalar: boshqaruv, buyurtmalar, arizalar, ustalar
      actions.ts       barcha admin Server Action lari
    api/               ommaviy REST API
  components/          sections/ (bosh sahifa), ui/, forms/, admin/, layout/
  server/              faqat serverda ishlaydigan qatlam (db, ustalar, buyurtmalar, arizalar, sessiya)
  lib/                 validation.ts (Zod, klient va server uchun umumiy), format, filter
  data/                kategoriyalar, shaharlar, kontent, demo ustalar (seed)
  proxy.ts             /admin uchun optimistik himoya
```

## Ommaviy API

| Usul | Yo‘l | Tavsif |
| --- | --- | --- |
| GET | `/api/masters?q=&category=&city=&verified=1&sort=rating\|price\|experience` | Ustalar ro‘yxati |
| GET | `/api/masters/:id` | Bitta usta |
| POST | `/api/orders` | Yangi buyurtma (JSON). Limit: 10 daqiqada 5 ta |
| POST | `/api/applications` | Usta arizasi (JSON). Limit: 30 daqiqada 3 ta |

Xatolar: `422 { errors: { maydon: "xabar" } }`, `400`, `429 { error }`. Telefon raqamlari ommaviy javoblarda chiqmaydi.

## Admin panel

- **Boshqaruv** — statistika, 7 kunlik grafik, so‘nggi buyurtma va arizalar
- **Buyurtmalar** — holat bo‘yicha filtr, holatni o‘zgartirish, o‘chirish
- **Arizalar** — tasdiqlash (usta profili avtomatik yaratiladi), rad etish
- **Ustalar** — qo‘shish, tahrirlash, tasdiqlash belgisi, yashirish, o‘chirish

Admin o‘zgartirishi saytdagi keshni darhol yangilaydi (`updateTag("masters")`).

### Xavfsizlik

- Parollar `scrypt` bilan hash qilinadi; sessiya — HMAC bilan imzolangan `httpOnly` cookie (7 kun)
- Har bir admin ma’lumot funksiyasi va Server Action sessiyani **o‘zi** tekshiradi (`requireAdmin()`), `proxy.ts` faqat birinchi to‘siq
- Kirishga urinishlar cheklangan (rate limit), mavjud bo‘lmagan email uchun ham parol tekshiruvi vaqti bir xil
- Ommaviy formalar server tomonda Zod bilan qayta tekshiriladi

## Ma’lumotlar bazasini almashtirish

SQLite fayli bitta serverda yaxshi ishlaydi, lekin **Vercel kabi serverless muhitda saqlanmaydi**.
Productionga chiqishdan oldin Postgres (Neon, Supabase) ga o‘ting. Buning uchun faqat
`src/server/*` ichidagi so‘rovlar o‘zgaradi, sahifalar va API ga tegish shart emas.

## Hali qilinmagan (keyingi qadamlar)

- Parolni tiklash va bir nechta admin boshqaruvi
- Haqiqiy sharhlar va reyting hisoblash; ustaga buyurtmani yo‘naltirish va xabarnoma (Telegram bot)
- Payme / Click / Uzum orqali to‘lov
- Rate limit hozir xotirada: bir nechta server nusxasida Redis kerak
- `node:sqlite` hozircha “experimental” deb belgilangan (ishga tushganda ogohlantirish chiqadi)

## Eslatma

Saytdagi ustalar, sharhlar va aloqa ma’lumotlari (`src/lib/site.ts`) — **namunaviy**. Haqiqiy
ma’lumotlar bilan almashtiring.
