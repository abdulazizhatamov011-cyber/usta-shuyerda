import { MasterEditor } from "@/components/admin/MasterEditor";
import { PageHeader } from "@/components/admin/PageHeader";

export default function NewMasterPage() {
  return (
    <>
      <PageHeader title="Yangi usta" description="Profil saqlangach saytda darhol ko‘rinadi (agar “Saytda ko‘rinadi” tanlangan bo‘lsa)." />
      <div className="max-w-4xl">
        <MasterEditor />
      </div>
    </>
  );
}
