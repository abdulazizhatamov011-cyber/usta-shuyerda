import "server-only";
import type { ApplicationStatus, OrderStatus } from "@/types";
import { countPendingApplications, listApplications } from "./applications";
import { countMasters, findMaster, listAllMasters } from "./masters";
import { countOrdersByStatus, listOrders, ordersPerDay } from "./orders";
import { requireAdmin } from "./session";

/**
 * Admin sahifalari uchun o‘qish funksiyalari. Har biri birinchi bo‘lib
 * sessiyani tekshiradi, shuning uchun sahifa tekshiruvi unutilsa ham
 * ma’lumot sizib chiqmaydi.
 */

export async function getDashboard() {
  await requireAdmin();
  return {
    orders: countOrdersByStatus(),
    pendingApplications: countPendingApplications(),
    masters: countMasters(),
    perDay: ordersPerDay(7),
    recentOrders: listOrders().slice(0, 5),
    recentApplications: listApplications("pending").slice(0, 5),
  };
}

export async function getOrders(status?: OrderStatus) {
  await requireAdmin();
  return listOrders(status);
}

export async function getApplications(status?: ApplicationStatus) {
  await requireAdmin();
  return listApplications(status);
}

export async function getAdminMasters() {
  await requireAdmin();
  return listAllMasters();
}

export async function getAdminMaster(id: string) {
  await requireAdmin();
  return findMaster(id);
}

export async function getBadgeCounts() {
  await requireAdmin();
  return {
    newOrders: countOrdersByStatus().new,
    pendingApplications: countPendingApplications(),
  };
}
