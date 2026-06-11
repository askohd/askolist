"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/useLanguage";
import type { Server } from "@/lib/types";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const SHOWCASE_ROTATION_MS = 10000;

const HOME_TEXT = {
  de: {
    badge: "Asko Cafe Network",
    title: "Entdecke Discord Server",
    text: "Finde aktive Communities, bewerte Server und entdecke neue Discord Netzwerke auf Asko Cafe.",
    searchPlaceholder: "Server suchen",
    search: "Suchen",
    discover: "Server entdecken",
    submit: "Server eintragen",
    myServer: "Mein Server",
    cardBadge: "Offizieller Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Tritt unserem offiziellen Discord bei, entdecke neue Communities, chatte mit anderen Mitgliedern und bleibe immer auf dem Laufenden.",
    cardExtra:
      "Chillige Gaming- und Anime-Community, Support bei Fragen und regelmäßig neue Updates.",
    join: "Discord beitreten",
    premiumBadge: "Server Überblick",
    noPremiumTitle: "Noch keine Server",
    noPremiumText:
      "Sobald freigegebene Server vorhanden sind, werden sie hier automatisch angezeigt.",
    community: "Community",
    support: "Support",
    language: "Sprache",
    active: "Aktiv",
    features: "Features",
    recommendedTitle: "Empfohlene Server",
    premiumPartner: "Premium & Partner",
    featured: "Featured",
    viewServer: "Server ansehen",
    joinServer: "Discord beitreten",
    loadingServers: "Server werden geladen...",
    noPremiumFound: "Keine Premium- oder Partner-Server gefunden.",
    nextServersIn: "Nächste Server in",
    visibleNow: "Server aktuell sichtbar",
  },
  en: {
    badge: "Asko Cafe Network",
    title: "Discover Discord Servers",
    text: "Find active communities, rate servers and discover new Discord networks on Asko Cafe.",
    searchPlaceholder: "Search servers",
    search: "Search",
    discover: "Discover servers",
    submit: "Submit server",
    myServer: "My Server",
    cardBadge: "Official Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Join our official Discord, discover new communities, chat with others and stay up to date.",
    cardExtra:
      "Chill gaming and anime community, support for questions and regular new updates.",
    join: "Join Discord",
    premiumBadge: "Server Overview",
    noPremiumTitle: "No servers yet",
    noPremiumText:
      "As soon as approved servers exist, they will appear here automatically.",
    community: "Community",
    support: "Support",
    language: "Language",
    active: "Active",
    features: "Features",
    recommendedTitle: "Recommended Servers",
    premiumPartner: "Premium & Partner",
    featured: "Featured",
    viewServer: "View server",
    joinServer: "Join Discord",
    loadingServers: "Loading servers...",
    noPremiumFound: "No premium or partner servers found.",
    nextServersIn: "Next servers in",
    visibleNow: "servers currently visible",
  },
  fr: {
    badge: "Réseau Asko Cafe",
    title: "Découvre des serveurs Discord",
    text: "Trouve des communautés actives, note des serveurs et découvre de nouveaux réseaux Discord sur Asko Cafe.",
    searchPlaceholder: "Rechercher des serveurs",
    search: "Rechercher",
    discover: "Découvrir les serveurs",
    submit: "Ajouter un serveur",
    myServer: "Mon serveur",
    cardBadge: "Discord officiel",
    cardTitle: "Asko Cafe",
    cardText:
      "Rejoins notre Discord officiel, découvre de nouvelles communautés, discute avec les autres et reste informé.",
    cardExtra:
      "Communauté gaming et anime chill, support pour les questions et mises à jour régulières.",
    join: "Rejoindre Discord",
    premiumBadge: "Aperçu serveur",
    noPremiumTitle: "Aucun serveur",
    noPremiumText:
      "Dès qu'il y aura des serveurs approuvés, ils seront affichés ici automatiquement.",
    community: "Communauté",
    support: "Support",
    language: "Langue",
    active: "Actif",
    features: "Fonctions",
    recommendedTitle: "Serveurs recommandés",
    premiumPartner: "Premium & Partenaire",
    featured: "Featured",
    viewServer: "Voir le serveur",
    joinServer: "Rejoindre Discord",
    loadingServers: "Chargement des serveurs...",
    noPremiumFound: "Aucun serveur premium ou partenaire trouvé.",
    nextServersIn: "Prochains serveurs dans",
    visibleNow: "serveurs visibles actuellement",
  },
  it: {
    badge: "Asko Cafe Network",
    title: "Scopri server Discord",
    text: "Trova community attive, valuta server e scopri nuovi network Discord su Asko Cafe.",
    searchPlaceholder: "Cerca server",
    search: "Cerca",
    discover: "Scopri server",
    submit: "Aggiungi server",
    myServer: "Il mio server",
    cardBadge: "Discord ufficiale",
    cardTitle: "Asko Cafe",
    cardText:
      "Unisciti al nostro Discord ufficiale, scopri nuove community, chatta con altri utenti e resta aggiornato.",
    cardExtra:
      "Community gaming e anime chill, supporto per domande e nuovi aggiornamenti regolari.",
    join: "Entra su Discord",
    premiumBadge: "Panoramica server",
    noPremiumTitle: "Nessun server",
    noPremiumText:
      "Appena ci saranno server approvati, appariranno qui automaticamente.",
    community: "Community",
    support: "Supporto",
    language: "Lingua",
    active: "Attivo",
    features: "Funzioni",
    recommendedTitle: "Server consigliati",
    premiumPartner: "Premium & Partner",
    featured: "Featured",
    viewServer: "Vedi server",
    joinServer: "Entra su Discord",
    loadingServers: "Caricamento server...",
    noPremiumFound: "Nessun server premium o partner trovato.",
    nextServersIn: "Prossimi server tra",
    visibleNow: "server visibili ora",
  },
  pl: {
    badge: "Asko Cafe Network",
    title: "Odkryj serwery Discord",
    text: "Znajdź aktywne społeczności, oceniaj serwery i odkrywaj nowe sieci Discord na Asko Cafe.",
    searchPlaceholder: "Szukaj serwerów",
    search: "Szukaj",
    discover: "Odkryj serwery",
    submit: "Dodaj serwer",
    myServer: "Mój serwer",
    cardBadge: "Oficjalny Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Dołącz do naszego oficjalnego Discorda, odkrywaj nowe społeczności, rozmawiaj z innymi i bądź na bieżąco.",
    cardExtra:
      "Luźna społeczność gaming i anime, pomoc przy pytaniach i regularne aktualizacje.",
    join: "Dołącz do Discorda",
    premiumBadge: "Przegląd serwerów",
    noPremiumTitle: "Brak serwerów",
    noPremiumText:
      "Gdy pojawią się zatwierdzone serwery, będą tutaj automatycznie wyświetlane.",
    community: "Społeczność",
    support: "Support",
    language: "Język",
    active: "Aktywny",
    features: "Funkcje",
    recommendedTitle: "Polecane serwery",
    premiumPartner: "Premium & Partner",
    featured: "Featured",
    viewServer: "Zobacz serwer",
    joinServer: "Dołącz do Discorda",
    loadingServers: "Ładowanie serwerów...",
    noPremiumFound: "Nie znaleziono serwerów premium lub partner.",
    nextServersIn: "Następne serwery za",
    visibleNow: "serwery widoczne teraz",
  },
} as const;

const HOME_OVERVIEW_TEXT = {
  de: {
    overviewTitle: "Zuletzt gebumpte Server",
    overviewText:
      "Live-Überblick über alle freigegebenen Server, sortiert nach dem letzten Bump.",
    onlineUnknown: "Online unbekannt",
    membersUnknown: "Mitglieder unbekannt",
    online: "online",
    members: "Mitglieder",
    bump: "Bump",
    noBump: "Noch nicht gebumpt",
    justNow: "Gerade eben",
    minutesAgo: "vor {value} Min.",
    hoursAgo: "vor {value} Std.",
    daysAgoSingular: "vor {value} Tag",
    daysAgoPlural: "vor {value} Tagen",
  },
  en: {
    overviewTitle: "Recently bumped servers",
    overviewText:
      "Live overview of all approved servers, sorted by the latest bump.",
    onlineUnknown: "Online unknown",
    membersUnknown: "Members unknown",
    online: "online",
    members: "members",
    bump: "Bump",
    noBump: "Not bumped yet",
    justNow: "Just now",
    minutesAgo: "{value} min. ago",
    hoursAgo: "{value} hrs. ago",
    daysAgoSingular: "{value} day ago",
    daysAgoPlural: "{value} days ago",
  },
  fr: {
    overviewTitle: "Serveurs récemment bumpés",
    overviewText:
      "Aperçu live de tous les serveurs approuvés, triés par dernier bump.",
    onlineUnknown: "Online inconnu",
    membersUnknown: "Membres inconnus",
    online: "en ligne",
    members: "membres",
    bump: "Bump",
    noBump: "Pas encore bumpé",
    justNow: "À l'instant",
    minutesAgo: "il y a {value} min.",
    hoursAgo: "il y a {value} h",
    daysAgoSingular: "il y a {value} jour",
    daysAgoPlural: "il y a {value} jours",
  },
  it: {
    overviewTitle: "Server bumpati di recente",
    overviewText:
      "Panoramica live di tutti i server approvati, ordinati per ultimo bump.",
    onlineUnknown: "Online sconosciuto",
    membersUnknown: "Membri sconosciuti",
    online: "online",
    members: "membri",
    bump: "Bump",
    noBump: "Non ancora bumpato",
    justNow: "Proprio ora",
    minutesAgo: "{value} min. fa",
    hoursAgo: "{value} ore fa",
    daysAgoSingular: "{value} giorno fa",
    daysAgoPlural: "{value} giorni fa",
  },
  pl: {
    overviewTitle: "Ostatnio bumpowane serwery",
    overviewText:
      "Podgląd wszystkich zatwierdzonych serwerów, posortowany według ostatniego bumpa.",
    onlineUnknown: "Online nieznane",
    membersUnknown: "Członkowie nieznani",
    online: "online",
    members: "członków",
    bump: "Bump",
    noBump: "Jeszcze nie bumpowano",
    justNow: "Przed chwilą",
    minutesAgo: "{value} min. temu",
    hoursAgo: "{value} godz. temu",
    daysAgoSingular: "{value} dzień temu",
    daysAgoPlural: "{value} dni temu",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof HOME_TEXT.de) {
  return HOME_TEXT[language]?.[key] || HOME_TEXT.de[key];
}

function ot(language: UiLanguage, key: keyof typeof HOME_OVERVIEW_TEXT.de) {
  return HOME_OVERVIEW_TEXT[language]?.[key] || HOME_OVERVIEW_TEXT.de[key];
}

function replaceValue(text: string, value: number) {
  return text.replace("{value}", String(value));
}

function shortText(text: string | undefined, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

function GermanyFlag({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-label="Deutschland"
      title="Deutschland"
      style={{
        width: small ? "30px" : "34px",
        height: small ? "22px" : "24px",
        borderRadius: "999px",
        overflowX: "hidden",
        display: "inline-flex",
        flexDirection: "column",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: "0 0 14px rgba(255,206,70,0.28)",
      }}
    >
      <span style={{ flex: 1, background: "#000000" }} />
      <span style={{ flex: 1, background: "#dd0000" }} />
      <span style={{ flex: 1, background: "#ffce00" }} />
    </span>
  );
}

function getServerId(serverData: any) {
  return serverData.id || serverData.server_id || serverData.discord_server_id || "";
}

function getServerDetailsHref(serverData: any) {
  const serverId = getServerId(serverData);
  return serverId ? `/servers/${serverId}` : "/servers";
}

function getServerName(serverData: any) {
  return serverData.serverName || serverData.server_name || "Discord Server";
}

function getServerBanner(serverData: any) {
  return (
    serverData.banner_url ||
    serverData.bannerUrl ||
    serverData.bump_banner_url ||
    serverData.bumpBannerUrl ||
    serverData.banner ||
    ""
  );
}

function getPremiumLayout(serverData: any) {
  const rawLayout = String(
    serverData.premium_layout || serverData.premiumLayout || "glow"
  )
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  const aliases: Record<string, string> = {
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

  const layout = aliases[rawLayout] || rawLayout;

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
    ].includes(layout)
  ) {
    return layout;
  }

  return "glow";
}

function getPremiumGlowColor(serverData: any) {
  return (
    serverData.premium_glow_color ||
    serverData.premiumGlowColor ||
    "#8b5cf6"
  );
}

function getPremiumCardStyle(serverData: any) {
  const premiumLayout = getPremiumLayout(serverData);
  const premiumGlowColor = getPremiumGlowColor(serverData);

  const base = {
    "--premium-glow": premiumGlowColor,
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
  } as any;

  if (premiumLayout === "glow") {
    return {
      ...base,
      borderColor: `${premiumGlowColor}88`,
      boxShadow: `
        0 0 0 1px rgba(255, 255, 255, 0.025) inset,
        0 0 30px ${premiumGlowColor}55,
        0 0 48px rgba(112, 219, 255, 0.14)
      `,
    };
  }

  return base;
}

function getNormalCardStyle() {
  return {
    "--premium-glow": "#8b5cf6",
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    borderColor: "rgba(139, 92, 246, 0.62)",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.025) inset, 0 0 26px rgba(139,92,246,0.18), 0 0 34px rgba(112,219,255,0.10)",
  } as any;
}

function getServerIcon(serverData: any) {
  return (
    serverData.logoUrl ||
    serverData.logo_url ||
    serverData.discord_server_icon_url ||
    "/asko-cafe-icon.png"
  );
}

function getServerDescription(serverData: any) {
  return serverData.description || "Entdecke diesen Discord Server auf Asko Cafe.";
}

function getServerInvite(serverData: any) {
  return serverData.inviteLink || serverData.invite_link || "/servers";
}

function getTimeValue(value: string | null | undefined) {
  if (!value) return 0;

  const time = new Date(value).getTime();

  if (!Number.isFinite(time)) {
    return 0;
  }

  return time;
}

function sortByLastBump(servers: Server[]) {
  return [...servers].sort((a: any, b: any) => {
    const aBump = getTimeValue(a.last_bump);
    const bBump = getTimeValue(b.last_bump);

    if (aBump !== bBump) {
      return bBump - aBump;
    }

    return getTimeValue(b.created_at) - getTimeValue(a.created_at);
  });
}

function getOnlineCount(serverData: any) {
  const value =
    serverData.online_count ??
    serverData.onlineCount ??
    serverData.members_online ??
    serverData.online_members ??
    serverData.presence_count ??
    serverData.discord_online_count ??
    serverData.discord_online_members ??
    serverData.approximate_presence_count ??
    serverData.approximate_presence ??
    null;

  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value);
}

function getMemberCount(serverData: any) {
  const value =
    serverData.member_count ??
    serverData.memberCount ??
    serverData.members_count ??
    serverData.guild_member_count ??
    serverData.approximate_member_count ??
    null;

  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value);
}

function formatOnlineCount(serverData: any, language: UiLanguage) {
  const onlineCount = getOnlineCount(serverData);

  if (onlineCount === null) {
    return ot(language, "onlineUnknown");
  }

  return `${onlineCount.toLocaleString("de-DE")} ${ot(language, "online")}`;
}

function formatMemberCount(serverData: any, language: UiLanguage) {
  const memberCount = getMemberCount(serverData);

  if (memberCount === null) {
    return ot(language, "membersUnknown");
  }

  return `${memberCount.toLocaleString("de-DE")} ${ot(language, "members")}`;
}

function formatLastBump(lastBump: string | null | undefined, language: UiLanguage) {
  if (!lastBump) return ot(language, "noBump");

  const diff = Date.now() - new Date(lastBump).getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return ot(language, "justNow");
  if (minutes < 60) return replaceValue(ot(language, "minutesAgo"), minutes);
  if (hours < 24) return replaceValue(ot(language, "hoursAgo"), hours);

  if (days === 1) {
    return replaceValue(ot(language, "daysAgoSingular"), days);
  }

  return replaceValue(ot(language, "daysAgoPlural"), days);
}

function isEnabled(value: any) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function isPremiumServer(serverData: any) {
  return (
    isEnabled(serverData.premiumStatus) ||
    isEnabled(serverData.premium_status)
  );
}

function isPartnerServer(serverData: any) {
  return (
    isEnabled(serverData.partnerStatus) ||
    isEnabled(serverData.partner_status)
  );
}

function isPremiumOrPartner(serverData: any) {
  return isPremiumServer(serverData) || isPartnerServer(serverData);
}

export default function HomePage() {
  const language = useLanguage() as UiLanguage;

  const [premiumServers, setPremiumServers] = useState<Server[]>([]);
  const [overviewServers, setOverviewServers] = useState<Server[]>([]);
  const [premiumLoading, setPremiumLoading] = useState(true);
  const [showcaseProgress, setShowcaseProgress] = useState(0);
  const [showcaseStartIndex, setShowcaseStartIndex] = useState(0);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setPremiumLoading(true);

        const [premiumResponse, overviewResponse] = await Promise.all([
          fetch("/api/premium-servers", {
            cache: "no-store",
          }),
          fetch("/api/home-servers", {
            cache: "no-store",
          }),
        ]);

        const premiumData = premiumResponse.ok
          ? await premiumResponse.json()
          : { servers: [] };

        const overviewData = overviewResponse.ok
          ? await overviewResponse.json()
          : { servers: premiumData.servers || [] };

        const safePremiumServers = Array.isArray(premiumData.servers)
          ? premiumData.servers
          : [];

        const safeOverviewServers = Array.isArray(overviewData.servers)
          ? overviewData.servers
          : safePremiumServers;

        setPremiumServers(safePremiumServers);
        setOverviewServers(safeOverviewServers);
      } catch (error) {
        console.error("Could not load home servers:", error);
        setPremiumServers([]);
        setOverviewServers([]);
      } finally {
        setPremiumLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const premiumGridServers = useMemo(() => {
    return sortByLastBump(overviewServers).slice(0, 6);
  }, [overviewServers]);

  const allShowcaseServers = useMemo(() => {
    const directPremiumServers = sortByLastBump(
      premiumServers.filter((server: any) => isPremiumOrPartner(server))
    );

    if (directPremiumServers.length > 0) {
      return directPremiumServers;
    }

    return sortByLastBump(
      overviewServers.filter((server: any) => isPremiumOrPartner(server))
    );
  }, [premiumServers, overviewServers]);

  useEffect(() => {
    setShowcaseProgress(0);
    setShowcaseStartIndex(0);
  }, [allShowcaseServers.length]);

  useEffect(() => {
    setShowcaseProgress(0);

    if (allShowcaseServers.length <= 3) {
      return;
    }

    let cycleStart = Date.now();

    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - cycleStart;
      const progress = Math.min(100, (elapsed / SHOWCASE_ROTATION_MS) * 100);

      setShowcaseProgress(progress);
    }, 100);

    const rotationInterval = window.setInterval(() => {
      cycleStart = Date.now();
      setShowcaseProgress(0);

      setShowcaseStartIndex((currentIndex) => {
        const nextIndex = currentIndex + 3;

        if (nextIndex >= allShowcaseServers.length) {
          return 0;
        }

        return nextIndex;
      });
    }, SHOWCASE_ROTATION_MS);

    return () => {
      window.clearInterval(progressInterval);
      window.clearInterval(rotationInterval);
    };
  }, [allShowcaseServers.length]);

  const showcaseServers = useMemo(() => {
    if (allShowcaseServers.length <= 3) {
      return allShowcaseServers;
    }

    const selectedServers = allShowcaseServers.slice(
      showcaseStartIndex,
      showcaseStartIndex + 3
    );

    if (selectedServers.length === 3) {
      return selectedServers;
    }

    return [
      ...selectedServers,
      ...allShowcaseServers.slice(0, 3 - selectedServers.length),
    ];
  }, [allShowcaseServers, showcaseStartIndex]);

  const nextShowcaseSeconds = Math.max(
    1,
    Math.ceil((SHOWCASE_ROTATION_MS * (1 - showcaseProgress / 100)) / 1000)
  );

  return (
    <main
      className="home-page"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 0% 25%, rgba(137,32,191,0.32), transparent 32%), radial-gradient(circle at 100% 28%, rgba(56,151,202,0.28), transparent 36%), linear-gradient(135deg, #07000f 0%, #10051f 44%, #13263d 100%)",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes premiumServerFadeIn {
          from {
            opacity: 0;
            transform: translateX(-24px) scale(0.96);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        .hero-premium-showcase {
          position: absolute;
          left: 22px;
          top: 36px;
          transform: none;
          width: 320px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .hero-premium-heading {
          padding: 14px 16px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 0% 0%, rgba(210, 78, 255, 0.20), transparent 38%),
            linear-gradient(180deg, rgba(24, 18, 50, 0.92), rgba(13, 13, 32, 0.92));
          border: 1px solid rgba(158, 105, 255, 0.22);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.035) inset,
            0 0 24px rgba(160, 84, 255, 0.16);
        }

        .hero-premium-heading span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9deaff;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .hero-premium-heading h3 {
          margin: 8px 0 0;
          color: #fff;
          font-size: 21px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.04em;
        }

        .hero-premium-card,
        .home-premium-grid-card {
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          isolation: isolate;
          background: rgba(15, 15, 34, 0.88);
          border: 1px solid rgba(197, 140, 255, 0.28);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.025) inset,
            0 0 26px rgba(180, 90, 255, 0.22),
            0 0 34px rgba(112, 219, 255, 0.12);
        }

        .hero-premium-card {
          min-height: 214px;
          border-radius: 26px;
          opacity: 0;
          animation: premiumServerFadeIn 0.75s ease forwards;
        }

        .home-premium-grid-card {
          border-radius: 24px;
          animation: premiumServerFadeIn 0.75s ease forwards;
        }

        .hero-premium-card .premium-layout-effect,
        .home-premium-grid-card .premium-layout-effect {
          position: absolute !important;
          inset: 0 !important;
          z-index: 2 !important;
          pointer-events: none !important;
          border-radius: inherit !important;
          overflow: hidden !important;
        }

        .hero-premium-card-bg,
        .home-premium-grid-banner img {
          position: relative;
          z-index: 1;
        }

        .hero-premium-card-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          filter: brightness(0.64) saturate(1.14);
        }

        .hero-premium-card-fallback-bg,
        .home-premium-grid-fallback-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 20% 10%, rgba(201, 77, 255, 0.20), transparent 34%),
            radial-gradient(circle at 85% 18%, rgba(116, 223, 255, 0.16), transparent 32%),
            linear-gradient(135deg, rgba(19, 15, 42, 1), rgba(12, 17, 36, 1));
        }

        .hero-premium-card-overlay,
        .home-premium-grid-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            linear-gradient(
              180deg,
              rgba(8, 8, 22, 0.22) 0%,
              rgba(9, 9, 24, 0.54) 40%,
              rgba(11, 13, 28, 0.90) 100%
            ),
            radial-gradient(circle at 100% 0%, rgba(105, 217, 255, 0.14), transparent 34%),
            radial-gradient(circle at 0% 100%, rgba(218, 77, 255, 0.14), transparent 36%);
        }

        .hero-premium-card-content,
        .home-premium-grid-content {
          position: relative;
          z-index: 7;
        }

        .hero-premium-card-content {
          min-height: 214px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .hero-premium-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }

        .hero-premium-badges {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
        }

        .hero-premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          min-height: 27px;
          padding: 0 11px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(255, 255, 255, 0.075);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
        }

        .hero-premium-badge.premium {
          color: #ffe68a;
          background: rgba(255, 207, 64, 0.13);
          border-color: rgba(255, 207, 64, 0.34);
        }

        .hero-premium-badge.partner {
          color: #9deaff;
          background: rgba(86, 209, 255, 0.13);
          border-color: rgba(86, 209, 255, 0.34);
        }

        .hero-premium-card-main {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
          margin-top: auto;
        }

        .hero-premium-icon {
          width: 48px;
          height: 48px;
          border-radius: 15px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04) inset,
            0 0 20px rgba(195, 78, 255, 0.24);
        }

        .hero-premium-card h4 {
          margin: 0;
          color: #fff;
          font-size: 17px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: -0.035em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .hero-premium-card p {
          margin: 6px 0 0;
          color: rgba(246, 243, 255, 0.84);
          font-size: 11px;
          line-height: 1.35;
          font-weight: 700;
        }

        .hero-premium-card-bottom {
          margin-top: 9px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .hero-premium-mini-info {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(246, 243, 255, 0.84);
          font-size: 12px;
          font-weight: 900;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .hero-premium-actions {
          margin-top: 10px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 9px;
        }

        .hero-premium-view,
        .hero-premium-join {
          min-height: 32px;
          padding: 0 13px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #ffffff;
          font-size: 11px;
          font-weight: 950;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .hero-premium-view {
          background: linear-gradient(90deg, #c84dff 0%, #f35ad6 45%, #74dfff 100%);
          box-shadow: 0 0 18px rgba(211, 85, 255, 0.24);
        }

        .hero-premium-join {
          background: rgba(19, 26, 46, 0.76);
          box-shadow: 0 0 14px rgba(116, 223, 255, 0.12);
          backdrop-filter: blur(12px);
        }

        .home-premium-grid-banner {
          position: relative;
          height: 130px;
          overflow: hidden;
          z-index: 1;
        }

        .home-premium-grid-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.72) saturate(1.12);
        }

        .home-premium-grid-content {
          padding: 18px;
        }

        .home-premium-overview-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin: 14px 0 16px;
        }

        .home-premium-overview-row.compact {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin: 14px 0 2px;
        }

        .home-premium-overview-row.compact .home-premium-overview-pill {
          min-height: 34px;
          padding: 0 8px;
          font-size: 10.5px;
        }

        .home-premium-overview-row.compact.single {
          grid-template-columns: 1fr;
        }

        .home-premium-overview-row.compact.single .home-premium-overview-pill {
          width: 100%;
          min-height: 34px;
        }

        .home-premium-overview-pill {
          min-height: 34px;
          padding: 0 9px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 0;
          color: rgba(255,255,255,0.92);
          font-size: 11px;
          font-weight: 950;
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.045));
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow:
            0 10px 24px rgba(0,0,0,0.20),
            0 0 0 1px rgba(255,255,255,0.035) inset;
          backdrop-filter: blur(12px);
        }

        .home-premium-overview-pill span:last-child {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .home-premium-overview-pill.online {
          color: #b8ffd8;
          border-color: rgba(54,255,154,0.25);
          background:
            radial-gradient(circle at 0% 0%, rgba(54,255,154,0.18), transparent 44%),
            rgba(255,255,255,0.06);
        }

        .home-premium-overview-pill.members {
          color: #ffe9a6;
          border-color: rgba(255,220,115,0.25);
          background:
            radial-gradient(circle at 0% 0%, rgba(255,220,115,0.16), transparent 44%),
            rgba(255,255,255,0.06);
        }

        .home-premium-overview-pill.bump {
          color: #bdefff;
          border-color: rgba(116,223,255,0.25);
          background:
            radial-gradient(circle at 0% 0%, rgba(116,223,255,0.16), transparent 44%),
            rgba(255,255,255,0.06);
        }

        .home-premium-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #35ff92;
          box-shadow: 0 0 12px rgba(53,255,146,0.9);
          flex: 0 0 auto;
        }


        /* Startseite: Premium & Partner Cards wieder kompakt */
        .hero-premium-showcase {
          width: 320px !important;
        }

        .hero-premium-card {
          min-height: 214px !important;
          border-radius: 24px !important;
        }

        .hero-premium-card-content {
          min-height: 214px !important;
          padding: 14px !important;
        }

        .hero-premium-card-top {
          margin-bottom: 10px !important;
        }

        .hero-premium-card-main {
          grid-template-columns: 48px minmax(0, 1fr) !important;
          gap: 10px !important;
        }

        .hero-premium-icon {
          width: 48px !important;
          height: 48px !important;
          border-radius: 15px !important;
        }

        .hero-premium-card h4 {
          font-size: 17px !important;
        }

        .hero-premium-card p {
          font-size: 11px !important;
          line-height: 1.35 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }

        .hero-premium-card-bottom {
          margin-top: 8px !important;
        }

        .home-premium-overview-row.compact.single {
          margin: 8px 0 0 !important;
        }

        .home-premium-overview-row.compact.single .home-premium-overview-pill {
          min-height: 31px !important;
          width: auto !important;
          justify-self: start !important;
          max-width: 112px !important;
          padding: 0 10px !important;
          font-size: 10px !important;
        }

        .hero-premium-actions {
          margin-top: 10px !important;
          gap: 7px !important;
        }

        .hero-premium-view,
        .hero-premium-join {
          min-height: 32px !important;
          font-size: 11px !important;
        }

        @media (max-width: 700px) {
          .home-premium-overview-row,
          .home-premium-overview-row.compact {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1150px) {
          .hero-premium-showcase {
            display: none;
          }
        }

        @media (max-width: 1250px) {
          .right-discord-card {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            margin: 44px auto 0 !important;
          }
        }


        @media (max-width: 768px) {
          .home-page {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }

          .home-hero-section {
            min-height: auto !important;
            padding: 34px 14px 36px !important;
            display: block !important;
            align-items: stretch !important;
          }

          .home-hero-shell {
            min-height: 0 !important;
            max-width: 100% !important;
          }

          .home-hero-center {
            max-width: 100% !important;
            text-align: center !important;
          }

          .home-hero-center > span {
            max-width: 100% !important;
            margin-bottom: 22px !important;
            padding: 10px 16px !important;
            font-size: 13px !important;
          }

          .home-hero-center h1 {
            font-size: clamp(42px, 13vw, 58px) !important;
            line-height: 0.94 !important;
            letter-spacing: -0.06em !important;
          }

          .home-hero-center p {
            max-width: 100% !important;
            margin-top: 18px !important;
            font-size: 15px !important;
            line-height: 1.55 !important;
          }

          .home-search-form {
            max-width: 100% !important;
            margin-top: 24px !important;
            padding: 8px !important;
            border-radius: 22px !important;
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) auto !important;
            gap: 8px !important;
          }

          .home-search-input {
            height: 48px !important;
            padding: 0 14px !important;
            font-size: 14px !important;
          }

          .home-search-button {
            height: 48px !important;
            padding: 0 18px !important;
            min-width: 92px !important;
            font-size: 14px !important;
          }

          .home-hero-actions {
            width: 100% !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            margin-top: 18px !important;
          }

          .home-hero-actions a {
            width: 100% !important;
            min-width: 0 !important;
          }

          .right-discord-card {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: 390px !important;
            margin: 30px auto 0 !important;
          }

          .right-discord-card article {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 28px !important;
          }

          .home-page > section:last-child {
            padding: 34px 14px 64px !important;
          }

          .home-premium-grid-card {
            border-radius: 22px !important;
          }
        }

        @media (max-width: 420px) {
          .home-hero-section {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .home-search-form {
            grid-template-columns: 1fr !important;
          }

          .home-search-button {
            width: 100% !important;
          }

          .home-hero-center h1 {
            font-size: clamp(40px, 14vw, 52px) !important;
          }
        }
      `}</style>

      <section
        className="home-hero-section"
        style={{
          position: "relative",
          minHeight: "calc(100vh - 80px)",
          padding: "72px 28px 70px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        />

        <aside
          className="hero-premium-showcase"
          aria-label="Premium und Partner Server"
        >
          <div className="hero-premium-heading">
            <span>👑 {t(language, "premiumPartner")}</span>
            <h3>{t(language, "recommendedTitle")}</h3>

            {premiumLoading ? (
              <p
                style={{
                  margin: "10px 0 0",
                  color: "rgba(246,243,255,0.72)",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                {t(language, "loadingServers")}
              </p>
            ) : allShowcaseServers.length === 0 ? (
              <p
                style={{
                  margin: "10px 0 0",
                  color: "rgba(246,243,255,0.72)",
                  fontSize: "12px",
                  fontWeight: 800,
                  lineHeight: 1.45,
                }}
              >
                {t(language, "noPremiumFound")}
              </p>
            ) : allShowcaseServers.length > 3 ? (
              <div style={{ marginTop: "12px" }}>
                <div
                  style={{
                    height: "8px",
                    borderRadius: "999px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: `${showcaseProgress}%`,
                      height: "100%",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg, #c84dff 0%, #f35ad6 45%, #74dfff 100%)",
                      boxShadow: "0 0 14px rgba(116,223,255,0.35)",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>

                <p
                  style={{
                    margin: "8px 0 0",
                    color: "rgba(246,243,255,0.68)",
                    fontSize: "11px",
                    fontWeight: 850,
                  }}
                >
                  {t(language, "nextServersIn")} {nextShowcaseSeconds}s
                </p>
              </div>
            ) : (
              <p
                style={{
                  margin: "10px 0 0",
                  color: "rgba(246,243,255,0.68)",
                  fontSize: "11px",
                  fontWeight: 850,
                }}
              >
                {allShowcaseServers.length} {t(language, "visibleNow")}
              </p>
            )}
          </div>

          {showcaseServers.map((server: any, index: number) => {
            const serverData = server as any;

            const serverName = getServerName(serverData);
            const banner = getServerBanner(serverData);
            const icon = getServerIcon(serverData);
            const description = shortText(getServerDescription(serverData), 92);
            const invite = getServerInvite(serverData);
            const detailsHref = getServerDetailsHref(serverData);
            const premium = isPremiumServer(serverData);
            const partner = isPartnerServer(serverData);
            const premiumLayout = getPremiumLayout(serverData);
            const externalInvite =
              typeof invite === "string" && invite.startsWith("http");

            return (
              <article
                key={serverData.id || serverName}
                className={`hero-premium-card server-directory-card-premium premium-layout-${premiumLayout}`}
                style={{
                  ...getPremiumCardStyle(serverData),
                  animationDelay: `${index * 0.18}s`,
                }}
              >
                {banner ? (
                  <img
                    className="hero-premium-card-bg"
                    src={banner}
                    alt={serverName}
                    style={{
                      objectPosition: `${serverData.banner_position_x ?? 50}% ${
                        serverData.banner_position_y ?? 50
                      }%`,
                      transform: `scale(${serverData.banner_zoom ?? 1})`,
                      transformOrigin: `${serverData.banner_position_x ?? 50}% ${
                        serverData.banner_position_y ?? 50
                      }%`,
                    }}
                  />
                ) : (
                  <div className="hero-premium-card-fallback-bg" />
                )}

                <div className="hero-premium-card-overlay" />
                <div className="premium-layout-effect" aria-hidden="true" />

                <div className="hero-premium-card-content">
                  <div className="hero-premium-card-top">
                    <div className="hero-premium-badges">
                      {premium && (
                        <span className="hero-premium-badge premium">
                          👑 Premium
                        </span>
                      )}

                      {partner && (
                        <span className="hero-premium-badge partner">
                          🤝 Partner
                        </span>
                      )}

                      {!premium && !partner && (
                        <span className="hero-premium-badge">
                          ✨ {t(language, "featured")}
                        </span>
                      )}
                    </div>

                    <GermanyFlag small />
                  </div>

                  <div className="hero-premium-card-main">
                    <img
                      className="hero-premium-icon"
                      src={icon}
                      alt={serverName}
                    />

                    <div>
                      <h4>{serverName}</h4>
                      <p>{description}</p>
                    </div>
                  </div>

                  <div className="hero-premium-card-bottom">
                    <div className="hero-premium-mini-info">
                      <span>{serverData.category || "Community"}</span>
                      <span>•</span>
                      <span>{serverData.language || "Deutsch"}</span>
                    </div>
                  </div>

                  <div className="home-premium-overview-row compact single">
                    <span className="home-premium-overview-pill bump">
                      <span>⚡</span>
                      <span>
                        {ot(language, "bump")}:{" "}
                        {formatLastBump(serverData.last_bump, language)}
                      </span>
                    </span>
                  </div>

                  <div className="hero-premium-actions">
                    <Link href={detailsHref} className="hero-premium-view">
                      {t(language, "viewServer")}
                    </Link>

                    <a
                      href={invite}
                      target={externalInvite ? "_blank" : undefined}
                      rel={externalInvite ? "noreferrer" : undefined}
                      className="hero-premium-join"
                    >
                      {t(language, "joinServer")}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </aside>

        <div
          className="home-hero-shell"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1580px",
            margin: "0 auto",
            minHeight: "660px",
          }}
        >
          <div
            className="home-hero-center"
            style={{
              width: "100%",
              maxWidth: "720px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 3,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "13px 28px",
                borderRadius: "999px",
                background:
                  "linear-gradient(180deg, rgba(29,45,91,0.82), rgba(16,14,52,0.9))",
                border: "1px solid rgba(112,219,255,0.48)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 24px rgba(92,211,255,0.24), 0 0 42px rgba(192,91,255,0.16)",
                color: "#9deaff",
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "0.02em",
                marginBottom: "34px",
              }}
            >
              <span style={{ color: "#69d9ff" }}>✦</span>
              <span>{t(language, "badge")}</span>
              <span style={{ color: "#c876ff" }}>✧</span>
            </span>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(54px, 5.9vw, 88px)",
                lineHeight: 0.92,
                letterSpacing: "-0.055em",
                fontWeight: 950,
                textAlign: "center",
                color: "#ffffff",
                textShadow: "0 18px 48px rgba(0,0,0,0.42)",
              }}
            >
              {t(language, "title")
                .split(" ")
                .map((word, index, words) => {
                  const isLastWord = index === words.length - 1;

                  return (
                    <span
                      key={index}
                      style={{
                        display: "block",
                        background: isLastWord
                          ? "linear-gradient(90deg, #f4e1ff 0%, #d18dff 48%, #86d9ff 100%)"
                          : undefined,
                        WebkitBackgroundClip: isLastWord ? "text" : undefined,
                        backgroundClip: isLastWord ? "text" : undefined,
                        WebkitTextFillColor: isLastWord
                          ? "transparent"
                          : undefined,
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
            </h1>

            <p
              style={{
                maxWidth: "650px",
                margin: "24px auto 0",
                fontSize: "16px",
                lineHeight: 1.65,
                color: "rgba(246,243,255,0.92)",
              }}
            >
              {t(language, "text")}
            </p>

            <form
              action="/servers"
              className="home-search-form"
              style={{
                width: "100%",
                maxWidth: "610px",
                margin: "32px auto 0",
                padding: "10px",
                borderRadius: "23px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(55,35,70,0.72)",
                border: "1px solid rgba(235,195,255,0.15)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 32px rgba(220,102,255,0.14)",
              }}
            >
              <input
                className="home-search-input"
                type="text"
                name="q"
                placeholder={t(language, "searchPlaceholder")}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "52px",
                  padding: "0 18px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.045)",
                  color: "#ffffff",
                  outline: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              />

              <button
                className="home-search-button"
                type="submit"
                style={{
                  height: "52px",
                  padding: "0 26px",
                  border: 0,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #f149d1 0%, #a456ff 45%, #75ddff 100%)",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow:
                    "0 0 22px rgba(233,91,255,0.36), 0 0 32px rgba(107,220,255,0.2)",
                }}
              >
                {t(language, "search")}
              </button>
            </form>

            <div
              className="home-hero-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "14px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/servers"
                style={{
                  minHeight: "48px",
                  minWidth: "180px",
                  padding: "0 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                  color: "#ffffff",
                  fontWeight: 900,
                  textDecoration: "none",
                  boxShadow:
                    "0 0 24px rgba(211,85,255,0.28), 0 0 28px rgba(103,218,255,0.16)",
                }}
              >
                {t(language, "discover")}
              </Link>

              <Link
                href="/submit"
                style={{
                  minHeight: "48px",
                  minWidth: "180px",
                  padding: "0 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#ffffff",
                  fontWeight: 900,
                  textDecoration: "none",
                }}
              >
                {t(language, "submit")}
              </Link>

              <Link
                href="/profile"
                style={{
                  minHeight: "48px",
                  minWidth: "180px",
                  padding: "0 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(42,31,83,0.86), rgba(24,72,105,0.72))",
                  border: "1px solid rgba(116,223,255,0.26)",
                  color: "#ffffff",
                  fontWeight: 900,
                  textDecoration: "none",
                  boxShadow: "0 0 22px rgba(116,223,255,0.14)",
                }}
              >
                {t(language, "myServer")}
              </Link>
            </div>
          </div>
        </div>

        <aside
          className="right-discord-card"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "390px",
            zIndex: 10,
          }}
        >
          <article
            style={{
              width: "390px",
              borderRadius: "34px",
              overflow: "hidden",
              position: "relative",
              background:
                "linear-gradient(180deg, rgba(51,19,77,0.98) 0%, rgba(18,16,46,0.98) 100%)",
              border: "1px solid rgba(231,101,255,0.38)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 28px rgba(243,72,255,0.34), 0 0 56px rgba(93,204,255,0.22)",
            }}
          >
            <div
              style={{
                height: "130px",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <img
                src="/asko-cafe-banner.png"
                alt="Asko Cafe Banner"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "none",
                  transform: "none",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(20,24,52,0.9)",
                  border: "1px solid rgba(112,214,255,0.45)",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 900,
                  boxShadow: "0 0 18px rgba(95,214,255,0.22)",
                }}
              >
                <span style={{ color: "#86ebff" }}>●</span>
                {t(language, "cardBadge")}
              </span>
            </div>

            <div
              style={{
                position: "relative",
                padding: "92px 18px 18px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "104px",
                  height: "104px",
                  borderRadius: "28px",
                  background:
                    "linear-gradient(180deg, rgba(23,13,42,0.98), rgba(36,16,56,0.98))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.38), 0 0 22px rgba(224,89,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/asko-cafe-icon.png"
                  alt="Asko Cafe Icon"
                  style={{
                    width: "86px",
                    height: "86px",
                    objectFit: "contain",
                    display: "block",
                    filter: "none",
                    transform: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "31px",
                    lineHeight: 1,
                    fontWeight: 950,
                    color: "#ffffff",
                    letterSpacing: "-0.04em",
                    textShadow: "0 0 22px rgba(255,255,255,0.12)",
                  }}
                >
                  {t(language, "cardTitle")}
                </h3>

                <GermanyFlag />
              </div>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "rgba(241,238,255,0.72)",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                Gaming • Anime • Community
              </p>

              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "9px",
                }}
              >
                {[
                  "🎮 Gaming",
                  "🌸 Anime",
                  "🎯 Valorant",
                  "🎉 Events",
                  "☕ Chill",
                  `💬 ${t(language, "community")}`,
                  `🛟 ${t(language, "support")}`,
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      minHeight: "31px",
                      padding: "0 12px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(80,34,116,0.48)",
                      border: "1px solid rgba(202,115,255,0.36)",
                      color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 900,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: "18px",
                  padding: "17px 15px",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(180deg, rgba(55,36,79,0.58), rgba(38,62,91,0.48))",
                  border: "1px solid rgba(172,120,255,0.26)",
                  color: "#ffffff",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: 1.6,
                    fontWeight: 800,
                  }}
                >
                  💜 {t(language, "cardText")}
                </p>

                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    fontWeight: 800,
                  }}
                >
                  ✨ {t(language, "cardExtra")}
                </p>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    minHeight: "76px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(180deg, rgba(43,36,74,0.74), rgba(37,61,92,0.66))",
                    border: "1px solid rgba(142,202,255,0.22)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <strong
                    style={{
                      color: "#ffffff",
                      fontSize: "20px",
                      lineHeight: 1,
                      fontWeight: 950,
                    }}
                  >
                    24/7
                  </strong>

                  <small
                    style={{
                      marginTop: "6px",
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    {t(language, "active")}
                  </small>
                </div>

                <div
                  style={{
                    minHeight: "76px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(180deg, rgba(43,36,74,0.74), rgba(37,61,92,0.66))",
                    border: "1px solid rgba(142,202,255,0.22)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <strong
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <GermanyFlag small />
                  </strong>

                  <small
                    style={{
                      marginTop: "6px",
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    {t(language, "language")}
                  </small>
                </div>

                <div
                  style={{
                    minHeight: "76px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(180deg, rgba(43,36,74,0.74), rgba(37,61,92,0.66))",
                    border: "1px solid rgba(142,202,255,0.22)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <strong
                    style={{
                      color: "#ffffff",
                      fontSize: "20px",
                      lineHeight: 1,
                      fontWeight: 950,
                    }}
                  >
                    VIP
                  </strong>

                  <small
                    style={{
                      marginTop: "6px",
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    {t(language, "features")}
                  </small>
                </div>
              </div>

              <a
                href="https://discord.gg/askocafe"
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: "16px",
                  minHeight: "52px",
                  width: "100%",
                  borderRadius: "17px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(90deg, #d14cff 0%, #f35ad6 45%, #74dfff 100%)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 950,
                  boxShadow:
                    "0 0 25px rgba(208,85,255,0.34), 0 0 28px rgba(112,221,255,0.18)",
                }}
              >
                {t(language, "join")}
              </a>
            </div>
          </article>
        </aside>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "40px 28px 90px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "720px",
            margin: "0 auto 32px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "9px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(112,219,255,0.32)",
              color: "#9deaff",
              fontSize: "13px",
              fontWeight: 900,
            }}
          >
            {t(language, "premiumBadge")}
          </span>

          <h2
            style={{
              margin: "18px 0 10px",
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {ot(language, "overviewTitle")}
          </h2>

          <p
            style={{
              margin: 0,
              color: "rgba(246,243,255,0.78)",
              lineHeight: 1.65,
            }}
          >
            {ot(language, "overviewText")}
          </p>
        </div>

        {premiumGridServers.length === 0 ? (
          <div
            style={{
              maxWidth: "620px",
              margin: "0 auto",
              padding: "28px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>
              {t(language, "noPremiumTitle")}
            </h3>

            <p style={{ margin: 0, color: "rgba(246,243,255,0.78)" }}>
              {t(language, "noPremiumText")}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "22px",
            }}
          >
            {premiumGridServers.map((server: Server, index: number) => {
              const serverData = server as any;

              const serverName = getServerName(serverData);
              const banner = getServerBanner(serverData);
              const icon = getServerIcon(serverData);
              const detailsHref = getServerDetailsHref(serverData);
              const premiumOrPartner = isPremiumOrPartner(serverData);
              const premiumLayout = premiumOrPartner
                ? getPremiumLayout(serverData)
                : "glow";

              return (
                <article
                  key={serverData.id || serverName}
                  className={`home-premium-grid-card ${
                    premiumOrPartner
                      ? `server-directory-card-premium premium-layout-${premiumLayout}`
                      : "server-directory-card-premium premium-layout-glow"
                  }`}
                  style={
                    premiumOrPartner
                      ? {
                          ...getPremiumCardStyle(serverData),
                          animationDelay: `${index * 0.15}s`,
                        }
                      : {
                          ...getNormalCardStyle(),
                          animationDelay: `${index * 0.15}s`,
                        }
                  }
                >
                  <div className="home-premium-grid-banner">
                    {banner ? (
                      <img
                        src={banner}
                        alt={serverName}
                        style={{
                          objectPosition: `${serverData.banner_position_x ?? 50}% ${
                            serverData.banner_position_y ?? 50
                          }%`,
                          transform: `scale(${serverData.banner_zoom ?? 1})`,
                          transformOrigin: `${serverData.banner_position_x ?? 50}% ${
                            serverData.banner_position_y ?? 50
                          }%`,
                        }}
                      />
                    ) : (
                      <div className="home-premium-grid-fallback-bg" />
                    )}
                  </div>

                  <div className="home-premium-grid-overlay" />

                  {premiumOrPartner && (
                    <div className="premium-layout-effect" aria-hidden="true" />
                  )}

                  <div className="home-premium-grid-content">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <img
                        src={icon}
                        alt={serverName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "16px",
                          objectFit: "cover",
                        }}
                      />

                      <div>
                        <h3 style={{ margin: 0 }}>{serverName}</h3>

                        <p
                          style={{
                            margin: "4px 0 0",
                            color: "rgba(246,243,255,0.72)",
                          }}
                        >
                          {serverData.category} • {serverData.language}
                        </p>
                      </div>
                    </div>

                    <p
                      style={{
                        margin: "14px 0 16px",
                        color: "rgba(246,243,255,0.78)",
                        lineHeight: 1.55,
                      }}
                    >
                      {shortText(serverData.description, 110)}
                    </p>

                    <div className="home-premium-overview-row">
                      <span className="home-premium-overview-pill online">
                        <span className="home-premium-online-dot" />
                        <span>{formatOnlineCount(serverData, language)}</span>
                      </span>

                      <span className="home-premium-overview-pill members">
                        <span>👥</span>
                        <span>{formatMemberCount(serverData, language)}</span>
                      </span>

                      <span className="home-premium-overview-pill bump">
                        <span>⚡</span>
                        <span>
                          {ot(language, "bump")}:{" "}
                          {formatLastBump(serverData.last_bump, language)}
                        </span>
                      </span>
                    </div>

                    <Link
                      href={detailsHref}
                      style={{
                        minHeight: "44px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        borderRadius: "14px",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontWeight: 900,
                        background:
                          "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                      }}
                    >
                      {t(language, "viewServer")}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
