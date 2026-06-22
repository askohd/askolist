import type { Metadata } from "next";
import ServersPage from "../page";

const title = "Valorant Discord Server finden | Discord Server Liste";
const description =
  "Finde Valorant Discord Server auf Asko Cafe. Entdecke deutsche Valorant Communities für Teamsuche, Ranked, Scrims, Events, DuoQ und neue Mitspieler.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Valorant Discord Server",
    "Valorant Discords",
    "Deutsche Valorant Discord Server",
    "Valorant Community Discord",
    "Valorant Teamsuche Discord",
    "Valorant Ranked Discord",
    "Valorant Scrims Discord",
    "Valorant Mitspieler finden",
    "Valorant DuoQ Discord",
    "Discord Server Valorant",
    "Discord Server Liste",
    "Gaming Discord Server",
    "Discord Server finden",
    "Discord Server eintragen",
    "Asko Cafe",
  ],
  alternates: {
    canonical: "https://www.askocafe.com/servers/valorant",
  },
  openGraph: {
    title,
    description,
    url: "https://www.askocafe.com/servers/valorant",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.askocafe.com/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Valorant Discord Server finden auf Asko Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.askocafe.com/asko-cafe-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function ValorantDiscordServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://www.askocafe.com/servers/valorant",
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: "https://www.askocafe.com",
    },
    about: [
      "Valorant Discord Server",
      "Valorant Communities",
      "Valorant Teamsuche",
      "Valorant Ranked",
      "Valorant Scrims",
      "Valorant DuoQ",
      "Gaming Discord Server",
      "Discord Server Liste",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ServersPage searchParams={Promise.resolve({ q: "valorant" })} />
    </>
  );
}
