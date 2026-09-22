import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Oswald } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";

import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SceneMount } from "@/components/three/SceneMount";

/* Every family below ships Latin, Latin-Ext (Azerbaijani ə, ğ, ı, ö, ş, ü)
 * and Cyrillic, so all three locales render in the same type system. */

const display = Oswald({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html
      lang={htmlLang[typedLocale]}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
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
