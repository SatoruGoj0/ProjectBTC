export const locales = ["az", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

/** Label shown in the header switcher. */
export const localeLabel: Record<Locale, string> = {
  az: "AZ",
  ru: "RU",
  en: "EN",
};

/** Value for <html lang> and hreflang tags. */
export const htmlLang: Record<Locale, string> = {
  az: "az-AZ",
  ru: "ru-RU",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
