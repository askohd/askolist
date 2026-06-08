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

function GermanyFlag({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-label="Deutschland"
      title="Deutschland"
      style={{
        width: small ? "30px" : "34px",
        height: small ? "22px" : "24px",
        borderRadius: "999px",
        overflow: "hidden",
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

export default function HomePage() {
  const language = useLanguage() as UiLanguage;

  const premiumServers = useMemo(() => {
    return initialServers
      .filter((server: any) => server.approved)
      .filter((server: any) => server.premiumStatus || server.partnerStatus)
      .slice(0, 6);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 0% 25%, rgba(137,32,191,0.32), transparent 32%), radial-gradient(circle at 100% 28%, rgba(56,151,202,0.28), transparent 36%), linear-gradient(135deg, #07000f 0%, #10051f 44%, #13263d 100%)",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <section
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

        <div
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
            </div>
          </div>
        </div>

        <aside
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
            {t(language, "premiumTitle")}
          </h2>

          <p
            style={{
              margin: 0,
              color: "rgba(246,243,255,0.78)",
              lineHeight: 1.65,
            }}
          >
            {t(language, "premiumText")}
          </p>
        </div>

        {premiumServers.length === 0 ? (
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
                  style={{
                    overflow: "hidden",
                    borderRadius: "24px",
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div style={{ height: "130px", overflow: "hidden" }}>
                    <img
                      src={banner}
                      alt={serverName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div style={{ padding: "18px" }}>
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

                    <Link
                      href="/servers"
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
                      {t(language, "discover")}
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
