import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import SiteFooter from "@/components/SiteFooter";

const siteUrl = "https://www.askocafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Discord Server Liste | Asko Cafe",
    template: "%s | Asko Cafe",
  },

  description:
    "Entdecke Discord Server für Gaming, Anime, Community und mehr. Suche nach Sprache und Interessen oder trage deine eigene Community kostenlos auf Asko Cafe ein.",

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
    title: "Discord Server Liste | Asko Cafe",
    description:
      "Finde Discord Communities für Gaming, Anime und weitere Interessen. Entdecke Server oder trage deinen eigenen Discord Server ein.",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-banner.png",
        width: 960,
        height: 540,
        alt: "Asko Cafe Discord Server Liste",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Discord Server Liste | Asko Cafe",
    description:
      "Entdecke Discord Server für Gaming, Anime, Community und weitere Interessen.",
    images: ["/asko-cafe-banner.png"],
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
