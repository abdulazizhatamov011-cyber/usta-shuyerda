import "server-only";
import { getCategory } from "@/data/categories";
import type { Application, ApplicationStatus } from "@/types";
import { db, transaction } from "./db";
import { writeMaster } from "./masters";

interface ApplicationRow {
  id: number;
  name: string;
  phone: string;
  category: string;
  city: string;
  experience: string;
  telegram: string;
  status: ApplicationStatus;
  master_id: string | null;
  created_at: string;
}

export interface NewApplication {
  name: string;
  phone: string;
  category: string;
  city: string;
  experience: string;
  telegram: string;
}

export function createApplication(input: NewApplication): number {
  const result = db()
    .prepare(`INSERT INTO applications (name, phone, category, city, experience, telegram, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(input.name, input.phone, input.category, input.city, input.experience, input.telegram,
      new Date().toISOString());
  return Number(result.lastInsertRowid);
}

export function listApplications(status?: ApplicationStatus): Application[] {
  const rows = db()
    .prepare(`SELECT id, name, phone, category, city, experience, telegram, status, master_id, created_at
      FROM applications ${status ? "WHERE status = ?" : ""}
      ORDER BY (status = 'pending') DESC, created_at DESC, id DESC LIMIT 500`)
    .all(...(status ? [status] : [])) as unknown as ApplicationRow[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    category: row.category,
    city: row.city,
    experience: row.experience,
    telegram: row.telegram,
    status: row.status,
    masterId: row.master_id,
    createdAt: row.created_at,
  }));
}

export function countPendingApplications(): number {
  const row = db()
    .prepare("SELECT COUNT(*) AS count FROM applications WHERE status = 'pending'")
    .get() as unknown as { count: number };
  return row.count;
}

/** Arizani tasdiqlaydi va uning asosida usta profili yaratadi. Usta id sini qaytaradi. */
export function approveApplication(id: number): string | null {
  return transaction(() => {
    const database = db();
    const app = database
      .prepare("SELECT * FROM applications WHERE id = ? AND status = 'pending'")
      .get(id) as unknown as ApplicationRow | undefined;
    if (!app) return null;

    const category = getCategory(app.category);
    const masterId = writeMaster({
      name: app.name,
      phone: app.phone,
      profession: category?.name ?? "Usta",
      category: app.category,
      city: app.city,
      experience: experienceToYears(app.experience),
      priceFrom: category?.priceFrom ?? 0,
      responseMinutes: 30,
      bio: `${app.name} — ${category?.name.toLowerCase() ?? "usta"}, ${app.city}. Profil tez orada to‘ldiriladi.`,
      skills: [],
      services: [],
      verified: false,
      status: "active",
    });

    database
      .prepare("UPDATE applications SET status = 'approved', master_id = ? WHERE id = ?")
      .run(masterId, id);
    return masterId;
  });
}

export function rejectApplication(id: number): void {
  db().prepare("UPDATE applications SET status = 'rejected' WHERE id = ? AND status = 'pending'").run(id);
}

export function deleteApplication(id: number): void {
  db().prepare("DELETE FROM applications WHERE id = ?").run(id);
}

function experienceToYears(label: string): number {
  const numbers = label.match(/\d+/g)?.map(Number) ?? [0];
  return Math.max(...numbers);
}
