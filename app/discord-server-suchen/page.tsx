import Link from "next/link";
import type { Metadata } from "next";
import { supabaseRequest } from "@/lib/supabase";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

const baseUrl = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Discord Server suchen | Deutsche Discord Server Liste",
  description:
    "Discord Server suchen und finden auf Asko Cafe. Entdecke deutsche Discord Server, Gaming Discords, Anime Server, Minecraft Server, Valorant Server und Community Server.",
  keywords: [
    "Discord Server suchen",
    "Discord Server finden",
    "Discord Server Liste",
    "Deutsche Discord Server",
    "Discord Server Deutsch",
    "Gaming Discord Server",
    "Anime Discord Server",
    "Minecraft Discord Server",
    "Valorant Discord Server",
    "Community Discord Server",
    "Discord Server eintragen",
    "Discord Server beitreten",
    "Asko Cafe",
  ],
  alternates: {
    canonical: `${baseUrl}/discord-server-suchen`,
  },
  openGraph: {
    title: "Discord Server suchen | Deutsche Discord Server Liste",
    description:
      "Finde aktive Discord Server für Gaming, Anime, Minecraft, Valorant, Community und mehr auf Asko Cafe.",
    url: `${baseUrl}/discord-server-suchen`,
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: `${baseUrl}/asko-cafe-hero.png`,
        width: 1200,
        height: 630,
        alt: "Discord Server suchen auf Asko Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discord Server suchen | Deutsche Discord Server Liste",
    description:
      "Suche und finde deutsche Discord Server, Gaming Discords, Anime Server, Minecraft Server, Valorant Server und Community Server.",
    images: [`${baseUrl}/asko-cafe-hero.png`],
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

type ServerRow = {
  id: string;
  slug?: string | null;
  server_name?: string | null;
  description?: string | null;
  category?: string | null;
  language?: string | null;
  tags?: string[] | null;
  logo_url?: string | null;
  discord_server_icon_url?: string | null;
  member_count?: number | null;
  online_count?: number | null;
  last_bump?: string | null;
  created_at?: string | null;
};

function cleanText(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function shortText(value: unknown, maxLength: number) {
  const text = cleanText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function getServerPath(server: ServerRow) {
  return String(server.slug || server.id || "").trim();
}

function getServerIcon(server: ServerRow) {
  return (
    server.discord_server_icon_url ||
    server.logo_url ||
    "/asko-cafe-icon.png"
  );
}

function getTimeValue(value: string | null | undefined) {
  if (!value) return 0;

  const time = new Date(value).getTime();

  if (!Number.isFinite(time)) {
    return 0;
  }

  return time;
}

function sortServers(servers: ServerRow[]) {
  return [...servers].sort((a, b) => {
    const aBump = getTimeValue(a.last_bump);
    const bBump = getTimeValue(b.last_bump);

    if (aBump !== bBump) {
      return bBump - aBump;
    }

    return getTimeValue(b.created_at) - getTimeValue(a.created_at);
  });
}

function getMemberCount(server: ServerRow) {
  const value = server.member_count;

  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value);
}

function getOnlineCount(server: ServerRow) {
  const value = server.online_count;

  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value);
}

function formatMemberCount(server: ServerRow) {
  const members = getMemberCount(server);

  if (members === null) {
    return "Mitglieder unbekannt";
  }

  return `${members.toLocaleString("de-DE")} Mitglieder`;
}

function formatOnlineCount(server: ServerRow) {
  const online = getOnlineCount(server);

  if (online === null) {
    return "Online unbekannt";
  }

  return `${online.toLocaleString("de-DE")} online`;
}

async function getFeaturedServers() {
  try {
    const servers = await supabaseRequest(
      [
        "servers?approved=eq.true",
        "status=eq.approved",
        "select=id,slug,server_name,description,category,language,tags,logo_url,discord_server_icon_url,member_count,online_count,last_bump,created_at",
        "order=last_bump.desc.nullslast",
        "limit=9",
      ].join("&")
    );

    if (!Array.isArray(servers)) {
      return [];
    }

    return sortServers(servers).filter((server) => Boolean(getServerPath(server)));
  } catch (error) {
    console.error("Could not load Discord server search landing servers:", error);
    return [];
  }
}

export default async function DiscordServerSuchenPage() {
  const servers = await getFeaturedServers();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discord Server suchen",
    description:
      "Discord Server suchen und finden auf Asko Cafe. Entdecke deutsche Discord Server, Gaming Discords, Anime Server, Minecraft Server, Valorant Server und Community Server.",
    url: `${baseUrl}/discord-server-suchen`,
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: baseUrl,
    },
    about: [
      "Discord Server suchen",
      "Discord Server Liste",
      "Deutsche Discord Server",
      "Gaming Discord Server",
      "Anime Discord Server",
      "Minecraft Discord Server",
      "Valorant Discord Server",
      "Community Discord Server",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Wo kann ich Discord Server suchen?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Auf Asko Cafe kannst du Discord Server suchen und nach Kategorien wie Gaming, Anime, Minecraft, Valorant oder Community entdecken.",
        },
      },
      {
        "@type": "Question",
        name: "Gibt es deutsche Discord Server?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Ja. Asko Cafe bietet eine eigene Liste für deutsche Discord Server und deutschsprachige Communities.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich meinen Discord Server eintragen?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Ja. Du kannst deinen eigenen Discord Server kostenlos auf Asko Cafe eintragen und neue Mitglieder erreichen.",
        },
      },
    ],
  };

  return (
    <main className="discord-search-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionJsonLd, faqJsonLd]),
        }}
      />

      <style>{`
        .discord-search-page {
          min-height: 100vh;
          color: #ffffff;
          background:
            radial-gradient(circle at 0% 10%, rgba(139,92,246,0.34), transparent 34%),
            radial-gradient(circle at 100% 12%, rgba(112,219,255,0.20), transparent 30%),
            linear-gradient(135deg, #07000f 0%, #10051f 45%, #102236 100%);
          overflow: hidden;
        }

        .discord-search-shell {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 64px 22px 90px;
        }

        .discord-search-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) 360px;
          gap: 28px;
          align-items: center;
        }

        .discord-search-badge {
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9deaff;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          background: rgba(112,219,255,0.08);
          border: 1px solid rgba(112,219,255,0.22);
        }

        .discord-search-hero h1 {
          margin: 18px 0 0;
          max-width: 760px;
          font-size: clamp(44px, 6vw, 82px);
          line-height: 0.94;
          letter-spacing: -0.06em;
          font-weight: 950;
          color: #ffffff;
          text-shadow: 0 18px 48px rgba(0,0,0,0.42);
        }

        .discord-search-hero p {
          max-width: 760px;
          margin: 22px 0 0;
          color: rgba(246,243,255,0.82);
          font-size: 16px;
          line-height: 1.75;
          font-weight: 700;
        }

        .discord-search-actions {
          margin-top: 26px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .discord-search-actions a {
          min-height: 48px;
          padding: 0 20px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          font-weight: 950;
        }

        .discord-search-actions .primary {
          background:
            linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%);
          box-shadow:
            0 0 24px rgba(211,85,255,0.28),
            0 0 28px rgba(103,218,255,0.16);
        }

        .discord-search-actions .secondary {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.14);
        }

        .discord-search-side-card {
          padding: 22px;
          border-radius: 28px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181,76,255,0.18), transparent 36%),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.025) inset,
            0 0 30px rgba(139,92,246,0.16);
        }

        .discord-search-side-card h2 {
          margin: 0 0 12px;
          font-size: 24px;
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 950;
        }

        .discord-search-side-card ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }

        .discord-search-side-card a {
          min-height: 42px;
          padding: 0 13px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,0.90);
          text-decoration: none;
          font-size: 13px;
          font-weight: 950;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .discord-search-section {
          margin-top: 58px;
        }

        .discord-search-section-head {
          max-width: 760px;
        }

        .discord-search-section-head h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 950;
        }

        .discord-search-section-head p {
          margin: 12px 0 0;
          color: rgba(246,243,255,0.72);
          font-size: 15px;
          line-height: 1.7;
          font-weight: 700;
        }

        .discord-search-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .discord-search-category-card,
        .discord-search-server-card,
        .discord-search-faq-card {
          border-radius: 24px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.030));
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 0 22px rgba(112,219,255,0.08);
        }

        .discord-search-category-card {
          padding: 20px;
          text-decoration: none;
          color: #ffffff;
        }

        .discord-search-category-card strong {
          display: block;
          font-size: 19px;
          line-height: 1.16;
          font-weight: 950;
          letter-spacing: -0.03em;
        }

        .discord-search-category-card p {
          margin: 9px 0 0;
          color: rgba(246,243,255,0.68);
          font-size: 13.5px;
          line-height: 1.65;
          font-weight: 650;
        }

        .discord-search-server-card {
          padding: 18px;
          color: #ffffff;
          text-decoration: none;
        }

        .discord-search-server-top {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 12px;
          align-items: center;
        }

        .discord-search-server-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          object-fit: cover;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .discord-search-server-card h3 {
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 17px;
          line-height: 1.12;
          font-weight: 950;
        }

        .discord-search-server-card small {
          display: block;
          margin-top: 5px;
          color: rgba(246,243,255,0.58);
          font-size: 12px;
          font-weight: 850;
        }

        .discord-search-server-card p {
          margin: 13px 0 0;
          color: rgba(246,243,255,0.70);
          font-size: 13px;
          line-height: 1.6;
          font-weight: 650;
        }

        .discord-search-server-stats {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .discord-search-server-stats span {
          min-height: 28px;
          padding: 0 9px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: rgba(255,255,255,0.78);
          font-size: 11.5px;
          font-weight: 900;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .discord-search-text-block {
          margin-top: 58px;
          padding: 26px;
          border-radius: 28px;
          background:
            radial-gradient(circle at 0% 0%, rgba(139,92,246,0.18), transparent 34%),
            rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .discord-search-text-block h2 {
          margin: 0 0 12px;
          font-size: clamp(28px, 3.5vw, 44px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 950;
        }

        .discord-search-text-block p {
          margin: 0;
          color: rgba(246,243,255,0.72);
          font-size: 15px;
          line-height: 1.75;
          font-weight: 700;
        }

        .discord-search-text-block p + p {
          margin-top: 14px;
        }

        .discord-search-faq-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .discord-search-faq-card {
          padding: 18px;
        }

        .discord-search-faq-card h3 {
          margin: 0 0 8px;
          font-size: 17px;
          line-height: 1.2;
          font-weight: 950;
        }

        .discord-search-faq-card p {
          margin: 0;
          color: rgba(246,243,255,0.68);
          font-size: 13.5px;
          line-height: 1.65;
          font-weight: 650;
        }

        @media (max-width: 980px) {
          .discord-search-hero {
            grid-template-columns: 1fr;
          }

          .discord-search-grid,
          .discord-search-faq-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .discord-search-shell {
            padding: 38px 14px 70px;
          }

          .discord-search-hero h1 {
            font-size: clamp(40px, 12vw, 56px);
          }

          .discord-search-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .discord-search-actions a {
            width: 100%;
          }
        }
      `}</style>

      <div className="discord-search-shell">
        <section className="discord-search-hero">
          <div>
            <span className="discord-search-badge">
              🔎 Discord Server suchen
            </span>

            <h1>Discord Server suchen und neue Communities finden</h1>

            <p>
              Du suchst aktive Discord Server? Auf Asko Cafe findest du eine
              Discord Server Liste für deutsche und internationale Communities.
              Entdecke Gaming Discord Server, Anime Discords, Minecraft Server,
              Valorant Communities, Chill Server und viele weitere Server zum
              Chatten, Spielen und Kennenlernen.
            </p>

            <div className="discord-search-actions">
              <Link href="/servers" className="primary">
                Discord Server Liste öffnen
              </Link>

              <Link href="/submit" className="secondary">
                Eigenen Server eintragen
              </Link>
            </div>
          </div>

          <aside className="discord-search-side-card">
            <h2>Beliebte Suchanfragen</h2>

            <ul>
              <li>
                <Link href="/servers/deutsch">
                  Deutsche Discord Server <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/servers/gaming">
                  Gaming Discord Server <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/servers/anime">
                  Anime Discord Server <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/servers/minecraft">
                  Minecraft Discord Server <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/servers/valorant">
                  Valorant Discord Server <span>→</span>
                </Link>
              </li>
            </ul>
          </aside>
        </section>

        <section className="discord-search-section">
          <div className="discord-search-section-head">
            <h2>Discord Server nach Kategorie entdecken</h2>
            <p>
              Wähle eine Kategorie und finde passende Server für deine
              Interessen. Besonders häufig gesucht werden deutsche Discord
              Server, Gaming Communities, Anime Server und Minecraft Discords.
            </p>
          </div>

          <div className="discord-search-grid">
            <Link href="/servers/deutsch" className="discord-search-category-card">
              <strong>🇩🇪 Deutsche Discord Server</strong>
              <p>
                Finde deutschsprachige Discord Communities für Gaming, Anime,
                Chill, Freunde, Events und neue Kontakte.
              </p>
            </Link>

            <Link href="/servers/gaming" className="discord-search-category-card">
              <strong>🎮 Gaming Discord Server</strong>
              <p>
                Entdecke Gaming Discords für Mitspieler, Clans, Teams,
                Ranked-Games, Events und verschiedene Spiele.
              </p>
            </Link>

            <Link href="/servers/anime" className="discord-search-category-card">
              <strong>🌸 Anime Discord Server</strong>
              <p>
                Suche Anime Communities, Manga Server, Otaku Discords und
                deutschsprachige Anime Server.
              </p>
            </Link>

            <Link href="/servers/minecraft" className="discord-search-category-card">
              <strong>⛏️ Minecraft Discord Server</strong>
              <p>
                Finde Minecraft Discord Server für SMP, Survival, Citybuild,
                Minigames und neue Mitspieler.
              </p>
            </Link>

            <Link href="/servers/valorant" className="discord-search-category-card">
              <strong>🎯 Valorant Discord Server</strong>
              <p>
                Entdecke Valorant Communities für Teamsuche, Ranked, Scrims,
                DuoQ und neue Mitspieler.
              </p>
            </Link>

            <Link href="/servers/community" className="discord-search-category-card">
              <strong>💬 Community Discord Server</strong>
              <p>
                Finde Community Server zum Chatten, Kennenlernen, Entspannen,
                Zocken und Freunde finden.
              </p>
            </Link>
          </div>
        </section>

        {servers.length > 0 && (
          <section className="discord-search-section">
            <div className="discord-search-section-head">
              <h2>Aktuelle Discord Server</h2>
              <p>
                Diese Server wurden zuletzt aktualisiert oder gebumpt. Klicke
                auf einen Server, um mehr Details zu sehen und dem Discord
                Server beizutreten.
              </p>
            </div>

            <div className="discord-search-grid">
              {servers.map((server) => {
                const serverPath = getServerPath(server);
                const icon = getServerIcon(server);

                return (
                  <Link
                    key={server.id}
                    href={`/servers/${encodeURIComponent(serverPath)}`}
                    className="discord-search-server-card"
                  >
                    <div className="discord-search-server-top">
                      <img
                        className="discord-search-server-icon"
                        src={icon}
                        alt={server.server_name || "Discord Server"}
                      />

                      <div>
                        <h3>{server.server_name || "Discord Server"}</h3>
                        <small>
                          {server.category || "Community"} •{" "}
                          {server.language || "Deutsch"}
                        </small>
                      </div>
                    </div>

                    <p>
                      {shortText(
                        server.description ||
                          "Entdecke diesen Discord Server auf Asko Cafe.",
                        140
                      )}
                    </p>

                    <div className="discord-search-server-stats">
                      <span>{formatOnlineCount(server)}</span>
                      <span>{formatMemberCount(server)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="discord-search-text-block">
          <h2>Was ist eine Discord Server Liste?</h2>

          <p>
            Eine Discord Server Liste hilft dir dabei, neue Discord Communities
            zu finden. Statt einzelne Einladungslinks zu suchen, kannst du auf
            Asko Cafe nach Kategorien, Sprache und Themen suchen. So findest du
            schneller passende Discord Server für Gaming, Anime, Minecraft,
            Valorant, Community, Chill oder Events.
          </p>

          <p>
            Für Serverbesitzer ist Asko Cafe ebenfalls hilfreich: Du kannst
            deinen eigenen Discord Server eintragen, eine Beschreibung, Tags,
            Banner und Kategorie hinzufügen und dadurch neue Mitglieder auf
            deinen Server aufmerksam machen.
          </p>
        </section>

        <section className="discord-search-section">
          <div className="discord-search-section-head">
            <h2>Häufige Fragen</h2>
            <p>
              Kurze Antworten für alle, die Discord Server suchen oder ihren
              eigenen Server bekannter machen wollen.
            </p>
          </div>

          <div className="discord-search-faq-grid">
            <article className="discord-search-faq-card">
              <h3>Wo kann ich Discord Server suchen?</h3>
              <p>
                Auf Asko Cafe kannst du Discord Server über die Serverliste,
                Kategorien, Tags und Suchbegriffe finden.
              </p>
            </article>

            <article className="discord-search-faq-card">
              <h3>Gibt es deutsche Discord Server?</h3>
              <p>
                Ja. Asko Cafe hat eine eigene Kategorie für deutsche Discord
                Server und deutschsprachige Communities.
              </p>
            </article>

            <article className="discord-search-faq-card">
              <h3>Kann ich meinen Server eintragen?</h3>
              <p>
                Ja. Du kannst deinen Discord Server kostenlos eintragen und nach
                der Freigabe in der Serverliste sichtbar machen.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
