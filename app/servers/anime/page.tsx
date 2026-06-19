import type { Metadata } from "next";
import ServersPage from "../page";

export const metadata: Metadata = {
  title: "Anime Discord Server finden – Discord Server Liste",
  description:
    "Finde Anime Discord Server auf Asko Cafe. Entdecke Anime Communities, Manga Server, Chill Server und neue Discord Communities.",
  alternates: {
    canonical: "/servers/anime",
  },
  openGraph: {
    title: "Anime Discord Server finden – Discord Server Liste",
    description:
      "Finde Anime Discord Server auf Asko Cafe. Entdecke Anime Communities, Manga Server, Chill Server und neue Discord Communities.",
    url: "https://www.askocafe.com/servers/anime",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Anime Discord Server finden – Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Discord Server finden – Discord Server Liste",
    description:
      "Finde Anime Discord Server auf Asko Cafe. Entdecke Anime Communities, Manga Server, Chill Server und neue Discord Communities.",
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
      searchParams={Promise.resolve({ q: "anime" })}
    />
  );
}
