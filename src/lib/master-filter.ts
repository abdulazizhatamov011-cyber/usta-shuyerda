import type { Master } from "@/types";
import { normalize } from "./format";

export type MasterSort = "rating" | "price" | "experience";

export interface MasterFilters {
  q?: string;
  category?: string;
  city?: string;
  onlyVerified?: boolean;
  sort?: MasterSort;
}

/** Sayt (klient) va ommaviy API bir xil qoidadan foydalanadi. */
export function filterMasters(masters: Master[], filters: MasterFilters): Master[] {
  const q = normalize(filters.q ?? "");

  return masters
    .filter((master) => {
      if (filters.category && master.category !== filters.category) return false;
      if (filters.city && master.city !== filters.city) return false;
      if (filters.onlyVerified && !master.verified) return false;
      if (!q) return true;
      const haystack = normalize(
        [master.name, master.profession, master.city, ...master.skills].join(" "),
      );
      return haystack.includes(q);
    })
    .sort((a, b) => {
      if (filters.sort === "price") return a.priceFrom - b.priceFrom;
      if (filters.sort === "experience") return b.experience - a.experience;
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });
}

/** Ommaviy API uchun: telefon kabi ichki maydonlarni olib tashlaydi. */
export function toPublicMaster(master: Master): Omit<Master, "phone" | "status"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { phone, status, ...rest } = master;
  return rest;
}
