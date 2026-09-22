import az from "./dict/az";
import en from "./dict/en";
import ru from "./dict/ru";
import type { Locale } from "./config";
import type { Dictionary } from "./dict/en";

const dictionaries: Record<Locale, Dictionary> = { az, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
