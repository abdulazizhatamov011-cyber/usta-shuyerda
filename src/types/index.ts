export type IconName =
  | "wrench"
  | "zap"
  | "hammer"
  | "sparkles"
  | "graduation"
  | "truck"
  | "appliance"
  | "snowflake";

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  /** Odatdagi boshlang‘ich narx (so‘m) */
  priceFrom: number;
}

export interface ServiceItem {
  name: string;
  price: number;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Master {
  id: string;
  name: string;
  profession: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experience: number;
  priceFrom: number;
  verified: boolean;
  responseMinutes: number;
  bio: string;
  skills: string[];
  services: ServiceItem[];
  reviews: Review[];
  /** Avatar gradient varianti (0–4) */
  tone: number;
  /** "hidden" — saytda ko‘rinmaydi (faqat adminda) */
  status: MasterStatus;
  phone: string;
}

export type MasterStatus = "active" | "hidden";
export type OrderStatus = "new" | "in_progress" | "done" | "cancelled";
export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface Order {
  id: number;
  name: string;
  phone: string;
  category: string;
  city: string;
  timePref: string;
  details: string;
  masterId: string | null;
  masterName: string | null;
  status: OrderStatus;
  createdAt: string;
}

export interface Application {
  id: number;
  name: string;
  phone: string;
  category: string;
  city: string;
  experience: string;
  telegram: string;
  status: ApplicationStatus;
  masterId: string | null;
  createdAt: string;
}

export interface RoadmapStep {
  period: string;
  title: string;
  items: string[];
  status: "done" | "current" | "next";
}

export interface Faq {
  question: string;
  answer: string;
}
