import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/deutsch`;

const title = "Deutsche Discord Server finden";
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
        url: `${SITE_URL}/asko-cafe-banner.png`,
        width: 960,
        height: 540,
        alt: "Deutsche Discord Server finden auf Asko Cafe",
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
        heading: "Deutsche Discord Server",
        intro: description,
        guideTitle: "Eine deutschsprachige Community finden",
        guideText:
          "Diese Liste ist nach der Serversprache Deutsch gefiltert. Vergleiche Themen, Tags und Beschreibungen, um eine Community für Gaming, Anime oder den Austausch im Alltag zu finden. Die Serversprache sagt nichts über den Wohnort der Mitglieder aus.",
        faqTitle: "Fragen zu deutschen Discord Servern",
        faq: [
          {
            question: "Was zeigt die Liste deutscher Discord Server?",
            answer:
              "Hier erscheinen freigegebene Server, deren Eintrag die Sprache Deutsch angibt. Die Liste kann Communities mit verschiedenen Themen und Mitgliedern aus unterschiedlichen Ländern enthalten.",
          },
          {
            question: "Wie suche ich nach einem bestimmten Thema?",
            answer:
              "Gib beispielsweise Gaming, Anime oder einen Spielnamen in die Suche ein und behalte Deutsch im Sprachfilter ausgewählt. Tags helfen dir, die Auswahl weiter einzugrenzen.",
          },
        ],
      }}
    />
  );
}
