import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/community`;

const title = "Community Discord Server finden";
const description =
  "Finde Community Discord Server auf Asko Cafe. Entdecke Einträge zum Chatten und gemeinsamen Austausch und vergleiche Interessen, Sprache und Serverregeln.";

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
        url: `${SITE_URL}/asko-cafe-banner.png`,
        width: 960,
        height: 540,
        alt: "Community Discord Server finden auf Asko Cafe",
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
        heading: "Community Discord Server",
        intro: description,
        guideTitle: "Eine Community mit passenden Interessen auswählen",
        guideText:
          "Community-Server bieten unterschiedliche Themen und Formen des Austauschs. Vergleiche Beschreibungen, Sprache, Tags und Regeln. Achte darauf, welche Zielgruppe und Aktivitäten ein Eintrag nennt, bevor du dich für eine Community entscheidest.",
        faqTitle: "Fragen zu Community Discord Servern",
        faq: [
          {
            question: "Was ist ein Community Discord Server?",
            answer:
              "Ein Community-Server ist ein Discord für den Austausch zwischen Mitgliedern. Die konkreten Themen und Aktivitäten legt die jeweilige Community fest; die Beschreibung hilft dir bei der Auswahl.",
          },
          {
            question: "Wie finde ich eine Community in meiner Sprache?",
            answer:
              "Wähle eine Sprache im Filter und nutze die Suche oder Tags für deine Interessen. Lies im Serverprofil die Regeln und die Beschreibung, um einzuschätzen, ob die Community zu dir passt.",
          },
        ],
      }}
    />
  );
}
