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
type EditorTab = "banner" | "text" | "premium" | "invite";

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
    "--layout-accent": glowColor,
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
  } as CSSProperties & Record<string, string>;

  const layoutStyles: Record<PremiumLayout, CSSProperties> = {
    glow: {
      borderColor: glowColor,
      background:
        `radial-gradient(circle at 0% 0%, ${glowColor}30, transparent 40%), linear-gradient(180deg, rgba(18, 16, 42, 0.98), rgba(9, 10, 26, 0.98))`,
      boxShadow: `0 0 42px ${glowColor}88, 0 0 90px ${glowColor}44`,
    },
    starborder: {
      borderColor: "rgba(255, 220, 92, 0.96)",
      background:
        "radial-gradient(circle at 15% 15%, rgba(255, 232, 120, 0.24), transparent 36%), radial-gradient(circle at 88% 20%, rgba(255, 232, 120, 0.16), transparent 30%), linear-gradient(180deg, rgba(22, 18, 36, 0.98), rgba(8, 8, 18, 0.98))",
      boxShadow:
        "0 0 0 2px rgba(255, 220, 92, 0.35), 0 0 42px rgba(255, 220, 92, 0.38), 0 0 84px rgba(139, 92, 246, 0.24)",
    },
    sunset: {
      borderColor: "rgba(255, 146, 92, 0.92)",
      background:
        "radial-gradient(circle at 0% 0%, rgba(255, 117, 77, 0.30), transparent 42%), radial-gradient(circle at 100% 0%, rgba(244, 90, 214, 0.24), transparent 36%), linear-gradient(180deg, rgba(42, 20, 35, 0.98), rgba(18, 10, 24, 0.98))",
      boxShadow:
        "0 0 40px rgba(255, 122, 92, 0.36), 0 0 82px rgba(244, 90, 214, 0.24)",
    },
    aurora: {
      borderColor: "rgba(116, 223, 255, 0.92)",
      background:
        "linear-gradient(120deg, rgba(72, 211, 255, 0.18), rgba(181, 76, 255, 0.18), rgba(54, 255, 154, 0.12)), linear-gradient(180deg, rgba(12, 22, 38, 0.98), rgba(9, 10, 26, 0.98))",
      boxShadow:
        "0 0 40px rgba(116, 223, 255, 0.34), 0 0 86px rgba(181, 76, 255, 0.26)",
    },
    neon: {
      borderColor: "rgba(255, 75, 216, 0.95)",
      background:
        "radial-gradient(circle at 12% 20%, rgba(255, 75, 216, 0.34), transparent 35%), radial-gradient(circle at 92% 72%, rgba(116, 223, 255, 0.24), transparent 36%), linear-gradient(180deg, rgba(24, 10, 38, 0.98), rgba(8, 8, 18, 0.98))",
      boxShadow:
        "0 0 42px rgba(255, 75, 216, 0.40), 0 0 86px rgba(116, 223, 255, 0.22)",
    },
    galaxy: {
      borderColor: "rgba(165, 120, 255, 0.95)",
      background:
        "radial-gradient(circle at 25% 18%, rgba(165, 120, 255, 0.32), transparent 34%), radial-gradient(circle at 78% 70%, rgba(79, 70, 229, 0.30), transparent 36%), linear-gradient(180deg, rgba(15, 10, 36, 0.98), rgba(5, 6, 18, 0.98))",
      boxShadow:
        "0 0 42px rgba(139, 92, 246, 0.38), 0 0 88px rgba(61, 29, 135, 0.38)",
    },
    flame: {
      borderColor: "rgba(255, 117, 55, 0.96)",
      background:
        "radial-gradient(circle at 50% 100%, rgba(255, 117, 55, 0.34), transparent 42%), radial-gradient(circle at 15% 0%, rgba(255, 207, 64, 0.20), transparent 35%), linear-gradient(180deg, rgba(36, 14, 12, 0.98), rgba(12, 6, 10, 0.98))",
      boxShadow:
        "0 0 42px rgba(255, 117, 55, 0.40), 0 0 90px rgba(255, 207, 64, 0.20)",
    },
    ocean: {
      borderColor: "rgba(72, 211, 255, 0.95)",
      background:
        "radial-gradient(circle at 15% 80%, rgba(72, 211, 255, 0.32), transparent 38%), radial-gradient(circle at 90% 20%, rgba(52, 115, 255, 0.24), transparent 34%), linear-gradient(180deg, rgba(10, 24, 42, 0.98), rgba(5, 10, 22, 0.98))",
      boxShadow:
        "0 0 42px rgba(72, 211, 255, 0.38), 0 0 86px rgba(52, 115, 255, 0.24)",
    },
  };

  return {
    ...base,
    ...layoutStyles[layout],
  };
}

function isEnabled(value: unknown) {
  const normalized = String(value ?? "").trim().toLowerCase();

  return (
    value === true ||
    value === 1 ||
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "on"
  );
}

export default function ProfileServerEditor({ server }: { server: any }) {
  const language = useLanguage() as UiLanguage;

  const isPremiumOrPartner =
    isEnabled(server.premium_status) || isEnabled(server.partner_status);

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

  const [activeEditorTab, setActiveEditorTab] =
    useState<EditorTab>("banner");

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
      className="profile-edit-card profile-editor-modern"
    >
      <input type="hidden" name="server_id" value={server.id} />
      <input type="hidden" name="server_name" value={serverName} />
      <input type="hidden" name="language" value={serverLanguage} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="inviteLink" value={inviteLink} />
      <input type="hidden" name="invite_link" value={inviteLink} />
      <input type="hidden" name="banner_position_x" value={bannerX} />
      <input type="hidden" name="banner_position_y" value={bannerY} />
      <input type="hidden" name="banner_zoom" value={bannerZoom} />
      <input type="hidden" name="premium_layout" value={premiumLayout} />
      <input type="hidden" name="server_name_color" value={serverNameColor} />
      <input type="hidden" name="server_text_color" value={serverTextColor} />
      <input type="hidden" name="premium_glow_color" value={glowColor} />

      <style>{`
        .profile-editor-modern {
          width: 100%;
          max-width: 100%;
          overflow: visible;
        }

        .profile-editor-modern-title {
          margin: 0 0 16px;
          color: #ffffff;
          font-size: clamp(1.35rem, 3vw, 2.2rem);
          line-height: 1.05;
          font-weight: 950;
          letter-spacing: -0.04em;
        }

        .profile-editor-tabs {
          position: sticky;
          top: 82px;
          z-index: 80;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin: 0 0 16px;
          padding: 8px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.18), transparent 36%),
            rgba(10, 10, 26, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.11);
          box-shadow:
            0 18px 46px rgba(0, 0, 0, 0.34),
            0 0 28px rgba(139, 92, 246, 0.14);
          backdrop-filter: blur(16px);
        }

        .profile-editor-tabs button {
          min-height: 42px;
          border: 0;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: rgba(246, 243, 255, 0.82);
          font-size: 13px;
          font-weight: 950;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .profile-editor-tabs button.active {
          color: #ffffff;
          background: linear-gradient(135deg, rgba(181, 76, 255, 0.34), rgba(116, 223, 255, 0.18));
          border-color: rgba(116, 223, 255, 0.28);
          box-shadow: 0 0 24px rgba(116, 223, 255, 0.12);
        }

        .profile-editor-workbench {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 390px);
          gap: 18px;
          align-items: start;
        }

        .profile-editor-panel,
        .profile-preview-panel {
          min-width: 0;
          border-radius: 30px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.12), transparent 36%),
            linear-gradient(180deg, rgba(38, 31, 62, 0.82), rgba(17, 15, 36, 0.92));
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.025) inset,
            0 0 34px rgba(139, 92, 246, 0.10);
        }

        .profile-editor-panel {
          padding: clamp(16px, 3vw, 24px);
        }

        .profile-preview-panel {
          position: sticky;
          top: 154px;
          padding: 14px;
        }

        .profile-panel-head {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
        }

        .profile-panel-icon {
          width: 46px;
          height: 46px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          font-size: 20px;
          background: linear-gradient(135deg, rgba(181, 76, 255, 0.30), rgba(116, 223, 255, 0.16));
          border: 1px solid rgba(255, 255, 255, 0.13);
          box-shadow: 0 0 24px rgba(217, 70, 239, 0.16);
        }

        .profile-panel-head h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.3rem;
          line-height: 1.1;
          font-weight: 950;
        }

        .profile-panel-head p {
          margin: 8px 0 0;
          color: rgba(246, 243, 255, 0.72);
          line-height: 1.55;
        }

        .profile-editor-modern .field {
          display: grid;
          gap: 8px;
          margin-bottom: 14px;
        }

        .profile-editor-modern .field span,
        .profile-editor-modern .control-label {
          color: rgba(246, 243, 255, 0.92);
          font-size: 13px;
          font-weight: 950;
        }

        .profile-editor-modern .input,
        .profile-editor-modern select,
        .profile-editor-modern textarea {
          width: 100%;
          min-width: 0;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.07);
          color: #ffffff;
          outline: none;
          font-weight: 800;
        }

        .profile-editor-modern .input,
        .profile-editor-modern select {
          min-height: 50px;
          padding: 0 14px;
        }

        .profile-editor-modern textarea {
          min-height: 190px;
          padding: 14px;
          resize: vertical;
          line-height: 1.55;
        }

        .profile-editor-modern input[type="file"] {
          width: 100%;
          min-height: 48px;
          padding: 10px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(246, 243, 255, 0.88);
        }

        .banner-slider-card {
          display: grid;
          gap: 16px;
        }

        .banner-slider-card input[type="range"] {
          width: 100%;
          height: 46px;
          accent-color: #75ddff;
        }

        .profile-mini-note,
        .form-note,
        .char-counter {
          color: rgba(246, 243, 255, 0.62);
          font-size: 12px;
          line-height: 1.45;
        }

        .premium-layout-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
        }

        .premium-layout-button-modern {
          min-height: 86px;
          padding: 12px;
          border-radius: 18px;
          color: #ffffff;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .premium-layout-button-modern.active {
          border-color: rgba(116, 223, 255, 0.62);
          background: linear-gradient(135deg, rgba(180, 76, 255, 0.30), rgba(116, 223, 255, 0.18));
          box-shadow: 0 0 26px rgba(116, 223, 255, 0.18);
        }

        .premium-layout-button-modern strong {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 6px;
          font-size: 13px;
        }

        .premium-layout-button-modern span:last-child {
          display: block;
          color: rgba(246, 243, 255, 0.66);
          font-size: 11px;
          line-height: 1.35;
        }

        .premium-color-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .premium-color-field-modern {
          display: grid;
          gap: 8px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .premium-color-field-modern input[type="color"] {
          width: 100%;
          height: 42px;
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
        }

        .profile-editor-actions-modern {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 18px;
        }

        .profile-editor-actions-modern .btn {
          width: 100%;
          min-height: 48px;
        }

        .profile-preview-panel .preview-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .profile-preview-panel .preview-heading strong {
          color: #ffffff;
          font-size: 14px;
        }

        .profile-preview-panel .preview-heading span {
          color: rgba(246, 243, 255, 0.62);
          font-size: 12px;
          font-weight: 800;
        }

        .server-list-live-preview.profile-live-card {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          border-radius: 24px;
          overflow: hidden;
        }

        .profile-live-card .server-directory-banner {
          height: 132px;
        }

        .profile-live-card .server-directory-body {
          padding: 0 16px 16px;
        }

        .profile-live-card .server-directory-top {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 12px;
          align-items: end;
          margin-top: -26px;
        }

        .profile-live-card .server-directory-logo {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          border-width: 3px;
        }

        .profile-live-card .server-directory-title {
          min-width: 0;
        }

        .profile-live-card .server-directory-title h3,
        .profile-live-card .server-directory-title p {
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .profile-live-card .server-directory-title h3 {
          font-size: 20px;
          line-height: 1.08;
        }

        .profile-live-card .server-directory-title p {
          font-size: 12px;
        }

        .profile-live-card .hero-premium-badges {
          margin: 10px 0;
          gap: 7px;
        }

        .profile-live-card .hero-premium-badge {
          min-height: 26px;
          padding: 0 9px;
          font-size: 10px;
        }

        .profile-live-card .premium-server-meta-row {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 8px;
          margin: 10px 0;
        }

        .profile-live-card .premium-server-meta-pill {
          min-width: 0;
          min-height: 31px;
          padding: 0 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 999px;
          font-size: 10.5px;
          font-weight: 950;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-live-card .server-directory-badges {
          gap: 7px;
          margin: 9px 0;
        }

        .profile-live-card .badge {
          min-height: 27px;
          padding: 0 9px;
          font-size: 10.5px;
        }

        .profile-live-card .server-directory-description {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-height: 98px;
          margin-top: 10px;
          padding: 12px;
          border-radius: 17px;
          font-size: 12px;
          line-height: 1.55;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .profile-live-card .fake-preview-toggle {
          margin-top: 8px;
          font-size: 13px;
        }

        .profile-live-card .server-directory-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 12px;
        }

        .profile-live-card .server-directory-footer .btn {
          width: 100%;
          min-height: 40px;
          border-radius: 14px;
          font-size: 12px;
        }

                .profile-live-card .premium-layout-effect {
          position: absolute !important;
          inset: 0 !important;
          z-index: 2 !important;
          pointer-events: none !important;
          border-radius: inherit !important;
          overflow: hidden !important;
        }

        .profile-live-card .premium-layout-effect::before,
        .profile-live-card .premium-layout-effect::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.72;
          pointer-events: none;
        }

        .profile-live-card.premium-layout-starborder .premium-layout-effect::before {
          background-image:
            radial-gradient(circle at 12% 18%, rgba(255, 232, 120, 0.72) 0 2px, transparent 3px),
            radial-gradient(circle at 86% 22%, rgba(255, 232, 120, 0.62) 0 2px, transparent 3px),
            radial-gradient(circle at 74% 82%, rgba(255, 232, 120, 0.50) 0 1px, transparent 2px);
        }

        .profile-live-card.premium-layout-sunset .premium-layout-effect::before {
          background: linear-gradient(135deg, rgba(255, 117, 77, 0.24), transparent 42%, rgba(244, 90, 214, 0.24));
        }

        .profile-live-card.premium-layout-aurora .premium-layout-effect::before {
          background: linear-gradient(120deg, rgba(116, 223, 255, 0.20), rgba(181, 76, 255, 0.18), rgba(54, 255, 154, 0.12));
          filter: blur(1px);
        }

        .profile-live-card.premium-layout-neon .premium-layout-effect::before {
          background:
            radial-gradient(circle at 12% 20%, rgba(255, 75, 216, 0.28), transparent 32%),
            radial-gradient(circle at 92% 72%, rgba(116, 223, 255, 0.20), transparent 34%);
        }

        .profile-live-card.premium-layout-galaxy .premium-layout-effect::before {
          background:
            radial-gradient(circle at 25% 18%, rgba(165, 120, 255, 0.28), transparent 32%),
            radial-gradient(circle at 78% 70%, rgba(79, 70, 229, 0.26), transparent 34%);
        }

        .profile-live-card.premium-layout-flame .premium-layout-effect::before {
          background:
            radial-gradient(circle at 50% 100%, rgba(255, 117, 55, 0.28), transparent 38%),
            linear-gradient(180deg, transparent, rgba(255, 207, 64, 0.12));
        }

        .profile-live-card.premium-layout-ocean .premium-layout-effect::before {
          background:
            radial-gradient(circle at 15% 80%, rgba(72, 211, 255, 0.26), transparent 34%),
            linear-gradient(135deg, transparent, rgba(52, 115, 255, 0.18));
        }

        @media (max-width: 900px) {
          .profile-editor-tabs {
            top: 70px;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 6px;
            margin-bottom: 12px;
            padding: 6px;
            border-radius: 18px;
          }

          .profile-editor-tabs button {
            min-height: 38px;
            gap: 4px;
            padding: 0 5px;
            font-size: 11px;
          }

          .profile-editor-workbench {
            grid-template-columns: minmax(0, 1fr) minmax(170px, 42vw);
            gap: 10px;
            align-items: start;
          }

          .profile-editor-panel,
          .profile-preview-panel {
            border-radius: 22px;
          }

          .profile-editor-panel {
            padding: 12px;
          }

          .profile-preview-panel {
            position: sticky;
            top: 124px;
            padding: 7px;
            max-height: none;
            overflow: visible;
          }

          .profile-panel-head {
            gap: 8px;
            margin-bottom: 10px;
          }

          .profile-panel-icon {
            width: 36px;
            height: 36px;
            border-radius: 13px;
            font-size: 16px;
          }

          .profile-panel-head h3 {
            font-size: 1.05rem;
          }

          .profile-panel-head p {
            display: none;
          }

          .profile-editor-modern .input,
          .profile-editor-modern select {
            min-height: 44px;
            padding: 0 11px;
            font-size: 13px;
          }

          .profile-editor-modern textarea {
            min-height: 140px;
            padding: 11px;
            font-size: 13px;
          }

          .profile-editor-modern input[type="file"] {
            min-height: 44px;
            padding: 8px;
            font-size: 12px;
          }

          .banner-slider-card {
            gap: 12px;
          }

          .banner-slider-card input[type="range"] {
            height: 44px;
          }

          .premium-layout-grid-modern,
          .premium-color-grid-modern {
            grid-template-columns: 1fr;
          }

          .premium-layout-button-modern {
            min-height: 70px;
            padding: 10px;
          }

          .profile-editor-actions-modern {
            grid-template-columns: 1fr;
          }

          .profile-preview-panel .preview-heading {
            display: none;
          }

          .profile-live-card .server-directory-banner {
            height: 96px;
          }

          .profile-live-card .server-directory-body {
            padding: 0 8px 8px;
          }

          .profile-live-card .server-directory-top {
            grid-template-columns: 42px minmax(0, 1fr);
            gap: 7px;
            margin-top: -19px;
          }

          .profile-live-card .server-directory-logo {
            width: 42px;
            height: 42px;
            border-radius: 13px;
          }

          .profile-live-card .server-directory-title h3 {
            font-size: 14px;
          }

          .profile-live-card .server-directory-title p {
            font-size: 9.5px;
          }

          .profile-live-card .hero-premium-badges {
            margin: 6px 0;
          }

          .profile-live-card .hero-premium-badge {
            min-height: 21px;
            padding: 0 6px;
            font-size: 8.5px;
          }

          .profile-live-card .premium-server-meta-row {
            grid-template-columns: 1fr;
            gap: 5px;
            margin: 6px 0;
          }

          .profile-live-card .premium-server-meta-pill {
            min-height: 24px;
            padding: 0 5px;
            font-size: 8.5px;
          }

          .profile-live-card .server-directory-badges {
            gap: 4px;
            margin: 6px 0;
          }

          .profile-live-card .badge {
            min-height: 21px;
            padding: 0 6px;
            font-size: 8.5px;
          }

          .profile-live-card .server-directory-description {
            -webkit-line-clamp: 2;
            max-height: 45px;
            margin-top: 6px;
            padding: 8px;
            border-radius: 13px;
            font-size: 10px;
            line-height: 1.35;
          }

          .profile-live-card .fake-preview-toggle {
            display: none;
          }

          .profile-live-card .server-directory-footer {
            grid-template-columns: 1fr;
            gap: 5px;
            margin-top: 7px;
          }

          .profile-live-card .server-directory-footer .btn {
            min-height: 30px;
            border-radius: 11px;
            font-size: 9.5px;
          }
          .profile-editor-panel .field span {
            font-size: 12px;
            line-height: 1.15;
          }

          .profile-editor-panel .profile-mini-note {
            display: block;
            margin-top: 8px;
            font-size: 11px;
          }

          .profile-live-card .server-directory-footer {
            display: none;
          }
        }

        @media (max-width: 430px) {
          .profile-editor-workbench {
            grid-template-columns: minmax(0, 1fr) minmax(165px, 44vw);
            gap: 8px;
          }

          .profile-editor-tabs button {
            font-size: 10px;
          }

          .profile-editor-panel {
            padding: 10px;
          }

          .profile-preview-panel {
            top: 122px;
            padding: 6px;
          }
        }

        /* FINAL MOBILE DASHBOARD FIX:
           Handy nutzt jetzt volle Breite fürs Bearbeiten.
           Die Vorschau bleibt kompakt oben sticky, statt alles links/rechts zu quetschen. */
        @media (max-width: 900px) {
          .profile-editor-modern {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            overflow: visible !important;
          }

          .profile-editor-modern-title {
            margin: 0 0 12px !important;
            padding: 0 4px !important;
            font-size: 1.55rem !important;
          }

          .profile-editor-tabs {
            position: sticky !important;
            top: 74px !important;
            z-index: 120 !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 6px !important;
            margin: 0 0 12px !important;
            padding: 6px !important;
            border-radius: 18px !important;
          }

          .profile-editor-tabs button {
            min-height: 40px !important;
            padding: 0 5px !important;
            font-size: 11px !important;
            gap: 4px !important;
          }

          .profile-editor-workbench {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
          }

          .profile-preview-panel {
            order: -1 !important;
            position: sticky !important;
            top: 128px !important;
            z-index: 80 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            padding: 10px !important;
            border-radius: 24px !important;
            max-height: 43dvh !important;
            overflow-y: auto !important;
            overscroll-behavior: contain !important;
            background:
              radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.16), transparent 36%),
              linear-gradient(180deg, rgba(15, 14, 36, 0.96), rgba(9, 9, 24, 0.96)) !important;
            box-shadow:
              0 18px 56px rgba(0, 0, 0, 0.44),
              0 0 28px rgba(116, 223, 255, 0.10) !important;
          }

          .profile-preview-panel .preview-heading {
            display: none !important;
          }

          .profile-editor-panel {
            order: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            padding: 16px !important;
            border-radius: 24px !important;
          }

          .profile-panel-head {
            display: grid !important;
            grid-template-columns: 40px minmax(0, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 14px !important;
          }

          .profile-panel-head p {
            display: block !important;
            margin-top: 5px !important;
            font-size: 12px !important;
            line-height: 1.35 !important;
          }

          .profile-panel-icon {
            width: 40px !important;
            height: 40px !important;
            border-radius: 14px !important;
            font-size: 17px !important;
          }

          .profile-editor-modern .input,
          .profile-editor-modern select {
            min-height: 48px !important;
            font-size: 14px !important;
          }

          .profile-editor-modern textarea {
            min-height: 150px !important;
            font-size: 14px !important;
          }

          .profile-editor-modern input[type="file"] {
            min-height: 48px !important;
            font-size: 13px !important;
          }

          .banner-slider-card {
            gap: 16px !important;
          }

          .banner-slider-card input[type="range"] {
            height: 54px !important;
          }

          .premium-layout-grid-modern,
          .premium-color-grid-modern {
            grid-template-columns: 1fr !important;
          }

          .premium-layout-button-modern {
            min-height: 74px !important;
          }

          .profile-editor-actions-modern {
            grid-template-columns: 1fr !important;
          }

          .profile-live-card {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 22px !important;
            transform: none !important;
          }

          .profile-live-card .server-directory-banner {
            height: 118px !important;
          }

          .profile-live-card .server-directory-body {
            padding: 0 12px 12px !important;
          }

          .profile-live-card .server-directory-top {
            grid-template-columns: 52px minmax(0, 1fr) !important;
            gap: 9px !important;
            margin-top: -24px !important;
          }

          .profile-live-card .server-directory-logo {
            width: 52px !important;
            height: 52px !important;
            border-radius: 16px !important;
          }

          .profile-live-card .server-directory-title h3 {
            font-size: 19px !important;
            line-height: 1.05 !important;
          }

          .profile-live-card .server-directory-title p {
            font-size: 11.5px !important;
          }

          .profile-live-card .hero-premium-badges {
            display: flex !important;
            margin: 8px 0 !important;
            gap: 6px !important;
          }

          .profile-live-card .hero-premium-badge {
            min-height: 24px !important;
            padding: 0 8px !important;
            font-size: 9.5px !important;
          }

          .profile-live-card .premium-server-meta-row {
            display: grid !important;
            grid-template-columns: 1fr 1.1fr !important;
            gap: 7px !important;
            margin: 8px 0 !important;
          }

          .profile-live-card .premium-server-meta-pill {
            min-height: 29px !important;
            padding: 0 7px !important;
            font-size: 10px !important;
          }

          .profile-live-card .server-directory-badges {
            gap: 6px !important;
            margin: 8px 0 !important;
          }

          .profile-live-card .badge {
            min-height: 24px !important;
            padding: 0 8px !important;
            font-size: 9.8px !important;
          }

          .profile-live-card .server-directory-description {
            -webkit-line-clamp: 3 !important;
            max-height: 74px !important;
            margin-top: 8px !important;
            padding: 10px !important;
            border-radius: 15px !important;
            font-size: 11px !important;
            line-height: 1.45 !important;
          }

          .profile-live-card .fake-preview-toggle {
            display: none !important;
          }

          .profile-live-card .server-directory-footer {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 7px !important;
            margin-top: 9px !important;
          }

          .profile-live-card .server-directory-footer .btn {
            min-height: 34px !important;
            border-radius: 12px !important;
            font-size: 10.5px !important;
          }
        }

        @media (max-width: 430px) {
          .profile-editor-tabs {
            top: 70px !important;
          }

          .profile-preview-panel {
            top: 124px !important;
            max-height: 40dvh !important;
            padding: 8px !important;
          }

          .profile-editor-panel {
            padding: 14px !important;
          }

          .profile-live-card .server-directory-banner {
            height: 104px !important;
          }

          .profile-live-card .server-directory-top {
            grid-template-columns: 46px minmax(0, 1fr) !important;
            margin-top: -21px !important;
          }

          .profile-live-card .server-directory-logo {
            width: 46px !important;
            height: 46px !important;
          }

          .profile-live-card .server-directory-title h3 {
            font-size: 16px !important;
          }

          .profile-live-card .server-directory-title p {
            font-size: 10px !important;
          }

          .profile-live-card .premium-server-meta-row {
            grid-template-columns: 1fr !important;
          }

          .profile-live-card .server-directory-footer {
            grid-template-columns: 1fr !important;
          }
        }

      `}</style>

      <h3 className="profile-editor-modern-title">{tr(language, "editTitle")}</h3>

      <div className="profile-editor-tabs" aria-label="Editor Bereiche">
        {[
          { key: "banner", icon: "🖼️", label: "Banner" },
          { key: "text", icon: "✏️", label: "Text" },
          { key: "premium", icon: "👑", label: "Premium" },
          { key: "invite", icon: "🔗", label: "Invite" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={activeEditorTab === tab.key ? "active" : ""}
            onClick={() => setActiveEditorTab(tab.key as EditorTab)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="profile-editor-workbench">
        <section className="profile-editor-panel">
          {activeEditorTab === "banner" && (
            <div>
              <div className="profile-panel-head">
                <div className="profile-panel-icon">🖼️</div>
                <div>
                  <h3>{tr(language, "bannerPositionTitle")}</h3>
                  <p>{tr(language, "bannerPositionText")}</p>
                </div>
              </div>

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

              <small className="profile-mini-note">{tr(language, "logoAuto")}</small>

              <div className="banner-slider-card" style={{ marginTop: 16 }}>
                <label className="field">
                  <span>
                    {tr(language, "horizontal")}: {bannerX}%
                  </span>
                  <input
                    type="range"
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
                    min="1"
                    max="2.5"
                    step="0.1"
                    value={bannerZoom}
                    onChange={(event) => setBannerZoom(Number(event.target.value))}
                  />
                </label>
              </div>
            </div>
          )}

          {activeEditorTab === "text" && (
            <div>
              <div className="profile-panel-head">
                <div className="profile-panel-icon">✏️</div>
                <div>
                  <h3>{tr(language, "serverName")}</h3>
                  <p>{tr(language, "description")}</p>
                </div>
              </div>

              <label className="field">
                <span>{tr(language, "serverName")}</span>
                <input
                  className="input"
                  value={serverName}
                  placeholder={tr(language, "serverNamePlaceholder")}
                  onChange={(event) => setServerName(event.target.value)}
                />
              </label>

              <label className="field">
                <span>{tr(language, "language")}</span>
                <select
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

              <label className="field full">
                <span>{tr(language, "description")}</span>
                <textarea
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
                  {countWords(description)}/{MAX_DESCRIPTION_WORDS} {tr(language, "words")}
                </small>
              </label>
            </div>
          )}

          {activeEditorTab === "premium" && (
            <div>
              <div className="profile-panel-head">
                <button
                  type="button"
                  className="profile-panel-icon"
                  onClick={showLockedNotice}
                  aria-label={tr(language, "lockedButton")}
                  style={{ color: "#ffffff", cursor: "pointer" }}
                >
                  👑
                </button>
                <div>
                  <h3>{tr(language, "premiumTitle")}</h3>
                  <p>{tr(language, "premiumText")}</p>
                </div>
              </div>

              {lockedNotice && !isPremiumOrPartner && (
                <div
                  style={{
                    marginBottom: "16px",
                    padding: "14px",
                    borderRadius: "18px",
                    background: "rgba(255, 207, 64, 0.09)",
                    border: "1px solid rgba(255, 207, 64, 0.22)",
                  }}
                >
                  <strong>{tr(language, "premiumLockedTitle")}</strong>
                  <p style={{ margin: "8px 0 12px", color: "rgba(246,243,255,0.72)" }}>
                    {tr(language, "premiumLockedText")}
                  </p>
                  <Link href="/shop" className="btn">
                    {tr(language, "shop")}
                  </Link>
                </div>
              )}

              <span className="control-label">{tr(language, "chooseLayout")}</span>
              <div className="premium-layout-grid-modern" style={{ marginTop: 10 }}>
                {PREMIUM_LAYOUTS.map((layout) => {
                  const active = premiumLayout === layout.value;

                  return (
                    <button
                      key={layout.value}
                      type="button"
                      className={
                        "premium-layout-button-modern" + (active ? " active" : "")
                      }
                      onClick={() => {
                        setPremiumLayout(layout.value);

                        if (!isPremiumOrPartner) {
                          setLockedNotice(true);
                        }
                      }}
                    >
                      <strong>
                        <span>{layout.emoji}</span>
                        {layout.label}
                      </strong>
                      <span>{layout.description}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: 18 }}>
                <span className="control-label">{tr(language, "colors")}</span>

                <div className="premium-color-grid-modern">
                  <label className="premium-color-field-modern">
                    <span>{tr(language, "serverNameColor")}</span>
                    <input
                      type="color"
                      value={serverNameColor}
                      onChange={(event) => setServerNameColor(event.target.value)}
                    />
                    <small>{serverNameColor}</small>
                  </label>

                  <label className="premium-color-field-modern">
                    <span>{tr(language, "textColor")}</span>
                    <input
                      type="color"
                      value={serverTextColor}
                      onChange={(event) => setServerTextColor(event.target.value)}
                    />
                    <small>{serverTextColor}</small>
                  </label>

                  <label className="premium-color-field-modern">
                    <span>{tr(language, "glowColor")}</span>
                    <input
                      type="color"
                      value={glowColor}
                      onChange={(event) => setGlowColor(event.target.value)}
                    />
                    <small>{glowColor}</small>
                  </label>
                </div>

                {premiumLayout !== "glow" && (
                  <small className="profile-mini-note" style={{ display: "block", marginTop: 10 }}>
                    {tr(language, "glowOnly")}
                  </small>
                )}
              </div>
            </div>
          )}

          {activeEditorTab === "invite" && (
            <div>
              <div className="profile-panel-head">
                <div className="profile-panel-icon">🔗</div>
                <div>
                  <h3>{tr(language, "inviteTitle")}</h3>
                  <p>{tr(language, "inviteText")}</p>
                </div>
              </div>

              <label className="field full">
                <span>{tr(language, "inviteLabel")}</span>
                <input
                  className="input"
                  type="url"
                  value={inviteLink}
                  placeholder={tr(language, "invitePlaceholder")}
                  onChange={(event) => setInviteLink(event.target.value)}
                />
              </label>

              <small className="profile-mini-note">{tr(language, "inviteHint")}</small>
            </div>
          )}

          <div className="profile-editor-actions-modern">
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

        <aside className="profile-preview-panel">
          <div className="preview-heading">
            <strong>{tr(language, "previewTitle")}</strong>
            <span>{tr(language, "previewBadge")}</span>
          </div>

          <article
            key={premiumLayout}
            className={
              "server-directory-card server-list-live-preview profile-live-card " +
              (isPremiumOrPartner
                ? "server-directory-card-premium premium-layout-" + premiumLayout
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
                <img src={bannerPreview} alt="Banner preview" style={bannerStyle} />
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

              <div className="server-directory-rating">⭐ {tr(language, "noRatings")}</div>
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
                  <h3 style={{ color: isPremiumOrPartner ? serverNameColor : undefined }}>
                    {serverName || tr(language, "serverName")}
                  </h3>

                  <p style={{ color: isPremiumOrPartner ? serverTextColor : undefined }}>
                    {server.category || tr(language, "categoryFallback")} • {serverLanguage}
                  </p>
                </div>
              </div>

              {isPremiumOrPartner && (
                <div className="hero-premium-badges">
                  {isEnabled(server.premium_status) && (
                    <span className="hero-premium-badge premium">
                      👑 {tr(language, "premiumBadge")}
                    </span>
                  )}

                  {isEnabled(server.partner_status) && (
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
                style={{ color: isPremiumOrPartner ? serverTextColor : undefined }}
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
        </aside>
      </div>
    </form>
  );
}
