import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { supabaseRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 300;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Asko Cafe – Discord Server Liste für deutsche Gaming, Anime & Community Server",
  description:
    "Finde aktive Discord Server auf Asko Cafe: deutsche Discord Server, Gaming Discords, Anime Server, Minecraft Server, Valorant Server und Community Server. Trage deinen Discord Server kostenlos ein.",
  keywords: [
    "Discord Server",
    "Discord Server Liste",
    "deutsche Discord Server",
    "Gaming Discord Server",
    "Anime Discord Server",
    "Minecraft Discord Server",
    "Valorant Discord Server",
    "Community Discord Server",
    "Discord Server eintragen",
    "Discord Server finden",
    "Asko Cafe",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Asko Cafe – Discord Server Liste für deutsche Gaming, Anime & Community Server",
    description:
      "Entdecke aktive Discord Server und trage deine eigene Community kostenlos auf Asko Cafe ein.",
    url: "/",
    siteName: "Asko Cafe",
    type: "website",
    images: [
      {
        url: "/asko-cafe-banner.png",
        width: 1200,
        height: 630,
        alt: "Asko Cafe Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asko Cafe – Discord Server Liste",
    description:
      "Finde deutsche Discord Server, Gaming Discords, Anime Server, Minecraft Server und mehr.",
    images: ["/asko-cafe-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function normalizeServers(value: unknown) {
  return Array.isArray(value) ? value : [];
}

async function loadHomeServers() {
  try {
    const [premiumServers, overviewServers] = await Promise.all([
      supabaseRequest(
        "servers?approved=eq.true&status=eq.approved&or=(premium_status.eq.true,partner_status.eq.true)&select=*&order=last_bump.desc.nullslast,created_at.desc&limit=9"
      ),
      supabaseRequest(
        "servers?approved=eq.true&status=eq.approved&select=*&order=last_bump.desc.nullslast,created_at.desc&limit=18"
      ),
    ]);

    return {
      premiumServers: normalizeServers(premiumServers),
      overviewServers: normalizeServers(overviewServers),
    };
  } catch (error) {
    console.error("Home SEO server fetch failed:", error);

    return {
      premiumServers: [],
      overviewServers: [],
    };
  }
}

function getJsonLd() {
  const url = SITE_URL.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: "Asko Cafe",
        url,
        inLanguage: "de-DE",
        description:
          "Discord Server Liste für deutsche und internationale Gaming, Anime, Minecraft, Valorant und Community Server.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/servers?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}/#discord-server-list`,
        name: "Discord Server Liste",
        url,
        isPartOf: {
          "@id": `${url}/#website`,
        },
        about: [
          "Discord Server",
          "Deutsche Discord Server",
          "Gaming Discord Server",
          "Anime Discord Server",
          "Minecraft Discord Server",
          "Valorant Discord Server",
          "Community Discord Server",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}/#categories`,
        name: "Beliebte Discord Server Kategorien",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Deutsche Discord Server",
            url: `${url}/servers/deutsch`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Gaming Discord Server",
            url: `${url}/servers/gaming`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Anime Discord Server",
            url: `${url}/servers/anime`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Minecraft Discord Server",
            url: `${url}/servers/minecraft`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Valorant Discord Server",
            url: `${url}/servers/valorant`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Community Discord Server",
            url: `${url}/servers/community`,
          },
        ],
      },
    ],
  };
}

export default async function HomePage() {
  const { premiumServers, overviewServers } = await loadHomeServers();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLd()),
        }}
      />

      <HomeClient
        initialPremiumServers={premiumServers}
        initialOverviewServers={overviewServers}
      />
    </>
  );
}
