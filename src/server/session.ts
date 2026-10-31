import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { db, ensureAdmin } from "./db";
import { signToken, verifyPassword, verifyToken } from "./security";

// Mavjud bo‘lmagan email uchun ham parol tekshiruvi vaqtini bir xil ushlash.
const DUMMY_HASH = `scrypt$${"00".repeat(16)}$${"00".repeat(64)}`;

/** Email/parol to‘g‘ri bo‘lsa adminni qaytaradi. */
export async function authenticate(email: string, password: string): Promise<AdminUser | null> {
  await ensureAdmin();
  const row = db()
    .prepare("SELECT id, email, password_hash FROM admins WHERE email = ?")
    .get(email) as unknown as (AdminUser & { password_hash: string }) | undefined;

  const valid = await verifyPassword(password, row?.password_hash ?? DUMMY_HASH);
  return row && valid ? { id: row.id, email: row.email } : null;
}

export const SESSION_COOKIE = "ustatop_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 kun

export interface AdminUser {
  id: number;
  email: string;
}

export async function createSession(adminId: number): Promise<void> {
  const token = signToken({ sub: adminId, exp: Math.floor(Date.now() / 1000) + MAX_AGE });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Joriy so‘rov uchun bir marta hisoblanadi. */
export const getAdmin = cache(async (): Promise<AdminUser | null> => {
  // Token muddati Date.now() bilan tekshiriladi, shuning uchun admin renderi
  // hech qachon oldindan (prefetch/prerender) bajarilmasligi kerak.
  await connection();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;

  await ensureAdmin();
  const row = db()
    .prepare("SELECT id, email FROM admins WHERE id = ?")
    .get(payload.sub) as unknown as AdminUser | undefined;
  return row ?? null;
});

/** Admin bo‘lmasa login sahifasiga yo‘naltiradi. Har bir admin ma’lumot funksiyasi va action'da chaqiring. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
