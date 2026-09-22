import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { bookingHref, sectionIds } from "@/lib/links";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Hero({ dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative z-10 min-h-[100svh] pt-[72px]">
      <div className="hero-scrim" aria-hidden="true" />

      <Reveal className="shell relative z-10 flex min-h-[calc(100svh-72px)] flex-col justify-between pb-10">
        {/* Top meta rail */}
        <div className="hairline-b flex items-baseline justify-between gap-4 py-5">
          <span className="label">{dict.hero.eyebrow}</span>
          <span className="label text-right">
            {dict.hero.since} {site.foundedYear} · {site.counters.residents}{" "}
            {dict.hero.residentsSuffix}
          </span>
        </div>

        {/* Wordmark */}
        <h1 className="display display-xl my-auto py-8 text-bone">
          {dict.hero.title.map((line, index) => (
            <span key={line} className="line-mask">
              <span
                className="block"
                style={{
                  transitionDelay: `${180 + index * 120}ms`,
                  paddingLeft: `${index * 4}%`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Bottom rail: promise, actions, scroll hint */}
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <p className="lead max-w-[46ch] md:col-span-5">{dict.hero.lead}</p>

          <div className="flex flex-wrap items-center gap-3 md:col-span-5">
            <a
              href={bookingHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="btn"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a href={`#${sectionIds.artists}`} className="btn btn-ghost">
              {dict.hero.ctaSecondary}
            </a>
          </div>

          <a
            href={`#${sectionIds.about}`}
            className="group hidden items-center justify-end gap-3 md:col-span-2 md:flex"
          >
            <span className="label transition-colors duration-500 group-hover:text-bone">
              {dict.hero.scroll}
            </span>
            <span
              aria-hidden="true"
              className="relative block h-10 w-px overflow-hidden bg-bone/20"
            >
              <span className="absolute inset-x-0 top-0 block h-1/2 animate-[scroll-hint_2.4s_ease-in-out_infinite] bg-bone" />
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
