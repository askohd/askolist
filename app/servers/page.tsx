import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { languages } from "@/lib/demoData";

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

function formatLastBump(lastBump: string | null | undefined) {
  if (!lastBump) return "Noch nicht gebumpt";

  const diff = Date.now() - new Date(lastBump).getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Gerade eben";
  if (minutes < 60) return `vor ${minutes} Min.`;
  if (hours < 24) return `vor ${hours} Std.`;

  return `vor ${days} Tag${days === 1 ? "" : "en"}`;
}

function normalize(value: unknown) {
  return String(value ?? "").toLowerCase();
}

export default async function ServersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    language?: string;
    tag?: string;
  }>;
}) {
  await getServerSession(authOptions);

  const params = (await searchParams) ?? {};
  const query = String(params.q ?? "").trim().toLowerCase();
  const selectedLanguage = String(params.language ?? "").trim();
  const selectedTag = String(params.tag ?? "").trim();

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

  return (
    <main className="container servers-directory-page">
      <section className="servers-directory-header">
        <div>
          <span className="page-badge">AskoList Directory</span>
          <h1>Discord Server</h1>
          <p>Die zuletzt gebumpten Server stehen automatisch ganz oben.</p>
        </div>

        <Link href="/submit" className="btn">
          Submit Server
        </Link>
      </section>

      <form className="server-directory-filters" action="/servers">
        <input
          className="input"
          name="q"
          defaultValue={query}
          placeholder="Server suchen..."
        />

        <select name="language" defaultValue={selectedLanguage}>
          <option value="">Alle Sprachen</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <select name="tag" defaultValue={selectedTag}>
          <option value="">Alle Tags</option>
          {allTags.map((tag: string) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <button className="btn" type="submit">
          Suchen
        </button>

        {(query || selectedLanguage || selectedTag) && (
          <Link className="btn secondary" href="/servers">
            Zurücksetzen
          </Link>
        )}
      </form>

      {servers.length === 0 ? (
        <section className="card empty">
          <h3>Keine Server gefunden</h3>
          <p>Für deine Suche gibt es aktuell keine passenden Server.</p>
        </section>
      ) : (
        <section className="server-directory-grid">
          {servers.map((server: any) => {
            const ratingStats = getRatingStats(reviews ?? [], server.id);
            const isPremiumOrPartner = Boolean(
              server.premium_status || server.partner_status
            );

            return (
              <article
                key={server.id}
                className={`server-directory-card ${
                  isPremiumOrPartner ? "server-directory-card-premium" : ""
                }`}
                style={
                  isPremiumOrPartner
                    ? {
                        boxShadow: `0 0 26px ${
                          server.premium_glow_color || "#8b5cf6"
                        }55`,
                        borderColor: `${
                          server.premium_glow_color || "#8b5cf6"
                        }88`,
                      }
                    : undefined
                }
              >
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
                    <div className="server-directory-banner-fallback" />
                  )}

                  <div className="server-directory-rating">
                    ⭐{" "}
                    {ratingStats.count === 0
                      ? "No ratings"
                      : `${ratingStats.average.toFixed(1)} (${ratingStats.count})`}
                  </div>
                </div>

                <div className="server-directory-body">
                  <div className="server-directory-top">
                    <div className="server-directory-logo">
                      {server.logo_url && server.logo_url.startsWith("http") ? (
                        <img src={server.logo_url} alt={server.server_name} />
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
                        {server.category} • {server.country} •{" "}
                        {server.language}
                      </p>
                    </div>
                  </div>

                  <div className="server-directory-status-row">
                    <span className="server-online-dot" />
                    <span>{server.bumps ?? 0} Bumps</span>
                    <span>{formatLastBump(server.last_bump)}</span>
                  </div>

                  <div className="server-directory-badges">
                    {server.partner_status && (
                      <span className="badge partner">Partner</span>
                    )}

                    {server.premium_status && (
                      <span className="badge premium">Premium</span>
                    )}

                    {server.nsfw && <span className="badge">NSFW</span>}

                    {Array.isArray(server.tags) &&
                      server.tags.slice(0, 5).map((tag: string) => (
                        <span className="badge" key={tag}>
                          {tag}
                        </span>
                      ))}
                  </div>

                  <details className="server-description-toggle">
                    <summary>Beschreibung anzeigen</summary>

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
                  </details>

                  <div className="server-directory-footer">
                    <Link className="btn secondary" href={`/servers/${server.id}`}>
                      Server ansehen
                    </Link>

                    <a
                      className="btn"
                      href={server.invite_link}
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
