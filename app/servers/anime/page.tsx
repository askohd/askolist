import type { Metadata } from "next";
import ServersPage from "../page";

const title = "Anime Discord Server finden | Discord Server Liste";
const description =
  "Finde Anime Discord Server auf Asko Cafe. Entdecke Anime Communities, Manga Server, Otaku Discords, Chill Server und deutschsprachige Anime Discord Communities.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Anime Discord Server",
    "Anime Discords",
    "Deutsche Anime Discord Server",
    "Anime Community Discord",
    "Manga Discord Server",
    "Otaku Discord Server",
    "Chill Discord Server",
    "Discord Server Anime",
    "Discord Server Liste",
    "Anime Community Deutschland",
    "Manga Community Discord",
    "Discord Server finden",
    "Discord Server eintragen",
    "Asko Cafe",
  ],
  alternates: {
    canonical: "https://www.askocafe.com/servers/anime",
  },
  openGraph: {
    title,
    description,
    url: "https://www.askocafe.com/servers/anime",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.askocafe.com/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Anime Discord Server finden auf Asko Cafe",
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

export default function AnimeDiscordServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://www.askocafe.com/servers/anime",
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: "https://www.askocafe.com",
    },
    about: [
      "Anime Discord Server",
      "Anime Communities",
      "Manga Discord Server",
      "Otaku Discord Server",
      "Chill Discord Server",
      "Discord Server Liste",
      "Deutschsprachige Anime Communities",
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

      <ServersPage searchParams={Promise.resolve({ q: "anime" })} />
    </>
  );
}
