import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "../globals.css";

import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SceneMount } from "@/components/three/SceneMount";

/* The locale whose subset the body copy needs first. The wordmark in the hero
 * is Latin in every locale, so that face is always worth preloading. */
const BODY_SUBSET: Record<Locale, string> = {
  az: "latin-ext",
  ru: "cyrillic",
  en: "latin",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((code) => [htmlLang[code], `/${code}`]),
      ),
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: htmlLang[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <html lang={htmlLang[typedLocale]}>
      <head>
        {/* The hero wordmark is the LCP element; the lead paragraph sits right
            under it. Everything else can arrive with font-display: swap. */}
        <link
          rel="preload"
          href="/fonts/oswald-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`/fonts/manrope-${BODY_SUBSET[typedLocale]}.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-void text-bone antialiased">
        {/* Reveal animations start hidden and are released by JavaScript.
            Without it, unhide everything so the page is still readable. */}
        <noscript>
          <style>{`.line-mask > span { transform: none; opacity: 1 } .rule { transform: scaleX(1) }`}</style>
        </noscript>

        <SmoothScroll />
        <Cursor />

        {/* Fixed WebGL backdrop, behind every section. */}
        <SceneMount />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-void"
        >
          {dict.nav.skip}
        </a>

        <Nav locale={typedLocale} dict={dict} />

        <main id="main" className="relative">
          <span id="top" aria-hidden="true" />
          {children}
        </main>

        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
