"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HOME_TEXT = {
  de: {
    badge: "Asko Cafe Network",
    titleTop: "Entdecke",
    titleMain: "Discord Server",
    text: "Finde aktive Communities, bewerte Server und entdecke neue Discord Netzwerke auf Asko Cafe.",
    searchPlaceholder: "Server suchen",
    discover: "Server entdecken",
    submit: "Server eintragen",
    dashboard: "Zum Dashboard",
    premium: "Premium Layouts",
    premiumText: "Heb deinen Server mit Glow, Farben und starken Designs hervor.",
    community: "Community Netzwerk",
    communityText: "Finde Gaming, Anime, Chill, Roleplay, Coding und viele weitere Server.",
    support: "Support",
    supportText: "Bekomme Hilfe beim Eintragen, Freigeben oder Bearbeiten deines Servers.",
  },
  en: {
    badge: "Asko Cafe Network",
    titleTop: "Discover",
    titleMain: "Discord Servers",
    text: "Find active communities, rate servers and discover new Discord networks on Asko Cafe.",
    searchPlaceholder: "Search servers",
    discover: "Discover servers",
    submit: "Submit server",
    dashboard: "Go to Dashboard",
    premium: "Premium Layouts",
    premiumText: "Make your server stand out with glow, colors and powerful designs.",
    community: "Community Network",
    communityText: "Find gaming, anime, chill, roleplay, coding and many more servers.",
    support: "Support",
    supportText: "Get help with submitting, approving or editing your server.",
  },
  fr: {
    badge: "Réseau Asko Cafe",
    titleTop: "Découvre",
    titleMain: "des serveurs Discord",
    text: "Trouve des communautés actives, note des serveurs et découvre de nouveaux réseaux Discord sur Asko Cafe.",
    searchPlaceholder: "Rechercher des serveurs",
    discover: "Découvrir les serveurs",
    submit: "Ajouter un serveur",
    dashboard: "Aller au tableau de bord",
    premium: "Layouts Premium",
    premiumText: "Mets ton serveur en avant avec glow, couleurs et designs puissants.",
    community: "Réseau communautaire",
    communityText: "Trouve des serveurs gaming, anime, chill, roleplay, coding et plus encore.",
    support: "Support",
    supportText: "Obtiens de l'aide pour ajouter, valider ou modifier ton serveur.",
  },
  it: {
    badge: "Asko Cafe Network",
    titleTop: "Scopri",
    titleMain: "server Discord",
    text: "Trova community attive, valuta server e scopri nuovi network Discord su Asko Cafe.",
    searchPlaceholder: "Cerca server",
    discover: "Scopri server",
    submit: "Aggiungi server",
    dashboard: "Vai alla dashboard",
    premium: "Layout Premium",
    premiumText: "Fai risaltare il tuo server con glow, colori e design forti.",
    community: "Network community",
    communityText: "Trova server gaming, anime, chill, roleplay, coding e molto altro.",
    support: "Supporto",
    supportText: "Ricevi aiuto per aggiungere, approvare o modificare il tuo server.",
  },
  pl: {
    badge: "Asko Cafe Network",
    titleTop: "Odkryj",
    titleMain: "serwery Discord",
    text: "Znajdź aktywne społeczności, oceniaj serwery i odkrywaj nowe sieci Discord na Asko Cafe.",
    searchPlaceholder: "Szukaj serwerów",
    discover: "Odkryj serwery",
    submit: "Dodaj serwer",
    dashboard: "Przejdź do panelu",
    premium: "Layouty Premium",
    premiumText: "Wyróżnij swój serwer za pomocą glow, kolorów i mocnych designów.",
    community: "Sieć społeczności",
    communityText: "Znajdź serwery gaming, anime, chill, roleplay, coding i wiele innych.",
    support: "Pomoc",
    supportText: "Uzyskaj pomoc przy dodawaniu, zatwierdzaniu lub edycji serwera.",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof HOME_TEXT.de) {
  return HOME_TEXT[language]?.[key] || HOME_TEXT.de[key];
}

export default function HomePage() {
  const language = useLanguage() as UiLanguage;

  return (
    <main className="home-page">
      <section className="home-network-hero">
        <div className="home-network-bg" />

        <div className="home-network-content">
          <span className="home-network-badge">{t(language, "badge")}</span>

          <h1>
            {t(language, "titleTop")}{" "}
            <span>{t(language, "titleMain")}</span>
          </h1>

          <p>{t(language, "text")}</p>

          <form className="home-network-search" action="/servers">
            <input
              name="q"
              placeholder={t(language, "searchPlaceholder")}
              aria-label={t(language, "searchPlaceholder")}
            />

            <button type="submit">🔍</button>
          </form>

          <div className="home-network-actions">
            <Link className="btn" href="/servers">
              {t(language, "discover")}
            </Link>

            <Link className="btn secondary" href="/submit">
              {t(language, "submit")}
            </Link>

            <Link className="btn secondary" href="/profile">
              {t(language, "dashboard")}
            </Link>
          </div>
        </div>
      </section>

      <section className="container home-feature-grid">
        <article className="card home-feature-card">
          <span>👑</span>
          <h3>{t(language, "premium")}</h3>
          <p>{t(language, "premiumText")}</p>
        </article>

        <article className="card home-feature-card">
          <span>🌐</span>
          <h3>{t(language, "community")}</h3>
          <p>{t(language, "communityText")}</p>
        </article>

        <article className="card home-feature-card">
          <span>💬</span>
          <h3>{t(language, "support")}</h3>
          <p>{t(language, "supportText")}</p>
        </article>
      </section>
    </main>
  );
}
