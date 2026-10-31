import { filterMasters, toPublicMaster, type MasterSort } from "@/lib/master-filter";
import { getPublicMasters } from "@/server/masters";

const sorts: MasterSort[] = ["rating", "price", "experience"];

/** GET /api/masters?q=&category=&city=&verified=1&sort=rating|price|experience */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const sort = params.get("sort") as MasterSort | null;

  const result = filterMasters(await getPublicMasters(), {
    q: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    city: params.get("city") ?? undefined,
    onlyVerified: params.get("verified") === "1",
    sort: sort && sorts.includes(sort) ? sort : "rating",
  });

  return Response.json({ count: result.length, masters: result.map(toPublicMaster) });
}
