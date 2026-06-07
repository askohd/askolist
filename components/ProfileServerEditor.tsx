"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const MAX_DESCRIPTION_WORDS = 1500;

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

  return `vor ${days} Tag${days === 1 ? "" : "en"}`;
}

type PremiumLayout = "glow" | "sparkles" | "sunset" | "aurora" | "neon";

export default function ProfileServerEditor({ server }: { server: any }) {
  const isPremiumOrPartner = Boolean(
    server.premium_status || server.partner_status
  );

  const [serverName, setServerName] = useState(server.server_name ?? "");

  const [bannerPreview, setBannerPreview] = useState<string | null>(
    server.banner_url && server.banner_url.startsWith("http")
      ? server.banner_url
      : null
  );

  const [logoPreview, setLogoPreview] = useState<string | null>(
    server.discord_server_icon_url?.startsWith?.("http")
      ? server.discord_server_icon_url
      : server.logo_url?.startsWith?.("http")
      ? server.logo_url
      : null
  );

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

  const cardStyle = isPremiumOrPartner
    ? ({
        "--premium-glow": glowColor,
        boxShadow: `0 0 42px ${glowColor}aa, 0 0 95px ${glowColor}55`,
        borderColor: glowColor,
      } as any)
    : undefined;

  const tags = Array.isArray(server.tags) ? server.tags.slice(0, 5) : [];

  return (
    <form
      action="/api/profile/update-server"
      method="POST"
      encType="multipart/form-data"
      className="profile-edit-card"
    >
      <h3>Server bearbeiten</h3>

      <section className="server-list-live-preview-wrap">
        <div>
          <span className="page-badge">Live Vorschau</span>
          <h3>So sieht dein Server später in der Serverliste aus</h3>
          <p>Änderungen an Banner, Farben, Layout und Beschreibung siehst du hier direkt.</p>
        </div>

        <article
          className={`server-directory-card server-list-live-preview ${
            isPremiumOrPartner ? "server-directory-card-premium" : ""
          } ${isPremiumOrPartner ? `premium-layout-${premiumLayout}` : ""}`}
          style={cardStyle}
        >
          {isPremiumOrPartner && (
            <div className="premium-glow-ring" aria-hidden="true" />
          )}

          {isPremiumOrPartner && premiumLayout === "sparkles" && (
            <div className="premium-sparkles premium-sparkles-visible">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>
          )}

          {isPremiumOrPartner && premiumLayout === "neon" && (
            <div className="premium-neon-lines">
              <span />
              <span />
              <span />
            </div>
          )}

          <div className="server-directory-banner">
            {bannerPreview ? (
              <img src={bannerPreview} alt="Banner preview" style={bannerStyle} />
            ) : (
              <div className="server-directory-banner-fallback" />
            )}

            <div className="server-directory-rating">⭐ No ratings</div>
          </div>

          <div className="server-directory-body">
            <div className="server-directory-top">
              <div className="server-directory-logo">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" />
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
                  {server.category} • {server.language}
                </p>
              </div>
            </div>

            <div className="server-directory-status-row">
              <span className="server-online-dot" />
              <span>Zuletzt gebumpt: {formatLastBump(server.last_bump)}</span>
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
      </section>

      <div className="profile-upload-grid">
        <label className="field">
          <span>Server-Logo ändern</span>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                setLogoPreview(URL.createObjectURL(file));
              }
            }}
          />

          <small className="form-note">
            Später soll hier automatisch das Discord-Server-Icon genutzt werden,
            wenn der Bot den Server erkannt hat.
          </small>
        </label>

        <label className="field">
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

      <div className="banner-control-card banner-control-top">
        <h3>Banner positionieren</h3>
        <p>Stelle dein Banner direkt oben in der Vorschau ein.</p>

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

      <section className="premium-feature-card">
        <div className="premium-feature-header">
          <div>
            <span className="page-badge">Only Premium & Partner</span>
            <h3>Premium & Partner Features</h3>
            <p>
              Premium- und Partner-Server können Farben, Glow und spezielle
              Layouts anpassen.
            </p>
          </div>
        </div>

        {isPremiumOrPartner ? (
          <div className="premium-feature-grid">
            <label className="field full">
              <span>Layout auswählen</span>
              <select
                name="premium_layout"
                value={premiumLayout}
                onChange={(event) =>
                  setPremiumLayout(event.target.value as PremiumLayout)
                }
              >
                <option value="glow">Glow Classic</option>
                <option value="sparkles">Sparkle Stars</option>
                <option value="sunset">Sunset Dark</option>
                <option value="aurora">Aurora Flow</option>
                <option value="neon">Neon Pulse</option>
              </select>
            </label>

            <label className="premium-color-field">
              <span>Servername-Farbe</span>
              <input
                type="color"
                name="server_name_color"
                value={serverNameColor}
                onChange={(event) => setServerNameColor(event.target.value)}
              />
            </label>

            <label className="premium-color-field">
              <span>Textfarbe</span>
              <input
                type="color"
                name="server_text_color"
                value={serverTextColor}
                onChange={(event) => setServerTextColor(event.target.value)}
              />
            </label>

            <label className="premium-color-field">
              <span>Glow-Farbe</span>
              <input
                type="color"
                name="premium_glow_color"
                value={glowColor}
                onChange={(event) => setGlowColor(event.target.value)}
              />
            </label>
          </div>
        ) : (
          <div className="premium-locked-box">
            <h4>Bitte werde Premium Mitglied</h4>
            <p>
              Diese Design-Funktionen sind nur für Premium- und Partner-Server
              verfügbar.
            </p>

            <Link href="/shop" className="btn">
              Zum Shop
            </Link>
          </div>
        )}
      </section>

      <button className="btn" type="submit">
        Änderungen speichern
      </button>
    </form>
  );
}
