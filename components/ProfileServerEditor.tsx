"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { useLanguage } from "@/components/useLanguage";

const MAX_DESCRIPTION_WORDS = 1500;

const SERVER_LANGUAGES = ["Deutsch", "English", "Français", "Italiano", "Polski"];

const PREMIUM_LAYOUTS = [
  {
    value: "glow",
    label: "Glow Classic",
    emoji: "✨",
    description: "Sauberer Glow-Effekt mit eigener Farbe.",
  },
  {
    value: "starborder",
    label: "Star Border",
    emoji: "⭐",
    description: "Dunkler Look mit Sternen-Rand.",
  },
  {
    value: "sunset",
    label: "Sunset Dark",
    emoji: "🌅",
    description: "Warmer Sunset-Look für Premium-Karten.",
  },
  {
    value: "aurora",
    label: "Aurora Flow",
    emoji: "🌌",
    description: "Weicher Aurora-Farbverlauf.",
  },
  {
    value: "neon",
    label: "Neon Pulse",
    emoji: "💜",
    description: "Starker Neon-Look mit Pulse-Vibe.",
  },
  {
    value: "galaxy",
    label: "Galaxy Dust",
    emoji: "🪐",
    description: "Galaxy-Design mit dunklem Space-Look.",
  },
  {
    value: "flame",
    label: "Fire Core",
    emoji: "🔥",
    description: "Feuriger Premium-Style.",
  },
  {
    value: "ocean",
    label: "Ocean Wave",
    emoji: "🌊",
    description: "Blauer Ocean-Look mit Wave-Vibe.",
  },
] as const;

type PremiumLayout = (typeof PREMIUM_LAYOUTS)[number]["value"];
type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const DASHBOARD_TEXT = {
  de: {
    editTitle: "Server bearbeiten",
    bannerChange: "Server-Banner ändern",
    logoAuto:
      "Das Server-Logo wird automatisch vom Discord-Serverprofilbild übernommen.",
    bannerPositionTitle: "Banner positionieren",
    bannerPositionText: "Stelle dein Banner direkt rechts in der Vorschau ein.",
    horizontal: "Links / Rechts",
    vertical: "Hoch / Runter",
    zoom: "Zoom",
    serverName: "Servername",
    serverNamePlaceholder: "Servername",
    language: "Sprache",
    description: "Beschreibung",
    descriptionPlaceholder: "Beschreibung deines Servers",
    words: "Wörter",
    inviteTitle: "Discord Invite aktualisieren",
    inviteText:
      "Hier kannst du einen neuen permanenten Discord-Invite eintragen, falls dein alter Link abgelaufen ist.",
    inviteLabel: "Discord Invite-Link",
    invitePlaceholder: "https://discord.gg/dein-server",
    inviteHint:
      "Tipp: Erstelle auf Discord am besten einen permanenten Invite ohne Ablaufdatum.",
    premiumTitle: "Premium Design",
    premiumText:
      "Wähle Layout, Namenfarbe, Textfarbe und Glow für Premium- oder Partner-Server.",
    premiumLockedTitle: "Nur für Premium & Partner verfügbar",
    premiumLockedText:
      "Werde Premium-Mitglied, um Layouts, Textfarben und Glow zu nutzen.",
    shop: "Zum Shop",
    chooseLayout: "Layout auswählen",
    colors: "Farben",
    serverNameColor: "Servername-Farbe",
    textColor: "Textfarbe",
    glowColor: "Glow-Farbe",
    glowOnly: "Glow-Farbe ist nur beim Glow Classic Layout sichtbar.",
    save: "Änderungen speichern",
    delete: "Server löschen",
    deleteConfirm:
      "Willst du diesen Server wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    previewBadge: "Live Vorschau",
    previewTitle: "Serverlisten-Ansicht",
    previewText: "Genau so sieht deine Karte später auf der Serverliste aus.",
    noRatings: "Noch keine Bewertungen",
    notBumped: "Noch nicht gebumpt",
    justNow: "Gerade eben",
    minutesAgo: "vor {value} Min.",
    hoursAgo: "vor {value} Std.",
    daysAgoSingular: "vor 1 Tag",
    daysAgoPlural: "vor {value} Tagen",
    onlineUnknown: "Online unbekannt",
    online: "online",
    categoryFallback: "Community",
    previewDescription: "Beschreibung deines Servers...",
    showMore: "Mehr anzeigen",
    viewServer: "Server ansehen",
    join: "Beitreten",
    premiumBadge: "Premium",
    partnerBadge: "Partner",
    lockedButton: "Premium Funktion",
  },

  en: {
    editTitle: "Edit server",
    bannerChange: "Change server banner",
    logoAuto:
      "The server logo is automatically taken from the Discord server profile picture.",
    bannerPositionTitle: "Position banner",
    bannerPositionText: "Adjust your banner directly in the live preview.",
    horizontal: "Left / Right",
    vertical: "Up / Down",
    zoom: "Zoom",
    serverName: "Server name",
    serverNamePlaceholder: "Server name",
    language: "Language",
    description: "Description",
    descriptionPlaceholder: "Describe your server",
    words: "words",
    inviteTitle: "Update Discord invite",
    inviteText:
      "You can enter a new permanent Discord invite here if your old link expired.",
    inviteLabel: "Discord invite link",
    invitePlaceholder: "https://discord.gg/your-server",
    inviteHint:
      "Tip: Create a permanent Discord invite without an expiration date.",
    premiumTitle: "Premium Design",
    premiumText:
      "Choose layout, name color, text color and glow for premium or partner servers.",
    premiumLockedTitle: "Only available for Premium & Partner",
    premiumLockedText:
      "Become a premium member to use layouts, text colors and glow.",
    shop: "Go to shop",
    chooseLayout: "Choose layout",
    colors: "Colors",
    serverNameColor: "Server name color",
    textColor: "Text color",
    glowColor: "Glow color",
    glowOnly: "Glow color is only visible in the Glow Classic layout.",
    save: "Save changes",
    delete: "Delete server",
    deleteConfirm:
      "Do you really want to delete this server? This action cannot be undone.",
    previewBadge: "Live preview",
    previewTitle: "Server list view",
    previewText: "This is how your card will appear in the server list.",
    noRatings: "No ratings yet",
    notBumped: "Not bumped yet",
    justNow: "Just now",
    minutesAgo: "{value} min. ago",
    hoursAgo: "{value} hrs. ago",
    daysAgoSingular: "1 day ago",
    daysAgoPlural: "{value} days ago",
    onlineUnknown: "Online unknown",
    online: "online",
    categoryFallback: "Community",
    previewDescription: "Your server description...",
    showMore: "Show more",
    viewServer: "View server",
    join: "Join",
    premiumBadge: "Premium",
    partnerBadge: "Partner",
    lockedButton: "Premium feature",
  },

  fr: {
    editTitle: "Modifier le serveur",
    bannerChange: "Changer la bannière du serveur",
    logoAuto:
      "Le logo du serveur est automatiquement repris depuis l’image de profil Discord.",
    bannerPositionTitle: "Positionner la bannière",
    bannerPositionText:
      "Ajuste ta bannière directement dans l’aperçu à droite.",
    horizontal: "Gauche / Droite",
    vertical: "Haut / Bas",
    zoom: "Zoom",
    serverName: "Nom du serveur",
    serverNamePlaceholder: "Nom du serveur",
    language: "Langue",
    description: "Description",
    descriptionPlaceholder: "Description de ton serveur",
    words: "mots",
    inviteTitle: "Mettre à jour l’invitation Discord",
    inviteText:
      "Tu peux entrer ici une nouvelle invitation Discord permanente si l’ancien lien a expiré.",
    inviteLabel: "Lien d’invitation Discord",
    invitePlaceholder: "https://discord.gg/ton-serveur",
    inviteHint:
      "Astuce : crée une invitation permanente sans date d’expiration sur Discord.",
    premiumTitle: "Design Premium",
    premiumText:
      "Choisis le layout, la couleur du nom, la couleur du texte et le glow pour les serveurs Premium ou Partenaire.",
    premiumLockedTitle: "Disponible uniquement pour Premium & Partenaire",
    premiumLockedText:
      "Deviens membre Premium pour utiliser les layouts, couleurs de texte et glow.",
    shop: "Aller au shop",
    chooseLayout: "Choisir un layout",
    colors: "Couleurs",
    serverNameColor: "Couleur du nom",
    textColor: "Couleur du texte",
    glowColor: "Couleur du glow",
    glowOnly:
      "La couleur du glow est visible uniquement avec le layout Glow Classic.",
    save: "Enregistrer",
    delete: "Supprimer le serveur",
    deleteConfirm:
      "Veux-tu vraiment supprimer ce serveur ? Cette action est irréversible.",
    previewBadge: "Aperçu live",
    previewTitle: "Vue liste serveur",
    previewText:
      "Voici comment ta carte apparaîtra plus tard dans la liste des serveurs.",
    noRatings: "Aucune note",
    notBumped: "Pas encore bumpé",
    justNow: "À l’instant",
    minutesAgo: "il y a {value} min.",
    hoursAgo: "il y a {value} h",
    daysAgoSingular: "il y a 1 jour",
    daysAgoPlural: "il y a {value} jours",
    onlineUnknown: "Online inconnu",
    online: "en ligne",
    categoryFallback: "Communauté",
    previewDescription: "Description de ton serveur...",
    showMore: "Afficher plus",
    viewServer: "Voir le serveur",
    join: "Rejoindre",
    premiumBadge: "Premium",
    partnerBadge: "Partenaire",
    lockedButton: "Fonction Premium",
  },

  it: {
    editTitle: "Modifica server",
    bannerChange: "Cambia banner del server",
    logoAuto:
      "Il logo del server viene preso automaticamente dall’immagine profilo del server Discord.",
    bannerPositionTitle: "Posiziona banner",
    bannerPositionText: "Regola il banner direttamente nell’anteprima a destra.",
    horizontal: "Sinistra / Destra",
    vertical: "Su / Giù",
    zoom: "Zoom",
    serverName: "Nome server",
    serverNamePlaceholder: "Nome server",
    language: "Lingua",
    description: "Descrizione",
    descriptionPlaceholder: "Descrizione del tuo server",
    words: "parole",
    inviteTitle: "Aggiorna invito Discord",
    inviteText:
      "Qui puoi inserire un nuovo invito Discord permanente se il vecchio link è scaduto.",
    inviteLabel: "Link invito Discord",
    invitePlaceholder: "https://discord.gg/tuo-server",
    inviteHint:
      "Consiglio: crea su Discord un invito permanente senza scadenza.",
    premiumTitle: "Design Premium",
    premiumText:
      "Scegli layout, colore del nome, colore del testo e glow per server Premium o Partner.",
    premiumLockedTitle: "Disponibile solo per Premium & Partner",
    premiumLockedText:
      "Diventa membro Premium per usare layout, colori del testo e glow.",
    shop: "Vai allo shop",
    chooseLayout: "Scegli layout",
    colors: "Colori",
    serverNameColor: "Colore nome server",
    textColor: "Colore testo",
    glowColor: "Colore glow",
    glowOnly: "Il colore glow è visibile solo nel layout Glow Classic.",
    save: "Salva modifiche",
    delete: "Elimina server",
    deleteConfirm:
      "Vuoi davvero eliminare questo server? Questa azione non può essere annullata.",
    previewBadge: "Anteprima live",
    previewTitle: "Vista lista server",
    previewText: "Ecco come apparirà la tua card nella lista server.",
    noRatings: "Nessuna valutazione",
    notBumped: "Non ancora bumpato",
    justNow: "Proprio ora",
    minutesAgo: "{value} min. fa",
    hoursAgo: "{value} ore fa",
    daysAgoSingular: "1 giorno fa",
    daysAgoPlural: "{value} giorni fa",
    onlineUnknown: "Online sconosciuto",
    online: "online",
    categoryFallback: "Community",
    previewDescription: "Descrizione del tuo server...",
    showMore: "Mostra altro",
    viewServer: "Vedi server",
    join: "Entra",
    premiumBadge: "Premium",
    partnerBadge: "Partner",
    lockedButton: "Funzione Premium",
  },

  pl: {
    editTitle: "Edytuj serwer",
    bannerChange: "Zmień banner serwera",
    logoAuto:
      "Logo serwera jest automatycznie pobierane z ikony profilu serwera Discord.",
    bannerPositionTitle: "Ustaw banner",
    bannerPositionText: "Dostosuj banner bezpośrednio w podglądzie po prawej.",
    horizontal: "Lewo / Prawo",
    vertical: "Góra / Dół",
    zoom: "Zoom",
    serverName: "Nazwa serwera",
    serverNamePlaceholder: "Nazwa serwera",
    language: "Język",
    description: "Opis",
    descriptionPlaceholder: "Opis twojego serwera",
    words: "słów",
    inviteTitle: "Zaktualizuj zaproszenie Discord",
    inviteText:
      "Tutaj możesz wpisać nowy stały link zaproszenia Discord, jeśli stary link wygasł.",
    inviteLabel: "Link zaproszenia Discord",
    invitePlaceholder: "https://discord.gg/twoj-serwer",
    inviteHint:
      "Wskazówka: utwórz na Discordzie stałe zaproszenie bez daty wygaśnięcia.",
    premiumTitle: "Design Premium",
    premiumText:
      "Wybierz layout, kolor nazwy, kolor tekstu i glow dla serwerów Premium lub Partner.",
    premiumLockedTitle: "Dostępne tylko dla Premium & Partner",
    premiumLockedText:
      "Zostań członkiem Premium, aby używać layoutów, kolorów tekstu i glow.",
    shop: "Do sklepu",
    chooseLayout: "Wybierz layout",
    colors: "Kolory",
    serverNameColor: "Kolor nazwy serwera",
    textColor: "Kolor tekstu",
    glowColor: "Kolor glow",
    glowOnly: "Kolor glow jest widoczny tylko w layoucie Glow Classic.",
    save: "Zapisz zmiany",
    delete: "Usuń serwer",
    deleteConfirm:
      "Czy na pewno chcesz usunąć ten serwer? Tej akcji nie można cofnąć.",
    previewBadge: "Podgląd live",
    previewTitle: "Widok listy serwerów",
    previewText: "Tak twoja karta będzie wyglądać na liście serwerów.",
    noRatings: "Brak ocen",
    notBumped: "Jeszcze nie bumpowano",
    justNow: "Przed chwilą",
    minutesAgo: "{value} min. temu",
    hoursAgo: "{value} godz. temu",
    daysAgoSingular: "1 dzień temu",
    daysAgoPlural: "{value} dni temu",
    onlineUnknown: "Online nieznane",
    online: "online",
    categoryFallback: "Społeczność",
    previewDescription: "Opis twojego serwera...",
    showMore: "Pokaż więcej",
    viewServer: "Zobacz serwer",
    join: "Dołącz",
    premiumBadge: "Premium",
    partnerBadge: "Partner",
    lockedButton: "Funkcja Premium",
  },
} as const;

function tr(language: UiLanguage, key: keyof typeof DASHBOARD_TEXT.de) {
  return DASHBOARD_TEXT[language]?.[key] || DASHBOARD_TEXT.de[key];
}

function replaceValue(text: string, value: number) {
  return text.replace("{value}", String(value));
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function limitWords(text: string, maxWords: number) {
  return text.trim().split(/\s+/).filter(Boolean).slice(0, maxWords).join(" ");
}

function formatLastBump(
  lastBump: string | null | undefined,
  language: UiLanguage
) {
  if (!lastBump) return tr(language, "notBumped");

  const diff = Date.now() - new Date(lastBump).getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return tr(language, "justNow");
  if (minutes < 60) return replaceValue(tr(language, "minutesAgo"), minutes);
  if (hours < 24) return replaceValue(tr(language, "hoursAgo"), hours);
  if (days === 1) return tr(language, "daysAgoSingular");

  return replaceValue(tr(language, "daysAgoPlural"), days);
}

function getOnlineCount(server: any) {
  const possibleValues = [
    server.online_count,
    server.members_online,
    server.online_members,
    server.presence_count,
    server.discord_online_count,
    server.discord_online_members,
    server.approximate_presence_count,
    server.approximate_presence,
  ];

  const value = possibleValues.find(
    (item) => item !== null && item !== undefined && !Number.isNaN(Number(item))
  );

  if (value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

function formatOnlineCount(value: number | null, language: UiLanguage) {
  if (value === null) return tr(language, "onlineUnknown");
  return `${value.toLocaleString("de-DE")} ${tr(language, "online")}`;
}

function normalizePremiumLayout(value: unknown): PremiumLayout {
  const layout = String(value ?? "glow")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  const layoutAliases: Record<string, PremiumLayout> = {
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

  return layoutAliases[layout] ?? "glow";
}

function getPremiumPreviewStyle(layout: PremiumLayout, glowColor: string) {
  const base = {
    "--premium-glow": glowColor,
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
  } as CSSProperties & Record<string, string>;

  if (layout === "glow") {
    return {
      ...base,
      borderColor: glowColor,
      boxShadow: `0 0 42px ${glowColor}88, 0 0 90px ${glowColor}44`,
    };
  }

  return base;
}

export default function ProfileServerEditor({ server }: { server: any }) {
  const language = useLanguage() as UiLanguage;

  const isPremiumOrPartner = Boolean(
    server.premium_status || server.partner_status
  );

  const [lockedNotice, setLockedNotice] = useState(false);
  const [serverName, setServerName] = useState(server.server_name ?? "");
  const [serverLanguage, setServerLanguage] = useState(
    server.language ?? "Deutsch"
  );
  const [inviteLink, setInviteLink] = useState(
    server.invite_link || server.inviteLink || ""
  );

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
    normalizePremiumLayout(server.premium_layout)
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
  const onlineCount = getOnlineCount(server);

  const cardStyle = isPremiumOrPartner
    ? getPremiumPreviewStyle(premiumLayout, glowColor)
    : undefined;

  function showLockedNotice() {
    if (!isPremiumOrPartner) {
      setLockedNotice(true);
    }
  }

  function confirmDelete(event: MouseEvent<HTMLButtonElement>) {
    const confirmed = window.confirm(tr(language, "deleteConfirm"));

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
      <input type="hidden" name="inviteLink" value={inviteLink} />
      {isPremiumOrPartner && (
        <input type="hidden" name="premium_layout" value={premiumLayout} />
      )}

      <style>{`
        .profile-mobile-editor-nav {
          display: none;
        }

        @media (max-width: 900px) {
          .profile-edit-card {
            width: 100% !important;
            max-width: 100% !important;
            padding: 16px !important;
            overflow: visible !important;
          }

          .profile-mobile-editor-nav {
            position: sticky;
            top: 86px;
            z-index: 60;
            margin: 14px 0 16px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 8px;
            border-radius: 20px;
            background:
              radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.18), transparent 36%),
              rgba(10, 10, 26, 0.94);
            border: 1px solid rgba(255, 255, 255, 0.11);
            box-shadow:
              0 18px 46px rgba(0, 0, 0, 0.34),
              0 0 28px rgba(139, 92, 246, 0.14);
            backdrop-filter: blur(16px);
          }

          .profile-mobile-editor-nav a {
            min-height: 42px;
            border-radius: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #ffffff;
            text-decoration: none;
            font-size: 13px;
            font-weight: 950;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.09);
          }

          .profile-mobile-editor-nav a:first-child {
            background:
              linear-gradient(135deg, rgba(181, 76, 255, 0.22), rgba(116, 223, 255, 0.13));
            border-color: rgba(116, 223, 255, 0.20);
          }

          .profile-editor-two-column {
            display: flex !important;
            flex-direction: column !important;
            gap: 18px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
          }

          .profile-editor-preview {
            order: -1 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }

          .profile-editor-controls {
            order: 2 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }

          .preview-sticky-box {
            position: sticky !important;
            top: 144px !important;
            z-index: 35 !important;
            width: 100% !important;
            max-width: 100% !important;
            max-height: calc(100dvh - 164px) !important;
            overflow-y: auto !important;
            overscroll-behavior: contain !important;
            padding: 14px !important;
            border-radius: 26px !important;
            background:
              radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.14), transparent 35%),
              linear-gradient(180deg, rgba(13, 14, 34, 0.96), rgba(9, 9, 24, 0.96)) !important;
            border: 1px solid rgba(116, 223, 255, 0.15) !important;
            box-shadow:
              0 22px 70px rgba(0, 0, 0, 0.44),
              0 0 34px rgba(116, 223, 255, 0.10) !important;
            backdrop-filter: blur(18px) !important;
          }

          .preview-sticky-box > .page-badge {
            margin-bottom: 8px !important;
            min-height: 30px !important;
            padding: 7px 12px !important;
            font-size: 11px !important;
          }

          .preview-sticky-box > h3 {
            margin: 0 0 4px !important;
            font-size: 18px !important;
            line-height: 1.1 !important;
          }

          .preview-sticky-box > p {
            margin: 0 0 12px !important;
            font-size: 12px !important;
            line-height: 1.35 !important;
            color: rgba(246, 243, 255, 0.68) !important;
          }

          .server-list-live-preview {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            border-radius: 24px !important;
          }

          .server-list-live-preview .server-directory-banner {
            height: 106px !important;
          }

          .server-list-live-preview .server-directory-body {
            padding: 0 14px 14px !important;
          }

          .server-list-live-preview .server-directory-top {
            gap: 10px !important;
            margin-top: -26px !important;
          }

          .server-list-live-preview .server-directory-logo {
            width: 58px !important;
            height: 58px !important;
            border-radius: 18px !important;
            border-width: 3px !important;
            font-size: 22px !important;
          }

          .server-list-live-preview .server-directory-title h3 {
            font-size: 20px !important;
            line-height: 1.05 !important;
            max-width: 100% !important;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
          }

          .server-list-live-preview .server-directory-title p {
            font-size: 12px !important;
            line-height: 1.25 !important;
          }

          .server-list-live-preview .premium-server-meta-row {
            display: grid !important;
            grid-template-columns: 1fr 1.25fr !important;
            gap: 8px !important;
            margin: 12px 0 !important;
          }

          .server-list-live-preview .premium-server-meta-pill {
            min-width: 0 !important;
            min-height: 32px !important;
            padding: 0 8px !important;
            border-radius: 999px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 5px !important;
            font-size: 10.8px !important;
            font-weight: 950 !important;
            line-height: 1 !important;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
          }

          .server-list-live-preview .server-directory-badges {
            gap: 7px !important;
          }

          .server-list-live-preview .badge {
            min-height: 28px !important;
            padding: 0 9px !important;
            font-size: 11px !important;
          }

          .server-list-live-preview .server-directory-description {
            max-height: 108px !important;
            margin-top: 12px !important;
            padding: 13px !important;
            border-radius: 18px !important;
            font-size: 12px !important;
            line-height: 1.55 !important;
          }

          .server-list-live-preview .description-toggle-button,
          .server-list-live-preview .fake-preview-toggle {
            margin-top: 8px !important;
            font-size: 13px !important;
          }

          .server-list-live-preview .server-directory-footer {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            margin-top: 12px !important;
          }

          .server-list-live-preview .server-directory-footer .btn {
            width: 100% !important;
            min-height: 42px !important;
            padding: 0 10px !important;
            border-radius: 15px !important;
            font-size: 12.5px !important;
          }

          .profile-upload-grid,
          .premium-color-grid-inline {
            grid-template-columns: 1fr !important;
          }

          .banner-control-card,
          .premium-inline-tools {
            width: 100% !important;
            max-width: 100% !important;
            padding: 18px !important;
            border-radius: 24px !important;
          }

          .premium-inline-tools [style*="repeat(auto-fit"] {
            grid-template-columns: 1fr !important;
          }

          .profile-editor-actions {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .profile-save-button,
          .profile-editor-actions .btn {
            width: 100% !important;
          }
        }

        @media (max-width: 430px) {
          .profile-edit-card {
            padding: 12px !important;
          }

          .profile-mobile-editor-nav {
            top: 82px;
            grid-template-columns: 1fr;
          }

          .preview-sticky-box {
            top: 136px !important;
            max-height: calc(100dvh - 152px) !important;
            padding: 12px !important;
            border-radius: 22px !important;
          }

          .server-list-live-preview .server-directory-banner {
            height: 96px !important;
          }

          .server-list-live-preview .server-directory-body {
            padding: 0 12px 12px !important;
          }

          .server-list-live-preview .premium-server-meta-row {
            grid-template-columns: 1fr !important;
          }

          .server-list-live-preview .server-directory-footer {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <h3>{tr(language, "editTitle")}</h3>


      <div className="profile-mobile-editor-nav" aria-label="Mobile Editor Navigation">
        <a href="#profile-live-preview">
          👁 {tr(language, "previewBadge")}
        </a>
        <a href="#profile-editor-controls">
          ✏️ {tr(language, "editTitle")}
        </a>
      </div>

      <div className="profile-editor-two-column">
        <section id="profile-editor-controls" className="profile-editor-controls">
          <div className="profile-upload-grid">
            <label className="field full">
              <span>{tr(language, "bannerChange")}</span>
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

          <small className="form-note">{tr(language, "logoAuto")}</small>

          <div className="banner-control-card banner-control-top">
            <h3>{tr(language, "bannerPositionTitle")}</h3>
            <p>{tr(language, "bannerPositionText")}</p>

            <label className="field">
              <span>
                {tr(language, "horizontal")}: {bannerX}%
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
                {tr(language, "vertical")}: {bannerY}%
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
                {tr(language, "zoom")}: {bannerZoom}x
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
            <span>{tr(language, "serverName")}</span>
            <input
              className="input"
              name="server_name"
              value={serverName}
              placeholder={tr(language, "serverNamePlaceholder")}
              onChange={(event) => setServerName(event.target.value)}
            />
          </label>

          <label className="field">
            <span>{tr(language, "language")}</span>
            <select
              name="language"
              value={serverLanguage}
              onChange={(event) => setServerLanguage(event.target.value)}
            >
              {SERVER_LANGUAGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <div
            style={{
              margin: "18px 0",
              padding: "20px",
              borderRadius: "24px",
              background:
                "linear-gradient(180deg, rgba(38, 31, 62, 0.82), rgba(25, 21, 45, 0.82))",
              border: "1px solid rgba(116, 223, 255, 0.18)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 28px rgba(116,223,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #67e8f9 100%)",
                  boxShadow: "0 0 20px rgba(116,223,255,0.18)",
                  fontSize: "20px",
                  flex: "0 0 auto",
                }}
              >
                🔗
              </div>

              <div>
                <h3 style={{ margin: 0 }}>{tr(language, "inviteTitle")}</h3>
                <p
                  style={{
                    margin: "8px 0 0",
                    color: "rgba(246,243,255,0.72)",
                    lineHeight: 1.55,
                  }}
                >
                  {tr(language, "inviteText")}
                </p>
              </div>
            </div>

            <label className="field full" style={{ margin: 0 }}>
              <span>{tr(language, "inviteLabel")}</span>
              <input
                className="input"
                type="url"
                name="invite_link"
                value={inviteLink}
                placeholder={tr(language, "invitePlaceholder")}
                onChange={(event) => setInviteLink(event.target.value)}
              />
            </label>

            <small
              className="form-note"
              style={{
                display: "block",
                marginTop: "10px",
                color: "rgba(246,243,255,0.64)",
              }}
            >
              {tr(language, "inviteHint")}
            </small>
          </div>

          <label className="field full">
            <span>{tr(language, "description")}</span>
            <textarea
              name="description"
              value={description}
              placeholder={tr(language, "descriptionPlaceholder")}
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
              {tr(language, "words")}
            </small>
          </label>

          <div
            className="premium-inline-tools"
            style={{
              marginTop: "20px",
              padding: "22px",
              borderRadius: "28px",
              background:
                "radial-gradient(circle at 0% 0%, rgba(211, 76, 255, 0.18), transparent 35%), linear-gradient(180deg, rgba(30, 25, 55, 0.92), rgba(17, 15, 36, 0.92))",
              border: "1px solid rgba(202, 115, 255, 0.24)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 34px rgba(139,92,246,0.14)",
            }}
          >
            <div
              className="premium-inline-head"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "18px",
              }}
            >
              <button
                type="button"
                className="premium-diamond"
                onClick={showLockedNotice}
                aria-label={tr(language, "lockedButton")}
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background:
                    "linear-gradient(135deg, rgba(255,207,64,0.24), rgba(217,70,239,0.22), rgba(103,232,249,0.20))",
                  color: "#ffffff",
                  fontSize: "20px",
                  boxShadow: "0 0 24px rgba(217,70,239,0.18)",
                  cursor: "pointer",
                  flex: "0 0 auto",
                }}
              >
                ◆
              </button>

              <div>
                <h3 style={{ margin: 0 }}>{tr(language, "premiumTitle")}</h3>
                <p
                  style={{
                    margin: "8px 0 0",
                    color: "rgba(246,243,255,0.72)",
                    lineHeight: 1.55,
                  }}
                >
                  {tr(language, "premiumText")}
                </p>
              </div>
            </div>

            {lockedNotice && !isPremiumOrPartner && (
              <div
                className="premium-locked-message"
                style={{
                  marginBottom: "18px",
                  padding: "16px",
                  borderRadius: "20px",
                  background: "rgba(255, 207, 64, 0.09)",
                  border: "1px solid rgba(255, 207, 64, 0.22)",
                }}
              >
                <strong>{tr(language, "premiumLockedTitle")}</strong>
                <p>{tr(language, "premiumLockedText")}</p>
                <Link href="/shop" className="btn">
                  {tr(language, "shop")}
                </Link>
              </div>
            )}

            <div style={{ marginBottom: "18px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: 950,
                  color: "#ffffff",
                }}
              >
                {tr(language, "chooseLayout")}
              </span>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "10px",
                  opacity: isPremiumOrPartner ? 1 : 0.56,
                }}
              >
                {PREMIUM_LAYOUTS.map((layout) => {
                  const active = premiumLayout === layout.value;

                  return (
                    <button
                      key={layout.value}
                      type="button"
                      disabled={!isPremiumOrPartner}
                      onClick={() => setPremiumLayout(layout.value)}
                      style={{
                        minHeight: "82px",
                        padding: "12px",
                        borderRadius: "18px",
                        border: active
                          ? "1px solid rgba(116,223,255,0.56)"
                          : "1px solid rgba(255,255,255,0.12)",
                        background: active
                          ? "linear-gradient(135deg, rgba(180,76,255,0.28), rgba(116,223,255,0.16))"
                          : "rgba(255,255,255,0.055)",
                        color: "#ffffff",
                        textAlign: "left",
                        cursor: isPremiumOrPartner ? "pointer" : "not-allowed",
                        boxShadow: active
                          ? "0 0 22px rgba(116,223,255,0.16)"
                          : "none",
                      }}
                    >
                      <strong
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                          fontSize: "13px",
                          marginBottom: "6px",
                        }}
                      >
                        <span>{layout.emoji}</span>
                        {layout.label}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          color: "rgba(246,243,255,0.66)",
                          fontSize: "11px",
                          lineHeight: 1.35,
                        }}
                      >
                        {layout.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: 950,
                  color: "#ffffff",
                }}
              >
                {tr(language, "colors")}
              </span>

              <div
                className="premium-color-grid-inline"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "12px",
                }}
              >
                <label
                  className="premium-color-field"
                  style={{
                    padding: "14px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <span>{tr(language, "serverNameColor")}</span>
                  <input
                    type="color"
                    name="server_name_color"
                    value={serverNameColor}
                    disabled={!isPremiumOrPartner}
                    onChange={(event) => setServerNameColor(event.target.value)}
                  />
                  <small>{serverNameColor}</small>
                </label>

                <label
                  className="premium-color-field"
                  style={{
                    padding: "14px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <span>{tr(language, "textColor")}</span>
                  <input
                    type="color"
                    name="server_text_color"
                    value={serverTextColor}
                    disabled={!isPremiumOrPartner}
                    onChange={(event) => setServerTextColor(event.target.value)}
                  />
                  <small>{serverTextColor}</small>
                </label>

                {premiumLayout === "glow" ? (
                  <label
                    className="premium-color-field"
                    style={{
                      padding: "14px",
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.055)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <span>{tr(language, "glowColor")}</span>
                    <input
                      type="color"
                      name="premium_glow_color"
                      value={glowColor}
                      disabled={!isPremiumOrPartner}
                      onChange={(event) => setGlowColor(event.target.value)}
                    />
                    <small>{glowColor}</small>
                  </label>
                ) : (
                  <input
                    type="hidden"
                    name="premium_glow_color"
                    value={glowColor}
                  />
                )}
              </div>

              {premiumLayout !== "glow" && (
                <small
                  className="form-note"
                  style={{
                    display: "block",
                    marginTop: "10px",
                    color: "rgba(246,243,255,0.64)",
                  }}
                >
                  {tr(language, "glowOnly")}
                </small>
              )}
            </div>
          </div>

          <div className="profile-editor-actions">
            <button className="btn profile-save-button" type="submit">
              {tr(language, "save")}
            </button>

            <button
              className="btn danger"
              type="submit"
              formAction="/api/profile/delete-server"
              formMethod="POST"
              onClick={confirmDelete}
            >
              {tr(language, "delete")}
            </button>
          </div>
        </section>

        <aside id="profile-live-preview" className="profile-editor-preview">
          <div className="preview-sticky-box">
            <span className="page-badge">{tr(language, "previewBadge")}</span>
            <h3>{tr(language, "previewTitle")}</h3>
            <p>{tr(language, "previewText")}</p>

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
              {isPremiumOrPartner && premiumLayout === "glow" && (
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
                  ⭐ {tr(language, "noRatings")}
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
                      {serverName || tr(language, "serverName")}
                    </h3>

                    <p
                      style={{
                        color: isPremiumOrPartner ? serverTextColor : undefined,
                      }}
                    >
                      {server.category || tr(language, "categoryFallback")} •{" "}
                      {serverLanguage}
                    </p>
                  </div>
                </div>

                {isPremiumOrPartner && (
                  <div className="hero-premium-badges" style={{ marginBottom: 10 }}>
                    {server.premium_status && (
                      <span className="hero-premium-badge premium">
                        👑 {tr(language, "premiumBadge")}
                      </span>
                    )}

                    {server.partner_status && (
                      <span className="hero-premium-badge partner">
                        🤝 {tr(language, "partnerBadge")}
                      </span>
                    )}
                  </div>
                )}

                <div className="premium-server-meta-row">
                  <span className="premium-server-meta-pill online">
                    <span className="premium-online-dot" />
                    {formatOnlineCount(onlineCount, language)}
                  </span>

                  <span className="premium-server-meta-pill bump">
                    <span>⚡</span>
                    Bump: {formatLastBump(server.last_bump, language)}
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
                  {description || tr(language, "previewDescription")}
                </div>

                <div className="description-toggle-button fake-preview-toggle">
                  {tr(language, "showMore")}
                </div>

                <div className="server-directory-footer">
                  <button className="btn secondary" type="button">
                    {tr(language, "viewServer")}
                  </button>

                  <button className="btn" type="button">
                    {tr(language, "join")}
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
