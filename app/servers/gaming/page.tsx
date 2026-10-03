import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/gaming`;

const title = "Gaming Discord Server finden";
const description =
  "Finde Gaming Discord Server und Communities für verschiedene Spiele auf Asko Cafe. Vergleiche Beschreibungen, Sprache und Tags und entdecke mögliche Mitspieler.";

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
        url: `${SITE_URL}/asko-cafe-banner.png`,
        width: 960,
        height: 540,
        alt: "Gaming Discord Server finden auf Asko Cafe",
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
        heading: "Gaming Discord Server",
        intro: description,
        guideTitle: "Eine Gaming-Community für dein Spiel finden",
        guideText:
          "Gaming-Server können sich einem einzelnen Spiel oder mehreren Spielen widmen. Lies die Beschreibung und achte auf Spielnamen, Plattformen, Sprache und angebotene Aktivitäten. So kannst du vor dem Beitritt einschätzen, ob die Community zu dir passt.",
        faqTitle: "Fragen zu Gaming Discord Servern",
        faq: [
          {
            question: "Wie werden Gaming Discord Server hier gefunden?",
            answer:
              "Diese Seite sucht nach Gaming im Servernamen, in der Beschreibung, den Tags oder der Kategorie. Für ein bestimmtes Spiel kannst du einen Spielnamen suchen oder die Minecraft- und Valorant-Kategorien öffnen.",
          },
          {
            question: "Wie finde ich Gaming-Server in meiner Sprache?",
            answer:
              "Wähle im Sprachfilter die gewünschte Sprache aus. Prüfe im Serverprofil zusätzlich, welche Spiele und Aktivitäten die Community beschreibt.",
          },
        ],
      }}
    />
  );
}
