import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/valorant`;

const title = "Valorant Discord Server finden";
const description =
  "Finde Valorant Discord Server auf Asko Cafe. Vergleiche Communities für Mitspielersuche, Ranked oder Teams anhand ihrer Beschreibungen, Sprache und Tags.";

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
        url: `${SITE_URL}/asko-cafe-banner.png`,
        width: 960,
        height: 540,
        alt: "Valorant Discord Server finden auf Asko Cafe",
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
        heading: "Valorant Discord Server",
        intro: description,
        guideTitle: "Eine Valorant-Community für deine Mitspielersuche finden",
        guideText:
          "Achte bei der Auswahl auf Sprache, Region, Spielmodus und mögliche Rangvoraussetzungen. Lies, ob die Community gemeinsame Runden, Teamaufbau oder andere Aktivitäten beschreibt. So kannst du vor dem Beitritt prüfen, ob deine Erwartungen zum Server passen.",
        faqTitle: "Fragen zu Valorant Discord Servern",
        faq: [
          {
            question: "Wie finde ich eine Community für Ranked oder Teamsuche?",
            answer:
              "Suche nach Valorant und einem passenden Begriff oder Tag wie Ranked oder Teamsuche. Im Serverprofil kannst du nachlesen, welche Aktivitäten und Voraussetzungen die Community selbst angibt.",
          },
          {
            question: "Kann ich nach Region oder Rang filtern?",
            answer:
              "Die Liste hat Filter für Sprache und Tags. Region oder Rang kannst du als Suchbegriff verwenden und anschließend in der Serverbeschreibung prüfen; eigene Region- und Rangfilter gibt es hier nicht.",
          },
        ],
      }}
    />
  );
}
