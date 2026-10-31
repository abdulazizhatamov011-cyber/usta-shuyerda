import { notFound } from "next/navigation";
import { MasterEditor } from "@/components/admin/MasterEditor";
import { PageHeader } from "@/components/admin/PageHeader";
import { getAdminMaster } from "@/server/admin-queries";

export default async function EditMasterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const master = await getAdminMaster(id);
  if (!master) notFound();

  return (
    <>
      <PageHeader title={master.name} description="Profil ma’lumotlarini tahrirlash." />
      <div className="max-w-4xl">
        <MasterEditor master={master} />
      </div>
    </>
  );
}
