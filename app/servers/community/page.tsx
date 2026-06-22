import type { Metadata } from "next";
import ServersPage from "../page";

const title = "Community Discord Server finden | Discord Server Liste";
const description =
  "Finde Community Discord Server auf Asko Cafe. Entdecke aktive deutsche Discord Communities zum Chatten, Kennenlernen, Gaming, Anime, Events und Freunde finden.";

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
    canonical: "https://www.askocafe.com/servers/community",
  },
  openGraph: {
    title,
    description,
    url: "https://www.askocafe.com/servers/community",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "https://www.askocafe.com/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Community Discord Server finden auf Asko Cafe",
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

export default function CommunityDiscordServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://www.askocafe.com/servers/community",
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: "https://www.askocafe.com",
    },
    about: [
      "Community Discord Server",
      "Deutsche Discord Communities",
      "Discord Server zum Chatten",
      "Discord Freunde finden",
      "Chill Discord Server",
      "Gaming Community Discord",
      "Anime Community Discord",
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

      <ServersPage searchParams={Promise.resolve({ q: "community" })} />
    </>
  );
}
