import type { Locale } from "@/i18n/config";
import { htmlLang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { upcomingEvents } from "@/lib/content";
import { bookingHref, sectionIds } from "@/lib/links";
import { Reveal } from "@/components/ui/Reveal";

function formatRange(locale: Locale, date: string, endDate?: string) {
  const lang = htmlLang[locale];
  const start = new Date(date);

  if (!endDate) {
    return new Intl.DateTimeFormat(lang, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(start);
  }

  const end = new Date(endDate);
  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear();

  const startPart = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    ...(sameMonth ? {} : { month: "long" }),
    timeZone: "UTC",
  }).format(start);

  const endPart = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(end);

  return `${startPart} — ${endPart}`;
}

export function Events({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const list = upcomingEvents();

  return (
    <section
      id={sectionIds.events}
      className="section relative z-10 scroll-mt-20"
    >
      <Reveal className="shell">
        <div className="hairline-t pt-6">
          <span className="label">{dict.events.label}</span>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-12">
          <h2 className="display display-lg text-bone md:col-span-6">
            <span className="line-mask">
              <span>{dict.events.title}</span>
            </span>
          </h2>
          <p className="lead md:col-span-5 md:col-start-8">{dict.events.lead}</p>
        </div>

        {list.length === 0 ? (
          <p className="mt-16 max-w-[52ch] text-bone/55">{dict.events.empty}</p>
        ) : (
          <ul className="mt-16">
            {list.map((event) => (
              <li key={event.slug}>
                <a
                  href={event.url ?? bookingHref()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid items-baseline gap-x-8 gap-y-3 border-t border-bone/10 py-8 transition-colors duration-700 hover:border-bone/30 md:grid-cols-12"
                >
                  <time
                    dateTime={event.date}
                    className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-bone/70 md:col-span-3"
                  >
                    {formatRange(locale, event.date, event.endDate)}
                  </time>

                  <h3 className="display text-[clamp(1.4rem,3vw,2.4rem)] text-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:col-span-5">
                    {event.title[locale]}
                  </h3>

                  <span className="label md:col-span-2">
                    {dict.events.kinds[event.kind]} · {event.place[locale]}
                  </span>

                  <span className="flex items-center justify-start gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute transition-colors duration-500 group-hover:text-blood md:col-span-2 md:justify-end">
                    {dict.events.cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
            <li className="border-t border-bone/10" aria-hidden="true" />
          </ul>
        )}
      </Reveal>
    </section>
  );
}
