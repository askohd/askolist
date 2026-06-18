import type { Metadata } from "next";
import Link from "next/link";
import { supabaseRequest } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Community Discord Server finden – Discord Communities",
  description:
    "Finde aktive Community Discord Server für Chat, Freundschaften, Gaming, Anime, Events und Chill. Entdecke neue deutsche und internationale Communities.",
  keywords: [
    "Community Discord Server",
    "deutsche Community Discord Server",
    "Discord Community finden",
    "Chill Discord Server",
    "Discord Server",
    "Discord Server Liste",
    "Asko Cafe"
  ],
  alternates: {
    canonical: "/servers/community",
  },
  openGraph: {
    title: "Community Discord Server finden – Discord Communities",
    description:
      "Finde aktive Community Discord Server für Chat, Freundschaften, Gaming, Anime, Events und Chill. Entdecke neue deutsche und internationale Communities.",
    url: "https://www.askocafe.com/servers/community",
    siteName: "Asko Cafe",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/asko-cafe-hero.png",
        width: 1200,
        height: 630,
        alt: "Community Discord Server finden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Discord Server finden – Discord Communities",
    description:
      "Finde aktive Community Discord Server für Chat, Freundschaften, Gaming, Anime, Events und Chill. Entdecke neue deutsche und internationale Communities.",
    images: ["/asko-cafe-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function getServerLogo(server: any) {
  if (
    server.discord_server_icon_url &&
    String(server.discord_server_icon_url).startsWith("http")
  ) {
    return server.discord_server_icon_url;
  }

  if (server.logo_url && String(server.logo_url).startsWith("http")) {
    return server.logo_url;
  }

  return null;
}

function getServerBanner(server: any) {
  if (server.banner_url && String(server.banner_url).startsWith("http")) {
    return server.banner_url;
  }

  return null;
}

function getTimeValue(value: string | null | undefined) {
  if (!value) return 0;
  return new Date(value).getTime();
}

function sortServers(servers: any[]) {
  return servers.sort((a, b) => {
    const aPremium = Number(Boolean(a.premium_status || a.partner_status));
    const bPremium = Number(Boolean(b.premium_status || b.partner_status));

    if (aPremium !== bPremium) {
      return bPremium - aPremium;
    }

    const aBump = getTimeValue(a.last_bump);
    const bBump = getTimeValue(b.last_bump);

    if (aBump !== bBump) {
      return bBump - aBump;
    }

    return getTimeValue(b.created_at) - getTimeValue(a.created_at);
  });
}

function formatCount(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Unbekannt";
  }

  return number.toLocaleString("de-DE");
}

function formatTags(tags: unknown) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.filter(Boolean).slice(0, 5);
}

async function getServers() {
  const servers = await supabaseRequest(
    "servers?approved=eq.true&status=eq.approved&category=eq.Community&select=*&limit=60"
  );

  if (!Array.isArray(servers)) {
    return [];
  }

  return sortServers(servers);
}

export default async function CategoryServersPage() {
  const servers = await getServers();

  return (
    <main className="container servers-directory-page">
      <section className="servers-directory-header">
        <div>
          <span className="page-badge">Asko Cafe SEO Directory</span>
          <h1>Community Discord Server</h1>
          <p>Entdecke Community Discord Server für Gespräche, neue Freunde, Events, Gaming, Anime und gemeinsame Interessen.</p>
        </div>

        <Link href="/submit" className="btn">
          Server eintragen
        </Link>
      </section>

      <section className="server-directory-filters" aria-label="Navigation">
        <Link className="btn secondary" href="/servers">
          Alle Discord Server
        </Link>
        <Link className="btn secondary" href="/servers/deutsch">
          Deutsche Discord Server
        </Link>
        <Link className="btn secondary" href="/servers/gaming">
          Gaming
        </Link>
        <Link className="btn secondary" href="/servers/anime">
          Anime
        </Link>
        <Link className="btn secondary" href="/servers/community">
          Community
        </Link>
      </section>

      {servers.length === 0 ? (
        <section className="card empty">
          <h2>Noch keine passenden Server gefunden</h2>
          <p>
            In dieser Kategorie sind aktuell noch keine freigegebenen Server
            gelistet. Trage deinen Discord Server kostenlos ein und werde als
            einer der ersten sichtbar.
          </p>
          <Link href="/submit" className="btn">
            Discord Server eintragen
          </Link>
        </section>
      ) : (
        <section className="server-directory-grid">
          {servers.map((server: any) => {
            const logo = getServerLogo(server);
            const banner = getServerBanner(server);
            const tags = formatTags(server.tags);

            return (
              <article key={server.id} className="server-directory-card">
                <div className="server-directory-banner">
                  {banner ? (
                    <img src={banner} alt={server.server_name} />
                  ) : (
                    <div className="server-directory-banner-fallback" />
                  )}

                  {server.premium_status && (
                    <div className="server-directory-rating">⭐ Premium</div>
                  )}
                </div>

                <div className="server-directory-body">
                  <div className="server-directory-top">
                    <div className="server-directory-logo">
                      {logo ? (
                        <img src={logo} alt={server.server_name} />
                      ) : (
                        <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
                      )}
                    </div>

                    <div className="server-directory-title">
                      <h2>{server.server_name}</h2>
                      <p>
                        {server.category || "Community"} • {" "}
                        {server.language || "Deutsch"}
                      </p>
                    </div>
                  </div>

                  <div className="premium-server-meta-row server-card-top-stats">
                    <span className="premium-server-meta-pill online">
                      <span className="premium-online-dot" />
                      <span>
                        {formatCount(server.online_count)} online
                      </span>
                    </span>

                    <span className="premium-server-meta-pill members">
                      <span>👥</span>
                      <span>
                        {formatCount(server.member_count)} Mitglieder
                      </span>
                    </span>

                    <span className="premium-server-meta-pill bump">
                      <span>⚡</span>
                      <span>Bumps: {formatCount(server.bumps)}</span>
                    </span>
                  </div>

                  <div className="server-directory-badges">
                    {tags.map((tag: string) => (
                      <span className="badge" key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <p className="server-directory-description">
                    {server.description}
                  </p>

                  <div className="server-directory-footer">
                    <Link className="btn secondary" href={`/servers/${server.id}`}>
                      Server ansehen
                    </Link>

                    <a
                      className="btn"
                      href={server.invite_link || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Beitreten
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
