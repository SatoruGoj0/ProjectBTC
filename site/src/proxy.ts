import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/i18n/config";

/**
 * Sends bare paths to a locale. Baku visitors land on Azerbaijani, Russian
 * speakers on Russian, everyone else on English — but the URL stays explicit
 * so the choice is always visible and shareable.
 *
 * Renamed from `middleware` per the Next.js 16 convention.
 */
function pickLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    const match = locales.find((locale) => locale === base);
    if (match) return match;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API surface and anything with a file extension.
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
};
