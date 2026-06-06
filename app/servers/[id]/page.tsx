import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function getRatingStats(reviews: any[]) {
  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.rating ?? 0),
    0
  );

  return {
    average: total / reviews.length,
    count: reviews.length,
  };
}

function canRateFromJoinDate(joinedAt: string | null | undefined) {
  if (!joinedAt) return false;
  return Date.now() - new Date(joinedAt).getTime() >= TWO_DAYS_MS;
}

export default async function ServerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const discordUserId = user?.id || user?.discordId;

  const servers = await supabaseRequest(
    `servers?id=eq.${id}&approved=eq.true&status=eq.approved&select=*`
  );

  const server = servers?.[0];

  if (!server) {
    notFound();
  }

  const reviews = await supabaseRequest(
    `reviews?server_id=eq.${server.id}&select=*`
  );

  const ratingStats = getRatingStats(reviews ?? []);

  const myReview = discordUserId
    ? (reviews ?? []).find(
        (review: any) => review.discord_user_id === discordUserId
      )
    : null;

  let memberEntry = null;

  if (discordUserId) {
    const memberRows = await supabaseRequest(
      `server_members?server_id=eq.${server.id}&discord_user_id=eq.${discordUserId}&select=*`
    );

    memberEntry = memberRows?.[0] ?? null;
  }

  const canRate = canRateFromJoinDate(memberEntry?.joined_at);

  const isPremiumOrPartner = Boolean(
    server.premium_status || server.partner_status
  );

  return (
    <main className="container server-detail-page">
      <Link href="/servers" className="admin-link-btn">
        Zurück zur Serverliste
      </Link>

      <article
        className={`server-detail-card ${
          isPremiumOrPartner ? "premium-server-card" : ""
        }`}
        style={
          isPremiumOrPartner
            ? {
                boxShadow: `0 0 34px ${
                  server.premium_glow_color || "#8b5cf6"
                }70`,
                borderColor: `${server.premium_glow_color || "#8b5cf6"}88`,
              }
            : undefined
        }
      >
        <div className="server-detail-banner">
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
        </div>

        <div className="server-detail-body">
          <div className="server-detail-top">
            <div className="server-directory-logo">
              {server.logo_url && server.logo_url.startsWith("http") ? (
                <img src={server.logo_url} alt={server.server_name} />
              ) : (
                <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
              )}
            </div>

            <div>
              <h1
                style={{
                  color: isPremiumOrPartner
                    ? server.server_name_color ?? "#ffffff"
                    : undefined,
                }}
              >
                {server.server_name}
              </h1>

              <p
                style={{
                  color: isPremiumOrPartner
                    ? server.server_text_color ?? "#cfc9ea"
                    : undefined,
                }}
              >
                {server.category} • {server.country} • {server.language}
              </p>
            </div>
          </div>

          <div className="server-directory-badges">
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

            {Array.isArray(server.tags) &&
              server.tags.map((tag: string) => (
                <span className="badge" key={tag}>
                  {tag}
                </span>
              ))}
          </div>

          <div
            className="server-detail-description"
            style={{
              color: isPremiumOrPartner
                ? server.server_text_color ?? "#ddd9ef"
                : undefined,
            }}
          >
            {server.description}
          </div>

          <section className="server-rating-panel">
            <h2>Server bewerten</h2>

            {!session ? (
              <Link href="/api/auth/signin" className="btn">
                Login zum Bewerten
              </Link>
            ) : myReview ? (
              <p>
                Du hast diesen Server bereits bewertet:{" "}
                <strong>{myReview.rating}/5</strong>
              </p>
            ) : !canRate ? (
              <div className="premium-locked-box">
                <h4>Bewertung noch nicht möglich</h4>
                <p>
                  Du kannst diesen Server erst bewerten, wenn du mindestens 2
                  Tage auf dem Discord Server bist.
                </p>
                <p>
                  Hinweis: Dafür muss der Discord-Bot deine Mitgliedschaft
                  speichern.
                </p>
              </div>
            ) : (
              <form action="/api/reviews/rate" method="POST">
                <input type="hidden" name="server_id" value={server.id} />

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
            )}
          </section>

          <a
            href={server.invite_link}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Discord beitreten
          </a>
        </div>
      </article>
    </main>
  );
}
