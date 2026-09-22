import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionIds } from "@/lib/links";
import { site } from "@/lib/site";
import { MarkIcon } from "@/components/ui/MarkIcon";
import { Reveal } from "@/components/ui/Reveal";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rows = [
    {
      label: dict.contact.addressLabel,
      value: dict.contact.address,
      href: site.mapUrl,
      external: true,
    },
    { label: dict.contact.hoursLabel, value: dict.contact.hours },
    {
      label: dict.contact.phoneLabel,
      value: site.phone,
      href: `tel:${site.phoneHref}`,
    },
    {
      label: dict.contact.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      label: dict.contact.socialLabel,
      value: site.instagramHandle,
      href: site.instagram,
      external: true,
    },
  ];

  return (
    <footer
      id={sectionIds.contact}
      className="section relative z-10 scroll-mt-20 pb-12"
    >
      <Reveal className="shell">
        <div className="hairline-t pt-6">
          <span className="label">{dict.contact.label}</span>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-12">
          <h2 className="display display-lg text-bone md:col-span-6">
            <span className="line-mask">
              <span>{dict.contact.title}</span>
            </span>
          </h2>
          <p className="lead md:col-span-5 md:col-start-8">{dict.contact.lead}</p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-12">
          <dl className="md:col-span-7">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 items-baseline gap-4 border-t border-bone/10 py-5"
              >
                <dt className="label col-span-1">{row.label}</dt>
                <dd className="col-span-2 text-[clamp(0.95rem,1.4vw,1.15rem)] text-bone">
                  {row.href ? (
                    <a
                      href={row.href}
                      className="link-underline"
                      {...(row.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
            <div className="border-t border-bone/10" />
          </dl>

          <div className="flex flex-col items-start justify-between gap-10 md:col-span-4 md:col-start-9">
            <MarkIcon className="h-20 w-20 text-bone/70" />
            <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight text-bone/80">
              {dict.footer.tagline}
            </p>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-20 flex flex-col gap-4 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="label">
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </span>
          <a
            href="#top"
            className="label transition-colors duration-500 hover:text-bone"
            lang={locale}
          >
            {dict.footer.backToTop} ↑
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
