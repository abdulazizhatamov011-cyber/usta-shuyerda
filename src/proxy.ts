import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistik tekshiruv: /admin sahifalariga cookie'siz kirmoqchi bo‘lganni
 * darrov login'ga yuboradi. Haqiqiy tekshiruv (imzo, muddat, admin mavjudligi)
 * `requireAdmin()` da — har bir admin so‘rovi va action'da bajariladi.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!isLogin && !request.cookies.has("ustatop_admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
