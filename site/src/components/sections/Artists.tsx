import Image from "next/image";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { artists, type Artist } from "@/lib/content";
import { bookingHref, sectionIds } from "@/lib/links";
import { Reveal } from "@/components/ui/Reveal";
import { MarkIcon } from "@/components/ui/MarkIcon";

export function Artists({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section
      id={sectionIds.artists}
      className="section relative z-10 scroll-mt-20"
    >
      <Reveal className="shell">
        <div className="hairline-t pt-6">
          <span className="label">{dict.artists.label}</span>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-12">
          <h2 className="display display-lg text-bone md:col-span-6">
            <span className="line-mask">
              <span>{dict.artists.title}</span>
            </span>
          </h2>
          <p className="lead md:col-span-5 md:col-start-8">{dict.artists.lead}</p>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.slug}
              artist={artist}
              locale={locale}
              dict={dict}
              index={index}
            />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function ArtistCard({
  artist,
  locale,
  dict,
  index,
}: {
  artist: Artist;
  locale: Locale;
  dict: Dictionary;
  index: number;
}) {
  return (
    <li className="group">
      <div className="frame aspect-[3/4] w-full">
        {artist.photo ? (
          <Image
            src={artist.photo}
            alt={artist.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          /* No portrait yet — a typographic plate keeps the grid intact. */
          <div className="plate flex h-full w-full items-center justify-center">
            <MarkIcon className="h-1/3 w-1/3 text-bone/12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
            <span className="display absolute text-[clamp(3rem,7vw,5rem)] text-bone/25">
              {artist.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 font-mono text-[0.66rem] tracking-[0.2em] text-bone/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="display text-[clamp(1.35rem,2.2vw,1.8rem)] text-bone">
            {artist.name}
          </h3>
          <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mute">
            {artist.role[locale]}
          </p>
          {artist.studio ? (
            <p className="mt-1 text-[0.85rem] text-bone/45">{artist.studio}</p>
          ) : null}
        </div>

        {artist.instagram ? (
          <a
            href={artist.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone/70 hover:text-bone"
          >
            {dict.artists.portfolio}
          </a>
        ) : (
          <a
            href={bookingHref()}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone/45 hover:text-bone"
          >
            {dict.artists.book}
          </a>
        )}
      </div>
    </li>
  );
}
