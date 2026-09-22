/**
 * Single source of truth for everything factual about the community.
 *
 * Every value marked TODO is a placeholder — replace it and the whole site
 * updates. Nothing else in the codebase hardcodes a phone number, an address
 * or a social handle.
 */

export const site = {
  name: "Baku Tattoo Community",
  short: "BTC",

  /** TODO: real founding year — used in the hero badge and the footer. */
  foundedYear: 2019,

  /**
   * Production domain, used for canonical, Open Graph and sitemap URLs.
   * Set NEXT_PUBLIC_SITE_URL in the host's environment (Vercel → Settings →
   * Environment Variables) and this follows, no code change needed.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bakutattoocommunity.az",

  /** TODO: verify handles before launch. */
  instagram: "https://instagram.com/bakutattoocommunity",
  instagramHandle: "@bakutattoocommunity",

  /** TODO: real contact details. */
  email: "hello@bakutattoocommunity.az",
  phone: "+994 50 000 00 00",
  phoneHref: "+99450000000",
  whatsapp: "https://wa.me/99450000000",
  telegram: "https://t.me/bakutattoocommunity",

  /**
   * TODO: URL of the existing operational app (booking / CRM).
   * Leave empty to fall back to a WhatsApp / Instagram CTA.
   */
  bookingUrl: "",

  /** TODO: real address + a matching maps link. */
  mapUrl: "https://maps.google.com/?q=Baku",
  coords: { lat: 40.3777, lng: 49.892 },

  /** Headline counters shown in the About section. TODO: real numbers. */
  counters: {
    residents: 18,
    studios: 6,
    styles: 12,
  },
} as const;

export type Site = typeof site;
