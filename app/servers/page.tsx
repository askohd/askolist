import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

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

    const aCreated = getTimeValue(a.created_at);
    const bCreated = getTimeValue(b.created_at);

    return bCreated - aCreated;
  });
}

function getRatingStats(reviews: any[], serverId: string) {
  const serverReviews = reviews.filter(
    (review) => review.server_id === serverId
  );

  if (serverReviews.length === 0) {
    return {
      average: 0,
      count: 0,
    };
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

export default async function ServersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const discordUserId = user?.id || user?.discordId;

  const data = await supabaseRequest(
    "servers?approved=eq.true&status=eq.approved&select=*"
  );

  const reviews = await supabaseRequest(
    "reviews?select=server_id,discord_user_id,rating"
  );

  const servers = sortServers(data ?? []);

  return (
    <main className="container servers-directory-page">
      <section className="servers-directory-header">
        <div>
          <span className="page-badge">AskoList Directory</span>
          <h1>Discord Server</h1>
          <p>
            Die zuletzt gebumpten Server stehen automatisch ganz oben.
          </p>
        </div>

        <Link href="/submit" className="btn">
          Submit Server
        </Link>
      </section>

      {servers.length === 0 ? (
        <section className="card empty">
          <h3>No approved Discord servers yet</h3>
          <p>Noch keine freigegebenen Server vorhanden.</p>
        </section>
      ) : (
        <section className="server-directory-grid">
          {servers.map((server: any) => {
            const ratingStats = getRatingStats(reviews ?? [], server.id);
            const isPremiumOrPartner = Boolean(
              server.premium_status || server.partner_status
            );

            const myReview = (reviews ?? []).find(
              (review: any) =>
                review.server_id === server.id &&
                review.discord_user_id === discordUserId
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
                      server.tags.slice(0, 4).map((tag: string) => (
                        <span className="badge" key={tag}>
                          {tag}
                        </span>
                      ))}
                  </div>

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

                  <div className="server-directory-rating-box">
                    {session ? (
                      myReview ? (
                        <p>
                          Bewertet: <strong>{myReview.rating}/5</strong>
                        </p>
                      ) : (
                        <form action="/api/reviews/rate" method="POST">
                          <input
                            type="hidden"
                            name="server_id"
                            value={server.id}
                          />

                          <select name="rating" className="rating-select">
                            <option value="5">5 Sterne</option>
                            <option value="4">4 Sterne</option>
                            <option value="3">3 Sterne</option>
                            <option value="2">2 Sterne</option>
                            <option value="1">1 Stern</option>
                          </select>

                          <button
                            className="admin-action-btn primary"
                            type="submit"
                          >
                            Bewerten
                          </button>
                        </form>
                      )
                    ) : (
                      <Link className="admin-link-btn" href="/api/auth/signin">
                        Login to rate
                      </Link>
                    )}
                  </div>

                  <div className="server-directory-footer">
                    <a
                      className="btn secondary"
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
