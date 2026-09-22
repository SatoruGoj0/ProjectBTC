import { site } from "./site";

/**
 * Where the "book" buttons point. Prefers the operational booking app, then
 * WhatsApp, then Instagram — so the CTA is never a dead link, even before the
 * booking URL is filled in.
 */
export function bookingHref(): string {
  return site.bookingUrl || site.whatsapp || site.instagram;
}

export const sectionIds = {
  about: "community",
  styles: "directions",
  artists: "artists",
  events: "calendar",
  booking: "booking",
  contact: "contact",
} as const;
