import type { Metadata } from "next";
import ServersPage from "../page";

export const metadata: Metadata = {
  title: "Valorant Discord Server finden – Discord Server Liste",
  description:
    "Finde Valorant Discord Server auf Asko Cafe. Entdecke Teamsuche, Ranked, Scrims, Events und Valorant Gaming Communities.",
  alternates: {
    canonical: "/servers/valorant",
  },
  openGraph: {
    title: "Valorant Discord Server finden – Discord Server Liste",
    description:
      "Finde Valorant Discord Server auf Asko Cafe. Entdecke Teamsuche, Ranked, Scrims, Events und Valorant Gaming Communities.",
    url: "https://www.askocafe.com/servers/valorant",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Valorant Discord Server finden – Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valorant Discord Server finden – Discord Server Liste",
    description:
      "Finde Valorant Discord Server auf Asko Cafe. Entdecke Teamsuche, Ranked, Scrims, Events und Valorant Gaming Communities.",
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
      searchParams={Promise.resolve({ q: "valorant" })}
    />
  );
}
