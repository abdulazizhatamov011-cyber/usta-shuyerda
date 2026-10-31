import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getBadgeCounts } from "@/server/admin-queries";
import { requireAdmin } from "@/server/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PanelShell>{children}</PanelShell>
    </Suspense>
  );
}

async function PanelShell({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  const counts = await getBadgeCounts();

  return (
    <AdminShell
      email={admin.email}
      badges={{ orders: counts.newOrders, applications: counts.pendingApplications }}
    >
      {children}
    </AdminShell>
  );
}
