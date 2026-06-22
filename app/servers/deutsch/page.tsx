import type { Metadata } from "next";
import ServersPage from "../page";

const title = "Deutsche Discord Server finden | Discord Server Liste";
const description =
  "Finde deutsche Discord Server auf Asko Cafe. Entdecke deutschsprachige Gaming, Anime, Minecraft, Valorant und Community Discord Server.";

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
    canonical: "https://www.askocafe.com/servers/deutsch",
  },
  openGraph: {
    title,
    description,
    url: "https://www.askocafe.com/servers/deutsch",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.askocafe.com/asko-cafe-hero.png",
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

export default function DeutscheDiscordServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://www.askocafe.com/servers/deutsch",
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: "https://www.askocafe.com",
    },
    about: [
      "Deutsche Discord Server",
      "Discord Server Liste",
      "Deutschsprachige Discord Communities",
      "Gaming Discord Server",
      "Anime Discord Server",
      "Minecraft Discord Server",
      "Valorant Discord Server",
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

      <ServersPage searchParams={Promise.resolve({ language: "Deutsch" })} />
    </>
  );
}
