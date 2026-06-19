import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

type ServerMetadataRow = {
  id: string;
  server_name?: string | null;
  description?: string | null;
  category?: string | null;
  language?: string | null;
  country?: string | null;
  tags?: string[] | null;
  banner_url?: string | null;
  premium_banner_url?: string | null;
  logo_url?: string | null;
  discord_server_icon_url?: string | null;
  member_count?: number | null;
  online_count?: number | null;
};

function getBaseUrl() {
  return SITE_URL.replace(/\/$/, "");
}

function cleanSeoText(value: unknown) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .replace(/[#*_`<>]/g, "")
    .trim();
}

function truncateSeoText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}

function getAbsoluteUrl(pathOrUrl: string | null | undefined) {
  const value = String(pathOrUrl ?? "").trim();

  if (!value) {
    return `${getBaseUrl()}/asko-cafe-hero.png`;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${getBaseUrl()}${value.startsWith("/") ? value : `/${value}`}`;
}

function getServerSeoImage(server: ServerMetadataRow) {
  return getAbsoluteUrl(
    server.premium_banner_url ||
      server.banner_url ||
      server.logo_url ||
      server.discord_server_icon_url ||
      "/asko-cafe-hero.png"
  );
}

function getServerSeoDescription(server: ServerMetadataRow) {
  const name = cleanSeoText(server.server_name || "Discord Server");
  const category = cleanSeoText(server.category || "Community");
  const language = cleanSeoText(server.language || "Deutsch");
  const description = cleanSeoText(server.description);
  const tags = Array.isArray(server.tags)
    ? server.tags.filter(Boolean).slice(0, 5).join(", ")
    : "";

  const text =
    description ||
    `Tritt dem ${name} Discord Server bei. Entdecke eine aktive ${language} ${category} Community auf Asko Cafe.`;

  const tagText = tags ? ` Tags: ${tags}.` : "";

  return truncateSeoText(
    `${text} Finde ${category} Discord Server, deutsche Discord Server und neue Communities auf Asko Cafe.${tagText}`,
    300
  );
}

async function getServerForMetadata(id: string) {
  try {
    const servers = await supabaseRequest(
      `servers?id=eq.${encodeURIComponent(
        id
      )}&approved=eq.true&status=eq.approved&select=id,server_name,description,category,language,country,tags,banner_url,premium_banner_url,logo_url,discord_server_icon_url,member_count,online_count&limit=1`
    );

    if (!Array.isArray(servers)) {
      return null;
    }

    return (servers[0] ?? null) as ServerMetadataRow | null;
  } catch (error) {
    console.error("Could not load server metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const server = await getServerForMetadata(id);

  if (!server) {
    return {
      title: "Discord Server nicht gefunden",
      description:
        "Dieser Discord Server wurde nicht gefunden oder ist noch nicht freigegeben.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const serverName = cleanSeoText(server.server_name || "Discord Server");
  const category = cleanSeoText(server.category || "Community");
  const language = cleanSeoText(server.language || "Deutsch");
  const title = `${serverName} Discord Server – ${category} ${language}`;
  const description = getServerSeoDescription(server);
  const serverUrl = `${getBaseUrl()}/servers/${encodeURIComponent(server.id)}`;
  const imageUrl = getServerSeoImage(server);

  return {
    title,
    description,
    keywords: [
      `${serverName} Discord Server`,
      `${category} Discord Server`,
      `${language} Discord Server`,
      "Discord Server",
      "deutsche Discord Server",
      "Discord Server Liste",
      "Discord Server finden",
      "Gaming Discord Server",
      "Anime Discord Server",
      "Community Discord Server",
      "Asko Cafe",
    ],
    alternates: {
      canonical: `/servers/${server.id}`,
    },
    openGraph: {
      title,
      description,
      url: serverUrl,
      siteName: "Asko Cafe",
      type: "website",
      locale: "de_DE",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${serverName} Discord Server`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


const SERVER_REPORT_REASONS = [
  "Unpassende Inhalte",
  "Falsche Server-Informationen",
  "Discord Invite funktioniert nicht",
  "Spam oder Fake Server",
  "NSFW ohne Kennzeichnung",
  "Regelverstoß",
  "Sonstiges",
];

function getRatingStats(reviews: any[]) {
  const visibleReviews = reviews.filter(
    (review) => !review.hidden && !review.deleted_by_admin
  );

  if (visibleReviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = visibleReviews.reduce(
    (sum, review) => sum + Number(review.rating ?? 0),
    0
  );

  return {
    average: total / visibleReviews.length,
    count: visibleReviews.length,
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

function getOnlineCount(server: any) {
  const value =
    server.online_count ??
    server.onlineCount ??
    server.members_online ??
    server.online_members ??
    server.presence_count ??
    server.discord_online_count ??
    server.discord_online_members ??
    null;

  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value);
}

function getMemberCount(server: any) {
  const value =
    server.member_count ??
    server.memberCount ??
    server.members_count ??
    server.guild_member_count ??
    server.approximate_member_count ??
    null;

  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value);
}

function formatOnlineCount(server: any) {
  const online = getOnlineCount(server);

  if (online === null) {
    return "Online unbekannt";
  }

  return `${online.toLocaleString("de-DE")} online`;
}

function formatMemberCount(server: any) {
  const members = getMemberCount(server);

  if (members === null) {
    return "Mitglieder unbekannt";
  }

  return `${members.toLocaleString("de-DE")} Mitglieder`;
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
  if (days === 1) return "vor 1 Tag";

  return `vor ${days} Tagen`;
}

function getReviewComment(review: any) {
  return String(
    review.comment ||
      review.review_comment ||
      review.text ||
      review.message ||
      ""
  ).trim();
}

function getReviewName(review: any) {
  return (
    review.discord_username ||
    review.user_name ||
    review.username ||
    review.display_name ||
    "Discord Nutzer"
  );
}

function getReviewDate(review: any) {
  const dateValue = review.created_at || review.updated_at;

  if (!dateValue) return "";

  return new Date(dateValue).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getReportedCount(review: any) {
  const value = review.reported_count ?? review.reports ?? 0;

  if (Number.isNaN(Number(value))) {
    return 0;
  }

  return Number(value);
}

function isAdminUser(user: any) {
  return Boolean(
    user?.role === "admin" ||
      user?.isAdmin ||
      user?.is_admin ||
      user?.admin ||
      user?.staff ||
      user?.is_staff ||
      user?.permissions?.includes?.("admin")
  );
}

function StarRatingText({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating || 0)));

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        color: "#ffe68a",
        fontWeight: 950,
      }}
    >
      {"★".repeat(safeRating)}
      <span style={{ color: "rgba(255,255,255,0.28)" }}>
        {"★".repeat(5 - safeRating)}
      </span>
    </span>
  );
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
  const isAdmin = isAdminUser(user);

  const servers = await supabaseRequest(
    `servers?id=eq.${id}&approved=eq.true&status=eq.approved&select=*`
  );

  const server = servers?.[0];

  if (!server) {
    notFound();
  }

  const reviewsResponse = await supabaseRequest(
    `reviews?server_id=eq.${server.id}&select=*&order=created_at.desc`
  );

  const reviews = Array.isArray(reviewsResponse) ? reviewsResponse : [];
  const visibleReviews = reviews.filter(
    (review: any) => !review.hidden && !review.deleted_by_admin
  );

  const ratingStats = getRatingStats(reviews);

  const myReview = discordUserId
    ? reviews.find((review: any) => review.discord_user_id === discordUserId)
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

  const serverSeoUrl = `${getBaseUrl()}/servers/${encodeURIComponent(
    server.id
  )}`;

  const serverStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${server.server_name} Discord Server`,
    description: getServerSeoDescription(server),
    url: serverSeoUrl,
    image: getServerSeoImage(server),
    isPartOf: {
      "@type": "WebSite",
      name: "Asko Cafe",
      url: getBaseUrl(),
    },
    about: {
      "@type": "Thing",
      name: `${server.category || "Community"} Discord Server`,
    },
  };

  const serverNameColor = isPremiumOrPartner
    ? server.server_name_color || "#ffffff"
    : "#ffffff";

  const serverTextColor = isPremiumOrPartner
    ? server.server_text_color || "rgba(246,243,255,0.78)"
    : "rgba(246,243,255,0.78)";

  const glowColor = server.premium_glow_color || "#8b5cf6";

  return (
    <main
      className="server-detail-page-mobile"
      style={{
        minHeight: "100vh",
        padding: "54px 22px 90px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at 0% 20%, rgba(139, 92, 246, 0.35), transparent 34%), radial-gradient(circle at 100% 12%, rgba(85, 214, 255, 0.24), transparent 30%), linear-gradient(135deg, #06000d 0%, #12051f 48%, #102236 100%)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serverStructuredData),
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .server-detail-page-mobile {
            padding: 22px 12px 70px !important;
            overflow-x: hidden !important;
          }

          .server-detail-shell {
            max-width: 100% !important;
          }

          .server-detail-shell > a {
            margin-bottom: 14px !important;
            min-height: 38px !important;
            padding: 0 13px !important;
            font-size: 13px !important;
          }

          .server-detail-card {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 28px !important;
            overflow: hidden !important;
          }

          .server-detail-hero-banner {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            padding-top: 188px !important;
          }

          .server-detail-hero-banner > img,
          .server-detail-hero-banner > div:first-child {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            height: 188px !important;
          }

          .server-detail-hero-banner > div:nth-child(2) {
            height: 188px !important;
            bottom: auto !important;
          }

          .server-detail-hero-content {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            padding: 0 18px 22px !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            align-items: start !important;
            background:
              linear-gradient(180deg, rgba(7,0,16,0.02), rgba(7,0,16,0.96) 18%, rgba(7,0,16,1) 100%) !important;
          }

          .server-detail-server-icon {
            width: 96px !important;
            height: 96px !important;
            border-radius: 26px !important;
            margin-top: -48px !important;
          }

          .server-detail-title-block {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }

          .server-detail-title-block h1 {
            font-size: clamp(34px, 11vw, 48px) !important;
            line-height: 0.95 !important;
            max-width: 100% !important;
            overflow-wrap: anywhere !important;
          }

          .server-detail-title-block p {
            font-size: 14px !important;
            line-height: 1.4 !important;
            margin-top: 10px !important;
          }

          .server-detail-content-grid {
            padding: 16px !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .server-detail-main-column {
            min-width: 0 !important;
            display: grid !important;
            gap: 16px !important;
          }

          .server-detail-main-column > section,
          .server-detail-side-column > div,
          .server-detail-side-column > a {
            width: 100% !important;
            max-width: 100% !important;
          }

          .server-detail-main-column > section {
            padding: 18px !important;
            border-radius: 22px !important;
            margin-top: 0 !important;
          }

          .server-detail-main-column h2,
          .server-detail-side-column h3 {
            font-size: 20px !important;
            line-height: 1.15 !important;
          }

          .server-detail-main-column p {
            font-size: 14px !important;
            line-height: 1.65 !important;
            overflow-wrap: anywhere !important;
          }

          .server-detail-rating-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .server-detail-side-column {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            min-width: 0 !important;
          }

          .server-detail-join-button {
            order: -1 !important;
            min-height: 50px !important;
            border-radius: 16px !important;
          }

          .server-detail-report-box,
          .server-detail-info-box,
          .server-detail-community-box {
            padding: 18px !important;
            border-radius: 22px !important;
          }

          .server-detail-report-box form {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .server-detail-report-box select,
          .server-detail-report-box textarea,
          .server-detail-report-box button {
            width: 100% !important;
            min-width: 0 !important;
          }

          .server-detail-report-box textarea {
            min-height: 118px !important;
          }

          .server-detail-info-box [style*="space-between"] {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }

          .server-detail-info-box strong {
            text-align: left !important;
            overflow-wrap: anywhere !important;
          }
        }

        @media (max-width: 430px) {
          .server-detail-page-mobile {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }

          .server-detail-hero-banner {
            padding-top: 170px !important;
          }

          .server-detail-hero-banner > img,
          .server-detail-hero-banner > div:first-child,
          .server-detail-hero-banner > div:nth-child(2) {
            height: 170px !important;
          }

          .server-detail-hero-content {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .server-detail-content-grid {
            padding: 12px !important;
          }

          .server-detail-main-column > section,
          .server-detail-report-box,
          .server-detail-info-box,
          .server-detail-community-box {
            padding: 15px !important;
          }
        }
      `}</style>

      <section
        className="server-detail-shell"
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
          className="server-detail-card"
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
            className="server-detail-hero-banner"
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
              className="server-detail-hero-content"
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
                className="server-detail-server-icon"
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

              <div className="server-detail-title-block" style={{ minWidth: 0 }}>
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
            className="server-detail-content-grid"
            style={{
              padding: "30px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 360px",
              gap: "26px",
            }}
          >
            <div className="server-detail-main-column">
              <section className="server-detail-info-section"
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
                  className="server-detail-rating-grid"
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

                        {getReviewComment(myReview) && (
                          <p
                            style={{
                              margin: "10px 0 0",
                              color: "rgba(246,243,255,0.72)",
                              lineHeight: 1.55,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            „{getReviewComment(myReview)}“
                          </p>
                        )}
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
                          display: "grid",
                          gap: "12px",
                        }}
                      >
                        <input
                          type="hidden"
                          name="server_id"
                          value={server.id}
                        />

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            flexWrap: "wrap",
                          }}
                        >
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
                        </div>

                        <textarea
                          name="comment"
                          maxLength={800}
                          placeholder="Schreibe optional, was dir am Server gefällt oder was verbessert werden könnte..."
                          style={{
                            minHeight: "110px",
                            width: "100%",
                            resize: "vertical",
                            padding: "14px 16px",
                            borderRadius: "18px",
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.16)",
                            color: "#ffffff",
                            outline: "none",
                            fontWeight: 750,
                            lineHeight: 1.55,
                          }}
                        />
                      </form>
                    )}
                  </div>
                </div>
              </section>

              <section
                style={{
                  marginTop: "24px",
                  padding: "24px",
                  borderRadius: "26px",
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 0 26px rgba(139,92,246,0.10)",
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
                  Bewertungen der Community
                </h2>

                {visibleReviews.length === 0 ? (
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(246,243,255,0.72)",
                      lineHeight: 1.6,
                    }}
                  >
                    Noch keine öffentlichen Bewertungen vorhanden.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gap: "14px",
                    }}
                  >
                    {visibleReviews.map((review: any) => {
                      const comment = getReviewComment(review);
                      const reportedCount = getReportedCount(review);
                      const isOwnReview =
                        discordUserId &&
                        review.discord_user_id === discordUserId;

                      return (
                        <article
                          key={review.id}
                          style={{
                            padding: "18px",
                            borderRadius: "20px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.10)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "12px",
                              flexWrap: "wrap",
                            }}
                          >
                            <div>
                              <strong>{getReviewName(review)}</strong>

                              <div
                                style={{
                                  marginTop: "6px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <StarRatingText
                                  rating={Number(review.rating ?? 0)}
                                />

                                {getReviewDate(review) && (
                                  <span
                                    style={{
                                      color: "rgba(246,243,255,0.56)",
                                      fontSize: "13px",
                                      fontWeight: 800,
                                    }}
                                  >
                                    {getReviewDate(review)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {reportedCount > 0 && isAdmin && (
                              <span
                                style={{
                                  minHeight: "30px",
                                  padding: "0 10px",
                                  borderRadius: "999px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  background: "rgba(255,88,88,0.12)",
                                  border: "1px solid rgba(255,88,88,0.30)",
                                  color: "#ffb4b4",
                                  fontSize: "12px",
                                  fontWeight: 950,
                                }}
                              >
                                {reportedCount} Meldungen
                              </span>
                            )}
                          </div>

                          {comment ? (
                            <p
                              style={{
                                margin: "14px 0 0",
                                color: "rgba(246,243,255,0.82)",
                                lineHeight: 1.65,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {comment}
                            </p>
                          ) : (
                            <p
                              style={{
                                margin: "14px 0 0",
                                color: "rgba(246,243,255,0.48)",
                                lineHeight: 1.65,
                                fontStyle: "italic",
                              }}
                            >
                              Diese Bewertung enthält keinen Kommentar.
                            </p>
                          )}

                          <div
                            style={{
                              marginTop: "14px",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            {session && !isOwnReview && (
                              <form action="/api/reviews/report" method="POST">
                                <input
                                  type="hidden"
                                  name="review_id"
                                  value={review.id}
                                />
                                <input
                                  type="hidden"
                                  name="server_id"
                                  value={server.id}
                                />
                                <input
                                  type="hidden"
                                  name="reason"
                                  value="Unpassende Bewertung"
                                />

                                <button
                                  type="submit"
                                  style={{
                                    minHeight: "34px",
                                    padding: "0 12px",
                                    borderRadius: "999px",
                                    border:
                                      "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(246,243,255,0.82)",
                                    fontWeight: 850,
                                    cursor: "pointer",
                                  }}
                                >
                                  Bewertung melden
                                </button>
                              </form>
                            )}

                            {isAdmin && (
                              <form
                                action="/api/admin/reviews/delete"
                                method="POST"
                              >
                                <input
                                  type="hidden"
                                  name="review_id"
                                  value={review.id}
                                />
                                <input
                                  type="hidden"
                                  name="server_id"
                                  value={server.id}
                                />

                                <button
                                  type="submit"
                                  style={{
                                    minHeight: "34px",
                                    padding: "0 12px",
                                    borderRadius: "999px",
                                    border:
                                      "1px solid rgba(255,88,88,0.32)",
                                    background: "rgba(255,88,88,0.10)",
                                    color: "#ffb4b4",
                                    fontWeight: 950,
                                    cursor: "pointer",
                                  }}
                                >
                                  Admin löschen
                                </button>
                              </form>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            <aside
              className="server-detail-side-column"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <a
                className="server-detail-join-button"
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
                className="server-detail-report-box"
                style={{
                  padding: "22px",
                  borderRadius: "24px",
                  background:
                    "linear-gradient(180deg, rgba(255,88,88,0.10), rgba(80,34,116,0.22))",
                  border: "1px solid rgba(255,88,88,0.22)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "20px",
                    fontWeight: 950,
                  }}
                >
                  Server melden
                </h3>

                {!session ? (
                  <div>
                    <p
                      style={{
                        margin: "0 0 14px",
                        color: "rgba(246,243,255,0.74)",
                        lineHeight: 1.6,
                        fontSize: "14px",
                      }}
                    >
                      Logge dich mit Discord ein, um diesen Server zu melden.
                    </p>

                    <Link
                      href="/api/auth/signin"
                      style={{
                        minHeight: "42px",
                        padding: "0 15px",
                        borderRadius: "14px",
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
                      Login zum Melden
                    </Link>
                  </div>
                ) : (
                  <form
                    action="/api/servers/report"
                    method="POST"
                    style={{
                      display: "grid",
                      gap: "12px",
                    }}
                  >
                    <input type="hidden" name="server_id" value={server.id} />

                    <select
                      name="reason"
                      style={{
                        minHeight: "44px",
                        padding: "0 13px",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "#ffffff",
                        fontWeight: 850,
                        outline: "none",
                      }}
                    >
                      {SERVER_REPORT_REASONS.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>

                    <textarea
                      name="details"
                      maxLength={900}
                      placeholder="Beschreibe kurz, was mit diesem Server nicht stimmt..."
                      style={{
                        minHeight: "104px",
                        width: "100%",
                        resize: "vertical",
                        padding: "13px 14px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "#ffffff",
                        outline: "none",
                        fontWeight: 750,
                        lineHeight: 1.5,
                      }}
                    />

                    <button
                      type="submit"
                      style={{
                        minHeight: "42px",
                        border: 0,
                        borderRadius: "14px",
                        color: "#ffffff",
                        fontWeight: 950,
                        cursor: "pointer",
                        background:
                          "linear-gradient(135deg, #ff4d6d 0%, #d946ef 50%, #8b5cf6 100%)",
                      }}
                    >
                      Server melden
                    </button>
                  </form>
                )}
              </div>

              <div
                className="server-detail-info-box"
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
                  ["Sprache", server.language || "Deutsch"],
                  ["Status", server.status || "approved"],
                  ["Online", formatOnlineCount(server)],
                  ["Mitglieder", formatMemberCount(server)],
                  ["Letzter Bump", formatLastBump(server.last_bump)],
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
                className="server-detail-community-box"
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
                    margin: "0 0 14px",
                    fontSize: "20px",
                    fontWeight: 950,
                  }}
                >
                  Community Überblick
                </h3>

                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <strong>{formatMemberCount(server)}</strong>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "rgba(246,243,255,0.66)",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      Aktuelle Servergröße laut Discord-Bot.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "18px",
                      background: "rgba(54,255,154,0.08)",
                      border: "1px solid rgba(54,255,154,0.18)",
                    }}
                  >
                    <strong>{formatOnlineCount(server)}</strong>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "rgba(246,243,255,0.66)",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      Online-Anzeige wird automatisch vom Bot aktualisiert.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "18px",
                      background: "rgba(255,207,64,0.08)",
                      border: "1px solid rgba(255,207,64,0.18)",
                    }}
                  >
                    <strong>
                      {ratingStats.count === 0
                        ? "Noch keine Bewertungen"
                        : `${ratingStats.average.toFixed(1)} / 5 Sterne`}
                    </strong>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "rgba(246,243,255,0.66)",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      Öffentliche Bewertungen und Server können gemeldet und von
                      Staff geprüft werden.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </section>
    </main>
  );
}
