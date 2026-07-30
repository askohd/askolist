import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/community`;

const title = "Community Discord Server Deutsch finden | Asko Cafe";
const description =
  "Finde Community Discord Server auf Asko Cafe. Entdecke aktive deutsche Discord Communities zum Chatten, Kennenlernen, Gaming, Anime, Events und Freunde finden.";

const about = [
  "Community Discord Server",
  "Deutsche Community Discord Server",
  "Deutsche Discord Communities",
  "Discord Server zum Chatten",
  "Discord Freunde finden",
  "Discord Server kennenlernen",
  "Chill Discord Server",
  "Gaming Community Discord",
  "Anime Community Discord",
  "Discord Server Liste",
];

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Community Discord Server",
    "Discord Community",
    "Deutsche Community Discord Server",
    "Deutsche Discord Communities",
    "Discord Server zum Chatten",
    "Discord Freunde finden",
    "Discord Server kennenlernen",
    "Chill Discord Server",
    "Gaming Community Discord",
    "Anime Community Discord",
    "Discord Server Liste",
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
        alt: "Community Discord Server finden auf Asko Cafe",
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

export default function CommunityDiscordServerPage() {
  return (
    <ServersPage
      searchParams={Promise.resolve({ q: "community" })}
      seoContext={{
        title,
        description,
        canonical,
        breadcrumbName: "Community Discord Server",
        about,
      }}
    />
  );
}
