"use client";

import Link from "next/link";
import { useMemo, useState, type MouseEvent } from "react";

const MAX_DESCRIPTION_WORDS = 1500;

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

return `vor ${days} Tag${days === 1 ? "" : "en"}`;
}

export default function ProfileServerEditor({ server }: { server: any }) {
const isPremiumOrPartner = Boolean(
server.premium_status || server.partner_status
);

const [lockedNotice, setLockedNotice] = useState(false);
const [serverName, setServerName] = useState(server.server_name ?? "");

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
boxShadow: `0 0 42px ${glowColor}aa, 0 0 95px ${glowColor}55`,
borderColor: glowColor,
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

```
if (!confirmed) {
  event.preventDefault();
}
```

}

return ( <form
   action="/api/profile/update-server"
   method="POST"
   encType="multipart/form-data"
   className="profile-edit-card"
 > <input type="hidden" name="server_id" value={server.id} />

```
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
        Das Server-Logo wird automatisch vom Discord-Serverprofilbild
        übernommen. Ein manuelles Logo kann hier nicht mehr hochgeladen
        werden.
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
              Werde Premium Mitglied, um Layouts, Textfarben und Glow zu
              nutzen.
            </p>
            <Link href="/shop" className="btn">
              Zum Shop
            </Link>
          </div>
        )}

        <label className="field full premium-setting-line">
          <span>
            Layout auswählen{" "}
            {!isPremiumOrPartner && (
              <button
                type="button"
                className="premium-mini-diamond"
                onClick={showLockedNotice}
              >
                ◆
              </button>
            )}
          </span>

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
            <span>
              Servername-Farbe{" "}
              {!isPremiumOrPartner && (
                <button
                  type="button"
                  className="premium-mini-diamond"
                  onClick={showLockedNotice}
                >
                  ◆
                </button>
              )}
            </span>
            <input
              type="color"
              name="server_name_color"
              value={serverNameColor}
              disabled={!isPremiumOrPartner}
              onChange={(event) => setServerNameColor(event.target.value)}
            />
          </label>

          <label className="premium-color-field">
            <span>
              Textfarbe{" "}
              {!isPremiumOrPartner && (
                <button
                  type="button"
                  className="premium-mini-diamond"
                  onClick={showLockedNotice}
                >
                  ◆
                </button>
              )}
            </span>
            <input
              type="color"
              name="server_text_color"
              value={serverTextColor}
              disabled={!isPremiumOrPartner}
              onChange={(event) => setServerTextColor(event.target.value)}
            />
          </label>

          <label className="premium-color-field">
            <span>
              Glow-Farbe{" "}
              {!isPremiumOrPartner && (
                <button
                  type="button"
                  className="premium-mini-diamond"
                  onClick={showLockedNotice}
                >
                  ◆
                </button>
              )}
            </span>
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
          className={`server-directory-card server-list-live-preview ${
            isPremiumOrPartner
              ? `server-directory-card-premium premium-layout-${premiumLayout}`
              : ""
          }`}
          style={cardStyle}
        >
          {isPremiumOrPartner && (
            <div className="premium-glow-ring" aria-hidden="true" />
          )}

          <div className="server-directory-banner">
            {bannerPreview ? (
              <img
                src={bannerPreview}
                alt="Banner preview"
                style={bannerStyle}
              />
            ) : (
              <div className="server-directory-banner-fallback" />
            )}

            <div className="server-directory-rating">⭐ No ratings</div>
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
```

);
}
