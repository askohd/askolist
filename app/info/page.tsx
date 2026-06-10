"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const INFO_TEXT = {
  de: {
    badge: "Info",
    title: "Was ist Asko Cafe?",
    subtitle:
      "Asko Cafe ist eine Discord-Serverliste für Communitys, Gaming, Anime, Support, Freunde und viele weitere Themen.",
    card1Title: "Server entdecken",
    card1Text:
      "Durchsuche eingetragene Discord-Server nach Sprache, Tags und Kategorien.",
    card2Title: "Server eintragen",
    card2Text:
      "Reiche deinen eigenen Server ein und verwalte Beschreibung, Banner, Sprache und Invite-Link.",
    card3Title: "Premium & Partner",
    card3Text:
      "Premium- und Partner-Server können besondere Designs, Startseiten-Anzeige und bessere Sichtbarkeit erhalten.",
    card4Title: "Moderation & Meldungen",
    card4Text:
      "Server und Bewertungen können gemeldet werden. Das Team kann Inhalte prüfen, sperren oder entfernen.",
    legalTitle: "Rechtliches & Sicherheit",
    legalText:
      "Nutzungsbedingungen, Datenschutz und Impressum sind dauerhaft im Footer erreichbar.",
    ctaServers: "Serverliste öffnen",
    ctaSubmit: "Server eintragen",
  },
  en: {
    badge: "Info",
    title: "What is Asko Cafe?",
    subtitle:
      "Asko Cafe is a Discord server directory for communities, gaming, anime, support, friends and many other topics.",
    card1Title: "Discover servers",
    card1Text:
      "Search listed Discord servers by language, tags and categories.",
    card2Title: "Submit a server",
    card2Text:
      "Submit your own server and manage description, banner, language and invite link.",
    card3Title: "Premium & Partner",
    card3Text:
      "Premium and partner servers can receive special designs, homepage placement and better visibility.",
    card4Title: "Moderation & reports",
    card4Text:
      "Servers and reviews can be reported. The team can review, restrict or remove content.",
    legalTitle: "Legal & safety",
    legalText:
      "Terms, privacy policy and imprint are always available in the footer.",
    ctaServers: "Open server list",
    ctaSubmit: "Submit server",
  },
  fr: {
    badge: "Info",
    title: "Qu’est-ce qu’Asko Cafe ?",
    subtitle:
      "Asko Cafe est un annuaire de serveurs Discord pour communautés, gaming, anime, support, amis et bien d’autres thèmes.",
    card1Title: "Découvrir des serveurs",
    card1Text:
      "Recherche des serveurs Discord par langue, tags et catégories.",
    card2Title: "Ajouter un serveur",
    card2Text:
      "Ajoute ton serveur et gère description, bannière, langue et lien d’invitation.",
    card3Title: "Premium & Partenaire",
    card3Text:
      "Les serveurs Premium et Partenaire peuvent obtenir des designs spéciaux, une mise en avant et plus de visibilité.",
    card4Title: "Modération & signalements",
    card4Text:
      "Les serveurs et avis peuvent être signalés. L’équipe peut vérifier, limiter ou supprimer des contenus.",
    legalTitle: "Légal & sécurité",
    legalText:
      "Conditions, confidentialité et mentions légales sont toujours disponibles dans le footer.",
    ctaServers: "Ouvrir la liste",
    ctaSubmit: "Ajouter un serveur",
  },
  it: {
    badge: "Info",
    title: "Cos’è Asko Cafe?",
    subtitle:
      "Asko Cafe è una directory di server Discord per community, gaming, anime, supporto, amici e molti altri temi.",
    card1Title: "Scopri server",
    card1Text:
      "Cerca server Discord per lingua, tag e categorie.",
    card2Title: "Aggiungi server",
    card2Text:
      "Aggiungi il tuo server e gestisci descrizione, banner, lingua e link invito.",
    card3Title: "Premium & Partner",
    card3Text:
      "I server Premium e Partner possono ricevere design speciali, visibilità in homepage e maggiore presenza.",
    card4Title: "Moderazione & segnalazioni",
    card4Text:
      "Server e recensioni possono essere segnalati. Il team può controllare, limitare o rimuovere contenuti.",
    legalTitle: "Legale & sicurezza",
    legalText:
      "Condizioni, privacy e impressum sono sempre disponibili nel footer.",
    ctaServers: "Apri lista server",
    ctaSubmit: "Aggiungi server",
  },
  pl: {
    badge: "Info",
    title: "Czym jest Asko Cafe?",
    subtitle:
      "Asko Cafe to katalog serwerów Discord dla społeczności, gamingu, anime, supportu, znajomych i wielu innych tematów.",
    card1Title: "Odkrywaj serwery",
    card1Text:
      "Szukaj serwerów Discord według języka, tagów i kategorii.",
    card2Title: "Dodaj serwer",
    card2Text:
      "Dodaj własny serwer i zarządzaj opisem, bannerem, językiem oraz linkiem zaproszenia.",
    card3Title: "Premium & Partner",
    card3Text:
      "Serwery Premium i Partner mogą otrzymać specjalne designy, miejsce na stronie głównej i większą widoczność.",
    card4Title: "Moderacja & zgłoszenia",
    card4Text:
      "Serwery i opinie mogą być zgłaszane. Zespół może sprawdzać, ograniczać lub usuwać treści.",
    legalTitle: "Prawo & bezpieczeństwo",
    legalText:
      "Warunki, prywatność i impressum są zawsze dostępne w stopce.",
    ctaServers: "Otwórz listę",
    ctaSubmit: "Dodaj serwer",
  },
} as const;

function tx(language: UiLanguage, key: keyof typeof INFO_TEXT.de) {
  return INFO_TEXT[language]?.[key] || INFO_TEXT.de[key];
}

export default function InfoPage() {
  const language = useLanguage() as UiLanguage;

  const cards = [
    ["🔎", tx(language, "card1Title"), tx(language, "card1Text")],
    ["➕", tx(language, "card2Title"), tx(language, "card2Text")],
    ["👑", tx(language, "card3Title"), tx(language, "card3Text")],
    ["🛡️", tx(language, "card4Title"), tx(language, "card4Text")],
  ];

  return (
    <main className="container info-page">
      <section className="info-hero-card">
        <span className="page-badge">ℹ️ {tx(language, "badge")}</span>
        <h1>{tx(language, "title")}</h1>
        <p>{tx(language, "subtitle")}</p>

        <div className="info-hero-actions">
          <Link href="/servers" className="btn">
            {tx(language, "ctaServers")}
          </Link>
          <Link href="/submit" className="btn secondary">
            {tx(language, "ctaSubmit")}
          </Link>
        </div>
      </section>

      <section className="info-card-grid">
        {cards.map(([icon, title, text]) => (
          <article className="info-feature-card" key={title}>
            <div className="info-feature-icon">{icon}</div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="info-legal-card">
        <h2>{tx(language, "legalTitle")}</h2>
        <p>{tx(language, "legalText")}</p>

        <div className="info-legal-links">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/nutzungsbedingungen">Nutzungsbedingungen</Link>
        </div>
      </section>
    </main>
  );
}
