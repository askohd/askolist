import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/valorant`;

const title = "Valorant Discord Server Deutsch finden | Asko Cafe";
const description =
  "Finde Valorant Discord Server auf Asko Cafe. Entdecke deutsche Valorant Communities für Teamsuche, Ranked, Scrims, Events, DuoQ und neue Mitspieler.";

const about = [
  "Valorant Discord Server",
  "Deutsche Valorant Discord Server",
  "Valorant Communities",
  "Valorant Teamsuche",
  "Valorant Ranked",
  "Valorant Scrims",
  "Valorant DuoQ",
  "Gaming Discord Server",
  "Discord Server Liste",
];

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
        alt: "Valorant Discord Server finden auf Asko Cafe",
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

export default function ValorantDiscordServerPage() {
  return (
    <ServersPage
      searchParams={Promise.resolve({ q: "valorant" })}
      seoContext={{
        title,
        description,
        canonical,
        breadcrumbName: "Valorant Discord Server",
        about,
      }}
    />
  );
}
