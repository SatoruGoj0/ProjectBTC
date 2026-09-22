import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { styles } from "@/lib/content";
import { sectionIds } from "@/lib/links";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

export function Styles({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id={sectionIds.styles} className="relative z-10 scroll-mt-20">
      <Marquee items={styles.map((style) => style.tag)} duration={54} />

      <Reveal className="section pt-4">
        <div className="shell">
          <div className="hairline-t pt-6">
            <span className="label">{dict.styles.label}</span>
          </div>

          <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-12">
            <h2 className="display display-lg text-bone md:col-span-6">
              <span className="line-mask">
                <span>{dict.styles.title}</span>
              </span>
            </h2>
            <p className="lead md:col-span-5 md:col-start-8">{dict.styles.lead}</p>
          </div>

          <ul className="mt-16 grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((style, index) => (
              <li
                key={style.slug}
                className="group relative flex min-h-[15rem] flex-col justify-between gap-6 bg-void p-7 transition-colors duration-700 hover:bg-coal md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display text-[clamp(1.5rem,2.6vw,2.15rem)] text-bone">
                    {style.name[locale]}
                  </h3>
                  <span className="font-mono text-[0.68rem] tracking-[0.2em] text-mute transition-colors duration-500 group-hover:text-blood">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-[0.92rem] leading-relaxed text-bone/60 transition-colors duration-700 group-hover:text-bone/80">
                  {style.desc[locale]}
                </p>

                {/* Hairline that draws itself in on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-blood transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 md:inset-x-9"
                />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
