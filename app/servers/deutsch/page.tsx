import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/deutsch`;

const title = "Deutsche Discord Server finden | Asko Cafe";
const description =
  "Finde deutsche Discord Server auf Asko Cafe. Entdecke deutschsprachige Gaming-, Anime-, Minecraft-, Valorant- und Community-Server.";

const about = [
  "Deutsche Discord Server",
  "Discord Server Deutsch",
  "Deutschsprachige Discord Communities",
  "Gaming Discord Server Deutsch",
  "Anime Discord Server Deutsch",
  "Minecraft Discord Server Deutsch",
  "Valorant Discord Server Deutsch",
  "Community Discord Server Deutsch",
  "Discord Server Liste",
];

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Deutsche Discord Server",
    "Discord Server Deutsch",
    "Deutschsprachige Discord Server",
    "Discord Server Liste",
    "Discord Server Deutschland",
    "Gaming Discord Server Deutsch",
    "Anime Discord Server Deutsch",
    "Minecraft Discord Server Deutsch",
    "Valorant Discord Server Deutsch",
    "Community Discord Server Deutsch",
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
        alt: "Deutsche Discord Server finden auf Asko Cafe",
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

export default function DeutscheDiscordServerPage() {
  return (
    <ServersPage
      searchParams={Promise.resolve({ language: "Deutsch" })}
      seoContext={{
        title,
        description,
        canonical,
        breadcrumbName: "Deutsche Discord Server",
        about,
      }}
    />
  );
}
