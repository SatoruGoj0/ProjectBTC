import type { Dictionary } from "@/i18n/dictionaries";
import { sectionIds } from "@/lib/links";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function About({ dict }: { dict: Dictionary }) {
  const years = Math.max(1, new Date().getFullYear() - site.foundedYear);

  const stats = [
    { value: site.counters.residents, label: dict.about.stats.residents },
    { value: site.counters.studios, label: dict.about.stats.studios },
    { value: site.counters.styles, label: dict.about.stats.styles },
    { value: years, label: dict.about.stats.years },
  ];

  return (
    <section
      id={sectionIds.about}
      className="section relative z-10 scroll-mt-20"
    >
      <Reveal className="shell">
        <div className="hairline-t pt-6">
          <span className="label">{dict.about.label}</span>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-12">
          <h2 className="display display-lg text-bone md:col-span-7">
            <span className="line-mask">
              <span>{dict.about.title}</span>
            </span>
          </h2>

          <div className="flex flex-col gap-6 md:col-span-5">
            {dict.about.body.map((paragraph, index) => (
              <p
                key={index}
                className="lead"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Counters */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-bone/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 bg-void px-5 py-8 md:px-7 md:py-10"
            >
              <dt className="label order-2">{stat.label}</dt>
              <dd className="display order-1 text-[clamp(2.6rem,5.5vw,4.5rem)] leading-none text-bone">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Principles */}
        <div className="mt-24">
          <span className="label">{dict.about.principlesLabel}</span>
          <span className="rule mt-4 block h-px w-full bg-bone/12" />

          <ul className="mt-10 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {dict.about.principles.map((principle, index) => (
              <li key={principle.title} className="group flex gap-5">
                <span className="mt-1 font-mono text-[0.68rem] tracking-[0.2em] text-blood">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.25rem,2.1vw,1.7rem)] text-bone">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-bone/65">
                    {principle.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
