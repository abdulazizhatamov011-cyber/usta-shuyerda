import "server-only";
import type { Order, OrderStatus } from "@/types";
import { db } from "./db";

interface OrderRow {
  id: number;
  name: string;
  phone: string;
  category: string;
  city: string;
  time_pref: string;
  details: string;
  master_id: string | null;
  master_name: string | null;
  status: OrderStatus;
  created_at: string;
}

export interface NewOrder {
  name: string;
  phone: string;
  category: string;
  city: string;
  time: string;
  details: string;
  masterId: string | null;
}

export function createOrder(input: NewOrder): number {
  const database = db();
  // Mavjud bo‘lmagan usta id si buyurtmani buzmasligi uchun tekshiramiz.
  const master = input.masterId
    ? (database.prepare("SELECT id FROM masters WHERE id = ?").get(input.masterId) as unknown as { id: string } | undefined)
    : undefined;

  const result = database
    .prepare(`INSERT INTO orders (name, phone, category, city, time_pref, details, master_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(input.name, input.phone, input.category, input.city, input.time, input.details,
      master?.id ?? null, new Date().toISOString());
  return Number(result.lastInsertRowid);
}

export function listOrders(status?: OrderStatus): Order[] {
  const rows = db()
    .prepare(`SELECT o.id, o.name, o.phone, o.category, o.city, o.time_pref, o.details, o.master_id,
        m.name AS master_name, o.status, o.created_at
      FROM orders o LEFT JOIN masters m ON m.id = o.master_id
      ${status ? "WHERE o.status = ?" : ""}
      ORDER BY o.created_at DESC, o.id DESC LIMIT 500`)
    .all(...(status ? [status] : [])) as unknown as OrderRow[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    category: row.category,
    city: row.city,
    timePref: row.time_pref,
    details: row.details,
    masterId: row.master_id,
    masterName: row.master_name,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export function setOrderStatus(id: number, status: OrderStatus): void {
  db().prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
}

export function deleteOrder(id: number): void {
  db().prepare("DELETE FROM orders WHERE id = ?").run(id);
}

export function countOrdersByStatus(): Record<OrderStatus | "total", number> {
  const rows = db()
    .prepare("SELECT status, COUNT(*) AS count FROM orders GROUP BY status")
    .all() as unknown as { status: OrderStatus; count: number }[];
  const result = { new: 0, in_progress: 0, done: 0, cancelled: 0, total: 0 };
  for (const row of rows) {
    result[row.status] = row.count;
    result.total += row.count;
  }
  return result;
}

/** So‘nggi `days` kun uchun [{ date: "2026-10-31", count }] (Toshkent vaqti bilan). */
export function ordersPerDay(days = 7): { date: string; count: number }[] {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" });
  const since = new Date(Date.now() - (days + 1) * 86_400_000).toISOString();
  const rows = db()
    .prepare("SELECT created_at FROM orders WHERE created_at >= ?")
    .all(since) as unknown as { created_at: string }[];

  const counts = new Map<string, number>();
  for (const row of rows) {
    const day = fmt.format(new Date(row.created_at));
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  return Array.from({ length: days }, (_, index) => {
    const date = fmt.format(new Date(Date.now() - (days - 1 - index) * 86_400_000));
    return { date, count: counts.get(date) ?? 0 };
  });
}
