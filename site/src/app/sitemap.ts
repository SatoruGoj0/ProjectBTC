import type { MetadataRoute } from "next";

import { htmlLang, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "az" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((code) => [htmlLang[code], `${site.url}/${code}`]),
      ),
    },
  }));
}
