const en = {
  meta: {
    title: "Baku Tattoo Community — tattoo artists of Baku",
    description:
      "A union of Baku tattoo artists. Shared standards of sterility and craft, open knowledge, guest spots and events. Book a session with a resident artist.",
  },

  nav: {
    about: "Community",
    styles: "Directions",
    artists: "Artists",
    events: "Calendar",
    contact: "Contact",
    book: "Book",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
  },

  hero: {
    eyebrow: "Baku · Azerbaijan",
    since: "Since",
    residentsSuffix: "residents",
    title: ["Baku", "Tattoo", "Community"],
    lead: "A union of the city's tattoo artists. Shared standards, open knowledge and honest work on skin.",
    ctaPrimary: "Book a session",
    ctaSecondary: "Meet the artists",
    scroll: "Scroll",
  },

  about: {
    label: "01 — Community",
    title: "Not a studio. A standard.",
    body: [
      "Baku Tattoo Community brings together the city's artists, studios and apprentices around one thing: the quality of what stays on a person's skin for the rest of their life.",
      "We hold a shared bar for sterility and safety, run open critiques and mentoring, host guest artists from abroad, and carry Azerbaijani tattoo culture beyond the country.",
    ],
    stats: {
      residents: "Resident artists",
      studios: "Partner studios",
      styles: "Directions",
      years: "Years together",
    },
    principlesLabel: "What we hold to",
    principles: [
      {
        title: "Sterility first",
        text: "Single-use needles, autoclaved tooling, documented procedure. Non-negotiable in every partner studio.",
      },
      {
        title: "Craft over trend",
        text: "A tattoo outlives the trend that inspired it. We design for how it will read in twenty years.",
      },
      {
        title: "Open knowledge",
        text: "Critiques, seminars and mentorship are open to the community. Nobody grows alone in a closed room.",
      },
      {
        title: "The client decides",
        text: "Honest consultation, a clear sketch and a clear price before the machine is ever switched on.",
      },
    ],
  },

  styles: {
    label: "02 — Directions",
    title: "What we work in",
    lead: "Every resident has a signature. Below are the directions you can book inside the community.",
  },

  artists: {
    label: "03 — Residents",
    title: "The people behind the needle",
    lead: "Resident artists of the community. Portfolios live on Instagram; booking goes through the community.",
    portfolio: "Portfolio",
    book: "Book",
  },

  events: {
    label: "04 — Calendar",
    title: "Guest spots & events",
    lead: "Guest artists, conventions, seminars and flash days. Seats are limited and go in order of request.",
    empty: "No events announced right now. Follow Instagram — the calendar updates there first.",
    cta: "Request a seat",
    kinds: {
      guest: "Guest spot",
      convention: "Convention",
      seminar: "Seminar",
      flash: "Flash day",
    },
  },

  booking: {
    label: "05 — Booking",
    title: "How a session happens",
    lead: "No surprises. You know the sketch, the price and the date before anything touches skin.",
    steps: [
      {
        title: "Request",
        text: "Tell us the idea, the placement, the size and your reference images. We match you with the right resident.",
      },
      {
        title: "Sketch",
        text: "The artist proposes a design. You refine it together until it is exactly right.",
      },
      {
        title: "Deposit & date",
        text: "A deposit locks your date and covers the artist's preparation. It comes off the final price.",
      },
      {
        title: "Session",
        text: "Sterile setup, comfortable pace, breaks whenever you need them. Long pieces are split across sittings.",
      },
      {
        title: "Aftercare",
        text: "Written instructions, a check-in after healing, and a free touch-up within the first three months.",
      },
    ],
    cta: "Open booking",
    ctaFallback: "Write to us",
    note: "18+ only. Bring an ID. We do not tattoo anyone intoxicated.",
  },

  contact: {
    label: "06 — Contact",
    title: "Come by",
    lead: "Questions, collaborations, guest-spot requests — or just come and look at the portfolios in person.",
    addressLabel: "Address",
    address: "Baku, Azerbaijan",
    hoursLabel: "Hours",
    hours: "Daily · 12:00 — 21:00",
    phoneLabel: "Phone",
    emailLabel: "Email",
    socialLabel: "Social",
  },

  footer: {
    tagline: "Tattoo artists of Baku, together.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

export default en;

/** The English dictionary is the contract every other locale must satisfy. */
export type Dictionary = typeof en;
