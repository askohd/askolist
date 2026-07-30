import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/gaming`;

const title = "Gaming Discord Server Deutsch finden | Asko Cafe";
const description =
  "Finde Gaming Discord Server auf Asko Cafe. Entdecke aktive deutschsprachige Gaming Communities, Mitspieler, Events, Clans und Server für verschiedene Spiele.";

const about = [
  "Gaming Discord Server",
  "Deutsche Gaming Discord Server",
  "Gaming Communities",
  "Mitspieler finden",
  "Gaming Clans",
  "Minecraft Discord Server",
  "Valorant Discord Server",
  "Discord Server Liste",
];

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Gaming Discord Server",
    "Gaming Discords",
    "Deutsche Gaming Discord Server",
    "Discord Server Gaming",
    "Gaming Community Discord",
    "Discord Server Liste",
    "Mitspieler finden Discord",
    "Gaming Clan Discord",
    "Minecraft Discord Server",
    "Valorant Discord Server",
    "Fortnite Discord Server",
    "Anime Gaming Discord",
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
        alt: "Gaming Discord Server finden auf Asko Cafe",
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

export default function GamingDiscordServerPage() {
  return (
    <ServersPage
      searchParams={Promise.resolve({ q: "gaming" })}
      seoContext={{
        title,
        description,
        canonical,
        breadcrumbName: "Gaming Discord Server",
        about,
      }}
    />
  );
}
