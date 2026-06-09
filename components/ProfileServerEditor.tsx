"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties, type MouseEvent } from "react";

const MAX_DESCRIPTION_WORDS = 1500;

const SERVER_LANGUAGES = ["Deutsch", "English", "Français", "Italiano", "Polski"];

const PREMIUM_LAYOUTS = [
  { value: "glow", label: "Glow Classic" },
  { value: "starborder", label: "Sternen Rand" },
  { value: "sunset", label: "Sunset Dark" },
  { value: "aurora", label: "Aurora Flow" },
  { value: "neon", label: "Neon Pulse" },
  { value: "galaxy", label: "Galaxy Dust" },
  { value: "flame", label: "Fire Core" },
  { value: "ocean", label: "Ocean Wave" },
] as const;

type PremiumLayout = (typeof PREMIUM_LAYOUTS)[number]["value"];

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function limitWords(text: string, maxWords: number) {
  return text.trim().split(/\s+/).filter(Boolean).slice(0, maxWords).join(" ");
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

function getPremiumPreviewStyle(
  layout: PremiumLayout,
  glowColor: string
): CSSProperties {
  const base: CSSProperties = {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    borderColor: glowColor,
    boxShadow: `0 0 42px ${glowColor}aa, 0 0 95px ${glowColor}55`,
  };

  if (layout === "flame") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 20% 0%, rgba(255,186,73,0.30), transparent 36%), radial-gradient(circle at 100% 25%, rgba(255,68,190,0.24), transparent 34%), linear-gradient(135deg, #241108 0%, #1a0b23 48%, #101426 100%)",
      borderColor: "#ff7a18",
      boxShadow:
        "0 0 42px rgba(255,122,24,0.74), 0 0 95px rgba(255,68,190,0.34)",
    };
  }

  if (layout === "galaxy") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.28) 0 1px, transparent 2px), radial-gradient(circle at 72% 24%, rgba(255,255,255,0.22) 0 1px, transparent 2px), radial-gradient(circle at 80% 0%, rgba(132,92,255,0.38), transparent 38%), linear-gradient(135deg, #080718 0%, #27104a 52%, #080d24 100%)",
      borderColor: "#a78bfa",
      boxShadow:
        "0 0 42px rgba(167,139,250,0.78), 0 0 95px rgba(116,223,255,0.24)",
    };
  }

  if (layout === "neon") {
    return {
      ...base,
      background:
        "linear-gradient(90deg, rgba(116,223,255,0.10) 1px, transparent 1px), linear-gradient(rgba(244,76,255,0.10) 1px, transparent 1px), radial-gradient(circle at 80% 0%, rgba(116,223,255,0.34), transparent 34%), linear-gradient(135deg, #060b1f 0%, #19072a 100%)",
      backgroundSize: "24px 24px, 24px 24px, auto, auto",
      borderColor: "#74dfff",
      boxShadow:
        "0 0 42px rgba(116,223,255,0.74), 0 0 95px rgba(244,76,255,0.28)",
    };
  }

  if (layout === "aurora") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 0% 20%, rgba(40,255,160,0.34), transparent 38%), radial-gradient(circle at 100% 15%, rgba(116,223,255,0.30), transparent 34%), radial-gradient(circle at 55% 0%, rgba(195,78,255,0.20), transparent 40%), linear-gradient(135deg, #071a18 0%, #101426 100%)",
      borderColor: "#2cff9d",
      boxShadow:
        "0 0 42px rgba(44,255,157,0.70), 0 0 95px rgba(116,223,255,0.26)",
    };
  }

  if (layout === "ocean") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 0% 20%, rgba(71,180,255,0.32), transparent 38%), radial-gradient(circle at 100% 0%, rgba(65,255,220,0.22), transparent 34%), linear-gradient(135deg, #061728 0%, #081d34 52%, #101426 100%)",
      borderColor: "#47b4ff",
      boxShadow:
        "0 0 42px rgba(71,180,255,0.72), 0 0 95px rgba(65,255,220,0.22)",
    };
  }

  if (layout === "sunset") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 0% 0%, rgba(255,178,87,0.32), transparent 36%), radial-gradient(circle at 100% 20%, rgba(255,72,160,0.28), transparent 36%), linear-gradient(135deg, #231020 0%, #2a1328 52%, #101426 100%)",
      borderColor: "#ff7ab6",
      boxShadow:
        "0 0 42px rgba(255,122,182,0.70), 0 0 95px rgba(255,178,87,0.24)",
    };
  }

  if (layout === "starborder") {
    return {
      ...base,
      background:
        "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.50) 0 1px, transparent 2px), radial-gradient(circle at 70% 16%, rgba(255,255,255,0.36) 0 1px, transparent 2px), radial-gradient(circle at 85% 60%, rgba(255,255,255,0.26) 0 1px, transparent 2px), linear-gradient(135deg, #111125 0%, #1b1436 52%, #101426 100%)",
      borderColor: "#f8e7a2",
      boxShadow:
        "0 0 0 2px rgba(248,231,162,0.46), 0 0 42px rgba(248,231,162,0.44), 0 0 95px rgba(139,92,246,0.26)",
    };
  }

  return {
    ...base,
    background:
      "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.30), transparent 42%), radial-gradient(circle at 100% 20%, rgba(116,223,255,0.16), transparent 36%), linear-gradient(135deg, #151027 0%, #0d1226 100%)",
  };
}

export default function ProfileServerEditor({ server }: { server: any }) {
  const isPremiumOrPartner = Boolean(
    server.premium_status || server.partner_status
  );

  const [lockedNotice, setLockedNotice] = useState(false);
  const [serverName, setServerName] = useState(server.server_name ?? "");
  const [language, setLanguage] = useState(server.language ?? "Deutsch");

  const [bannerPreview, setBannerPreview] = useState<string | null>(
    server.banner_url && server.banner_url.startsWith("http")
      ? server.banner_url
      : null
  );

  const logoPreview = server.discord_server_icon_url?.startsWith?.("http")
    ? server.discord_server_icon_url
    : null;

  const [description, setDescription] = useState(
    limitWords(String(server.description ?? ""), MAX_DESCRIPTION_WORDS)
  );

  const [bannerX, setBannerX] = useState(Number(server.banner_position_x ?? 50));
  const [bannerY, setBannerY] = useState(Number(server.banner_position_y ?? 50));
  const [bannerZoom, setBannerZoom] = useState(Number(server.banner_zoom ?? 1));

  const [glowColor, setGlowColor] = useState(
    server.premium_glow_color ?? "#ff4fd8"
  );

  const [serverNameColor, setServerNameColor] = useState(
    server.server_name_color ?? "#ffffff"
  );

  const [serverTextColor, setServerTextColor] = useState(
    server.server_text_color ?? "#ddd9ef"
  );

  const [premiumLayout, setPremiumLayout] = useState<PremiumLayout>(
    (server.premium_layout as PremiumLayout) ?? "glow"
  );

  const bannerStyle = useMemo(
    () => ({
      objectPosition: `${bannerX}% ${bannerY}%`,
      transform: `scale(${bannerZoom})`,
      transformOrigin: `${bannerX}% ${bannerY}%`,
    }),
    [bannerX, bannerY, bannerZoom]
  );

  const tags = Array.isArray(server.tags) ? server.tags.slice(0, 5) : [];

  const cardStyle = isPremiumOrPartner
    ? ({
        "--premium-glow": glowColor,
        ...getPremiumPreviewStyle(premiumLayout, glowColor),
      } as any)
    : undefined;

  function showLockedNotice() {
    if (!isPremiumOrPartner) {
      setLockedNotice(true);
    }
  }

  function confirmDelete(event: MouseEvent<HTMLButtonElement>) {
    const confirmed = window.confirm(
      "Willst du diesen Server wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form
      action="/api/profile/update-server"
      method="POST"
      encType="multipart/form-data"
      className="profile-edit-card"
    >
      <input type="hidden" name="server_id" value={server.id} />

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

        .server-list-live-preview {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .server-list-live-preview .server-directory-banner,
        .server-list-live-preview .server-directory-body {
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

        .premium-layout-ocean .premium-layout-effect::before {
          left: -22%;
          right: -22%;
          bottom: -32px;
          height: 105px;
          background:
            radial-gradient(circle at 18% 0%, rgba(92,210,255,0.55), transparent 34%),
            radial-gradient(circle at 42% 0%, rgba(65,255,220,0.42), transparent 32%),
            radial-gradient(circle at 70% 0%, rgba(71,180,255,0.50), transparent 34%);
          filter: blur(6px);
          animation: oceanWaveMove 3s ease-in-out infinite;
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

      <h3>Server bearbeiten</h3>

      <div className="profile-editor-two-column">
        <section className="profile-editor-controls">
          <div className="profile-upload-grid">
            <label className="field full">
              <span>Server-Banner ändern</span>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    setBannerPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          <small className="form-note">
            Das Server-Logo wird automatisch vom Discord-Serverprofilbild übernommen.
          </small>

          <div className="banner-control-card banner-control-top">
            <h3>Banner positionieren</h3>
            <p>Stelle dein Banner direkt rechts in der Vorschau ein.</p>

            <label className="field">
              <span>Links / Rechts: {bannerX}%</span>
              <input
                type="range"
                name="banner_position_x"
                min="0"
                max="100"
                value={bannerX}
                onChange={(event) => setBannerX(Number(event.target.value))}
              />
            </label>

            <label className="field">
              <span>Hoch / Runter: {bannerY}%</span>
              <input
                type="range"
                name="banner_position_y"
                min="0"
                max="100"
                value={bannerY}
                onChange={(event) => setBannerY(Number(event.target.value))}
              />
            </label>

            <label className="field">
              <span>Zoom: {bannerZoom}x</span>
              <input
                type="range"
                name="banner_zoom"
                min="1"
                max="2.5"
                step="0.1"
                value={bannerZoom}
                onChange={(event) => setBannerZoom(Number(event.target.value))}
              />
            </label>
          </div>

          <label className="field">
            <span>Servername</span>
            <input
              className="input"
              name="server_name"
              value={serverName}
              placeholder="Servername"
              onChange={(event) => setServerName(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Sprache</span>
            <select
              name="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {SERVER_LANGUAGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="field full">
            <span>Beschreibung</span>
            <textarea
              name="description"
              value={description}
              placeholder="Beschreibung deines Servers"
              onChange={(event) => {
                const value = event.target.value;

                if (countWords(value) <= MAX_DESCRIPTION_WORDS) {
                  setDescription(value);
                } else {
                  setDescription(limitWords(value, MAX_DESCRIPTION_WORDS));
                }
              }}
            />

            <small className="char-counter">
              {countWords(description)}/{MAX_DESCRIPTION_WORDS} Wörter
            </small>
          </label>

          <div className="premium-inline-tools">
            <div className="premium-inline-head">
              <button
                type="button"
                className="premium-diamond"
                onClick={showLockedNotice}
                aria-label="Premium Funktion"
              >
                ◆
              </button>

              <div>
                <h3>Design Features</h3>
                <p>Farben, Glow und Layouts für Premium & Partner.</p>
              </div>
            </div>

            {lockedNotice && !isPremiumOrPartner && (
              <div className="premium-locked-message">
                <strong>Nur für Premium & Partner verfügbar</strong>
                <p>
                  Werde Premium Mitglied, um Layouts, Textfarben und Glow zu nutzen.
                </p>
                <Link href="/shop" className="btn">
                  Zum Shop
                </Link>
              </div>
            )}

            <label className="field full premium-setting-line">
              <span>Layout auswählen</span>

              <select
                name="premium_layout"
                value={premiumLayout}
                disabled={!isPremiumOrPartner}
                onChange={(event) =>
                  setPremiumLayout(event.target.value as PremiumLayout)
                }
              >
                {PREMIUM_LAYOUTS.map((layout) => (
                  <option key={layout.value} value={layout.value}>
                    {layout.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="premium-color-grid-inline">
              <label className="premium-color-field">
                <span>Servername-Farbe</span>
                <input
                  type="color"
                  name="server_name_color"
                  value={serverNameColor}
                  disabled={!isPremiumOrPartner}
                  onChange={(event) => setServerNameColor(event.target.value)}
                />
              </label>

              <label className="premium-color-field">
                <span>Textfarbe</span>
                <input
                  type="color"
                  name="server_text_color"
                  value={serverTextColor}
                  disabled={!isPremiumOrPartner}
                  onChange={(event) => setServerTextColor(event.target.value)}
                />
              </label>

              <label className="premium-color-field">
                <span>Glow-Farbe</span>
                <input
                  type="color"
                  name="premium_glow_color"
                  value={glowColor}
                  disabled={!isPremiumOrPartner}
                  onChange={(event) => setGlowColor(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="profile-editor-actions">
            <button className="btn profile-save-button" type="submit">
              Änderungen speichern
            </button>

            <button
              className="btn danger"
              type="submit"
              formAction="/api/profile/delete-server"
              formMethod="POST"
              onClick={confirmDelete}
            >
              Server löschen
            </button>
          </div>
        </section>

        <aside className="profile-editor-preview">
          <div className="preview-sticky-box">
            <span className="page-badge">Live Vorschau</span>
            <h3>Serverlisten-Ansicht</h3>
            <p>Genau so sieht deine Karte später auf der Serverliste aus.</p>

            <article
              className={
                "server-directory-card server-list-live-preview " +
                (isPremiumOrPartner
                  ? "server-directory-card-premium premium-layout-" +
                    premiumLayout
                  : "")
              }
              style={cardStyle}
            >
              {isPremiumOrPartner && (
                <div className="premium-glow-ring" aria-hidden="true" />
              )}

              {isPremiumOrPartner && (
                <div className="premium-layout-effect" aria-hidden="true" />
              )}

              <div className="server-directory-banner">
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    style={bannerStyle}
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
                  ⭐ No ratings
                </div>
              </div>

              <div className="server-directory-body">
                <div className="server-directory-top">
                  <div className="server-directory-logo">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Discord server logo" />
                    ) : (
                      <span>{serverName?.slice(0, 1) || "S"}</span>
                    )}
                  </div>

                  <div className="server-directory-title">
                    <h3
                      style={{
                        color: isPremiumOrPartner ? serverNameColor : undefined,
                      }}
                    >
                      {serverName || "Servername"}
                    </h3>

                    <p
                      style={{
                        color: isPremiumOrPartner ? serverTextColor : undefined,
                      }}
                    >
                      {server.category} • {language}
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
                  {server.nsfw && <span className="badge">NSFW</span>}

                  {tags.map((tag: string) => (
                    <span className="badge" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <div
                  className="server-directory-description live-preview-description"
                  style={{
                    color: isPremiumOrPartner ? serverTextColor : undefined,
                  }}
                >
                  {description || "Beschreibung deines Servers..."}
                </div>

                <div className="description-toggle-button fake-preview-toggle">
                  Mehr anzeigen
                </div>

                <div className="server-directory-footer">
                  <button className="btn secondary" type="button">
                    Server ansehen
                  </button>

                  <button className="btn" type="button">
                    Beitreten
                  </button>
                </div>
              </div>
            </article>
          </div>
        </aside>
      </div>
    </form>
  );
}
