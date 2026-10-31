import { toPublicMaster } from "@/lib/master-filter";
import { getPublicMaster } from "@/server/masters";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const master = await getPublicMaster(id);
  if (!master) {
    return Response.json({ error: "Usta topilmadi" }, { status: 404 });
  }
  return Response.json(toPublicMaster(master));
}
