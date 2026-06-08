import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { categories, languages } from "@/lib/demoData";
import TagInput from "@/components/TagInput";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

const SUBMIT_TEXT = {
  de: {
    loginBadge: "Discord Login erforderlich",
    loginTitle: "Login erforderlich",
    loginText: "Du musst dich mit Discord einloggen, bevor du einen Server eintragen kannst.",
    loginButton: "Mit Discord einloggen",

    badge: "Ein Server pro Discord-Nutzer",
    title: "Discord Server eintragen",
    intro: "Füge deine Community zu Asko Cafe hinzu. Nach dem Eintragen wirst du zu Discord weitergeleitet, damit du den Asko Cafe Bot einladen kannst.",

    serverName: "Servername",
    serverNamePlaceholder: "Beispiel: Asko Community",
    inviteLink: "Discord Einladungslink",
    description: "Beschreibung",
    descriptionPlaceholder: "Beschreibe deinen Discord Server...",
    maxWords: "Maximal 1500 Wörter.",
    banner: "Server-Banner",
    category: "Kategorie",
    language: "Sprache",
    tags: "Tags",
    nsfw: "Dieser Server enthält NSFW-Inhalte",
    submitButton: "Server eintragen und Bot einladen",
    note: "Das Server-Logo wird automatisch vom Discord-Server übernommen, sobald der Invite-Link gültig ist. Nach dem Eintragen wirst du zu Discord weitergeleitet, damit du den Asko Cafe Bot einladen kannst.",

    approvalTitle: "So funktioniert die Freigabe",
    step1Title: "Server eintragen",
    step1Text: "Trage deinen Server ohne Server-ID und ohne Logo-Upload ein.",
    step2Title: "Bot einladen",
    step2Text: "Nach dem Eintragen öffnet sich automatisch die Bot-Einladung.",
    step3Title: "Admin-Prüfung",
    step3Text: "Nach Freigabe kann dein Server gebumpt werden.",
  },

  en: {
    loginBadge: "Discord login required",
    loginTitle: "Login required",
    loginText: "You need to login with Discord before submitting a server.",
    loginButton: "Login with Discord",

    badge: "One server per Discord user",
    title: "Submit your Discord Server",
    intro: "Add your community to Asko Cafe. After submission, you will be sent to Discord to invite the Asko Cafe bot.",

    serverName: "Server name",
    serverNamePlaceholder: "Example: Asko Community",
    inviteLink: "Discord invite link",
    description: "Description",
    descriptionPlaceholder: "Describe your Discord server...",
    maxWords: "Maximum 1500 words.",
    banner: "Server banner",
    category: "Category",
    language: "Language",
    tags: "Tags",
    nsfw: "This server contains NSFW content",
    submitButton: "Submit server and invite bot",
    note: "The server logo will automatically be taken from the Discord server once the invite link is valid. After submitting, you will be redirected to Discord to invite the Asko Cafe bot.",

    approvalTitle: "How approval works",
    step1Title: "Submit your server",
    step1Text: "Submit your server without a server ID and without uploading a logo.",
    step2Title: "Invite the bot",
    step2Text: "After submitting, the bot invitation opens automatically.",
    step3Title: "Admin review",
    step3Text: "After approval, your server can be bumped.",
  },

  fr: {
    loginBadge: "Connexion Discord requise",
    loginTitle: "Connexion requise",
    loginText: "Tu dois te connecter avec Discord avant d'ajouter un serveur.",
    loginButton: "Se connecter avec Discord",

    badge: "Un serveur par utilisateur Discord",
    title: "Ajouter ton serveur Discord",
    intro: "Ajoute ta communauté à Asko Cafe. Après l'envoi, tu seras redirigé vers Discord pour inviter le bot Asko Cafe.",

    serverName: "Nom du serveur",
    serverNamePlaceholder: "Exemple : Asko Community",
    inviteLink: "Lien d'invitation Discord",
    description: "Description",
    descriptionPlaceholder: "Décris ton serveur Discord...",
    maxWords: "Maximum 1500 mots.",
    banner: "Bannière du serveur",
    category: "Catégorie",
    language: "Langue",
    tags: "Tags",
    nsfw: "Ce serveur contient du contenu NSFW",
    submitButton: "Ajouter le serveur et inviter le bot",
    note: "Le logo du serveur sera automatiquement repris depuis le serveur Discord dès que le lien d'invitation sera valide. Après l'envoi, tu seras redirigé vers Discord pour inviter le bot Asko Cafe.",

    approvalTitle: "Fonctionnement de l'approbation",
    step1Title: "Ajouter ton serveur",
    step1Text: "Ajoute ton serveur sans ID de serveur et sans téléchargement de logo.",
    step2Title: "Inviter le bot",
    step2Text: "Après l'envoi, l'invitation du bot s'ouvre automatiquement.",
    step3Title: "Vérification admin",
    step3Text: "Après validation, ton serveur pourra être bumpé.",
  },

  it: {
    loginBadge: "Accesso Discord richiesto",
    loginTitle: "Accesso richiesto",
    loginText: "Devi accedere con Discord prima di aggiungere un server.",
    loginButton: "Accedi con Discord",

    badge: "Un server per utente Discord",
    title: "Aggiungi il tuo server Discord",
    intro: "Aggiungi la tua community ad Asko Cafe. Dopo l'invio, verrai reindirizzato su Discord per invitare il bot Asko Cafe.",

    serverName: "Nome del server",
    serverNamePlaceholder: "Esempio: Asko Community",
    inviteLink: "Link di invito Discord",
    description: "Descrizione",
    descriptionPlaceholder: "Descrivi il tuo server Discord...",
    maxWords: "Massimo 1500 parole.",
    banner: "Banner del server",
    category: "Categoria",
    language: "Lingua",
    tags: "Tag",
    nsfw: "Questo server contiene contenuti NSFW",
    submitButton: "Aggiungi server e invita bot",
    note: "Il logo del server verrà preso automaticamente dal server Discord non appena il link di invito sarà valido. Dopo l'invio, verrai reindirizzato su Discord per invitare il bot Asko Cafe.",

    approvalTitle: "Come funziona l'approvazione",
    step1Title: "Aggiungi il server",
    step1Text: "Aggiungi il server senza ID server e senza caricare un logo.",
    step2Title: "Invita il bot",
    step2Text: "Dopo l'invio, l'invito del bot si apre automaticamente.",
    step3Title: "Revisione admin",
    step3Text: "Dopo l'approvazione, il server potrà essere bumpato.",
  },

  pl: {
    loginBadge: "Wymagane logowanie Discord",
    loginTitle: "Wymagane logowanie",
    loginText: "Musisz zalogować się przez Discord, zanim dodasz serwer.",
    loginButton: "Zaloguj przez Discord",

    badge: "Jeden serwer na użytkownika Discord",
    title: "Dodaj swój ser
