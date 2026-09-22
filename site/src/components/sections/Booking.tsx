import type { Dictionary } from "@/i18n/dictionaries";
import { bookingHref, sectionIds } from "@/lib/links";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Booking({ dict }: { dict: Dictionary }) {
  const hasBookingApp = Boolean(site.bookingUrl);

  return (
    <section
      id={sectionIds.booking}
      className="section relative z-10 scroll-mt-20"
    >
      <Reveal className="shell">
        <div className="hairline-t pt-6">
          <span className="label">{dict.booking.label}</span>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-12">
          <h2 className="display display-lg text-bone md:col-span-6">
            <span className="line-mask">
              <span>{dict.booking.title}</span>
            </span>
          </h2>
          <p className="lead md:col-span-5 md:col-start-8">{dict.booking.lead}</p>
        </div>

        <ol className="mt-16 grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-5">
          {dict.booking.steps.map((step, index) => (
            <li
              key={step.title}
              className="group flex flex-col gap-4 bg-void p-7 transition-colors duration-700 hover:bg-coal"
            >
              <span className="font-mono text-[0.68rem] tracking-[0.2em] text-blood">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-[clamp(1.2rem,1.9vw,1.55rem)] text-bone">
                {step.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-bone/60">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={bookingHref()}
            target="_blank"
            rel="noreferrer noopener"
            className="btn"
          >
            {hasBookingApp ? dict.booking.cta : dict.booking.ctaFallback}
          </a>
          <p className="max-w-[40ch] font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-mute">
            {dict.booking.note}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
