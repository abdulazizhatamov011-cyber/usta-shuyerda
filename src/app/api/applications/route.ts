import { applicationSchema, fieldErrors } from "@/lib/validation";
import { createApplication } from "@/server/applications";
import { clientIp, rateLimit } from "@/server/security";

export async function POST(request: Request) {
  if (!rateLimit(`application:${clientIp(request.headers)}`, 3, 30 * 60_000)) {
    return Response.json(
      { error: "Juda ko‘p ariza yuborildi. Birozdan keyin urinib ko‘ring." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "So‘rov JSON formatida bo‘lishi kerak" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const id = createApplication(parsed.data);
  return Response.json({ id }, { status: 201 });
}
