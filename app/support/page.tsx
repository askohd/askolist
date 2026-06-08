import { cookies } from "next/headers";
import Link from "next/link";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

const SUPPORT_TEXT = {
  de: {
    badge: "Support",
    title: "Wie können wir helfen?",
    text: "Hier findest du Hilfe zu Servern, Premium, Freigaben und deinem Account.",
    serverHelpTitle: "Server Hilfe",
    serverHelpText:
      "Probleme beim Server eintragen, Banner hochladen oder Bot einladen.",
    premiumHelpTitle: "Premium Hilfe",
    premiumHelpText:
      "Fragen zu Premium Layouts, Farben, Glow Effekten oder Partner Funktionen.",
    accountHelpTitle: "Account Hilfe",
    accountHelpText:
      "Probleme beim Login, Server Dashboard oder mit deinem Discord Account.",
    button: "Zum Server Dashboard",
    submit: "Server eintragen",
  },
  en: {
    badge: "Support",
    title: "How can we help?",
    text: "Get help with servers, premium, approvals and your account.",
    serverHelpTitle: "Server Help",
    serverHelpText:
      "Issues with submitting a server, uploading a banner or inviting the bot.",
    premiumHelpTitle: "Premium Help",
    premiumHelpText:
      "Questions about premium layouts, colors, glow effects or partner features.",
    accountHelpTitle: "Account Help",
    accountHelpText:
      "Issues with login, server dashboard or your Discord account.",
    button: "Go to Server Dashboard",
    submit: "Submit Server",
  },
  fr: {
    badge: "Support",
    title: "Comment pouvons-nous aider ?",
    text: "Obtiens de l'aide pour les serveurs, Premium, les validations et ton compte.",
    serverHelpTitle: "Aide serveur",
    serverHelpText:
      "Problèmes pour ajouter un serveur, téléverser une bannière ou inviter le bot.",
    premiumHelpTitle: "Aide Premium",
    premiumHelpText:
      "Questions sur les layouts Premium, couleurs, glow ou fonctions partenaire.",
    accountHelpTitle: "Aide compte",
    accountHelpText:
      "Problèmes de connexion, tableau de bord serveur ou compte Discord.",
    button: "Aller au tableau de bord",
    submit: "Ajouter un serveur",
  },
  it: {
    badge: "Supporto",
    title: "Come possiamo aiutarti?",
    text: "Ricevi aiuto per server, Premium, approvazioni e account.",
    serverHelpTitle: "Aiuto server",
    serverHelpText:
      "Problemi con l'aggiunta del server, caricamento banner o invito del bot.",
    premiumHelpTitle: "Aiuto Premium",
    premiumHelpText:
      "Domande su layout Premium, colori, glow o funzioni partner.",
    accountHelpTitle: "Aiuto account",
    accountHelpText:
      "Problemi con login, dashboard server o account Discord.",
    button: "Vai alla dashboard server",
    submit: "Aggiungi server",
  },
  pl: {
    badge: "Pomoc",
    title: "Jak możemy pomóc?",
    text: "Pomoc dotycząca serwerów, Premium, zatwierdzania i konta.",
    serverHelpTitle: "Pomoc serwera",
    serverHelpText:
      "Problemy z dodaniem serwera, przesłaniem bannera lub zaproszeniem bota.",
    premiumHelpTitle: "Pomoc Premium",
    premiumHelpText:
      "Pytania o layouty Premium, kolory, glow lub funkcje partnera.",
    accountHelpTitle: "Pomoc konta",
    accountHelpText:
      "Problemy z logowaniem, panelem serwera lub kontem Discord.",
    button: "Przejdź do panelu serwera",
    submit: "Dodaj serwer",
  },
} as const;

function normalizeLanguage(value: string | undefined): LanguageCode {
  if (
    value === "de" ||
    value === "en" ||
    value === "fr" ||
    value === "it" ||
    value === "pl"
  ) {
    return value;
  }

  return "de";
}

function t(language: LanguageCode, key: keyof typeof SUPPORT_TEXT.de) {
  return SUPPORT_TEXT[language][key] || SUPPORT_TEXT.de[key];
}

export default async function SupportPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get("asko_language")?.value);

  return (
    <main className="container support-page">
      <section className="submit-hero">
        <span className="page-badge">{t(language, "badge")}</span>
        <h1>{t(language, "title")}</h1>
        <p>{t(language, "text")}</p>

        <div className="hero-actions">
          <Link className="btn" href="/profile">
            {t(language, "button")}
          </Link>

          <Link className="btn secondary" href="/submit">
            {t(language, "submit")}
          </Link>
        </div>
      </section>

      <section className="support-grid">
        <article className="card support-card">
          <span className="support-icon">🚀</span>
          <h3>{t(language, "serverHelpTitle")}</h3>
          <p>{t(language, "serverHelpText")}</p>
        </article>

        <article className="card support-card">
          <span className="support-icon">👑</span>
          <h3>{t(language, "premiumHelpTitle")}</h3>
          <p>{t(language, "premiumHelpText")}</p>
        </article>

        <article className="card support-card">
          <span className="support-icon">👤</span>
          <h3>{t(language, "accountHelpTitle")}</h3>
          <p>{t(language, "accountHelpText")}</p>
        </article>
      </section>
    </main>
  );
}
