import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { CSSProperties } from "react";
import { supabaseRequest } from "@/lib/supabase";
import { languages } from "@/lib/demoData";

const SITE_URL = "https://www.askocafe.com";

const pageTitle = "Discord Server Liste | Deutsche Discord Server finden";
const pageDescription =
  "Finde aktive deutsche Discord Server für Gaming, Anime, Community, Minecraft, Valorant und mehr. Entdecke neue Communities oder trage deinen Server kostenlos ein.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Discord Server",
    "Discord Server Liste",
    "Discord Server finden",
    "Discord Server eintragen",
    "deutsche Discord Server",
    "deutsche Discord Server Liste",
    "Discord Server Deutsch",
    "Discord Server Liste Deutsch",
    "Gaming Discord Server",
    "Anime Discord Server",
    "Community Discord Server",
    "Minecraft Discord Server",
    "Valorant Discord Server",
    "Chill Discord Server",
    "Discord Community",
    "Asko Cafe",
  ],
  alternates: {
    canonical: `${SITE_URL}/servers`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/servers`,
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: `${SITE_URL}/asko-cafe-hero.png`,
        width: 1200,
        height: 630,
        alt: "Asko Cafe Discord Server Liste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${SITE_URL}/asko-cafe-hero.png`],
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
type UiLanguage = "de" | "en" | "fr" | "it" | "pl";
type ServerLanguage = "Deutsch" | "English" | "Français" | "Italiano" | "Polski";

const SEO_CATEGORY_LINKS = [
  { href: "/servers/deutsch", label: "Deutsche Discord Server" },
  { href: "/servers/gaming", label: "Gaming Discord Server" },
  { href: "/servers/anime", label: "Anime Discord Server" },
  { href: "/servers/minecraft", label: "Minecraft Discord Server" },
  { href: "/servers/valorant", label: "Valorant Discord Server" },
  { href: "/servers/community", label: "Community Discord Server" },
] as const;

const LANGUAGE_SEARCH_ALIASES: Record<ServerLanguage, string[]> = {
  Deutsch: [
    "deutsch",
    "deutsche",
    "deutscher",
    "deutschland",
    "german",
    "germany",
    "de",
    "allemand",
    "tedesco",
    "tedesca",
    "niemiecki",
    "niemcy",
  ],
  English: [
    "english",
    "englisch",
    "england",
    "usa",
    "america",
    "american",
    "us",
    "uk",
    "gb",
    "anglais",
    "inglese",
    "angielski",
  ],
  Français: [
    "français",
    "francais",
    "französisch",
    "franzoesisch",
    "frankreich",
    "french",
    "france",
    "fr",
    "francese",
    "francuski",
  ],
  Italiano: [
    "italiano",
    "italienisch",
    "italien",
    "italy",
    "italian",
    "it",
    "italie",
    "wloski",
    "wlochy",
    "włochy",
  ],
  Polski: [
    "polski",
    "polnisch",
    "polen",
    "poland",
    "polish",
    "pl",
    "pologne",
    "polonia",
  ],
};

const UI_TEXT = {
  de: {
    pageBadge: "Asko Cafe Directory",
    title: "Discord Server Liste",
    subtitle:
      "Finde aktive Discord Server für Gaming, Anime, Community, Minecraft, Valorant und mehr.",
    submitServer: "Server eintragen",
    searchPlaceholder: "Server suchen...",
    allLanguages: "Alle Sprachen",
    allTags: "Alle Tags",
    search: "Suchen",
    reset: "Zurücksetzen",
    noServersTitle: "Keine Server gefunden",
    noServersText: "Für deine Suche gibt es aktuell keine passenden Server.",
    noRatings: "No ratings",
    notBumped: "Noch nicht gebumpt",
    justNow: "Gerade eben",
    minutesAgo: "vor {value} Min.",
    hoursAgo: "vor {value} Std.",
    daysAgoSingular: "vor {value} Tag",
    daysAgoPlural: "vor {value} Tagen",
    onlineUnknown: "Online unbekannt",
    onlineSuffix: "online",
    membersUnknown: "Mitglieder unbekannt",
    membersSuffix: "Mitglieder",
    bump: "Bump",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",
    viewServer: "Server ansehen",
    join: "Beitreten",
    partner: "Partner",
    seoTitle: "Deutsche Discord Server und internationale Communities finden",
    seoText:
      "Auf Asko Cafe findest du aktive Discord Server aus verschiedenen Kategorien. Entdecke deutsche Discord Server, Gaming Communities, Anime Server, Minecraft Server, Valorant Server, Chill Server und neue Community Server. Du kannst auch deinen eigenen Discord Server kostenlos eintragen und neue Mitglieder erreichen.",
    seoPointOne: "Deutsche Discord Server für Gaming, Anime und Community",
    seoPointTwo: "Internationale Discord Server nach Sprache, Tags und Kategorie",
    seoPointThree: "Kostenlos Discord Server finden, ansehen und eintragen",
  },

  en: {
    pageBadge: "Asko Cafe Directory",
    title: "Discord Server List",
    subtitle:
      "Find active Discord servers and communities for gaming, anime, community, chill, events, Minecraft, Valorant and more.",
    submitServer: "Submit server",
    searchPlaceholder: "Search servers...",
    allLanguages: "All languages",
    allTags: "All tags",
    search: "Search",
    reset: "Reset",
    noServersTitle: "No servers found",
    noServersText: "There are currently no matching servers for your search.",
    noRatings: "No ratings",
    notBumped: "Not bumped yet",
    justNow: "Just now",
    minutesAgo: "{value} min. ago",
    hoursAgo: "{value} hrs. ago",
    daysAgoSingular: "{value} day ago",
    daysAgoPlural: "{value} days ago",
    onlineUnknown: "Online unknown",
    onlineSuffix: "online",
    membersUnknown: "Members unknown",
    membersSuffix: "members",
    bump: "Bump",
    showMore: "Show more",
    showLess: "Show less",
    viewServer: "View server",
    join: "Join",
    partner: "Partner",
    seoTitle: "Find Discord servers and international communities",
    seoText:
      "Asko Cafe helps you discover active Discord servers across many categories. Find German Discord servers, gaming communities, anime servers, Minecraft servers, Valorant servers, chill servers and new community servers. You can also submit your own Discord server for free and reach new members.",
    seoPointOne: "German Discord servers for gaming, anime and community",
    seoPointTwo: "International Discord servers by language, tags and category",
    seoPointThree: "Find, view and submit Discord servers for free",
  },

  fr: {
    pageBadge: "Asko Cafe Directory",
    title: "Serveurs Discord Asko Cafe",
    subtitle:
      "Les serveurs bumpés récemment apparaissent automatiquement en haut.",
    submitServer: "Ajouter un serveur",
    searchPlaceholder: "Rechercher un serveur...",
    allLanguages: "Toutes les langues",
    allTags: "Tous les tags",
    search: "Rechercher",
    reset: "Réinitialiser",
    noServersTitle: "Aucun serveur trouvé",
    noServersText: "Aucun serveur ne correspond actuellement à ta recherche.",
    noRatings: "Aucune note",
    notBumped: "Pas encore bumpé",
    justNow: "À l'instant",
    minutesAgo: "il y a {value} min.",
    hoursAgo: "il y a {value} h",
    daysAgoSingular: "il y a {value} jour",
    daysAgoPlural: "il y a {value} jours",
    onlineUnknown: "Online inconnu",
    onlineSuffix: "en ligne",
    membersUnknown: "Membres inconnus",
    membersSuffix: "membres",
    bump: "Bump",
    showMore: "Afficher plus",
    showLess: "Afficher moins",
    viewServer: "Voir le serveur",
    join: "Rejoindre",
    partner: "Partenaire",
    seoTitle: "Trouver des serveurs Discord et des communautés internationales",
    seoText:
      "Asko Cafe t'aide à découvrir des serveurs Discord actifs dans plusieurs catégories. Trouve des serveurs Discord allemands, des communautés gaming, des serveurs anime, Minecraft, Valorant, chill et de nouveaux serveurs communautaires. Tu peux aussi ajouter ton propre serveur Discord gratuitement.",
    seoPointOne: "Serveurs Discord allemands pour gaming, anime et communauté",
    seoPointTwo: "Serveurs Discord internationaux par langue, tags et catégorie",
    seoPointThree: "Trouver, voir et ajouter des serveurs Discord gratuitement",
  },

  it: {
    pageBadge: "Asko Cafe Directory",
    title: "Server Discord Asko Cafe",
    subtitle:
      "I server bumpati più di recente vengono mostrati automaticamente in alto.",
    submitServer: "Aggiungi server",
    searchPlaceholder: "Cerca server...",
    allLanguages: "Tutte le lingue",
    allTags: "Tutti i tag",
    search: "Cerca",
    reset: "Reimposta",
    noServersTitle: "Nessun server trovato",
    noServersText: "Al momento non ci sono server adatti alla tua ricerca.",
    noRatings: "Nessuna valutazione",
    notBumped: "Non ancora bumpato",
    justNow: "Proprio ora",
    minutesAgo: "{value} min. fa",
    hoursAgo: "{value} ore fa",
    daysAgoSingular: "{value} giorno fa",
    daysAgoPlural: "{value} giorni fa",
    onlineUnknown: "Online sconosciuto",
    onlineSuffix: "online",
    membersUnknown: "Membri sconosciuti",
    membersSuffix: "membri",
    bump: "Bump",
    showMore: "Mostra altro",
    showLess: "Mostra meno",
    viewServer: "Vedi server",
    join: "Entra",
    partner: "Partner",
    seoTitle: "Trova server Discord e community internazionali",
    seoText:
      "Asko Cafe ti aiuta a scoprire server Discord attivi in tante categorie. Trova server Discord tedeschi, community gaming, server anime, Minecraft, Valorant, chill e nuovi server community. Puoi anche inserire gratuitamente il tuo server Discord.",
    seoPointOne: "Server Discord tedeschi per gaming, anime e community",
    seoPointTwo: "Server Discord internazionali per lingua, tag e categoria",
    seoPointThree: "Trova, guarda e inserisci server Discord gratis",
  },

  pl: {
    pageBadge: "Asko Cafe Directory",
    title: "Serwery Discord Asko Cafe",
    subtitle:
      "Ostatnio bumpowane serwery są automatycznie pokazywane na górze.",
    submitServer: "Dodaj serwer",
    searchPlaceholder: "Szukaj serwerów...",
    allLanguages: "Wszystkie języki",
    allTags: "Wszystkie tagi",
    search: "Szukaj",
    reset: "Resetuj",
    noServersTitle: "Nie znaleziono serwerów",
    noServersText: "Obecnie nie ma serwerów pasujących do twojego wyszukiwania.",
    noRatings: "Brak ocen",
    notBumped: "Jeszcze nie bumpowano",
    justNow: "Przed chwilą",
    minutesAgo: "{value} min. temu",
    hoursAgo: "{value} godz. temu",
    daysAgoSingular: "{value} dzień temu",
    daysAgoPlural: "{value} dni temu",
    onlineUnknown: "Online nieznane",
    onlineSuffix: "online",
    membersUnknown: "Członkowie nieznani",
    membersSuffix: "członków",
    bump: "Bump",
    showMore: "Pokaż więcej",
    showLess: "Pokaż mniej",
    viewServer: "Zobacz serwer",
    join: "Dołącz",
    partner: "Partner",
    seoTitle: "Znajdź serwery Discord i międzynarodowe społeczności",
    seoText:
      "Asko Cafe pomaga odkrywać aktywne serwery Discord w wielu kategoriach. Znajdź niemieckie serwery Discord, społeczności gamingowe, serwery anime, Minecraft, Valorant, chill oraz nowe serwery community. Możesz też bezpłatnie dodać własny serwer Discord.",
    seoPointOne: "Niemieckie serwery Discord dla gamingu, anime i community",
    seoPointTwo: "Międzynarodowe serwery Discord według języka, tagów i kategorii",
    seoPointThree: "Znajdź, zobacz i dodaj serwery Discord za darmo",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof UI_TEXT.de) {
  return UI_TEXT[language][key] || UI_TEXT.de[key];
}

function replaceValue(text: string, value: number) {
  return text.replace("{value}", String(value));
}

function normalizeSearchText(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalize(value: unknown) {
  return normalizeSearchText(value);
}

function getLanguageSearchResult(value: string): {
  language: ServerLanguage | "";
  query: string;
} {
  const normalizedValue = normalizeSearchText(value);

  if (!normalizedValue) {
    return {
      language: "",
      query: "",
    };
  }

  const tokens = normalizedValue
    .split(/[\s,.;:|/#\-]+/g)
    .map((token) => token.trim())
    .filter(Boolean);

  for (const [language, aliases] of Object.entries(LANGUAGE_SEARCH_ALIASES)) {
    const normalizedAliases = aliases.map(normalizeSearchText);

    const exactMatch = normalizedAliases.includes(normalizedValue);
    const tokenMatch = tokens.some((token) => normalizedAliases.includes(token));

    if (exactMatch || tokenMatch) {
      const cleanedTokens = exactMatch
        ? []
        : tokens.filter((token) => !normalizedAliases.includes(token));

      return {
        language: language as ServerLanguage,
        query: cleanedTokens.join(" "),
      };
    }
  }

  return {
    language: "",
    query: normalizedValue,
  };
}

function normalizeUiLanguage(value: unknown): UiLanguage | null {
  const language = String(value ?? "").trim().toLowerCase();

  if (["de", "de-de", "deutsch", "german"].includes(language)) return "de";
  if (["en", "en-us", "en-gb", "english"].includes(language)) return "en";
  if (["fr", "fr-fr", "français", "francais", "french"].includes(language)) {
    return "fr";
  }
  if (["it", "it-it", "italiano", "italian"].includes(language)) return "it";
  if (["pl", "pl-pl", "polski", "polish"].includes(language)) return "pl";

  return null;
}

async function getUiLanguage(params: {
  ui?: string;
  lang?: string;
  locale?: string;
}) {
  const cookieStore = await cookies();

  const candidates = [
    params.ui,
    params.lang,
    params.locale,
    cookieStore.get("askocafe-language")?.value,
    cookieStore.get("asko-language")?.value,
    cookieStore.get("asko_language")?.value,
    cookieStore.get("language")?.value,
    cookieStore.get("locale")?.value,
    cookieStore.get("NEXT_LOCALE")?.value,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeUiLanguage(candidate);

    if (normalized) {
      return normalized;
    }
  }

  return "de";
}

function getTimeValue(value: string | null | undefined) {
  if (!value) return 0;
  return new Date(value).getTime();
}

function sortServers(servers: any[]) {
  return servers.sort((a, b) => {
    const aBump = getTimeValue(a.last_bump);
    const bBump = getTimeValue(b.last_bump);

    if (aBump !== bBump) {
      return bBump - aBump;
    }

    return getTimeValue(b.created_at) - getTimeValue(a.created_at);
  });
}

function getRatingStats(reviews: any[], serverId: string) {
  const serverReviews = reviews.filter(
    (review) => review.server_id === serverId
  );

  if (serverReviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = serverReviews.reduce(
    (sum, review) => sum + Number(review.rating ?? 0),
    0
  );

  return {
    average: total / serverReviews.length,
    count: serverReviews.length,
  };
}

function formatLastBump(
  lastBump: string | null | undefined,
  language: UiLanguage
) {
  if (!lastBump) return t(language, "notBumped");

  const diff = Date.now() - new Date(lastBump).getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return t(language, "justNow");
  if (minutes < 60) return replaceValue(t(language, "minutesAgo"), minutes);
  if (hours < 24) return replaceValue(t(language, "hoursAgo"), hours);

  if (days === 1) {
    return replaceValue(t(language, "daysAgoSingular"), days);
  }

  return replaceValue(t(language, "daysAgoPlural"), days);
}

function getOnlineCount(server: any) {
  const possibleValues = [
    server.online_count,
    server.members_online,
    server.online_members,
    server.presence_count,
    server.discord_online_count,
    server.discord_online_members,
    server.approximate_presence_count,
    server.approximate_presence,
    server.onlineCount,
    server.membersOnline,
    server.onlineMembers,
    server.presenceCount,
  ];

  const value = possibleValues.find(
    (item) => item !== null && item !== undefined && !Number.isNaN(Number(item))
  );

  if (value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

function getMemberCount(server: any) {
  const possibleValues = [
    server.member_count,
    server.members_count,
    server.guild_member_count,
    server.discord_member_count,
    server.discord_members_count,
    server.approximate_member_count,
    server.memberCount,
    server.membersCount,
    server.guildMemberCount,
    server.approximateMemberCount,
  ];

  const value = possibleValues.find(
    (item) => item !== null && item !== undefined && !Number.isNaN(Number(item))
  );

  if (value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

function formatOnlineCount(value: number | null, language: UiLanguage) {
  if (value === null) return t(language, "onlineUnknown");

  return `${value.toLocaleString(language === "de" ? "de-DE" : "en-US")} ${t(
    language,
    "onlineSuffix"
  )}`;
}

function formatMemberCount(value: number | null, language: UiLanguage) {
  if (value === null) return t(language, "membersUnknown");

  return `${value.toLocaleString(language === "de" ? "de-DE" : "en-US")} ${t(
    language,
    "membersSuffix"
  )}`;
}

function normalizePremiumLayout(value: unknown) {
  const layout = String(value ?? "glow")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  const layoutAliases: Record<string, string> = {
    glow: "glow",
    starborder: "starborder",
    "star-border": "starborder",
    "sternen-rand": "starborder",
    sunset: "sunset",
    "sunset-dark": "sunset",
    aurora: "aurora",
    "aurora-flow": "aurora",
    neon: "neon",
    "neon-pulse": "neon",
    galaxy: "galaxy",
    "galaxy-dust": "galaxy",
    flame: "flame",
    fire: "flame",
    "fire-core": "flame",
    ocean: "ocean",
    "ocean-wave": "ocean",
  };

  const mappedLayout = layoutAliases[layout] || layout;

  if (
    [
      "glow",
      "starborder",
      "sunset",
      "aurora",
      "neon",
      "galaxy",
      "flame",
      "ocean",
    ].includes(mappedLayout)
  ) {
    return mappedLayout;
  }

  return "glow";
}

function getPremiumDirectoryStyle(
  layout: string,
  glowColor: string
): CSSProperties {
  const base = {
    "--premium-glow": glowColor,
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
  } as CSSProperties & Record<string, string>;

  if (layout === "glow") {
    return {
      ...base,
      borderColor: glowColor,
      boxShadow: `0 0 42px ${glowColor}88, 0 0 90px ${glowColor}44`,
    };
  }

  return base;
}

export default async function ServersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    language?: string;
    tag?: string;
    ui?: string;
    lang?: string;
    locale?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};

  const rawQuery = String(params.q ?? "").trim();
  const selectedLanguageFromUrl = String(params.language ?? "").trim();
  const selectedTag = String(params.tag ?? "").trim();

  const languageSearchResult = getLanguageSearchResult(rawQuery);

  const selectedLanguage =
    selectedLanguageFromUrl || languageSearchResult.language;

  const query = selectedLanguageFromUrl
    ? normalize(rawQuery)
    : languageSearchResult.query;

  const searchInputValue = selectedLanguageFromUrl
    ? rawQuery
    : languageSearchResult.query;

  const uiLanguage = await getUiLanguage(params);

  const data = await supabaseRequest(
    "servers?approved=eq.true&status=eq.approved&select=*"
  );

  const reviews = await supabaseRequest(
    "reviews?select=server_id,discord_user_id,rating"
  );

  const allServers = sortServers(data ?? []);

  const allTags = Array.from(
    new Set(
      allServers.flatMap((server: any) =>
        Array.isArray(server.tags) ? server.tags : []
      )
    )
  ).filter(Boolean);

  const servers = allServers.filter((server: any) => {
    const tagText = Array.isArray(server.tags) ? server.tags.join(" ") : "";

    const matchesSearch =
      !query ||
      normalize(server.server_name).includes(query) ||
      normalize(server.description).includes(query) ||
      normalize(tagText).includes(query) ||
      normalize(server.category).includes(query);

    const matchesLanguage =
      !selectedLanguage || server.language === selectedLanguage;

    const matchesTag =
      !selectedTag ||
      (Array.isArray(server.tags) && server.tags.includes(selectedTag));

    return matchesSearch && matchesLanguage && matchesTag;
  });

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/servers`,
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/servers?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    about: [
      "Discord Server Liste",
      "Deutsche Discord Server",
      "Gaming Discord Server",
      "Anime Discord Server",
      "Minecraft Discord Server",
      "Valorant Discord Server",
      "Community Discord Server",
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: servers.length,
      itemListElement: servers.slice(0, 20).map((server: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/servers/${encodeURIComponent(server.slug || server.id)}`,
        name: server.server_name || "Discord Server",
        description: server.description || "Discord Server auf Asko Cafe",
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Discord Server Liste",
        item: `${SITE_URL}/servers`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionJsonLd, breadcrumbJsonLd]),
        }}
      />

      <main className="container servers-directory-page">
      <style>{`
        .server-directory-card .premium-server-meta-row.server-card-top-stats {
          display: grid !important;
          grid-template-columns: minmax(76px, 0.82fr) minmax(98px, 1.05fr) minmax(128px, 1.38fr) !important;
          align-items: center !important;
          gap: 8px !important;
          margin-top: 14px !important;
          margin-bottom: 12px !important;
          flex-wrap: nowrap !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill {
          width: 100% !important;
          min-width: 0 !important;
          min-height: 34px !important;
          padding: 0 9px !important;
          border-radius: 999px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          font-size: 11px !important;
          font-weight: 950 !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill span:last-child {
          min-width: 0 !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill > span:first-child {
          flex: 0 0 auto !important;
          font-size: 10px !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-online-dot {
          flex: 0 0 auto !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill.online {
          color: #b8ffd8 !important;
          border-color: rgba(54,255,154,0.34) !important;
          background:
            radial-gradient(circle at 0% 0%, rgba(54,255,154,0.20), transparent 44%),
            rgba(255,255,255,0.065) !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill.members {
          color: #ffe9a6 !important;
          border-color: rgba(255,220,115,0.34) !important;
          background:
            radial-gradient(circle at 0% 0%, rgba(255,220,115,0.18), transparent 44%),
            rgba(255,255,255,0.065) !important;
        }

        .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill.bump {
          color: #bdefff !important;
          border-color: rgba(116,223,255,0.34) !important;
          background:
            radial-gradient(circle at 0% 0%, rgba(116,223,255,0.18), transparent 44%),
            rgba(255,255,255,0.065) !important;
        }

        .server-directory-seo-links {
          width: 100%;
          max-width: 980px;
          margin: 18px auto 28px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .server-directory-seo-link {
          min-height: 38px;
          padding: 0 14px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: rgba(255,255,255,0.88);
          font-size: 13px;
          font-weight: 900;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035));
          border: 1px solid rgba(112,219,255,0.18);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.025) inset,
            0 0 18px rgba(139,92,246,0.08);
        }

        .server-directory-seo-link:hover {
          color: #ffffff;
          border-color: rgba(112,219,255,0.36);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 0 24px rgba(112,219,255,0.14);
        }

        .server-directory-seo-footnote {
          width: 100%;
          max-width: 980px;
          margin: 34px auto 0;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 0 18px rgba(139,92,246,0.08);
        }

        .server-directory-seo-footnote h2 {
          margin: 0 0 8px;
          color: rgba(255,255,255,0.94);
          font-size: clamp(18px, 2.1vw, 25px);
          line-height: 1.12;
          letter-spacing: -0.035em;
          font-weight: 950;
        }

        .server-directory-seo-footnote p {
          margin: 0;
          color: rgba(246,243,255,0.68);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 650;
        }

        .server-directory-seo-footnote-points {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .server-directory-seo-footnote-point {
          min-height: 32px;
          padding: 7px 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.76);
          font-size: 12px;
          font-weight: 850;
          line-height: 1.3;
        }

        @media (max-width: 760px) {
          .server-directory-seo-footnote {
            margin-top: 24px;
            padding: 15px;
            border-radius: 18px;
          }

          .server-directory-seo-footnote p {
            font-size: 13.5px;
          }
        }

        @media (max-width: 420px) {
          .server-directory-card .premium-server-meta-row.server-card-top-stats {
            gap: 6px !important;
          }

          .server-directory-card .premium-server-meta-row.server-card-top-stats .premium-server-meta-pill {
            padding: 7px 7px !important;
            font-size: 10.8px !important;
          }
        }
      `}</style>

      <section className="servers-directory-header">
        <div>
          <span className="page-badge">{t(uiLanguage, "pageBadge")}</span>
          <h1>{t(uiLanguage, "title")}</h1>
          <p>{t(uiLanguage, "subtitle")}</p>
        </div>

        <Link href="/submit" className="btn">
          {t(uiLanguage, "submitServer")}
        </Link>
      </section>

      <form className="server-directory-filters" action="/servers">
        <input
          className="input"
          name="q"
          defaultValue={searchInputValue}
          placeholder={t(uiLanguage, "searchPlaceholder")}
        />

        <select name="language" defaultValue={selectedLanguage}>
          <option value="">{t(uiLanguage, "allLanguages")}</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <select name="tag" defaultValue={selectedTag}>
          <option value="">{t(uiLanguage, "allTags")}</option>
          {allTags.map((tag: string) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>

        <button className="btn" type="submit">
          {t(uiLanguage, "search")}
        </button>

        {(rawQuery || selectedLanguage || selectedTag) && (
          <Link className="btn secondary" href="/servers">
            {t(uiLanguage, "reset")}
          </Link>
        )}
      </form>

      <nav
        className="server-directory-seo-links"
        aria-label="Beliebte Discord Server Kategorien"
      >
        {SEO_CATEGORY_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="server-directory-seo-link">
            {item.label}
          </Link>
        ))}
      </nav>

      {servers.length === 0 ? (
        <section className="card empty">
          <h3>{t(uiLanguage, "noServersTitle")}</h3>
          <p>{t(uiLanguage, "noServersText")}</p>
        </section>
      ) : (
        <section className="server-directory-grid">
          {servers.map((server: any) => {
            const ratingStats = getRatingStats(reviews ?? [], server.id);

            const isPremiumOrPartner = Boolean(
              server.premium_status || server.partner_status
            );

            const rawPremiumColor = server.premium_glow_color || "#8b5cf6";
            const premiumLayout = normalizePremiumLayout(
              server.premium_layout || "glow"
            );

            const descriptionToggleId = `description-${server.id}`;
            const onlineCount = getOnlineCount(server);
            const memberCount = getMemberCount(server);

            const serverLogo =
              server.discord_server_icon_url &&
              server.discord_server_icon_url.startsWith("http")
                ? server.discord_server_icon_url
                : server.logo_url && server.logo_url.startsWith("http")
                ? server.logo_url
                : null;

            return (
              <article
                key={server.id}
                className={`server-directory-card ${
                  isPremiumOrPartner
                    ? `server-directory-card-premium premium-layout-${premiumLayout}`
                    : ""
                }`}
                style={
                  isPremiumOrPartner
                    ? ({
                        ...getPremiumDirectoryStyle(
                          premiumLayout,
                          rawPremiumColor
                        ),
                      } as any)
                    : undefined
                }
              >
                {isPremiumOrPartner && premiumLayout === "glow" && (
                  <div className="premium-glow-ring" aria-hidden="true" />
                )}

                {isPremiumOrPartner && (
                  <div className="premium-layout-effect" aria-hidden="true" />
                )}

                <div className="server-directory-banner">
                  {server.banner_url && server.banner_url.startsWith("http") ? (
                    <img
                      src={server.banner_url}
                      alt={server.server_name}
                      style={{
                        objectPosition: `${server.banner_position_x ?? 50}% ${
                          server.banner_position_y ?? 50
                        }%`,
                        transform: `scale(${server.banner_zoom ?? 1})`,
                        transformOrigin: `${server.banner_position_x ?? 50}% ${
                          server.banner_position_y ?? 50
                        }%`,
                      }}
                    />
                  ) : (
                    <div
                      className="server-directory-banner-fallback"
                      style={
                        isPremiumOrPartner
                          ? {
                              background:
                                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                            }
                          : undefined
                      }
                    />
                  )}

                  <div className="server-directory-rating">
                    ⭐{" "}
                    {ratingStats.count === 0
                      ? t(uiLanguage, "noRatings")
                      : `${ratingStats.average.toFixed(1)} (${ratingStats.count})`}
                  </div>
                </div>

                <div className="server-directory-body">
                  <div className="server-directory-top">
                    <div className="server-directory-logo">
                      {serverLogo ? (
                        <img src={serverLogo} alt={server.server_name} />
                      ) : (
                        <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
                      )}
                    </div>

                    <div className="server-directory-title">
                      <h3
                        style={{
                          color: isPremiumOrPartner
                            ? server.server_name_color ?? "#ffffff"
                            : undefined,
                        }}
                      >
                        {server.server_name}
                      </h3>

                      <p
                        style={{
                          color: isPremiumOrPartner
                            ? server.server_text_color ?? "#cfc9ea"
                            : undefined,
                        }}
                      >
                        {server.category} • {server.language}
                      </p>
                    </div>
                  </div>

                  <div className="premium-server-meta-row server-card-top-stats">
                    <span className="premium-server-meta-pill online">
                      <span className="premium-online-dot" />
                      <span>{formatOnlineCount(onlineCount, uiLanguage)}</span>
                    </span>

                    <span
                      className="premium-server-meta-pill members"
                      title={formatMemberCount(memberCount, uiLanguage)}
                    >
                      <span>👥</span>
                      <span>{formatMemberCount(memberCount, uiLanguage)}</span>
                    </span>

                    <span
                      className="premium-server-meta-pill bump"
                      title={`${t(uiLanguage, "bump")}: ${formatLastBump(
                        server.last_bump,
                        uiLanguage
                      )}`}
                    >
                      <span>⚡</span>
                      <span>
                        {t(uiLanguage, "bump")}:{" "}
                        {formatLastBump(server.last_bump, uiLanguage)}
                      </span>
                    </span>
                  </div>

                  <div className="server-directory-badges">
                    {server.partner_status && (
                      <span className="badge partner">
                        {t(uiLanguage, "partner")}
                      </span>
                    )}

                    {server.nsfw && <span className="badge">NSFW</span>}

                    {Array.isArray(server.tags) &&
                      server.tags.slice(0, 5).map((tag: string) => (
                        <span className="badge" key={tag}>
                          #{tag}
                        </span>
                      ))}
                  </div>

                  <div className="description-expand-box">
                    <input
                      id={descriptionToggleId}
                      type="checkbox"
                      className="description-toggle-input"
                    />

                    <div
                      className="server-directory-description"
                      style={{
                        color: isPremiumOrPartner
                          ? server.server_text_color ?? "#ddd9ef"
                          : undefined,
                      }}
                    >
                      {server.description}
                    </div>

                    <label
                      htmlFor={descriptionToggleId}
                      className="description-toggle-button"
                    >
                      <span className="show-more">
                        {t(uiLanguage, "showMore")}
                      </span>
                      <span className="show-less">
                        {t(uiLanguage, "showLess")}
                      </span>
                    </label>
                  </div>

                  <div className="server-directory-footer">
                    <Link
                      className="btn secondary"
                      href={`/servers/${encodeURIComponent(server.slug || server.id)}`}
                    >
                      {t(uiLanguage, "viewServer")}
                    </Link>

                    <a
                      className="btn"
                      href={server.invite_link || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(uiLanguage, "join")}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <section className="server-directory-seo-footnote" aria-labelledby="servers-seo-title">
        <h2 id="servers-seo-title">{t(uiLanguage, "seoTitle")}</h2>
        <p>{t(uiLanguage, "seoText")}</p>

        <div className="server-directory-seo-footnote-points">
          <span className="server-directory-seo-footnote-point">
            🇩🇪 {t(uiLanguage, "seoPointOne")}
          </span>
          <span className="server-directory-seo-footnote-point">
            🌍 {t(uiLanguage, "seoPointTwo")}
          </span>
          <span className="server-directory-seo-footnote-point">
            ✨ {t(uiLanguage, "seoPointThree")}
          </span>
        </div>
      </section>
      </main>
    </>
  );
}
