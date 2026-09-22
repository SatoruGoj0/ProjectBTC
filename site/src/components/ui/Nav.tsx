"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { bookingHref, sectionIds } from "@/lib/links";
import { site } from "@/lib/site";

import { LocaleSwitch } from "./LocaleSwitch";
import { MarkIcon } from "./MarkIcon";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: `#${sectionIds.about}`, label: dict.nav.about },
    { href: `#${sectionIds.styles}`, label: dict.nav.styles },
    { href: `#${sectionIds.artists}`, label: dict.nav.artists },
    { href: `#${sectionIds.events}`, label: dict.nav.events },
    { href: `#${sectionIds.contact}`, label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the overlay menu is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-700",
          scrolled
            ? "border-b border-bone/10 bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent",
        ].join(" ")}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-3"
            aria-label={site.name}
          >
            <MarkIcon className="h-7 w-7 text-bone transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
            <span className="hidden font-mono text-[0.66rem] uppercase leading-tight tracking-[0.2em] text-bone sm:block">
              Baku Tattoo
              <br />
              Community
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label={dict.nav.menu}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute transition-colors duration-500 hover:text-bone"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitch
              current={locale}
              label={dict.nav.language}
              className="hidden sm:flex"
            />

            <a
              href={bookingHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="btn hidden !px-6 !py-3 md:inline-flex"
            >
              {dict.nav.book}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menu}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone transition-colors duration-500 hover:border-bone/40 lg:hidden"
            >
              <span className="sr-only">{dict.nav.menu}</span>
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menu (small screens) */}
      <div
        className={[
          "fixed inset-0 z-[55] bg-void/97 backdrop-blur-2xl transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        inert={!open}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <MarkIcon className="h-7 w-7 text-bone" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mute transition-colors hover:text-bone"
          >
            {dict.nav.close}
          </button>
        </div>

        <div className="shell flex h-[calc(100dvh-72px)] flex-col justify-between pb-12">
          <nav className="flex flex-col gap-2 pt-8" aria-label={dict.nav.menu}>
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display display-md text-bone/90 transition-[transform,color] duration-500 hover:translate-x-2 hover:text-bone"
                style={{
                  transitionDelay: open ? `${index * 40}ms` : "0ms",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <LocaleSwitch current={locale} label={dict.nav.language} />
            <a
              href={bookingHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="btn w-fit"
            >
              {dict.nav.book}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
