import type { Metadata } from "next";
import ServersPage from "../page";

export const metadata: Metadata = {
  title: "Deutsche Discord Server finden – Discord Server Liste",
  description:
    "Finde deutsche Discord Server auf Asko Cafe. Entdecke Gaming, Anime, Community, Minecraft, Valorant und weitere deutschsprachige Discord Communities.",
  alternates: {
    canonical: "/servers/deutsch",
  },
  openGraph: {
    title: "Deutsche Discord Server finden – Discord Server Liste",
    description:
      "Finde deutsche Discord Server auf Asko Cafe. Entdecke Gaming, Anime, Community, Minecraft, Valorant und weitere deutschsprachige Discord Communities.",
    url: "https://www.askocafe.com/servers/deutsch",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Deutsche Discord Server finden – Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deutsche Discord Server finden – Discord Server Liste",
    description:
      "Finde deutsche Discord Server auf Asko Cafe. Entdecke Gaming, Anime, Community, Minecraft, Valorant und weitere deutschsprachige Discord Communities.",
    images: ["/asko-cafe-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoryPage() {
  return (
    <ServersPage
      searchParams={Promise.resolve({ language: "Deutsch" })}
    />
  );
}
