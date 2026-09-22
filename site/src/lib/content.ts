import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

/* ---------------------------------------------------------------------- */
/* directions                                                               */
/* ---------------------------------------------------------------------- */

export type StyleItem = {
  slug: string;
  /** Latin, uppercase — used in the marquee where mixed scripts look noisy. */
  tag: string;
  name: Localized;
  desc: Localized;
};

export const styles: StyleItem[] = [
  {
    slug: "blackwork",
    tag: "Blackwork",
    name: { az: "Blackwork", ru: "Блэкворк", en: "Blackwork" },
    desc: {
      az: "Sıx qara, sərt kontrast, qrafik formalar. Dəridə ən uzun yaşayan dil.",
      ru: "Плотный чёрный, жёсткий контраст, графичные формы. Язык, который дольше всех живёт на коже.",
      en: "Dense black, hard contrast, graphic shapes. The language that survives longest on skin.",
    },
  },
  {
    slug: "realism",
    tag: "Realism",
    name: { az: "Realizm", ru: "Реализм", en: "Realism" },
    desc: {
      az: "Portret, heyvan, faktura. Işıq və kölgə üzərində uzun, səbirli iş.",
      ru: "Портрет, животное, фактура. Долгая терпеливая работа со светом и тенью.",
      en: "Portraits, animals, texture. Long, patient work with light and shadow.",
    },
  },
  {
    slug: "fine-line",
    tag: "Fine line",
    name: { az: "Fine line", ru: "Fine line", en: "Fine line" },
    desc: {
      az: "Nazik, dəqiq xətt. Minimal işlər üçün — səhv bağışlamayan texnika.",
      ru: "Тонкая точная линия. Для минималистичных работ — техника, не прощающая ошибок.",
      en: "Thin, exact linework. For minimal pieces — a technique that forgives nothing.",
    },
  },
  {
    slug: "ornamental",
    tag: "Ornamental",
    name: { az: "Ornamental", ru: "Орнаментал", en: "Ornamental" },
    desc: {
      az: "Bədənin formasına uyğun naxış. Azərbaycan ornamenti ilə işləməyi ayrıca sevirik.",
      ru: "Узор, положенный по форме тела. Отдельно любим работать с азербайджанским орнаментом.",
      en: "Pattern laid along the body's own form. We have a soft spot for Azerbaijani ornament.",
    },
  },
  {
    slug: "neo-traditional",
    tag: "Neo-traditional",
    name: { az: "Neo-traditional", ru: "Нео-традишнл", en: "Neo-traditional" },
    desc: {
      az: "Qalın kontur, zəngin rəng, aydın kompozisiya. İllər sonra da oxunur.",
      ru: "Плотный контур, насыщенный цвет, ясная композиция. Читается и через годы.",
      en: "Bold outline, rich colour, clear composition. Still readable years later.",
    },
  },
  {
    slug: "dotwork",
    tag: "Dotwork",
    name: { az: "Dotwork", ru: "Дотворк", en: "Dotwork" },
    desc: {
      az: "Nöqtədən qurulan həcm. Yumşaq keçidlər, həndəsə və sakral formalar.",
      ru: "Объём, собранный из точек. Мягкие переходы, геометрия и сакральные формы.",
      en: "Volume built from points. Soft gradients, geometry and sacred forms.",
    },
  },
  {
    slug: "lettering",
    tag: "Lettering",
    name: { az: "Lettering", ru: "Леттеринг", en: "Lettering" },
    desc: {
      az: "Şrift və xəttatlıq. Latın, kiril və ərəb qrafikası ilə işləyirik.",
      ru: "Шрифт и каллиграфия. Работаем с латиницей, кириллицей и арабской графикой.",
      en: "Type and calligraphy. We work in Latin, Cyrillic and Arabic script.",
    },
  },
  {
    slug: "cover-up",
    tag: "Cover-up",
    name: { az: "Cover-up", ru: "Cover-up", en: "Cover-up" },
    desc: {
      az: "Köhnə işin üstünü örtmək və ya bərpa etmək. Əvvəlcə dürüst qiymətləndirmə.",
      ru: "Перекрытие или реставрация старой работы. Сначала — честная оценка того, что возможно.",
      en: "Covering or restoring old work. An honest assessment of what is possible comes first.",
    },
  },
  {
    slug: "piercing",
    tag: "Piercing",
    name: { az: "Pirsinq", ru: "Пирсинг", en: "Piercing" },
    desc: {
      az: "Steril alət, keyfiyyətli titan, sağalma üzrə müşayiət.",
      ru: "Стерильный инструмент, качественный титан, сопровождение на заживлении.",
      en: "Sterile tooling, implant-grade titanium, support through healing.",
    },
  },
];

/* ---------------------------------------------------------------------- */
/* residents                                                                */
/* ---------------------------------------------------------------------- */

export type Artist = {
  slug: string;
  /** Display name or handle as the artist wants it written. */
  name: string;
  /** Specialisation line under the name. */
  role: Localized;
  /** Studio or workspace. Optional. */
  studio?: string;
  /** Full Instagram URL. Left empty until the real handle is confirmed. */
  instagram?: string;
  /** Path under /public, e.g. "/images/artists/nuran.jpg". */
  photo?: string;
};

/**
 * PLACEHOLDER ROSTER — replace every entry with the real residents.
 *
 * To add a real artist:
 *   1. Drop a portrait into `public/images/artists/<slug>.jpg`
 *      (portrait crop, 3:4, at least 900×1200).
 *   2. Set `photo: "/images/artists/<slug>.jpg"`.
 *   3. Fill `instagram` with the full profile URL.
 * Cards without a photo fall back to a typographic plate, so the grid never
 * looks broken while you are still collecting material.
 */
export const artists: Artist[] = [
  {
    slug: "resident-01",
    name: "Nuran",
    role: {
      az: "Blackwork · Ornamental",
      ru: "Блэкворк · Орнаментал",
      en: "Blackwork · Ornamental",
    },
  },
  {
    slug: "resident-02",
    name: "Aytac",
    role: {
      az: "Fine line · Mikro-realizm",
      ru: "Fine line · Микрореализм",
      en: "Fine line · Micro-realism",
    },
  },
  {
    slug: "resident-03",
    name: "Elvin",
    role: {
      az: "Realizm · Cover-up",
      ru: "Реализм · Cover-up",
      en: "Realism · Cover-up",
    },
  },
  {
    slug: "resident-04",
    name: "Leyla",
    role: {
      az: "Neo-traditional · Rəng",
      ru: "Нео-традишнл · Цвет",
      en: "Neo-traditional · Colour",
    },
  },
  {
    slug: "resident-05",
    name: "Tural",
    role: {
      az: "Dotwork · Həndəsə",
      ru: "Дотворк · Геометрия",
      en: "Dotwork · Geometry",
    },
  },
  {
    slug: "resident-06",
    name: "Sevinc",
    role: {
      az: "Lettering · Xəttatlıq",
      ru: "Леттеринг · Каллиграфия",
      en: "Lettering · Calligraphy",
    },
  },
];

/* ---------------------------------------------------------------------- */
/* calendar                                                                 */
/* ---------------------------------------------------------------------- */

export type EventKind = "guest" | "convention" | "seminar" | "flash";

export type CommunityEvent = {
  slug: string;
  /** ISO date. Past events are filtered out automatically. */
  date: string;
  /** Optional ISO end date for multi-day entries. */
  endDate?: string;
  kind: EventKind;
  title: Localized;
  place: Localized;
  url?: string;
};

/** PLACEHOLDER CALENDAR — replace with the real schedule. */
export const events: CommunityEvent[] = [
  {
    slug: "guest-spot-autumn",
    date: "2026-10-17",
    endDate: "2026-10-20",
    kind: "guest",
    title: {
      az: "Qonaq ustad: blackwork həftəsi",
      ru: "Гостевой мастер: неделя блэкворка",
      en: "Guest artist: blackwork week",
    },
    place: { az: "Bakı", ru: "Баку", en: "Baku" },
  },
  {
    slug: "sterility-seminar",
    date: "2026-11-08",
    kind: "seminar",
    title: {
      az: "Sterillik və təhlükəsizlik seminarı",
      ru: "Семинар по стерильности и безопасности",
      en: "Sterility & safety seminar",
    },
    place: { az: "Bakı", ru: "Баку", en: "Baku" },
  },
  {
    slug: "winter-flash-day",
    date: "2026-12-13",
    kind: "flash",
    title: {
      az: "Qış fleş günü",
      ru: "Зимний флеш-день",
      en: "Winter flash day",
    },
    place: { az: "Bakı", ru: "Баку", en: "Baku" },
  },
];

/** Upcoming events only, soonest first. */
export function upcomingEvents(now = new Date()): CommunityEvent[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return events
    .filter((event) => new Date(event.endDate ?? event.date).getTime() >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
