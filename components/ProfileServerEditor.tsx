"use client";

import { useMemo, useState } from "react";

export default function ProfileServerEditor({ server }: { server: any }) {
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

  const [bannerX, setBannerX] = useState(server.banner_position_x ?? 50);
  const [bannerY, setBannerY] = useState(server.banner_position_y ?? 50);
  const [bannerZoom, setBannerZoom] = useState(server.banner_zoom ?? 1);
  const [glowColor, setGlowColor] = useState(
    server.premium_glow_color ?? "#8b5cf6"
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
            borderColor: server.premium_status ? glowColor : undefined,
            boxShadow: server.premium_status
              ? `0 0 30px ${glowColor}66`
              : undefined,
          }}
        >
          {bannerPreview ? (
            <img src={bannerPreview} alt="Banner preview" style={bannerStyle} />
          ) : (
            <div className="live-preview-banner-fallback" />
          )}

          {server.premium_status && (
            <span className="server-premium-badge">Premium</span>
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
            <h3>{server.server_name}</h3>
            <p>
              {server.category} • {server.country} • {server.language}
            </p>
          </div>
        </div>
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
          defaultValue={server.description ?? ""}
          placeholder="Beschreibung deines Servers"
        />
      </label>

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

      <div className="banner-control-card">
        <h3>Banner einstellen</h3>
        <p>
          Wähle ein Banner aus und passe es direkt in der Vorschau an.
        </p>

        <label className="field">
          <span>Banner links/rechts: {bannerX}%</span>
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
          <span>Banner hoch/runter: {bannerY}%</span>
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
          <span>Banner Zoom: {bannerZoom}x</span>
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
        <span>Premium Text</span>
        <input
          className="input"
          name="premium_message"
          defaultValue={server.premium_message ?? "Featured Premium Server"}
          placeholder="Featured Premium Server"
        />
      </label>

      <div className="profile-style-card inner-style-card">
        <div>
          <h3>Premium Glow Color</h3>
          <p>
            Diese Farbe wird für den Premium-Leuchteffekt deines Servers
            verwendet.
          </p>
        </div>

        <div className="color-row">
          <input
            type="color"
            name="premium_glow_color"
            value={glowColor}
            onChange={(event) => setGlowColor(event.target.value)}
          />

          <button className="btn" type="submit">
            Änderungen speichern
          </button>
        </div>
      </div>

      {!server.premium_status && (
        <p className="form-note">
          Hinweis: Glow und Premium Text sind erst sichtbar, wenn dein Server
          Premium hat.
        </p>
      )}
    </form>
  );
}
