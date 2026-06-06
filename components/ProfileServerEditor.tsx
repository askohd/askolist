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
    server.logo_url && server.logo_url.startsWith("http")
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
    server.premium_glow_color ?? "#8b5cf6"
  );

  const [serverNameColor, setServerNameColor] = useState(
    server.server_name_color ?? "#ffffff"
  );

  const [serverTextColor, setServerTextColor] = useState(
    server.server_text_color ?? "#ddd9ef"
  );

  const bannerStyle = useMemo(
    () => ({
      objectPosition: `${bannerX}% ${bannerY}%`,
      transform: `scale(${bannerZoom})`,
      transformOrigin: `${bannerX}% ${bannerY}%`,
    }),
    [bannerX, bannerY, bannerZoom]
  );

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
          className="live-preview-banner"
          style={{
            borderColor: isPremiumOrPartner ? glowColor : undefined,
            boxShadow: isPremiumOrPartner
              ? `0 0 30px ${glowColor}66`
              : undefined,
          }}
        >
          {bannerPreview ? (
            <img src={bannerPreview} alt="Banner preview" style={bannerStyle} />
          ) : (
            <div className="live-preview-banner-fallback" />
          )}

          {isPremiumOrPartner && (
            <span className="server-premium-badge">
              {server.partner_status ? "Partner" : "Premium"}
            </span>
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
            <h3 style={{ color: serverNameColor }}>{server.server_name}</h3>
            <p style={{ color: serverTextColor }}>
              {server.category} • {server.country} • {server.language}
            </p>
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
              Premium- und Partner-Server können Farben und Leuchteffekte
              anpassen.
            </p>
          </div>
        </div>

        {isPremiumOrPartner ? (
          <div className="premium-feature-grid">
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
