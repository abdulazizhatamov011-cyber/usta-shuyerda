export type ApiResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string>; message?: string };

/** JSON POST yuboradi va server xatolarini forma uchun qulay ko‘rinishga keltiradi. */
export async function postJson(url: string, body: unknown): Promise<ApiResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) return { ok: true };

    const data = (await response.json().catch(() => ({}))) as {
      errors?: Record<string, string>;
      error?: string;
    };
    const errors = data.errors ?? {};
    return {
      ok: false,
      errors,
      message:
        data.error ??
        (Object.keys(errors).length === 0 ? "Xatolik yuz berdi. Qayta urinib ko‘ring." : undefined),
    };
  } catch {
    return { ok: false, errors: {}, message: "Internet aloqasi yo‘q. Qayta urinib ko‘ring." };
  }
}
