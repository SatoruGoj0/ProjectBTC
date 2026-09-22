"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeLabel, locales, type Locale } from "@/i18n/config";

/** Swaps the leading locale segment, keeping the rest of the path intact. */
function swapLocale(pathname: string, next: Locale) {
  const segments = pathname.split("/");
  // segments[0] is the empty string before the leading slash.
  segments[1] = next;
  return segments.join("/") || `/${next}`;
}

export function LocaleSwitch({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() || `/${current}`;

  return (
    <nav aria-label={label} className={`flex items-center gap-1 ${className ?? ""}`}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={[
              "rounded-full px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.18em] transition-colors duration-500",
              active ? "bg-bone text-void" : "text-mute hover:text-bone",
            ].join(" ")}
          >
            {localeLabel[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
