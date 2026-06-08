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
      <section
        className="home-hero bigger-centered-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "64px",
          paddingBottom: "84px",
        }}
      >
        <div className="home-hero-grid-lines" />
        <div className="home-hero-orb home-hero-orb-left" />
        <div className="home-hero-orb home-hero-orb-right" />

        <div
          className="container home-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 430px",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div className="home-hero-left">
            <div
              className="home-hero-left-inner"
              style={{
                maxWidth: "760px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "22px",
                  transform: "translateY(-8px)",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(90, 180, 255, 0.35)",
                  background:
                    "linear-gradient(180deg, rgba(18,28,64,0.82), rgba(8,16,40,0.82))",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 26px rgba(58,123,255,0.18)",
                  color: "#8ad9ff",
                  fontWeight: 800,
                  fontSize: "18px",
                  letterSpacing: "0.02em",
                }}
              >
                <span style={{ color: "#67d4ff" }}>✦</span>
                <span>{t(language, "badge")}</span>
                <span style={{ color: "#c76dff" }}>✦</span>
              </div>

              <h1
                className="hero-title-large"
                style={{
                  margin: 0,
                  fontSize: "clamp(74px, 8.1vw, 108px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.05em",
                  fontWeight: 900,
                }}
              >
                {t(language, "title")
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      style={{
                        display: "block",
                        background:
                          index >= 2
                            ? "linear-gradient(90deg, #ffffff 0%, #efc7ff 45%, #7dd7ff 100%)"
                            : undefined,
                        WebkitBackgroundClip:
                          index >= 2 ? "text" : undefined,
                        WebkitTextFillColor:
                          index >= 2 ? "transparent" : undefined,
                      }}
                    >
                      {word}
                    </span>
                  ))}
              </h1>

              <p
                className="hero-text-large"
                style={{
                  maxWidth: "700px",
                  margin: "24px auto 0",
                  fontSize: "16px",
                  lineHeight: 1.65,
                  color: "rgba(240,240,255,0.94)",
                }}
              >
                {t(language, "text")}
              </p>

              <form
                className="home-hero-search centered-search"
                action="/servers"
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "620px",
                  margin: "30px auto 0",
                  padding: "10px",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 35px rgba(184,78,255,0.12)",
                }}
              >
                <input
                  type="text"
                  name="q"
                  className="input"
                  placeholder={t(language, "searchPlaceholder")}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: "50px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#fff",
                    padding: "0 18px",
                    outline: "none",
                    fontSize: "16px",
                  }}
                />

                <button
                  className="btn"
                  type="submit"
                  style={{
                    height: "50px",
                    padding: "0 24px",
                    borderRadius: "16px",
                    border: "none",
                    fontWeight: 800,
                    color: "#fff",
                    background:
                      "linear-gradient(90deg, #ff58c7 0%, #a067ff 45%, #58d5ff 100%)",
                    boxShadow: "0 8px 24px rgba(175, 92, 255, 0.35)",
                    cursor: "pointer",
                  }}
                >
                  {t(language, "search")}
                </button>
              </form>

              <div
                className="hero-actions centered-actions"
                style={{
                  display: "flex",
                  gap: "14px",
                  justifyContent: "center",
                  marginTop: "22px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  className="btn"
                  href="/servers"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "48px",
                    padding: "0 24px",
                    borderRadius: "16px",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 800,
                    background:
                      "linear-gradient(90deg, #b34dff 0%, #f45bb4 40%, #69dcff 100%)",
                    boxShadow: "0 10px 28px rgba(173, 92, 255, 0.28)",
                  }}
                >
                  {t(language, "discover")}
                </Link>

                <Link
                  className="btn secondary"
                  href="/submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "48px",
                    padding: "0 24px",
                    borderRadius: "16px",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 800,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {t(language, "submit")}
                </Link>
              </div>
            </div>
          </div>

          <div
            className="home-hero-right home-hero-right-pushed"
            style={{
              justifySelf: "end",
              width: "100%",
              maxWidth: "430px",
            }}
          >
            <article
              className="asko-discord-card"
              style={{
                position: "relative",
                borderRadius: "34px",
                background:
                  "linear-gradient(180deg, rgba(26,11,55,0.98) 0%, rgba(12,8,34,0.98) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 22px rgba(255,82,208,0.25), 0 0 48px rgba(86,207,255,0.16)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "34px",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(135deg, rgba(255,74,196,0.9), rgba(116,80,255,0.1), rgba(80,223,255,0.9))",
                  filter: "blur(16px)",
                  opacity: 0.36,
                  zIndex: 0,
                }}
              />

              <div
                className="asko-discord-banner"
                style={{
                  position: "relative",
                  height: "154px",
                  zIndex: 1,
                }}
              >
                <img
                  src="/asko-cafe-banner.png"
                  alt="Asko Cafe Banner"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <span
                  className="asko-discord-badge"
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    background: "rgba(8,18,35,0.82)",
                    border: "1px solid rgba(114,221,255,0.35)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "14px",
                    boxShadow: "0 0 18px rgba(83,199,255,0.24)",
                  }}
                >
                  <span
                    className="asko-discord-badge-dot"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "999px",
                      background: "#77e7ff",
                      boxShadow: "0 0 12px #77e7ff",
                    }}
                  />
                  {t(language, "cardBadge")}
                </span>
              </div>

              <div
                className="asko-discord-body"
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "0 20px 20px",
                }}
              >
                <div
                  className="asko-discord-header"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "14px",
                    marginTop: "-18px",
                  }}
                >
                  <div
                    style={{
                      width: "88px",
                      height: "88px",
                      borderRadius: "24px",
                      overflow: "hidden",
                      background:
                        "linear-gradient(180deg, rgba(24,18,45,1), rgba(12,8,30,1))",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.35), 0 0 18px rgba(233,89,255,0.22)",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      className="asko-discord-icon"
                      src="/asko-cafe-icon.png"
                      alt="Asko Cafe Server Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  <div
                    className="asko-discord-title-box"
                    style={{
                      flex: 1,
                      paddingBottom: "6px",
                    }}
                  >
                    <div
                      className="asko-discord-title-row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "28px",
                          lineHeight: 1,
                          fontWeight: 900,
                          color: "#fff",
                        }}
                      >
                        {t(language, "cardTitle")}
                      </h3>

                      <span
                        style={{
                          fontSize: "28px",
                          lineHeight: 1,
                        }}
                        aria-label="Deutschland"
                        title="Deutschland"
                      >
                        🇩🇪
                      </span>
                    </div>

                    <p
                      style={{
                        margin: "8px 0 0",
                        color: "rgba(220,220,240,0.82)",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      Gaming • Anime • Community
                    </p>
                  </div>
                </div>

                <div
                  className="asko-discord-tags"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "16px",
                  }}
                >
                  {[
                    "🎮 Gaming",
                    "🌸 Anime",
                    "🎯 Valorant",
                    "🎉 Events",
                    "☕ Chill",
                    "💬 Community",
                    "🛟 Support",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "34px",
                        padding: "0 14px",
                        borderRadius: "999px",
                        background: "rgba(110,60,170,0.18)",
                        border: "1px solid rgba(202,130,255,0.35)",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "13px",
                        boxShadow: "0 0 12px rgba(174,90,255,0.12)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="asko-discord-description"
                  style={{
                    marginTop: "18px",
                    padding: "18px 18px",
                    borderRadius: "22px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(86,200,255,0.03))",
                    border: "1px solid rgba(137,149,255,0.18)",
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: 1.62,
                    fontWeight: 700,
                  }}
                >
                  <p style={{ margin: 0 }}>💜 {t(language, "cardText")}</p>
                  <p style={{ margin: "14px 0 0" }}>
                    ✨ {t(language, "cardExtra")}
                  </p>
                </div>

                <div
                  className="asko-discord-stats"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "16px 10px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(140,160,255,0.18)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: "18px",
                        color: "#fff",
                        fontWeight: 900,
                      }}
                    >
                      24/7
                    </strong>
                    <span
                      style={{
                        display: "block",
                        marginTop: "4px",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "rgba(220,220,240,0.8)",
                      }}
                    >
                      {t(language, "active")}
                    </span>
                  </div>

                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "12px 10px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(140,160,255,0.18)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: "24px",
                        color: "#fff",
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      🇩🇪
                    </strong>
                    <span
                      style={{
                        display: "block",
                        marginTop: "8px",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "rgba(220,220,240,0.8)",
                      }}
                    >
                      {t(language, "language")}
                    </span>
                  </div>

                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "16px 10px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(140,160,255,0.18)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: "18px",
                        color: "#fff",
                        fontWeight: 900,
                      }}
                    >
                      VIP
                    </strong>
                    <span
                      style={{
                        display: "block",
                        marginTop: "4px",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "rgba(220,220,240,0.8)",
                      }}
                    >
                      {t(language, "features")}
                    </span>
                  </div>
                </div>

                <div
                  className="asko-discord-actions"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  <a
                    href="https://discord.gg/askocafe"
                    target="_blank"
                    rel="noreferrer"
                    className="asko-discord-primary"
                    style={{
                      minHeight: "52px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      textDecoration: "none",
                      color: "#fff",
                      fontWeight: 900,
                      background:
                        "linear-gradient(90deg, #ff59c8 0%, #b35dff 45%, #66dfff 100%)",
                      boxShadow: "0 12px 28px rgba(173,92,255,0.28)",
                    }}
                  >
                    {t(language, "join")}
                  </a>

                  <Link
                    href="/servers"
                    className="asko-discord-secondary"
                    style={{
                      minHeight: "52px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      textDecoration: "none",
                      color: "#fff",
                      fontWeight: 900,
                      background:
                        "linear-gradient(180deg, rgba(75,92,120,0.55), rgba(62,81,110,0.55))",
                      border: "1px solid rgba(125,228,255,0.26)",
                    }}
                  >
                    {t(language, "serverList")}
                  </Link>
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
