import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/anime`;

const title = "Anime Discord Server finden";
const description =
  "Finde Anime Discord Server und Manga-Communities auf Asko Cafe. Vergleiche Themen, Beschreibungen, Sprache und Tags, bevor du einer Community beitrittst.";

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
        url: `${SITE_URL}/asko-cafe-banner.png`,
        width: 960,
        height: 540,
        alt: "Anime Discord Server finden auf Asko Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/asko-cafe-banner.png`],
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
        heading: "Anime Discord Server",
        intro: description,
        guideTitle: "Anime- und Manga-Communities entdecken",
        guideText:
          "Anime-Communities können sich bestimmten Serien, Manga oder dem allgemeinen Austausch widmen. Lies die Beschreibung und Serverregeln, besonders den Umgang mit Spoilern und Altersbeschränkungen. Nutze Sprache und Tags, um passende Einträge auszuwählen.",
        faqTitle: "Fragen zu Anime Discord Servern",
        faq: [
          {
            question: "Welche Anime Discord Server werden hier angezeigt?",
            answer:
              "Die Seite sucht nach Anime im Servernamen, in der Beschreibung, den Tags oder der Kategorie. Lies das Serverprofil, um zu sehen, welche Serien, Manga oder weiteren Themen dort beschrieben werden.",
          },
          {
            question: "Wie finde ich einen Server zu einer bestimmten Serie?",
            answer:
              "Suche nach dem Namen der Serie oder einem passenden Tag. Prüfe vor dem Beitritt die Beschreibung sowie die Regeln zu Spoilern und zulässigen Inhalten.",
          },
        ],
      }}
    />
  );
}
