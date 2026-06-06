import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function sortServers(servers: any[]) {
  return servers.sort((a, b) => {
    if (a.premium_status !== b.premium_status) {
      return a.premium_status ? -1 : 1;
    }

    const aBump = a.last_bump ? new Date(a.last_bump).getTime() : 0;
    const bBump = b.last_bump ? new Date(b.last_bump).getTime() : 0;

    return bBump - aBump;
  });
}

function getRatingStats(reviews: any[], serverId: string) {
  const serverReviews = reviews.filter((review) => review.server_id === serverId);

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

export default async function ServersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const discordUserId = user?.id || user?.discordId;

  const data = await supabaseRequest(
    "servers?approved=eq.true&status=eq.approved&select=*"
  );

  const reviews = await supabaseRequest("reviews?select=server_id,discord_user_id,rating");

  const servers = sortServers(data ?? []);

  return (
    <main className="container profile-page">
      <section className="section-title">
        <div>
          <h1>Discord Servers</h1>
          <p className="meta">Premium first, then latest bumps</p>
        </div>

        <Link href="/submit" className="btn">
          Submit Server
        </Link>
      </section>

      <section className="server-list-modern">
        {servers.length === 0 ? (
          <div className="card empty">
            <h3>No approved Discord servers yet</h3>
            <p>Noch keine freigegebenen Server vorhanden.</p>
          </div>
        ) : (
          servers.map((server: any) => {
            const ratingStats = getRatingStats(reviews ?? [], server.id);
            const myReview = (reviews ?? []).find(
              (review: any) =>
                review.server_id === server.id &&
                review.discord_user_id === discordUserId
            );

            return (
              <article
                key={server.id}
                className={`server-modern-card ${
                  server.premium_status ? "premium-server-card" : ""
                }`}
                style={
                  server.premium_status
                    ? {
                        boxShadow: `0 0 34px ${
                          server.premium_glow_color || "#8b5cf6"
                        }70`,
                        borderColor: `${server.premium_glow_color || "#8b5cf6"}88`,
                      }
                    : undefined
                }
              >
                <div className="server-modern-banner">
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
                    <div className="server-modern-banner-fallback" />
                  )}

                  {server.premium_status && (
                    <span className="server-premium-badge">Premium</span>
                  )}
                </div>

                <div className="server-modern-body">
                  <div className="server-modern-logo">
                    {server.logo_url && server.logo_url.startsWith("http") ? (
                      <img src={server.logo_url} alt={server.server_name} />
                    ) : (
                      <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
                    )}
                  </div>

                  <div className="server-modern-content">
                    <div className="server-modern-header">
                      <div>
                        <h3>{server.server_name}</h3>
                        <p>
                          {server.category} • {server.country} •{" "}
                          {server.language}
                        </p>
                      </div>

                      <div className="server-modern-badges">
                        <span className="badge rating-badge">
                          ⭐{" "}
                          {ratingStats.count === 0
                            ? "No ratings"
                            : `${ratingStats.average.toFixed(1)} (${ratingStats.count})`}
                        </span>

                        {server.partner_status && (
                          <span className="badge partner">Partner</span>
                        )}

                        {server.premium_status && (
                          <span className="badge premium">Premium</span>
                        )}

                        {server.nsfw && <span className="badge">NSFW</span>}
                      </div>
                    </div>

                    <p className="server-modern-description">
                      {server.description}
                    </p>

                    {server.premium_status && (
                      <div
                        className="premium-showcase"
                        style={{
                          borderColor: `${server.premium_glow_color || "#8b5cf6"}66`,
                          boxShadow: `0 0 28px ${
                            server.premium_glow_color || "#8b5cf6"
                          }33`,
                        }}
                      >
                        <div>
                          <strong>Premium Spotlight</strong>
                          <p>
                            {server.premium_message ||
                              "Featured Premium Server"}
                          </p>
                        </div>

                        <span>Top Placement</span>
                      </div>
                    )}

                    <div className="rating-box">
                      {session ? (
                        myReview ? (
                          <p className="form-note">
                            Du hast diesen Server bereits bewertet:{" "}
                            <strong>{myReview.rating}/5</strong>
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

                            <button className="admin-action-btn primary" type="submit">
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

                    <div className="server-modern-footer">
                      <span className="server-modern-bump-count">
                        Bumps: {server.bumps ?? 0}
                      </span>

                      <a
                        className="btn secondary"
                        href={server.invite_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Join Server
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
