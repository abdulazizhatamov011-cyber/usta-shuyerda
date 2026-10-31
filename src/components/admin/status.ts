import type { ApplicationStatus, MasterStatus, OrderStatus } from "@/types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  new: "Yangi",
  in_progress: "Jarayonda",
  done: "Bajarildi",
  cancelled: "Bekor qilindi",
};

export const orderStatusTone: Record<OrderStatus, string> = {
  new: "bg-accent-100 text-accent-600 ring-accent-200",
  in_progress: "bg-sky-50 text-sky-700 ring-sky-200",
  done: "bg-brand-100 text-brand-800 ring-brand-200",
  cancelled: "bg-zinc-100 text-zinc-600 ring-zinc-200",
};

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  pending: "Kutilmoqda",
  approved: "Tasdiqlandi",
  rejected: "Rad etildi",
};

export const applicationStatusTone: Record<ApplicationStatus, string> = {
  pending: "bg-accent-100 text-accent-600 ring-accent-200",
  approved: "bg-brand-100 text-brand-800 ring-brand-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const masterStatusLabels: Record<MasterStatus, string> = {
  active: "Saytda ko‘rinadi",
  hidden: "Yashirin",
};
