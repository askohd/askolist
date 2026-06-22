import type { Metadata } from "next";
import ServersPage from "../page";

const title = "Minecraft Discord Server finden | Discord Server Liste";
const description =
  "Finde Minecraft Discord Server auf Asko Cafe. Entdecke deutsche Minecraft Communities für SMP, Survival, Citybuild, Events, Minigames und neue Mitspieler.";

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
    canonical: "https://www.askocafe.com/servers/minecraft",
  },
  openGraph: {
    title,
    description,
    url: "https://www.askocafe.com/servers/minecraft",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.askocafe.com/asko-cafe-hero.png",
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
    images: ["https://www.askocafe.com/asko-cafe-hero.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://www.askocafe.com/servers/minecraft",
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: "https://www.askocafe.com",
    },
    about: [
      "Minecraft Discord Server",
      "Minecraft Communities",
      "Minecraft SMP",
      "Minecraft Survival",
      "Minecraft Citybuild",
      "Minecraft Minigames",
      "Gaming Discord Server",
      "Discord Server Liste",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ServersPage searchParams={Promise.resolve({ q: "minecraft" })} />
    </>
  );
}
