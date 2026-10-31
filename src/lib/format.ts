export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so‘m`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Qidiruv uchun: kichik harf va o‘zbek apostroflarini olib tashlaydi. */
export function normalize(value: string): string {
  return value.toLowerCase().replace(/[‘’ʻʼ'`]/g, "").trim();
}

const dateTimeFormat = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Asia/Tashkent",
});

/** ISO sanani Toshkent vaqti bilan "31.10.2026, 14:05" ko‘rinishida beradi. */
export function formatDateTime(iso: string): string {
  return dateTimeFormat.format(new Date(iso));
}

export function pluralize(count: number, one: string, many: string): string {
  return count === 1 ? one : many;
}
