import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/anime`;

const title = "Anime Discord Server Deutsch finden | Asko Cafe";
const description =
  "Finde Anime Discord Server auf Asko Cafe. Entdecke deutschsprachige Anime Communities, Manga Server, Otaku Discords, Chill Server und neue Mitglieder.";

const about = [
  "Anime Discord Server",
  "Deutsche Anime Discord Server",
  "Anime Communities",
  "Manga Discord Server",
  "Otaku Discord Server",
  "Chill Discord Server",
  "Deutschsprachige Anime Communities",
  "Discord Server Liste",
];

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
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: `${SITE_URL}/asko-cafe-hero.png`,
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
    images: [`${SITE_URL}/asko-cafe-hero.png`],
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
  return (
    <ServersPage
      searchParams={Promise.resolve({ q: "anime" })}
      seoContext={{
        title,
        description,
        canonical,
        breadcrumbName: "Anime Discord Server",
        about,
      }}
    />
  );
}
