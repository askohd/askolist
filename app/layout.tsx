import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import SiteFooter from "@/components/SiteFooter";

const siteUrl = "https://www.askocafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Asko Cafe – Deutsche Discord Server Liste",
    template: "%s | Asko Cafe",
  },

  description:
    "Entdecke deutsche Discord Server für Gaming, Anime, Community, Events, Chill, Support und mehr. Finde aktive Discord Communities oder trage deinen eigenen Discord Server kostenlos bei Asko Cafe ein.",

  keywords: [
    "Discord Server",
    "deutsche Discord Server",
    "Discord Server Deutsch",
    "Discord Server Liste",
    "Discord Server finden",
    "Discord Server eintragen",
    "Gaming Discord Server",
    "Anime Discord Server",
    "Community Discord Server",
    "Chill Discord Server",
    "Valorant Discord Server",
    "Minecraft Discord Server",
    "Asko Cafe",
  ],

  authors: [{ name: "Asko Cafe" }],
  creator: "Asko Cafe",
  publisher: "Asko Cafe",

  applicationName: "Asko Cafe",

  alternates: {
    canonical: siteUrl,
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

  openGraph: {
    title: "Asko Cafe – Deutsche Discord Server Liste",
    description:
      "Finde aktive deutsche Discord Server für Gaming, Anime, Community, Events und mehr. Liste deinen eigenen Discord Server kostenlos auf Asko Cafe.",
    url: siteUrl,
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Asko Cafe Discord Server Liste",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Asko Cafe – Deutsche Discord Server Liste",
    description:
      "Entdecke deutsche Discord Server für Gaming, Anime, Community und mehr.",
    images: ["/asko-cafe-hero.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Discord Server Directory",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080814",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
