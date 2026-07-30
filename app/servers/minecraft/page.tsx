import type { Metadata } from "next";
import ServersPage from "../page";

const SITE_URL = "https://www.askocafe.com";
const canonical = `${SITE_URL}/servers/minecraft`;

const title = "Minecraft Discord Server Deutsch finden | Asko Cafe";
const description =
  "Finde Minecraft Discord Server auf Asko Cafe. Entdecke deutsche Minecraft Communities für SMP, Survival, Citybuild, Events, Minigames und neue Mitspieler.";

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
        url: `${SITE_URL}/asko-cafe-hero.png`,
        width: 1200,
        height: 630,
        alt: "Minecraft Discord Server finden auf Asko Cafe",
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
      }}
    />
  );
}
