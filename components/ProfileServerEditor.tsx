"use client";

import Link from "next/link";
import { useMemo, useState, type MouseEvent } from "react";
import { useLanguage } from "@/components/useLanguage";

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
type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const PROFILE_EDITOR_TEXT = {
de: {
notBumped: "Noch nicht gebumpt",
justNow: "Gerade eben",
minutesAgo: "vor {value} Min.",
hoursAgo: "vor {value} Std.",
daysAgoSingular: "vor {value} Tag",
daysAgoPlural: "vor {value} Tagen",

deleteConfirm:
  "Willst du diesen Server wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",

editServer: "Server bearbeiten",
changeBanner: "Server-Banner ändern",
logoNote:
  "Das Server-Logo wird automatisch vom Discord-Serverprofilbild übernommen. Ein manuelles Logo kann hier nicht mehr hochgeladen werden.",
bannerPosition: "Banner positionieren",
bannerPositionText: "Stelle dein Banner direkt rechts in der Vorschau ein.",
leftRight: "Links / Rechts",
upDown: "Hoch / Runter",
zoom: "Zoom",
serverName: "Servername",
serverNamePlaceholder: "Servername",
language: "Sprache",
description: "Beschreibung",
descriptionPlaceholder: "Beschreibung deines Servers",
words: "Wörter",

designFeatures: "Design Features",
designText: "Farben, Glow und Layouts für Premium & Partner.",
premiumOnlyTitle: "Nur für Premium & Partner verfügbar",
premiumOnlyText:
  "Werde Premium Mitglied, um Layouts, Textfarben und Glow zu nutzen.",
shop: "Zum Shop",
layout: "Layout auswählen",
nameColor: "Servername-Farbe",
textColor: "Textfarbe",
glowColor: "Glow-Farbe",

save: "Änderungen speichern",
deleteServer: "Server löschen",

livePreview: "Live Vorschau",
serverListView: "Serverlisten-Ansicht",
previewText: "Genau so sieht deine Karte später auf der Serverliste aus.",
noRatings: "No ratings",
lastBumped: "Zuletzt gebumpt",
previewDescription: "Beschreibung deines Servers...",
showMore: "Mehr anzeigen",
viewServer: "Server ansehen",
join: "Beitreten",

},

en: {
notBumped: "Not bumped yet",
justNow: "Just now",
minutesAgo: "{value} min. ago",
hoursAgo: "{value} hrs. ago",
daysAgoSingular: "{value} day ago",
daysAgoPlural: "{value} days ago",

deleteConfirm:
  "Do you really want to delete this server? This action cannot be undone.",

editServer: "Edit server",
changeBanner: "Change server banner",
logoNote:
  "The server logo is automatically taken from the Discord server icon. Manual logo upload is no longer available here.",
bannerPosition: "Position banner",
bannerPositionText: "Adjust your banner directly in the preview on the right.",
leftRight: "Left / Right",
upDown: "Up / Down",
zoom: "Zoom",
serverName: "Server name",
serverNamePlaceholder: "Server name",
language: "Language",
description: "Description",
descriptionPlaceholder: "Description of your server",
words: "words",

designFeatures: "Design Features",
designText: "Colors, glow and layouts for Premium & Partner.",
premiumOnlyTitle: "Only available for Premium & Partner",
premiumOnlyText:
  "Become a Premium member to use layouts, text colors and glow.",
shop: "Go to shop",
layout: "Choose layout",
nameColor: "Server name color",
textColor: "Text color",
glowColor: "Glow color",

save: "Save changes",
deleteServer: "Delete server",

livePreview: "Live preview",
serverListView: "Server list view",
previewText: "This is exactly how your card will look in the server list.",
noRatings: "No ratings",
lastBumped: "Last bumped",
previewDescription: "Description of your server...",
showMore: "Show more",
viewServer: "View server",
join: "Join",

},

fr: {
notBumped: "Pas encore bumpé",
justNow: "À l'instant",
minutesAgo: "il y a {value} min.",
hoursAgo: "il y a {value} h",
daysAgoSingular: "il y a {value} jour",
daysAgoPlural: "il y a {value} jours",

deleteConfirm:
  "Veux-tu vraiment supprimer ce serveur ? Cette action ne peut pas être annulée.",

editServer: "Modifier le serveur",
changeBanner: "Changer la bannière du serveur",
logoNote:
  "Le logo du serveur est automatiquement repris depuis l'icône du serveur Discord. Le téléchargement manuel d'un logo n'est plus disponible ici.",
bannerPosition: "Positionner la bannière",
bannerPositionText: "Ajuste ta bannière directement dans l'aperçu à droite.",
leftRight: "Gauche / Droite",
upDown: "Haut / Bas",
zoom: "Zoom",
serverName: "Nom du serveur",
serverNamePlaceholder: "Nom du serveur",
language: "Langue",
description: "Description",
descriptionPlaceholder: "Description de ton serveur",
words: "mots",

designFeatures: "Fonctions design",
designText: "Couleurs, glow et layouts pour Premium & Partenaire.",
premiumOnlyTitle: "Disponible uniquement pour Premium & Partenaire",
premiumOnlyText:
  "Deviens membre Premium pour utiliser les layouts, couleurs de texte et glow.",
shop: "Aller à la boutique",
layout: "Choisir un layout",
nameColor: "Couleur du nom",
textColor: "Couleur du texte",
glowColor: "Couleur du glow",

save: "Enregistrer les modifications",
deleteServer: "Supprimer le serveur",

livePreview: "Aperçu en direct",
serverListView: "Vue de la liste des serveurs",
previewText: "Voici exactement à quoi ressemblera ta carte dans la liste.",
noRatings: "Aucune note",
lastBumped: "Dernier bump",
previewDescription: "Description de ton serveur...",
showMore: "Afficher plus",
viewServer: "Voir le serveur",
join: "Rejoindre",

},

it: {
notBumped: "Non ancora bumpato",
justNow: "Proprio ora",
minutesAgo: "{value} min. fa",
hoursAgo: "{value} ore fa",
daysAgoSingular: "{value} giorno fa",
daysAgoPlural: "{value} giorni fa",

deleteConfirm:
  "Vuoi davvero eliminare questo server? Questa azione non può essere annullata.",

editServer: "Modifica server",
changeBanner: "Cambia banner del server",
logoNote:
  "Il logo del server viene preso automaticamente dall'icona del server Discord. Il caricamento manuale del logo non è più disponibile qui.",
bannerPosition: "Posiziona banner",
bannerPositionText: "Regola il banner direttamente nell'anteprima a destra.",
leftRight: "Sinistra / Destra",
upDown: "Su / Giù",
zoom: "Zoom",
serverName: "Nome server",
serverNamePlaceholder: "Nome server",
language: "Lingua",
description: "Descrizione",
descriptionPlaceholder: "Descrizione del tuo server",
words: "parole",

designFeatures: "Funzioni design",
designText: "Colori, glow e layout per Premium & Partner.",
premiumOnlyTitle: "Disponibile solo per Premium & Partner",
premiumOnlyText:
  "Diventa membro Premium per usare layout, colori del testo e glow.",
shop: "Vai allo shop",
layout: "Scegli layout",
nameColor: "Colore nome server",
textColor: "Colore testo",
glowColor: "Colore glow",

save: "Salva modifiche",
deleteServer: "Elimina server",

livePreview: "Anteprima live",
serverListView: "Vista lista server",
previewText: "Ecco esattamente come apparirà la tua card nella lista.",
noRatings: "Nessuna valutazione",
lastBumped: "Ultimo bump",
previewDescription: "Descrizione del tuo server...",
showMore: "Mostra altro",
viewServer: "Vedi server",
join: "Entra",

},

pl: {
notBumped: "Jeszcze nie bumpowano",
justNow: "Przed chwilą",
minutesAgo: "{value} min. temu",
hoursAgo: "{value} godz. temu",
daysAgoSingular: "{value} dzień temu",
daysAgoPlural: "{value} dni temu",

deleteConfirm:
  "Czy na pewno chcesz usunąć ten serwer? Tej akcji nie można cofnąć.",

editServer: "Edytuj serwer",
changeBanner: "Zmień banner serwera",
logoNote:
  "Logo serwera jest automatycznie pobierane z ikony serwera Discord. Ręczne przesyłanie logo nie jest już tutaj dostępne.",
bannerPosition: "Ustaw banner",
bannerPositionText: "Dopasuj banner bezpośrednio w podglądzie po prawej.",
leftRight: "Lewo / Prawo",
upDown: "Góra / Dół",
zoom: "Zoom",
serverName: "Nazwa serwera",
serverNamePlaceholder: "Nazwa serwera",
language: "Język",
description: "Opis",
descriptionPlaceholder: "Opis twojego serwera",
words: "słów",

designFeatures: "Funkcje designu",
designText: "Kolory, glow i layouty dla Premium & Partner.",
premiumOnlyTitle: "Dostępne tylko dla Premium & Partner",
premiumOnlyText:
  "Zostań członkiem Premium, aby używać layoutów, kolorów tekstu i glow.",
shop: "Przejdź do sklepu",
layout: "Wybierz layout",
nameColor: "Kolor nazwy serwera",
textColor: "Kolor tekstu",
glowColor: "Kolor glow",

save: "Zapisz zmiany",
deleteServer: "Usuń serwer",

livePreview: "Podgląd na żywo",
serverListView: "Widok listy serwerów",
previewText: "Tak dokładnie będzie wyglądać twoja karta na liście serwerów.",
noRatings: "Brak ocen",
lastBumped: "Ostatni bump",
previewDescription: "Opis twojego serwera...",
showMore: "Pokaż więcej",
viewServer: "Zobacz serwer",
join: "Dołącz",

},
} as const;

function countWords(text: string) {
return text.trim().split(/\s+/).filter(Boolean).length;
}

function limitWords(text: string, maxWords: number) {
return text.trim().split(/\s+/).filter(Boolean).slice(0, maxWords).join(" ");
}

function tr(language: UiLanguage, key: keyof typeof PROFILE_EDITOR_TEXT.de) {
return PROFILE_EDITOR_TEXT[language][key] || PROFILE_EDITOR_TEXT.de[key];
}

function replaceValue(text: string, value: number) {
return text.replace("{value}", String(value));
}

function formatLastBump(lastBump: string | null | undefined, language: UiLanguage) {
if (!lastBump) return tr(language, "notBumped");

const diff = Date.now() - new Date(lastBump).getTime();
const minutes = Math.floor(diff / 1000 / 60);
const hours = Math.floor(minutes / 60);
const days = Math.floor(hours / 24);

if (minutes < 1) return tr(language, "justNow");
if (minutes < 60) return replaceValue(tr(language, "minutesAgo"), minutes);
if (hours < 24) return replaceValue(tr(language, "hoursAgo"), hours);

if (days === 1) {
return replaceValue(tr(language, "daysAgoSingular"), days);
}

return replaceValue(tr(language, "daysAgoPlural"), days);
}

export default function ProfileServerEditor({ server }: { server: any }) {
const uiLanguage = useLanguage() as UiLanguage;

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

const [premiumLayout, setPremiumLayout] = useState(
(server.premium_layout as PremiumLayout) ?? "glow"
);

const bannerStyle = useMemo(
() => ({
objectPosition: bannerX + "% " + bannerY + "%",
transform: "scale(" + bannerZoom + ")",
transformOrigin: bannerX + "% " + bannerY + "%",
}),
[bannerX, bannerY, bannerZoom]
);

const tags = Array.isArray(server.tags) ? server.tags.slice(0, 5) : [];

const cardStyle = isPremiumOrPartner
? ({
"--premium-glow": glowColor,
boxShadow:
"0 0 42px " + glowColor + "aa, 0 0 95px " + glowColor + "55",
borderColor: glowColor,
} as any)
: undefined;

function showLockedNotice() {
if (!isPremiumOrPartner) {
setLockedNotice(true);
}
}

function confirmDelete(event: MouseEvent) {
const confirmed = window.confirm(tr(uiLanguage, "deleteConfirm"));

if (!confirmed) {
  event.preventDefault();
}

}

return (




  <h3>{tr(uiLanguage, "editServer")}</h3>

  <div className="profile-editor-two-column">
    <section className="profile-editor-controls">
      <div className="profile-upload-grid">
        <label className="field full">
          <span>{tr(uiLanguage, "changeBanner")}</span>
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

      <small className="form-note">{tr(uiLanguage, "logoNote")}</small>

      <div className="banner-control-card banner-control-top">
        <h3>{tr(uiLanguage, "bannerPosition")}</h3>
        <p>{tr(uiLanguage, "bannerPositionText")}</p>

        <label className="field">
          <span>
            {tr(uiLanguage, "leftRight")}: {bannerX}%
          </span>
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
          <span>
            {tr(uiLanguage, "upDown")}: {bannerY}%
          </span>
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
          <span>
            {tr(uiLanguage, "zoom")}: {bannerZoom}x
          </span>
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
        <span>{tr(uiLanguage, "serverName")}</span>
        <input
          className="input"
          name="server_name"
          value={serverName}
          placeholder={tr(uiLanguage, "serverNamePlaceholder")}
          onChange={(event) => setServerName(event.target.value)}
        />
      </label>

      <label className="field">
        <span>{tr(uiLanguage, "language")}</span>
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
        <span>{tr(uiLanguage, "description")}</span>
        <textarea
          name="description"
          value={description}
          placeholder={tr(uiLanguage, "descriptionPlaceholder")}
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
          {countWords(description)}/{MAX_DESCRIPTION_WORDS}{" "}
          {tr(uiLanguage, "words")}
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
            <h3>{tr(uiLanguage, "designFeatures")}</h3>
            <p>{tr(uiLanguage, "designText")}</p>
          </div>
        </div>

        {lockedNotice && !isPremiumOrPartner && (
          <div className="premium-locked-message">
            <strong>{tr(uiLanguage, "premiumOnlyTitle")}</strong>
            <p>{tr(uiLanguage, "premiumOnlyText")}</p>
            <Link href="/shop" className="btn">
              {tr(uiLanguage, "shop")}
            </Link>
          </div>
        )}

        <label className="field full premium-setting-line">
          <span>
            {tr(uiLanguage, "layout")}{" "}
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
              {tr(uiLanguage, "nameColor")}{" "}
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
              {tr(uiLanguage, "textColor")}{" "}
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
              {tr(uiLanguage, "glowColor")}{" "}
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
          {tr(uiLanguage, "save")}
        </button>

        <button
          className="btn danger"
          type="submit"
          formAction="/api/profile/delete-server"
          formMethod="POST"
          onClick={confirmDelete}
        >
          {tr(uiLanguage, "deleteServer")}
        </button>
      </div>
    </section>

    <aside className="profile-editor-preview">
      <div className="preview-sticky-box">
        <span className="page-badge">{tr(uiLanguage, "livePreview")}</span>
        <h3>{tr(uiLanguage, "serverListView")}</h3>
        <p>{tr(uiLanguage, "previewText")}</p>

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

            <div className="server-directory-rating">
              ⭐ {tr(uiLanguage, "noRatings")}
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
                  {serverName || tr(uiLanguage, "serverName")}
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
                {tr(uiLanguage, "lastBumped")}:{" "}
                {formatLastBump(server.last_bump, uiLanguage)}
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
              {description || tr(uiLanguage, "previewDescription")}
            </div>

            <div className="description-toggle-button fake-preview-toggle">
              {tr(uiLanguage, "showMore")}
            </div>

            <div className="server-directory-footer">
              <button className="btn secondary" type="button">
                {tr(uiLanguage, "viewServer")}
              </button>

              <button className="btn" type="button">
                {tr(uiLanguage, "join")}
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
