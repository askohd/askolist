import Link from "next/link";
import type { CSSProperties } from "react";
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

function normalizePremiumLayout(value: unknown) {
  const layout = String(value ?? "glow")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  const layoutAliases: Record<string, string> = {
    glow: "glow",
    starborder: "starborder",
    "star-border": "starborder",
    "sternen-rand": "starborder",
    sunset: "sunset",
    "sunset-dark": "sunset",
    aurora: "aurora",
    "aurora-flow": "aurora",
    neon: "neon",
    "neon-pulse": "neon",
    galaxy: "galaxy",
    "galaxy-dust": "galaxy",
    flame: "flame",
    fire: "flame",
    "fire-core": "flame",
    ocean: "ocean",
    "ocean-wave": "ocean",
  };

  const mappedLayout = layoutAliases[layout] || layout;

  if (
    [
      "glow",
      "starborder",
      "sunset",
      "aurora",
      "neon",
      "galaxy",
      "flame",
      "ocean",
    ].includes(mappedLayout)
  ) {
    return mappedLayout;
  }

  return "glow";
}

function getPremiumDirectoryStyle(
  layout: string,
  glowColor: string
): CSSProperties {
  const base: CSSProperties = {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
  };

  if (layout === "flame") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 20% 0%, rgba(255, 200, 80, 0.22), transparent 34%), radial-gradient(circle at 100% 20%, rgba(255, 60, 120, 0.18), transparent 34%), linear-gradient(135deg, #1f0c07 0%, #19081e 45%, #0d1024 100%)",
      borderColor: "#ff7a18",
      boxShadow:
        "0 0 28px rgba(255,122,24,0.48), 0 0 70px rgba(255,60,120,0.22)",
    };
  }

  if (layout === "ocean") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 0% 15%, rgba(85, 210, 255, 0.24), transparent 36%), radial-gradient(circle at 100% 0%, rgba(65, 255, 220, 0.18), transparent 34%), linear-gradient(135deg, #061728 0%, #08233a 52%, #101426 100%)",
      borderColor: "#47b4ff",
      boxShadow:
        "0 0 28px rgba(71,180,255,0.48), 0 0 70px rgba(65,255,220,0.20)",
    };
  }

  if (layout === "galaxy") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.42) 0 1px, transparent 2px), radial-gradient(circle at 72% 24%, rgba(255,255,255,0.28) 0 1px, transparent 2px), radial-gradient(circle at 80% 0%, rgba(132,92,255,0.32), transparent 38%), linear-gradient(135deg, #080718 0%, #27104a 52%, #080d24 100%)",
      borderColor: "#a78bfa",
      boxShadow:
        "0 0 28px rgba(167,139,250,0.52), 0 0 70px rgba(116,223,255,0.18)",
    };
  }

  if (layout === "neon") {
    return {
      ...base,
      background:
        "linear-gradient(90deg, rgba(116,223,255,0.09) 1px, transparent 1px), linear-gradient(rgba(244,76,255,0.09) 1px, transparent 1px), radial-gradient(circle at 80% 0%, rgba(116,223,255,0.28), transparent 34%), linear-gradient(135deg, #060b1f 0%, #19072a 100%)",
      backgroundSize: "24px 24px, 24px 24px, auto, auto",
      borderColor: "#74dfff",
      boxShadow:
        "0 0 28px rgba(116,223,255,0.52), 0 0 70px rgba(244,76,255,0.22)",
    };
  }

  if (layout === "aurora") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 0% 20%, rgba(40,255,160,0.28), transparent 38%), radial-gradient(circle at 100% 15%, rgba(116,223,255,0.24), transparent 34%), radial-gradient(circle at 55% 0%, rgba(195,78,255,0.16), transparent 40%), linear-gradient(135deg, #071a18 0%, #101426 100%)",
      borderColor: "#2cff9d",
      boxShadow:
        "0 0 28px rgba(44,255,157,0.48), 0 0 70px rgba(116,223,255,0.18)",
    };
  }

  if (layout === "sunset") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 0% 0%, rgba(255,178,87,0.26), transparent 36%), radial-gradient(circle at 100% 20%, rgba(255,72,160,0.22), transparent 36%), linear-gradient(135deg, #231020 0%, #2a1328 52%, #101426 100%)",
      borderColor: "#ff7ab6",
      boxShadow:
        "0 0 28px rgba(255,122,182,0.46), 0 0 70px rgba(255,178,87,0.18)",
    };
  }

  if (layout === "starborder") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.42) 0 1px, transparent 2px), radial-gradient(circle at 70% 16%, rgba(255,255,255,0.32) 0 1px, transparent 2px), radial-gradient(circle at 85% 60%, rgba(255,255,255,0.22) 0 1px, transparent 2px), linear-gradient(135deg, #111125 0%, #1b1436 52%, #101426 100%)",
      borderColor: "#f8e7a2",
      boxShadow:
        "0 0 0 2px rgba(248,231,162,0.34), 0 0 28px rgba(248,231,162,0.32), 0 0 70px rgba(139,92,246,0.18)",
    };
  }

  return {
    ...base,
    borderColor: glowColor,
    boxShadow: `0 0 42px ${glowColor}88, 0 0 90px ${glowColor}44`,
  };
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
      <style>{`
        @keyframes fireCoreMove {
          0% {
            transform: translateX(-8%) translateY(12px) scaleY(0.88);
            opacity: 0.55;
            filter: blur(8px);
          }

          50% {
            transform: translateX(5%) translateY(-6px) scaleY(1.12);
            opacity: 0.98;
            filter: blur(5px);
          }

          100% {
            transform: translateX(10%) translateY(8px) scaleY(0.92);
            opacity: 0.62;
            filter: blur(8px);
          }
        }

        @keyframes fireSparkMove {
          0% {
            transform: translateY(28px) scale(0.8);
            opacity: 0;
          }

          40% {
            opacity: 0.9;
          }

          100% {
            transform: translateY(-58px) scale(1.15);
            opacity: 0;
          }
        }

        @keyframes neonPulseMove {
          0% {
            opacity: 0.25;
            transform: translateY(-24%);
          }

          50% {
            opacity: 0.92;
            transform: translateY(22%);
          }

          100% {
            opacity: 0.25;
            transform: translateY(-24%);
          }
        }

        @keyframes galaxyStarsMove {
          0% {
            transform: translateY(0);
            opacity: 0.45;
          }

          50% {
            opacity: 0.95;
          }

          100% {
            transform: translateY(-18px);
            opacity: 0.45;
          }
        }

        @keyframes auroraMove {
          0% {
            transform: translateX(-18%) rotate(-8deg);
            opacity: 0.45;
          }

          50% {
            transform: translateX(12%) rotate(7deg);
            opacity: 0.9;
          }

          100% {
            transform: translateX(-18%) rotate(-8deg);
            opacity: 0.45;
          }
        }

        @keyframes oceanWaveMove {
          0% {
            transform: translateX(-12%) translateY(8px);
          }

          50% {
            transform: translateX(10%) translateY(-5px);
          }

          100% {
            transform: translateX(-12%) translateY(8px);
          }
        }

        @keyframes oceanWaveLineMove {
          0% {
            transform: translateX(-18%) translateY(0);
            opacity: 0.45;
          }

          50% {
            transform: translateX(12%) translateY(-8px);
            opacity: 0.85;
          }

          100% {
            transform: translateX(-18%) translateY(0);
            opacity: 0.45;
          }
        }

        @keyframes starBorderPulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.12) inset,
              0 0 28px rgba(255,232,150,0.28),
              0 0 58px rgba(139,92,246,0.20);
          }

          50% {
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.24) inset,
              0 0 42px rgba(255,232,150,0.70),
              0 0 82px rgba(139,92,246,0.36);
          }
        }

        .server-directory-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .server-directory-card .server-directory-banner,
        .server-directory-card .server-directory-body {
          position: relative;
          z-index: 3;
        }

        .premium-layout-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
          border-radius: inherit;
        }

        .premium-layout-effect::before,
        .premium-layout-effect::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .premium-layout-flame .premium-layout-effect::before {
          left: -18%;
          right: -18%;
          bottom: -34px;
          height: 122px;
          background:
            radial-gradient(circle at 10% 100%, rgba(255, 210, 80, 0.95), transparent 28%),
            radial-gradient(circle at 28% 92%, rgba(255, 92, 28, 0.95), transparent 30%),
            radial-gradient(circle at 46% 100%, rgba(255, 230, 92, 0.85), transparent 26%),
            radial-gradient(circle at 66% 92%, rgba(255, 68, 170, 0.78), transparent 32%),
            radial-gradient(circle at 84% 100%, rgba(255, 118, 38, 0.92), transparent 30%);
          animation: fireCoreMove 2.1s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }

        .premium-layout-flame .premium-layout-effect::after {
          left: 0;
          right: 0;
          bottom: 0;
          height: 58%;
          background:
            radial-gradient(circle at 18% 85%, rgba(255, 220, 80, 0.70) 0 2px, transparent 4px),
            radial-gradient(circle at 42% 78%, rgba(255, 120, 30, 0.75) 0 2px, transparent 4px),
            radial-gradient(circle at 72% 82%, rgba(255, 72, 160, 0.65) 0 2px, transparent 4px),
            linear-gradient(180deg, transparent 0%, rgba(255, 89, 26, 0.08) 45%, rgba(255, 53, 110, 0.24) 100%);
          animation: fireSparkMove 2.8s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .premium-layout-ocean .premium-layout-effect::before {
          left: -35%;
          right: -35%;
          bottom: -38px;
          height: 130px;
          background:
            radial-gradient(ellipse at 18% 20%, rgba(120,230,255,0.70), transparent 34%),
            radial-gradient(ellipse at 42% 5%, rgba(65,255,220,0.50), transparent 30%),
            radial-gradient(ellipse at 70% 25%, rgba(71,180,255,0.58), transparent 34%);
          filter: blur(7px);
          animation: oceanWaveMove 2.8s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .premium-layout-ocean .premium-layout-effect::after {
          left: -30%;
          right: -30%;
          bottom: 8px;
          height: 70px;
          background:
            repeating-radial-gradient(
              ellipse at 50% 100%,
              rgba(125, 225, 255, 0.34) 0px,
              rgba(125, 225, 255, 0.34) 3px,
              transparent 7px,
              transparent 18px
            );
          opacity: 0.75;
          filter: blur(2px);
          animation: oceanWaveLineMove 3.6s ease-in-out infinite reverse;
          mix-blend-mode: screen;
        }

        .premium-layout-neon .premium-layout-effect::before {
          inset: -40%;
          background:
            linear-gradient(90deg, transparent 0%, rgba(116,223,255,0.0) 42%, rgba(116,223,255,0.45) 50%, rgba(244,76,255,0.0) 58%, transparent 100%);
          animation: neonPulseMove 2.8s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .premium-layout-neon .premium-layout-effect::after {
          inset: 0;
          background:
            linear-gradient(90deg, rgba(116,223,255,0.12) 1px, transparent 1px),
            linear-gradient(rgba(244,76,255,0.10) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0.55;
        }

        .premium-layout-galaxy .premium-layout-effect::before {
          inset: 0;
          background:
            radial-gradient(circle at 12% 18%, rgba(255,255,255,0.9) 0 1px, transparent 2px),
            radial-gradient(circle at 24% 62%, rgba(255,255,255,0.7) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 30%, rgba(255,255,255,0.8) 0 1px, transparent 2px),
            radial-gradient(circle at 74% 22%, rgba(255,255,255,0.9) 0 1px, transparent 2px),
            radial-gradient(circle at 88% 70%, rgba(255,255,255,0.7) 0 1px, transparent 2px);
          animation: galaxyStarsMove 3.2s ease-in-out infinite alternate;
        }

        .premium-layout-aurora .premium-layout-effect::before {
          left: -40%;
          top: 18%;
          width: 180%;
          height: 44%;
          background:
            linear-gradient(90deg, transparent 0%, rgba(44,255,157,0.16) 18%, rgba(116,223,255,0.34) 45%, rgba(195,78,255,0.22) 72%, transparent 100%);
          filter: blur(12px);
          animation: auroraMove 4.2s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .premium-layout-sunset .premium-layout-effect::before {
          left: -20%;
          right: -20%;
          bottom: -46px;
          height: 125px;
          background:
            radial-gradient(circle at 50% 100%, rgba(255,178,87,0.75), transparent 42%),
            radial-gradient(circle at 70% 90%, rgba(255,72,160,0.45), transparent 36%);
          filter: blur(7px);
          animation: fireCoreMove 3.4s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }

        .premium-layout-starborder {
          animation: starBorderPulse 2.4s ease-in-out infinite;
        }

        .premium-layout-starborder .premium-layout-effect::before {
          inset: 0;
          background:
            radial-gradient(circle at 8% 10%, rgba(255,255,255,0.95) 0 1px, transparent 2px),
            radial-gradient(circle at 92% 14%, rgba(255,255,255,0.85) 0 1px, transparent 2px),
            radial-gradient(circle at 18% 90%, rgba(255,255,255,0.75) 0 1px, transparent 2px),
            radial-gradient(circle at 82% 82%, rgba(255,255,255,0.90) 0 1px, transparent 2px);
          animation: galaxyStarsMove 2.6s ease-in-out infinite alternate;
        }

        .premium-layout-glow .premium-layout-effect::before {
          inset: -20%;
          background:
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 35%),
            radial-gradient(circle at 100% 30%, rgba(116,223,255,0.16), transparent 35%);
          animation: auroraMove 4.6s ease-in-out infinite;
          mix-blend-mode: screen;
        }
      `}</style>

      <section className="servers-directory-header">
        <div>
          <span className="page-badge">AskoCafe Directory</span>
          <h1>AskoCafe Discord Server</h1>
          <p>Die zuletzt gebumpten Server stehen automatisch ganz oben.</p>
        </div>

        <Link href="/submit" className="btn">
          Server eintragen
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
              #{tag}
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

            const rawPremiumColor = server.premium_glow_color || "#8b5cf6";
            const premiumLayout = normalizePremiumLayout(
              server.premium_layout || "glow"
            );

            const layoutUsesCustomEffect = premiumLayout !== "glow";
            const premiumColor = layoutUsesCustomEffect
              ? "#8b5cf6"
              : rawPremiumColor;

            const descriptionToggleId = `description-${server.id}`;

            const serverLogo =
              server.discord_server_icon_url &&
              server.discord_server_icon_url.startsWith("http")
                ? server.discord_server_icon_url
                : server.logo_url && server.logo_url.startsWith("http")
                ? server.logo_url
                : null;

            return (
              <article
                key={server.id}
                className={`server-directory-card ${
                  isPremiumOrPartner
                    ? `server-directory-card-premium premium-layout-${premiumLayout}`
                    : ""
                }`}
                style={
                  isPremiumOrPartner
                    ? ({
                        "--premium-glow": premiumColor,
                        ...getPremiumDirectoryStyle(
                          premiumLayout,
                          premiumColor
                        ),
                      } as any)
                    : undefined
                }
              >
                {isPremiumOrPartner && premiumLayout === "glow" && (
                  <div className="premium-glow-ring" aria-hidden="true" />
                )}

                {isPremiumOrPartner && (
                  <div className="premium-layout-effect" aria-hidden="true" />
                )}

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
                    <div
                      className="server-directory-banner-fallback"
                      style={
                        isPremiumOrPartner
                          ? {
                              background:
                                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                            }
                          : undefined
                      }
                    />
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
                      {serverLogo ? (
                        <img src={serverLogo} alt={server.server_name} />
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
                        {server.category} • {server.language}
                      </p>
                    </div>
                  </div>

                  <div className="server-directory-status-row">
                    <span className="server-online-dot" />
                    <span>
                      Zuletzt gebumpt: {formatLastBump(server.last_bump)}
                    </span>
                  </div>

                  <div className="server-directory-badges">
                    {server.partner_status && (
                      <span className="badge partner">Partner</span>
                    )}

                    {server.nsfw && <span className="badge">NSFW</span>}

                    {Array.isArray(server.tags) &&
                      server.tags.slice(0, 5).map((tag: string) => (
                        <span className="badge" key={tag}>
                          #{tag}
                        </span>
                      ))}
                  </div>

                  <div className="description-expand-box">
                    <input
                      id={descriptionToggleId}
                      type="checkbox"
                      className="description-toggle-input"
                    />

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

                    <label
                      htmlFor={descriptionToggleId}
                      className="description-toggle-button"
                    >
                      <span className="show-more">Mehr anzeigen</span>
                      <span className="show-less">Weniger anzeigen</span>
                    </label>
                  </div>

                  <div className="server-directory-footer">
                    <Link
                      className="btn secondary"
                      href={`/servers/${server.id}`}
                    >
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
