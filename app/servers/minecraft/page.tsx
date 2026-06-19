import type { Metadata } from "next";
import ServersPage from "../page";

export const metadata: Metadata = {
  title: "Minecraft Discord Server finden – Discord Server Liste",
  description:
    "Finde Minecraft Discord Server auf Asko Cafe. Entdecke SMP, Survival, Citybuild, Events und deutsche Minecraft Communities.",
  alternates: {
    canonical: "/servers/minecraft",
  },
  openGraph: {
    title: "Minecraft Discord Server finden – Discord Server Liste",
    description:
      "Finde Minecraft Discord Server auf Asko Cafe. Entdecke SMP, Survival, Citybuild, Events und deutsche Minecraft Communities.",
    url: "https://www.askocafe.com/servers/minecraft",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Minecraft Discord Server finden – Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minecraft Discord Server finden – Discord Server Liste",
    description:
      "Finde Minecraft Discord Server auf Asko Cafe. Entdecke SMP, Survival, Citybuild, Events und deutsche Minecraft Communities.",
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
      searchParams={Promise.resolve({ q: "minecraft" })}
    />
  );
}
