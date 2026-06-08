"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/components/useLanguage";
import { initialServers } from "@/lib/demoData";
import type { Server } from "@/lib/types";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HOME_TEXT = {
  de: {
    badge: "Asko Cafe Network",
    title: "Entdecke Discord Server",
    text: "Finde aktive Communities, bewerte Server und entdecke neue Discord Netzwerke auf Asko Cafe.",
    searchPlaceholder: "Server suchen",
    search: "Suchen",
    discover: "Server entdecken",
    submit: "Server eintragen",
    cardBadge: "Offizieller Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Tritt unserem offiziellen Discord bei, entdecke neue Communities, chatte mit anderen Mitgliedern und bleibe immer auf dem Laufenden.",
    cardExtra:
      "Chillige Gaming- und Anime-Community, Support bei Fragen und regelmäßig neue Updates.",
    join: "Discord beitreten",
    serverList: "Serverliste öffnen",
    premiumBadge: "Premium Bereich",
    premiumTitle: "Premium Server",
    premiumText:
      "Hier erscheinen Premium- und Partner-Server. Sie werden nach und nach elegant eingeblendet.",
    noPremiumTitle: "Noch keine Premium Server",
    noPremiumText:
      "Sobald Premium- oder Partner-Server vorhanden sind, werden sie hier automatisch angezeigt.",
    community: "Community",
    support: "Support",
    language: "Sprache",
    active: "Aktiv",
    features: "Features",
  },

  en: {
    badge: "Asko Cafe Network",
    title: "Discover Discord Servers",
    text: "Find active communities, rate servers and discover new Discord networks on Asko Cafe.",
    searchPlaceholder: "Search servers",
    search: "Search",
    discover: "Discover servers",
    submit: "Submit server",
    cardBadge: "Official Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Join our official Discord, discover new communities, chat with others and stay up to date.",
    cardExtra:
      "Chill gaming and anime community, support for questions and regular new updates.",
    join: "Join Discord",
    serverList: "Open server list",
    premiumBadge: "Premium Area",
    premiumTitle: "Premium Servers",
    premiumText:
      "Premium and partner servers appear here and fade in one after another.",
    noPremiumTitle: "No premium servers yet",
    noPremiumText:
      "As soon as premium or partner servers exist, they will appear here automatically.",
    community: "Community",
    support: "Support",
    language: "Language",
    active: "Active",
    features: "Features",
  },

  fr: {
    badge: "Réseau Asko Cafe",
    title: "Découvre des serveurs Discord",
    text: "Trouve des communautés actives, note des serveurs et découvre de nouveaux réseaux Discord sur Asko Cafe.",
    searchPlaceholder: "Rechercher des serveurs",
    search: "Rechercher",
    discover: "Découvrir les serveurs",
    submit: "Ajouter un serveur",
    cardBadge: "Discord officiel",
    cardTitle: "Asko Cafe",
    cardText:
      "Rejoins notre Discord officiel, découvre de nouvelles communautés, discute avec les autres et reste informé.",
    cardExtra:
      "Communauté gaming et anime chill, support pour les questions et mises à jour régulières.",
    join: "Rejoindre Discord",
    serverList: "Ouvrir la liste",
    premiumBadge: "Zone Premium",
    premiumTitle: "Serveurs Premium",
    premiumText:
      "Les serveurs premium et partenaires apparaissent ici avec une animation élégante.",
    noPremiumTitle: "Aucun serveur premium",
    noPremiumText:
      "Dès qu'il y aura des serveurs premium ou partenaires, ils seront affichés ici automatiquement.",
    community: "Communauté",
    support: "Support",
    language: "Langue",
    active: "Actif",
    features: "Fonctions",
  },

  it: {
    badge: "Asko Cafe Network",
    title: "Scopri server Discord",
    text: "Trova community attive, valuta server e scopri nuovi network Discord su Asko Cafe.",
    searchPlaceholder: "Cerca server",
    search: "Cerca",
    discover: "Scopri server",
    submit: "Aggiungi server",
    cardBadge: "Discord ufficiale",
    cardTitle: "Asko Cafe",
    cardText:
      "Unisciti al nostro Discord ufficiale, scopri nuove community, chatta con altri utenti e resta aggiornato.",
    cardExtra:
      "Community gaming e anime chill, supporto per domande e nuovi aggiornamenti regolari.",
    join: "Entra su Discord",
    serverList: "Apri lista server",
    premiumBadge: "Area Premium",
    premiumTitle: "Server Premium",
    premiumText:
      "I server premium e partner vengono mostrati qui con una bella animazione.",
    noPremiumTitle: "Nessun server premium",
    noPremiumText:
      "Appena ci saranno server premium o partner, appariranno qui automaticamente.",
    community: "Community",
    support: "Supporto",
    language: "Lingua",
    active: "Attivo",
    features: "Funzioni",
  },

  pl: {
    badge: "Asko Cafe Network",
    title: "Odkryj serwery Discord",
    text: "Znajdź aktywne społeczności, oceniaj serwery i odkrywaj nowe sieci Discord na Asko Cafe.",
    searchPlaceholder: "Szukaj serwerów",
    search: "Szukaj",
    discover: "Odkryj serwery",
    submit: "Dodaj serwer",
    cardBadge: "Oficjalny Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Dołącz do naszego oficjalnego Discorda, odkrywaj nowe społeczności, rozmawiaj z innymi i bądź na bieżąco.",
    cardExtra:
      "Luźna społeczność gaming i anime, pomoc przy pytaniach i regularne aktualizacje.",
    join: "Dołącz do Discorda",
    serverList: "Otwórz listę serwerów",
    premiumBadge: "Strefa Premium",
    premiumTitle: "Serwery Premium",
    premiumText:
      "Tutaj pojawią się serwery premium i partnerskie, pokazujące się jeden po drugim.",
    noPremiumTitle: "Brak serwerów premium",
    noPremiumText:
      "Gdy pojawią się serwery premium lub partnerskie, będą tutaj automatycznie wyświetlane.",
    community: "Społeczność",
    support: "Support",
    language: "Język",
    active: "Aktywny",
    features: "Funkcje",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof HOME_TEXT.de) {
  return HOME_TEXT[language]?.[key] || HOME_TEXT.de[key];
}

function shortText(text: string | undefined, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + "…";
}

export default function HomePage() {
  const language = useLanguage() as UiLanguage;

  const premiumServers = useMemo(() => {
    return initialServers
      .filter((server: any) => server.approved)
      .filter((server: any) => server.premiumStatus || server.partnerStatus)
      .slice(0, 6);
  }, []);

  return (
    <main className="home-page">
      <section className="home-hero bigger-centered-hero">
        <div className="home-hero-grid-lines" />
        <div className="home-hero-orb home-hero-orb-left" />
        <div className="home-hero-orb home-hero-orb-right" />

        <div className="container home-hero-grid">
          <div className="home-hero-left">
            <div className="home-hero-left-inner">
              <span className="page-badge cool-badge">
                <span>✦</span>
                <span>{t(language, "badge")}</span>
                <span>✧</span>
              </span>

              <h1 className="hero-title-large hero-title-smaller">
                {t(language, "title")
                  .split(" ")
                  .map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
              </h1>

              <p className="hero-text-large">{t(language, "text")}</p>

              <form
                className="home-hero-search centered-search"
                action="/servers"
              >
                <input
                  type="text"
                  name="q"
                  className="input"
                  placeholder={t(language, "searchPlaceholder")}
                />

                <button className="btn" type="submit">
                  {t(language, "search")}
                </button>
              </form>

              <div className="hero-actions centered-actions">
                <Link className="btn" href="/servers">
                  {t(language, "discover")}
                </Link>

                <Link className="btn secondary" href="/submit">
                  {t(language, "submit")}
                </Link>
              </div>
            </div>
          </div>

          <div className="home-hero-right home-hero-right-pushed">
            <article className="anime-discord-card">
              <div className="anime-card-border-glow" />
              <div className="anime-card-glow anime-card-glow-pink" />
              <div className="anime-card-glow anime-card-glow-blue" />

              <div className="anime-card-banner">
                <img src="/asko-cafe-banner.png" alt="Asko Cafe Banner" />

                <span className="anime-card-official-badge">
                  <span className="anime-card-discord-dot">●</span>
                  {t(language, "cardBadge")}
                </span>
              </div>

              <div className="anime-card-body">
                <div className="anime-card-icon-wrap bigger-icon-only">
                  <img
                    className="anime-card-icon"
                    src="/asko-cafe-icon.png"
                    alt="Asko Cafe Icon"
                  />
                </div>

                <div className="anime-card-title-row">
                  <h3>{t(language, "cardTitle")}</h3>

                  <span
                    className="anime-card-germany-flag"
                    aria-label="Deutschland"
                    title="Deutschland"
                  >
                    <span />
                    <span />
                    <span />
                  </span>
                </div>

                <p className="anime-card-subtitle">
                  Gaming • Anime • Community
                </p>

                <div className="anime-card-tags">
                  <span className="anime-card-tag">🎮 Gaming</span>
                  <span className="anime-card-tag">🌸 Anime</span>
                  <span className="anime-card-tag">🎯 Valorant</span>
                  <span className="anime-card-tag">🎉 Events</span>
                  <span className="anime-card-tag">☕ Chill</span>
                  <span className="anime-card-tag">
                    💬 {t(language, "community")}
                  </span>
                  <span className="anime-card-tag">
                    🛟 {t(language, "support")}
                  </span>
                </div>

                <div className="anime-card-description">
                  <p>💜 {t(language, "cardText")}</p>
                  <p>✨ {t(language, "cardExtra")}</p>
                </div>

                <div className="anime-card-stats">
                  <div className="anime-card-stat">
                    <span className="anime-card-stat-icon">〽</span>
                    <strong>24/7</strong>
                    <small>{t(language, "active")}</small>
                  </div>

                  <div className="anime-card-stat">
                    <span className="anime-card-stat-icon">💬</span>
                    <strong>
                      <span
                        className="anime-card-germany-flag small"
                        aria-label="Deutschland"
                        title="Deutschland"
                      >
                        <span />
                        <span />
                        <span />
                      </span>
                    </strong>
                    <small>{t(language, "language")}</small>
                  </div>

                  <div className="anime-card-stat">
                    <span className="anime-card-stat-icon">☆</span>
                    <strong>VIP</strong>
                    <small>{t(language, "features")}</small>
                  </div>
                </div>

                <div className="anime-card-actions single-button-only">
                  <a
                    href="https://discord.gg/askocafe"
                    target="_blank"
                    rel="noreferrer"
                    className="anime-card-main-button"
                  >
                    {t(language, "join")}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="container premium-section">
        <div className="premium-section-heading">
          <span className="page-badge">{t(language, "premiumBadge")}</span>

          <h2>{t(language, "premiumTitle")}</h2>

          <p>{t(language, "premiumText")}</p>
        </div>

        {premiumServers.length === 0 ? (
          <div className="card empty premium-empty-card">
            <h3>{t(language, "noPremiumTitle")}</h3>
            <p>{t(language, "noPremiumText")}</p>
          </div>
        ) : (
          <div className="premium-servers-grid">
            {premiumServers.map((server: Server, index: number) => {
              const serverData = server as any;

              const serverName =
                serverData.serverName ||
                serverData.server_name ||
                "Discord Server";

              const banner =
                serverData.bannerUrl ||
                serverData.banner_url ||
                "/asko-cafe-banner.png";

              const icon =
                serverData.logoUrl ||
                serverData.logo_url ||
                serverData.discord_server_icon_url ||
                "/asko-cafe-icon.png";

              return (
                <article
                  key={serverData.id || serverName}
                  className="premium-server-card"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div className="premium-server-card-banner">
                    <img src={banner} alt={serverName} />
                  </div>

                  <div className="premium-server-card-body">
                    <div className="premium-server-card-top">
                      <img
                        className="premium-server-card-icon"
                        src={icon}
                        alt={serverName}
                      />

                      <div>
                        <h3>{serverName}</h3>

                        <p>
                          {serverData.category} • {serverData.language}
                        </p>
                      </div>
                    </div>

                    <div className="premium-server-card-description">
                      {shortText(serverData.description, 110)}
                    </div>

                    <div className="premium-server-card-actions">
                      <Link href="/servers" className="btn secondary">
                        {t(language, "serverList")}
                      </Link>

                      <Link href="/servers" className="btn">
                        {t(language, "discover")}
                      </Link>
                    </div>
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
