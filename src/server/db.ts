import "server-only";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { masters as seedMasters } from "@/data/masters";
import { hashPassword } from "./security";

/**
 * SQLite (node:sqlite) — qo‘shimcha paket talab qilmaydi.
 * Bazani almashtirmoqchi bo‘lsangiz (Postgres va h.k.) faqat `src/server/*`
 * ichidagi so‘rovlar o‘zgaradi, sahifa va API qatlamiga tegish shart emas.
 */

const globalForDb = globalThis as unknown as { __ustatopDb?: DatabaseSync };

export function db(): DatabaseSync {
  if (!globalForDb.__ustatopDb) {
    globalForDb.__ustatopDb = open();
  }
  return globalForDb.__ustatopDb;
}

function open(): DatabaseSync {
  // Vercel'da loyiha papkasi faqat o‘qiladi; yozish mumkin joy — vaqtinchalik /tmp.
  // Demo uchun yetarli, lekin ma’lumotlar saqlanmaydi: productionda Postgres kerak.
  const fallback = process.env.VERCEL ? path.join(tmpdir(), "ustatop") : path.join(process.cwd(), "data");
  const dir = process.env.DATABASE_DIR ?? fallback;
  mkdirSync(dir, { recursive: true });

  const database = new DatabaseSync(path.join(dir, "ustatop.db"));
  // Build vaqtida bir nechta worker bir vaqtda ochishi mumkin.
  database.exec("PRAGMA busy_timeout = 10000; PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

  migrate(database);
  seed(database);
  return database;
}

/** Bir nechta yozuvni atomik bajaradi. Ichma-ich chaqirmang. */
export function transaction<T>(fn: () => T): T {
  const database = db();
  database.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    database.exec("COMMIT");
    return result;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

function migrate(database: DatabaseSync) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS masters (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      profession TEXT NOT NULL,
      category TEXT NOT NULL,
      city TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 0,
      review_count INTEGER NOT NULL DEFAULT 0,
      completed_jobs INTEGER NOT NULL DEFAULT 0,
      experience INTEGER NOT NULL DEFAULT 0,
      price_from INTEGER NOT NULL DEFAULT 0,
      verified INTEGER NOT NULL DEFAULT 0,
      response_minutes INTEGER NOT NULL DEFAULT 30,
      bio TEXT NOT NULL DEFAULT '',
      skills TEXT NOT NULL DEFAULT '[]',
      tone INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_masters_category ON masters(category);

    CREATE TABLE IF NOT EXISTS master_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      master_id TEXT NOT NULL REFERENCES masters(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      position INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS master_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      master_id TEXT NOT NULL REFERENCES masters(id) ON DELETE CASCADE,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL,
      date TEXT NOT NULL,
      text TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT NOT NULL,
      city TEXT NOT NULL,
      time_pref TEXT NOT NULL,
      details TEXT NOT NULL,
      master_id TEXT REFERENCES masters(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at);

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT NOT NULL,
      city TEXT NOT NULL,
      experience TEXT NOT NULL,
      telegram TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      master_id TEXT REFERENCES masters(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status, created_at);
  `);
}

function seed(database: DatabaseSync) {
  database.exec("BEGIN IMMEDIATE");
  try {
    const seeded = database.prepare("SELECT value FROM meta WHERE key = 'seeded'").get();
    if (!seeded) {
      const now = new Date().toISOString();
      const insertMaster = database.prepare(`
        INSERT INTO masters (id, name, phone, profession, category, city, rating, review_count,
          completed_jobs, experience, price_from, verified, response_minutes, bio, skills, tone, status, created_at)
        VALUES (?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)
      `);
      const insertService = database.prepare(
        "INSERT INTO master_services (master_id, name, price, position) VALUES (?, ?, ?, ?)",
      );
      const insertReview = database.prepare(
        "INSERT INTO master_reviews (master_id, author, rating, date, text) VALUES (?, ?, ?, ?, ?)",
      );

      for (const m of seedMasters) {
        insertMaster.run(
          m.id, m.name, m.profession, m.category, m.city, m.rating, m.reviewCount,
          m.completedJobs, m.experience, m.priceFrom, m.verified ? 1 : 0,
          m.responseMinutes, m.bio, JSON.stringify(m.skills), m.tone, now,
        );
        m.services.forEach((s, index) => insertService.run(m.id, s.name, s.price, index));
        m.reviews.forEach((r) => insertReview.run(m.id, r.author, r.rating, r.date, r.text));
      }
      database.prepare("INSERT INTO meta (key, value) VALUES ('seeded', ?)").run(now);
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

/** Birinchi admin env dan yaratiladi (admin jadvali bo‘sh bo‘lsa). */
let adminEnsured: Promise<void> | null = null;

export function ensureAdmin(): Promise<void> {
  adminEnsured ??= (async () => {
    const database = db();
    const row = database.prepare("SELECT COUNT(*) AS count FROM admins").get() as unknown as { count: number };
    if (row.count > 0) return;

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      console.warn("[ustatop] Admin yaratilmadi: .env.local da ADMIN_EMAIL va ADMIN_PASSWORD ni belgilang.");
      adminEnsured = null;
      return;
    }
    database
      .prepare("INSERT OR IGNORE INTO admins (email, password_hash, created_at) VALUES (?, ?, ?)")
      .run(email, await hashPassword(password), new Date().toISOString());
  })();
  return adminEnsured;
}
