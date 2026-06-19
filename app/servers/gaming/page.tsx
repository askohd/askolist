import type { Metadata } from "next";
import ServersPage from "../page";

export const metadata: Metadata = {
  title: "Gaming Discord Server finden – Discord Server Liste",
  description:
    "Finde Gaming Discord Server auf Asko Cafe. Entdecke aktive Gaming Communities, Mitspieler, Events und Server für verschiedene Spiele.",
  alternates: {
    canonical: "/servers/gaming",
  },
  openGraph: {
    title: "Gaming Discord Server finden – Discord Server Liste",
    description:
      "Finde Gaming Discord Server auf Asko Cafe. Entdecke aktive Gaming Communities, Mitspieler, Events und Server für verschiedene Spiele.",
    url: "https://www.askocafe.com/servers/gaming",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Gaming Discord Server finden – Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Discord Server finden – Discord Server Liste",
    description:
      "Finde Gaming Discord Server auf Asko Cafe. Entdecke aktive Gaming Communities, Mitspieler, Events und Server für verschiedene Spiele.",
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
      searchParams={Promise.resolve({ q: "gaming" })}
    />
  );
}
