import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { About } from "@/components/sections/About";
import { Artists } from "@/components/sections/Artists";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { Styles } from "@/components/sections/Styles";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Hero locale={typedLocale} dict={dict} />
      <About dict={dict} />
      <Styles locale={typedLocale} dict={dict} />
      <Artists locale={typedLocale} dict={dict} />
      <Events locale={typedLocale} dict={dict} />
      <Booking dict={dict} />
      <Contact locale={typedLocale} dict={dict} />

      <script
        type="application/ld+json"
        // Structured data so Baku searches can surface the community directly.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: `${site.url}/${typedLocale}`,
            logo: `${site.url}/favicon.svg`,
            description: dict.meta.description,
            email: site.email,
            telephone: site.phone,
            sameAs: [site.instagram],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Baku",
              addressCountry: "AZ",
            },
          }),
        }}
      />
    </>
  );
}
