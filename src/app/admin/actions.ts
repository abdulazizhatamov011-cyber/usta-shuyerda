"use server";

import { headers } from "next/headers";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  fieldErrors,
  loginSchema,
  masterSchema,
  orderStatusSchema,
  parseServices,
  parseSkills,
} from "@/lib/validation";
import { approveApplication, deleteApplication, rejectApplication } from "@/server/applications";
import { deleteMaster, findMaster, saveMaster, setMasterFlags } from "@/server/masters";
import { deleteOrder, setOrderStatus } from "@/server/orders";
import { clientIp, rateLimit } from "@/server/security";
import { authenticate, createSession, destroySession, requireAdmin } from "@/server/session";

/* ---------- Kirish / chiqish ---------- */

export interface LoginState {
  error?: string;
  email?: string;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const parsed = loginSchema.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { error: "Email yoki parol noto‘g‘ri", email };

  const ip = clientIp(await headers());
  if (!rateLimit(`login-ip:${ip}`, 10, 15 * 60_000) || !rateLimit(`login:${parsed.data.email}`, 5, 15 * 60_000)) {
    return { error: "Juda ko‘p urinish. 15 daqiqadan keyin qayta urinib ko‘ring.", email };
  }

  const admin = await authenticate(parsed.data.email, parsed.data.password);
  if (!admin) return { error: "Email yoki parol noto‘g‘ri", email };

  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- Buyurtmalar ---------- */

export async function setOrderStatusAction(id: number, status: string) {
  await requireAdmin();
  const parsed = orderStatusSchema.safeParse(status);
  if (!parsed.success || !Number.isInteger(id)) return;
  setOrderStatus(id, parsed.data);
}

export async function deleteOrderAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) deleteOrder(id);
}

/* ---------- Arizalar ---------- */

export async function approveApplicationAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  if (approveApplication(id)) updateTag("masters");
}

export async function rejectApplicationAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) rejectApplication(id);
}

export async function deleteApplicationAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) deleteApplication(id);
}

/* ---------- Ustalar ---------- */

const MASTER_ID = /^[a-z0-9-]{1,80}$/;

function masterId(formData: FormData): string | null {
  const id = String(formData.get("id") ?? "");
  return MASTER_ID.test(id) ? id : null;
}

export async function toggleVerifiedAction(formData: FormData) {
  await requireAdmin();
  const id = masterId(formData);
  if (!id) return;
  setMasterFlags(id, { verified: formData.get("verified") === "1" });
  updateTag("masters");
}

export async function setMasterStatusAction(formData: FormData) {
  await requireAdmin();
  const id = masterId(formData);
  const status = formData.get("status");
  if (!id || (status !== "active" && status !== "hidden")) return;
  setMasterFlags(id, { status });
  updateTag("masters");
}

export async function deleteMasterAction(formData: FormData) {
  await requireAdmin();
  const id = masterId(formData);
  if (!id) return;
  deleteMaster(id);
  updateTag("masters");
}

export interface MasterFormState {
  errors?: Record<string, string>;
  values?: Record<string, string>;
}

export async function saveMasterAction(
  _prev: MasterFormState,
  formData: FormData,
): Promise<MasterFormState> {
  await requireAdmin();

  const values = Object.fromEntries(
    [...formData.entries()].filter(([, value]) => typeof value === "string"),
  ) as Record<string, string>;

  const parsed = masterSchema.safeParse({ ...values, verified: values.verified === "on" });
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };

  const id = masterId(formData) ?? undefined;
  if (id && !findMaster(id)) {
    return { errors: { name: "Bu usta topilmadi. U o‘chirilgan bo‘lishi mumkin." }, values };
  }
  const { skills, services, ...rest } = parsed.data;
  saveMaster({ ...rest, skills: parseSkills(skills), services: parseServices(services) }, id);

  updateTag("masters");
  redirect("/admin/ustalar");
}
