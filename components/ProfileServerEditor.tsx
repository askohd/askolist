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

type PremiumLayout = "glow" | "sparkles" | "sunset" | "aurora" | "neon";

export default function ProfileServerEditor({ server }: { server: any }) {
  const isPremiumOrPartner = Boolean(
    server.premium_status || server.partner_status
  );

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

  const previewCardStyle = useMemo(() => {
    if (!isPremiumOrPartner) {
      return {};
    }

    switch (premiumLayout) {
      case "sparkles":
        return {
          borderColor: glowColor,
          boxShadow: `0 0 18px ${glowColor}99, 0 0 45px ${glowColor}55`,
          background:
            "linear-gradient(180deg, rgba(30,24,56,0.98) 0%, rgba(15,12,35,0.98) 100%)",
        };

      case "sunset":
        return {
          borderColor: "#ff8a3d",
          boxShadow: "0 0 22px rgba(255,138,61,0.85), 0 0 60px rgba(0,0,0,0.8)",
          background:
            "linear-gradient(180deg, rgba(255,132,56,0.22) 0%, rgba(255,94,0,0.14) 28%, rgba(20,20,25,0.96) 62%, rgba(0,0,0,0.98) 100%)",
        };

      case "aurora":
        return {
          borderColor: "#54e0ff",
          boxShadow:
            "0 0 24px rgba(84,224,255,0.8), 0 0 54px rgba(177,84,255,0.45)",
          background:
            "linear-gradient(135deg, rgba(113,48,255,0.26), rgba(84,224,255,0.2), rgba(255,87,214,0.16), rgba(17,13,40,0.98))",
        };

      case "neon":
        return {
          borderColor: "#ff00a8",
          boxShadow:
            "0 0 18px rgba(255,0,168,0.9), 0 0 40px rgba(0,229,255,0.5), inset 0 0 18px rgba(255,255,255,0.05)",
          background:
            "linear-gradient(180deg, rgba(20,10,35,0.98) 0%, rgba(11,8,24,0.98) 100%)",
        };

      case "glow":
      default:
        return {
          borderColor: glowColor,
          boxShadow: `0 0 22px ${glowColor}99, 0 0 55px ${glowColor}55`,
          background:
            "linear-gradient(180deg, rgba(34,22,68,0.96) 0%, rgba(17,12,38,0.98) 100%)",
        };
    }
  }, [isPremiumOrPartner, premiumLayout, glowColor]);

  const previewTopOverlayStyle = useMemo(() => {
    if (!isPremiumOrPartner) {
      return {};
    }

    switch (premiumLayout) {
      case "sunset":
        return {
          background:
            "linear-gradient(180deg, rgba(255,166,77,0.45) 0%, rgba(255,101,0,0.28) 40%, rgba(0,0,0,0) 100%)",
        };
      case "aurora":
        return {
          background:
            "linear-gradient(120deg, rgba(140,70,255,0.4), rgba(70,224,255,0.3), rgba(255,75,170,0.2), rgba(0,0,0,0))",
        };
      case "neon":
        return {
          background:
            "linear-gradient(180deg, rgba(255,0,168,0.24), rgba(0,229,255,0.18), rgba(0,0,0,0))",
        };
      case "sparkles":
      case "glow":
      default:
        return {
          background: `linear-gradient(180deg, ${glowColor}2d 0%, rgba(0,0,0,0) 100%)`,
        };
    }
  }, [isPremiumOrPartner, premiumLayout, glowColor]);

  return (
    <form
      action="/api/profile/update-server"
      method="POST"
      encType="multipart/form-data"
      className="profile-edit-card"
    >
      <h3>Server bearbeiten</h3>

      <div className="live-preview-card">
        <div
          className={`live-preview-card-shell premium-layout-${premiumLayout}`}
          style={previewCardStyle}
        >
          <div className="live-preview-banner">
            {bannerPreview ? (
              <img src={bannerPreview} alt="Banner preview" style={bannerStyle} />
            ) : (
              <div className="live-preview-banner-fallback" />
            )}

            <div
              className="live-preview-banner-overlay"
              style={previewTopOverlayStyle}
            />

            {isPremiumOrPartner && premiumLayout === "sparkles" && (
              <div className="premium-sparkles">
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
              </div>
            )}
          </div>

          <div className="live-preview-body">
            <div className="live-preview-logo">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" />
              ) : (
                <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
              )}
            </div>

            <div>
              <h3 style={{ color: serverNameColor }}>
                {server.server_name || "Servername"}
              </h3>
              <p style={{ color: serverTextColor }}>
                {server.category} • {server.language}
              </p>
            </div>
          </div>
        </div>
      </div>

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
            Wenn ein Discord-Server-Icon vorhanden ist, sollte dieses bevorzugt
            verwendet werden.
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
          defaultValue={server.server_name ?? ""}
          placeholder="Servername"
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
