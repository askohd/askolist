import type { Metadata } from "next";
import ServersPage from "../page";

export const metadata: Metadata = {
  title: "Community Discord Server finden – Discord Server Liste",
  description:
    "Finde Community Discord Server auf Asko Cafe. Entdecke aktive Communities zum Chatten, Kennenlernen, Gaming, Anime und mehr.",
  alternates: {
    canonical: "/servers/community",
  },
  openGraph: {
    title: "Community Discord Server finden – Discord Server Liste",
    description:
      "Finde Community Discord Server auf Asko Cafe. Entdecke aktive Communities zum Chatten, Kennenlernen, Gaming, Anime und mehr.",
    url: "https://www.askocafe.com/servers/community",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Community Discord Server finden – Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Discord Server finden – Discord Server Liste",
    description:
      "Finde Community Discord Server auf Asko Cafe. Entdecke aktive Communities zum Chatten, Kennenlernen, Gaming, Anime und mehr.",
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
      searchParams={Promise.resolve({ q: "community" })}
    />
  );
}
