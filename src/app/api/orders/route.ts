import { fieldErrors, orderSchema } from "@/lib/validation";
import { createOrder } from "@/server/orders";
import { clientIp, rateLimit } from "@/server/security";

export async function POST(request: Request) {
  if (!rateLimit(`order:${clientIp(request.headers)}`, 5, 10 * 60_000)) {
    return Response.json(
      { error: "Juda ko‘p so‘rov yuborildi. Birozdan keyin urinib ko‘ring." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "So‘rov JSON formatida bo‘lishi kerak" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const { name, phone, category, city, time, details, masterId } = parsed.data;
  const id = createOrder({ name, phone, category, city, time, details, masterId: masterId || null });
  return Response.json({ id }, { status: 201 });
}
