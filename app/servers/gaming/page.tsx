import type { Metadata } from "next";
import ServersPage from "../page";

const title = "Gaming Discord Server finden | Discord Server Liste";
const description =
  "Finde Gaming Discord Server auf Asko Cafe. Entdecke aktive Gaming Communities, Mitspieler, Events, Clans und Discord Server für verschiedene Spiele.";

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
    canonical: "https://www.askocafe.com/servers/gaming",
  },
  openGraph: {
    title,
    description,
    url: "https://www.askocafe.com/servers/gaming",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.askocafe.com/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Gaming Discord Server finden auf Asko Cafe",
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

export default function GamingDiscordServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://www.askocafe.com/servers/gaming",
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: "https://www.askocafe.com",
    },
    about: [
      "Gaming Discord Server",
      "Gaming Communities",
      "Discord Server Liste",
      "Mitspieler finden",
      "Gaming Clans",
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

      <ServersPage searchParams={Promise.resolve({ q: "gaming" })} />
    </>
  );
}
