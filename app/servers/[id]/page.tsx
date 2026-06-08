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

function getServerBanner(server: any) {
  return (
    server.premium_banner_url ||
    server.banner_url ||
    server.banner ||
    "/asko-cafe-banner.png"
  );
}

function getServerIcon(server: any) {
  return (
    server.logo_url ||
    server.discord_server_icon_url ||
    "/asko-cafe-icon.png"
  );
}

function getServerInvite(server: any) {
  return server.invite_link || "/servers";
}

function getServerTags(server: any) {
  if (Array.isArray(server.tags)) {
    return server.tags;
  }

  return [];
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

  const banner = getServerBanner(server);
  const icon = getServerIcon(server);
  const invite = getServerInvite(server);
  const tags = getServerTags(server);

  const serverNameColor = isPremiumOrPartner
    ? server.server_name_color || "#ffffff"
    : "#ffffff";

  const serverTextColor = isPremiumOrPartner
    ? server.server_text_color || "rgba(246,243,255,0.78)"
    : "rgba(246,243,255,0.78)";

  const glowColor = server.premium_glow_color || "#8b5cf6";

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "54px 22px 90px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at 0% 20%, rgba(139, 92, 246, 0.35), transparent 34%), radial-gradient(circle at 100% 12%, rgba(85, 214, 255, 0.24), transparent 30%), linear-gradient(135deg, #06000d 0%, #12051f 48%, #102236 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/servers"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            minHeight: "42px",
            padding: "0 16px",
            borderRadius: "999px",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 900,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 22px rgba(139,92,246,0.18)",
            marginBottom: "22px",
          }}
        >
          ← Zurück zur Serverliste
        </Link>

        <article
          style={{
            overflow: "hidden",
            borderRadius: "34px",
            background:
              "linear-gradient(180deg, rgba(27, 16, 48, 0.96), rgba(10, 9, 28, 0.96))",
            border: `1px solid ${
              isPremiumOrPartner
                ? `${glowColor}99`
                : "rgba(255,255,255,0.12)"
            }`,
            boxShadow: isPremiumOrPartner
              ? `0 0 34px ${glowColor}66, 0 0 80px rgba(116,223,255,0.16)`
              : "0 0 40px rgba(139,92,246,0.22)",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "320px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {banner && banner.startsWith("http") ? (
              <img
                src={banner}
                alt={server.server_name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `${server.banner_position_x ?? 50}% ${
                    server.banner_position_y ?? 50
                  }%`,
                  transform: `scale(${server.banner_zoom ?? 1})`,
                  transformOrigin: `${server.banner_position_x ?? 50}% ${
                    server.banner_position_y ?? 50
                  }%`,
                  filter: "brightness(0.72) saturate(1.16)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(circle at 25% 20%, rgba(211,76,255,0.45), transparent 34%), radial-gradient(circle at 80% 30%, rgba(116,223,255,0.35), transparent 34%), linear-gradient(135deg, #170424, #102236)",
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(7,0,16,0.72) 72%, rgba(7,0,16,0.96) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "30px",
                right: "30px",
                bottom: "26px",
                display: "flex",
                alignItems: "flex-end",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "118px",
                  height: "118px",
                  borderRadius: "30px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, rgba(23,13,42,0.98), rgba(36,16,56,0.98))",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {icon && icon.startsWith("http") ? (
                  <img
                    src={icon}
                    alt={server.server_name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "54px",
                      fontWeight: 950,
                    }}
                  >
                    {server.server_name?.slice(0, 1) ?? "S"}
                  </span>
                )}
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "10px",
                  }}
                >
                  {server.premium_status && (
                    <span
                      style={{
                        minHeight: "30px",
                        padding: "0 13px",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(255,207,64,0.14)",
                        border: "1px solid rgba(255,207,64,0.34)",
                        color: "#ffe68a",
                        fontSize: "12px",
                        fontWeight: 950,
                        textTransform: "uppercase",
                      }}
                    >
                      👑 Premium
                    </span>
                  )}

                  {server.partner_status && (
                    <span
                      style={{
                        minHeight: "30px",
                        padding: "0 13px",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(86,209,255,0.14)",
                        border: "1px solid rgba(86,209,255,0.34)",
                        color: "#9deaff",
                        fontSize: "12px",
                        fontWeight: 950,
                        textTransform: "uppercase",
                      }}
                    >
                      🤝 Partner
                    </span>
                  )}

                  <span
                    style={{
                      minHeight: "30px",
                      padding: "0 13px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 950,
                    }}
                  >
                    ⭐{" "}
                    {ratingStats.count === 0
                      ? "Noch keine Bewertungen"
                      : `${ratingStats.average.toFixed(1)} / 5 (${ratingStats.count})`}
                  </span>
                </div>

                <h1
                  style={{
                    margin: 0,
                    color: serverNameColor,
                    fontSize: "clamp(42px, 6vw, 78px)",
                    lineHeight: 0.92,
                    letterSpacing: "-0.06em",
                    fontWeight: 950,
                    textShadow: "0 18px 48px rgba(0,0,0,0.5)",
                  }}
                >
                  {server.server_name}
                </h1>

                <p
                  style={{
                    margin: "14px 0 0",
                    color: serverTextColor,
                    fontSize: "16px",
                    fontWeight: 800,
                  }}
                >
                  {server.category || "Community"} •{" "}
                  {server.country || "International"} •{" "}
                  {server.language || "Deutsch"}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "30px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 360px",
              gap: "26px",
            }}
          >
            <div>
              <section
                style={{
                  padding: "24px",
                  borderRadius: "26px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 0 26px rgba(139,92,246,0.12)",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 12px",
                    fontSize: "26px",
                    fontWeight: 950,
                    letterSpacing: "-0.035em",
                  }}
                >
                  Beschreibung
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: serverTextColor,
                    fontSize: "16px",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {server.description || "Keine Beschreibung vorhanden."}
                </p>

                <div
                  style={{
                    marginTop: "22px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        minHeight: "32px",
                        padding: "0 13px",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(112,89,161,0.34)",
                        border: "1px solid rgba(203,166,255,0.22)",
                        color: "#ffffff",
                        fontSize: "13px",
                        fontWeight: 850,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              <section
                style={{
                  marginTop: "24px",
                  padding: "24px",
                  borderRadius: "26px",
                  background:
                    "linear-gradient(180deg, rgba(55,36,79,0.58), rgba(38,62,91,0.42))",
                  border: "1px solid rgba(172,120,255,0.22)",
                  boxShadow: "0 0 26px rgba(116,223,255,0.10)",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 16px",
                    fontSize: "26px",
                    fontWeight: 950,
                    letterSpacing: "-0.035em",
                  }}
                >
                  Server bewerten
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px minmax(0, 1fr)",
                    gap: "18px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      minHeight: "132px",
                      borderRadius: "24px",
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(255,207,64,0.18), transparent 42%), rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "40px",
                        fontWeight: 950,
                        lineHeight: 1,
                      }}
                    >
                      {ratingStats.count === 0
                        ? "—"
                        : ratingStats.average.toFixed(1)}
                    </strong>

                    <span
                      style={{
                        marginTop: "8px",
                        color: "rgba(255,255,255,0.76)",
                        fontSize: "13px",
                        fontWeight: 900,
                      }}
                    >
                      {ratingStats.count} Bewertungen
                    </span>
                  </div>

                  <div>
                    {!session ? (
                      <div>
                        <p
                          style={{
                            margin: "0 0 14px",
                            color: "rgba(246,243,255,0.80)",
                            lineHeight: 1.65,
                          }}
                        >
                          Logge dich mit Discord ein, um diesen Server zu
                          bewerten.
                        </p>

                        <Link
                          href="/api/auth/signin"
                          style={{
                            minHeight: "46px",
                            padding: "0 18px",
                            borderRadius: "15px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontWeight: 950,
                            background:
                              "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                          }}
                        >
                          Login zum Bewerten
                        </Link>
                      </div>
                    ) : myReview ? (
                      <div
                        style={{
                          padding: "16px",
                          borderRadius: "18px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <strong>Danke für deine Bewertung!</strong>
                        <p
                          style={{
                            margin: "8px 0 0",
                            color: "rgba(246,243,255,0.78)",
                          }}
                        >
                          Du hast diesen Server bereits mit{" "}
                          <strong>{myReview.rating}/5 Sternen</strong>{" "}
                          bewertet.
                        </p>
                      </div>
                    ) : !canRate ? (
                      <div
                        style={{
                          padding: "16px",
                          borderRadius: "18px",
                          background: "rgba(255,207,64,0.08)",
                          border: "1px solid rgba(255,207,64,0.22)",
                        }}
                      >
                        <strong>Bewertung noch nicht möglich</strong>
                        <p
                          style={{
                            margin: "8px 0 0",
                            color: "rgba(246,243,255,0.78)",
                            lineHeight: 1.6,
                          }}
                        >
                          Du kannst diesen Server erst bewerten, wenn du
                          mindestens 2 Tage auf dem Discord Server bist.
                        </p>
                        <p
                          style={{
                            margin: "8px 0 0",
                            color: "rgba(246,243,255,0.62)",
                            lineHeight: 1.6,
                            fontSize: "13px",
                          }}
                        >
                          Hinweis: Dafür muss der Discord-Bot deine
                          Mitgliedschaft speichern.
                        </p>
                      </div>
                    ) : (
                      <form
                        action="/api/reviews/rate"
                        method="POST"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <input
                          type="hidden"
                          name="server_id"
                          value={server.id}
                        />

                        <select
                          name="rating"
                          style={{
                            minHeight: "46px",
                            padding: "0 14px",
                            borderRadius: "15px",
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.16)",
                            color: "#ffffff",
                            fontWeight: 850,
                            outline: "none",
                          }}
                        >
                          <option value="5">5 Sterne</option>
                          <option value="4">4 Sterne</option>
                          <option value="3">3 Sterne</option>
                          <option value="2">2 Sterne</option>
                          <option value="1">1 Stern</option>
                        </select>

                        <button
                          type="submit"
                          style={{
                            minHeight: "46px",
                            padding: "0 18px",
                            border: 0,
                            borderRadius: "15px",
                            color: "#ffffff",
                            fontWeight: 950,
                            cursor: "pointer",
                            background:
                              "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                          }}
                        >
                          Bewerten
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <a
                href={invite}
                target="_blank"
                rel="noreferrer"
                style={{
                  minHeight: "56px",
                  borderRadius: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 950,
                  background:
                    "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                  boxShadow:
                    "0 0 24px rgba(211,85,255,0.28), 0 0 28px rgba(103,218,255,0.16)",
                }}
              >
                Discord beitreten
              </a>

              <div
                style={{
                  padding: "22px",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: "20px",
                    fontWeight: 950,
                  }}
                >
                  Server Infos
                </h3>

                {[
                  ["Kategorie", server.category || "Community"],
                  ["Land", server.country || "International"],
                  ["Sprache", server.language || "Deutsch"],
                  ["Status", server.status || "approved"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "14px",
                      padding: "12px 0",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ color: "rgba(246,243,255,0.62)" }}>
                      {label}
                    </span>
                    <strong style={{ textAlign: "right" }}>{value}</strong>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "22px",
                  borderRadius: "24px",
                  background:
                    "linear-gradient(180deg, rgba(80,34,116,0.42), rgba(37,61,92,0.32))",
                  border: "1px solid rgba(202,115,255,0.22)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "20px",
                    fontWeight: 950,
                  }}
                >
                  Premium Features
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(246,243,255,0.76)",
                    lineHeight: 1.6,
                  }}
                >
                  Premium-Server werden auf der Startseite hervorgehoben und
                  automatisch in der linken Showcase-Fläche angezeigt.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </section>
    </main>
  );
}
