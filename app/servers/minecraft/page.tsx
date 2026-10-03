import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/minecraft`;

const title = "Minecraft Discord Server finden";
const description =
  "Finde Minecraft Discord Server auf Asko Cafe. Vergleiche Communities für SMP, Survival, Citybuild oder Minigames anhand ihrer Beschreibung, Sprache und Tags.";

const about = [
  "Minecraft Discord Server",
  "Deutsche Minecraft Discord Server",
  "Minecraft Communities",
  "Minecraft SMP",
  "Minecraft Survival",
  "Minecraft Citybuild",
  "Minecraft Minigames",
  "Gaming Discord Server",
  "Discord Server Liste",
];

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Minecraft Discord Server",
    "Minecraft Discords",
    "Deutsche Minecraft Discord Server",
    "Minecraft Community Discord",
    "Minecraft SMP Discord",
    "Minecraft Survival Discord",
    "Minecraft Citybuild Discord",
    "Minecraft Minigames Discord",
    "Minecraft Mitspieler finden",
    "Discord Server Minecraft",
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
        alt: "Minecraft Discord Server finden auf Asko Cafe",
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

export default function MinecraftDiscordServerPage() {
  return (
    <ServersPage
      searchParams={Promise.resolve({ q: "minecraft" })}
      seoContext={{
        title,
        description,
        canonical,
        breadcrumbName: "Minecraft Discord Server",
        about,
        heading: "Minecraft Discord Server",
        intro: description,
        guideTitle: "Die passende Minecraft-Community auswählen",
        guideText:
          "Prüfe in der Serverbeschreibung die Edition, Spielversion und Spielweise, etwa Survival, SMP oder Citybuild. Manche Communities setzen eine Bewerbung oder Whitelist voraus. Ein Discord-Einladungslink führt zur Community; Angaben zum Spielserver findest du im Eintrag oder auf dessen Discord.",
        faqTitle: "Fragen zu Minecraft Discord Servern",
        faq: [
          {
            question: "Wie finde ich Minecraft-Server für Java oder Bedrock?",
            answer:
              "Suche nach Minecraft und der gewünschten Edition oder verwende passende Tags. Prüfe die Beschreibung, da dieser Discord-Eintrag selbst keine bestimmte Edition oder Spielversion garantiert.",
          },
          {
            question: "Ist ein Discord-Link auch die Adresse des Minecraft-Spielservers?",
            answer:
              "Nein. Der Beitreten-Link öffnet den Discord der Community. Die Adresse des Minecraft-Spielservers und mögliche Voraussetzungen musst du der Beschreibung oder den Informationen der Community entnehmen.",
          },
        ],
      }}
    />
  );
}
