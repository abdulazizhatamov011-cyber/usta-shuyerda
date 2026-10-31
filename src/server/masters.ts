import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Master, MasterStatus, Review, ServiceItem } from "@/types";
import { db, transaction } from "./db";

interface MasterRow {
  id: string;
  name: string;
  phone: string;
  profession: string;
  category: string;
  city: string;
  rating: number;
  review_count: number;
  completed_jobs: number;
  experience: number;
  price_from: number;
  verified: number;
  response_minutes: number;
  bio: string;
  skills: string;
  tone: number;
  status: MasterStatus;
}

export interface MasterInput {
  name: string;
  phone: string;
  profession: string;
  category: string;
  city: string;
  experience: number;
  priceFrom: number;
  responseMinutes: number;
  bio: string;
  skills: string[];
  services: ServiceItem[];
  verified: boolean;
  status: MasterStatus;
}

const SELECT = `SELECT id, name, phone, profession, category, city, rating, review_count, completed_jobs,
  experience, price_from, verified, response_minutes, bio, skills, tone, status FROM masters`;

function hydrate(rows: MasterRow[]): Master[] {
  if (rows.length === 0) return [];
  const database = db();
  const marks = rows.map(() => "?").join(",");
  const ids = rows.map((row) => row.id);

  const services = database
    .prepare(`SELECT master_id, name, price FROM master_services WHERE master_id IN (${marks}) ORDER BY position, id`)
    .all(...ids) as unknown as { master_id: string; name: string; price: number }[];
  const reviews = database
    .prepare(`SELECT master_id, author, rating, date, text FROM master_reviews WHERE master_id IN (${marks}) ORDER BY date DESC, id DESC`)
    .all(...ids) as unknown as (Review & { master_id: string })[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    profession: row.profession,
    category: row.category,
    city: row.city,
    rating: row.rating,
    reviewCount: row.review_count,
    completedJobs: row.completed_jobs,
    experience: row.experience,
    priceFrom: row.price_from,
    verified: row.verified === 1,
    responseMinutes: row.response_minutes,
    bio: row.bio,
    skills: JSON.parse(row.skills) as string[],
    tone: row.tone,
    status: row.status,
    services: services
      .filter((service) => service.master_id === row.id)
      .map(({ name, price }) => ({ name, price })),
    reviews: reviews
      .filter((review) => review.master_id === row.id)
      .map(({ author, rating, date, text }) => ({ author, rating, date, text })),
  }));
}

/* ---------- Ommaviy (saytga) — keshlanadi, admin o‘zgartirsa yangilanadi ---------- */

export async function getPublicMasters(): Promise<Master[]> {
  "use cache";
  cacheTag("masters");
  cacheLife("hours");

  const rows = db()
    .prepare(`${SELECT} WHERE status = 'active' ORDER BY rating DESC, review_count DESC, name`)
    .all() as unknown as MasterRow[];
  return hydrate(rows);
}

export async function getPublicMaster(id: string): Promise<Master | undefined> {
  return (await getPublicMasters()).find((master) => master.id === id);
}

export async function getFeaturedMasters(count = 4): Promise<Master[]> {
  const all = await getPublicMasters();
  return all
    .filter((master) => master.verified && master.reviewCount > 0)
    .slice(0, count);
}

/* ---------- Admin ---------- */

export function listAllMasters(): Master[] {
  const rows = db().prepare(`${SELECT} ORDER BY created_at DESC, name`).all() as unknown as MasterRow[];
  return hydrate(rows);
}

export function findMaster(id: string): Master | undefined {
  const row = db().prepare(`${SELECT} WHERE id = ?`).get(id) as unknown as MasterRow | undefined;
  return row ? hydrate([row])[0] : undefined;
}

function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[‘’ʻʼ'`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "usta";
}

function uniqueId(name: string): string {
  const base = slugify(name);
  const exists = db().prepare("SELECT 1 FROM masters WHERE id = ?");
  let candidate = base;
  for (let n = 2; exists.get(candidate); n++) candidate = `${base}-${n}`;
  return candidate;
}

/** Tranzaksiya ichida chaqiring. Yaratilgan/yangilangan usta id sini qaytaradi. */
export function writeMaster(input: MasterInput, id?: string): string {
  const database = db();
  const masterId = id ?? uniqueId(input.name);

  if (id) {
    database
      .prepare(`UPDATE masters SET name=?, phone=?, profession=?, category=?, city=?, experience=?,
        price_from=?, response_minutes=?, bio=?, skills=?, verified=?, status=? WHERE id=?`)
      .run(input.name, input.phone, input.profession, input.category, input.city, input.experience,
        input.priceFrom, input.responseMinutes, input.bio, JSON.stringify(input.skills),
        input.verified ? 1 : 0, input.status, id);
    database.prepare("DELETE FROM master_services WHERE master_id = ?").run(id);
  } else {
    database
      .prepare(`INSERT INTO masters (id, name, phone, profession, category, city, experience, price_from,
        response_minutes, bio, skills, verified, status, tone, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(masterId, input.name, input.phone, input.profession, input.category, input.city,
        input.experience, input.priceFrom, input.responseMinutes, input.bio, JSON.stringify(input.skills),
        input.verified ? 1 : 0, input.status, input.name.length % 5, new Date().toISOString());
  }

  const insertService = database.prepare(
    "INSERT INTO master_services (master_id, name, price, position) VALUES (?, ?, ?, ?)",
  );
  input.services.forEach((service, index) => insertService.run(masterId, service.name, service.price, index));
  return masterId;
}

export function saveMaster(input: MasterInput, id?: string): string {
  return transaction(() => writeMaster(input, id));
}

export function deleteMaster(id: string): void {
  db().prepare("DELETE FROM masters WHERE id = ?").run(id);
}

export function setMasterFlags(id: string, flags: { verified?: boolean; status?: MasterStatus }): void {
  const database = db();
  if (flags.verified !== undefined) {
    database.prepare("UPDATE masters SET verified = ? WHERE id = ?").run(flags.verified ? 1 : 0, id);
  }
  if (flags.status !== undefined) {
    database.prepare("UPDATE masters SET status = ? WHERE id = ?").run(flags.status, id);
  }
}

export function countMasters(): { total: number; active: number; verified: number } {
  return db()
    .prepare(`SELECT COUNT(*) AS total,
      COALESCE(SUM(status = 'active'), 0) AS active,
      COALESCE(SUM(verified = 1), 0) AS verified FROM masters`)
    .get() as unknown as { total: number; active: number; verified: number };
}
