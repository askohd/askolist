"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HOME_TEXT = {
  de: {
    badge: "Asko Cafe Network",
    title: "Entdecke Discord Server",
    text: "Finde aktive Communities, bewerte Server und entdecke neue Discord Netzwerke auf Asko Cafe.",
    searchPlaceholder: "Server suchen",
    search: "Suchen",
    discover: "Server entdecken",
    submit: "Server eintragen",
    cardBadge: "Offizieller Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Tritt dem offiziellen Asko Cafe Discord Server bei. Entdecke neue Communities, tausche dich mit anderen aus und bleibe immer auf dem Laufenden.",
    join: "Discord beitreten",
    serverList: "Serverliste öffnen",
    tagLanguage: "Deutsch",
    tagCommunity: "Community",
    tagSupport: "Support",
    statActiveValue: "24/7",
    statActiveLabel: "Aktiv",
    statLanguageValue: "DE",
    statLanguageLabel: "Sprache",
    statFeaturesValue: "VIP",
    statFeaturesLabel: "Features",
    countryTitle: "Deutschland",
  },
  en: {
    badge: "Asko Cafe Network",
    title: "Discover Discord Servers",
    text: "Find active communities, rate servers and discover new Discord networks on Asko Cafe.",
    searchPlaceholder: "Search servers",
    search: "Search",
    discover: "Discover servers",
    submit: "Submit server",
    cardBadge: "Official Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Join the official Asko Cafe Discord server. Discover new communities, connect with others and stay up to date.",
    join: "Join Discord",
    serverList: "Open server list",
    tagLanguage: "German",
    tagCommunity: "Community",
    tagSupport: "Support",
    statActiveValue: "24/7",
    statActiveLabel: "Active",
    statLanguageValue: "DE",
    statLanguageLabel: "Language",
    statFeaturesValue: "VIP",
    statFeaturesLabel: "Features",
    countryTitle: "Germany",
  },
  fr: {
    badge: "Réseau Asko Cafe",
    title: "Découvre des serveurs Discord",
    text: "Trouve des communautés actives, note des serveurs et découvre de nouveaux réseaux Discord sur Asko Cafe.",
    searchPlaceholder: "Rechercher des serveurs",
    search: "Rechercher",
    discover: "Découvrir les serveurs",
    submit: "Ajouter un serveur",
    cardBadge: "Discord officiel",
    cardTitle: "Asko Cafe",
    cardText:
      "Rejoins le serveur Discord officiel Asko Cafe. Découvre de nouvelles communautés, échange avec d'autres personnes et reste informé.",
    join: "Rejoindre Discord",
    serverList: "Ouvrir la liste",
    tagLanguage: "Allemand",
    tagCommunity: "Communauté",
    tagSupport: "Support",
    statActiveValue: "24/7",
    statActiveLabel: "Actif",
    statLanguageValue: "DE",
    statLanguageLabel: "Langue",
    statFeaturesValue: "VIP",
    statFeaturesLabel: "Fonctions",
    countryTitle: "Allemagne",
  },
  it: {
    badge: "Asko Cafe Network",
    title: "Scopri server Discord",
    text: "Trova community attive, valuta server e scopri nuovi network Discord su Asko Cafe.",
    searchPlaceholder: "Cerca server",
    search: "Cerca",
    discover: "Scopri server",
    submit: "Aggiungi server",
    cardBadge: "Discord ufficiale",
    cardTitle: "Asko Cafe",
    cardText:
      "Unisciti al server Discord ufficiale Asko Cafe. Scopri nuove community, parla con altre persone e resta aggiornato.",
    join: "Entra su Discord",
    serverList: "Apri lista server",
    tagLanguage: "Tedesco",
    tagCommunity: "Community",
    tagSupport: "Supporto",
    statActiveValue: "24/7",
    statActiveLabel: "Attivo",
    statLanguageValue: "DE",
    statLanguageLabel: "Lingua",
    statFeaturesValue: "VIP",
    statFeaturesLabel: "Funzioni",
    countryTitle: "Germania",
  },
  pl: {
    badge: "Asko Cafe Network",
    title: "Odkryj serwery Discord",
    text: "Znajdź aktywne społeczności, oceniaj serwery i odkrywaj nowe sieci Discord na Asko Cafe.",
    searchPlaceholder: "Szukaj serwerów",
    search: "Szukaj",
    discover: "Odkryj serwery",
    submit: "Dodaj serwer",
    cardBadge: "Oficjalny Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Dołącz do oficjalnego serwera Discord Asko Cafe. Odkrywaj nowe społeczności, rozmawiaj z innymi i bądź na bieżąco.",
    join: "Dołącz do Discorda",
    serverList: "Otwórz listę serwerów",
    tagLanguage: "Niemiecki",
    tagCommunity: "Społeczność",
    tagSupport: "Pomoc",
    statActiveValue: "24/7",
    statActiveLabel: "Aktywny",
    statLanguageValue: "DE",
    statLanguageLabel: "Język",
    statFeaturesValue: "VIP",
    statFeaturesLabel: "Funkcje",
    countryTitle: "Niemcy",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof HOME_TEXT.de) {
  return HOME_TEXT[language]?.[key] || HOME_TEXT.de[key];
}

export default function HomePage() {
  const language = useLanguage() as UiLanguage;

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-left">
            <div className="home-hero-left-inner">
              <span className="page-badge">{t(language, "badge")}</span>

              <h1>{t(language, "title")}</h1>

              <p>{t(language, "text")}</p>

              <form className="home-hero-search" action="/servers">
                <input
                  type="text"
                  name="q"
                  className="input"
                  placeholder={t(language, "searchPlaceholder")}
                />

                <button className="btn" type="submit">
                  {t(language, "search")}
                </button>
              </form>

              <div className="hero-actions">
                <Link className="btn" href="/servers">
                  {t(language, "discover")}
                </Link>

                <Link className="btn secondary" href="/submit">
                  {t(language, "submit")}
                </Link>
              </div>
            </div>
          </div>

          <div className="home-hero-right">
            <article className="discord-server-card featured-discord-card">
              <div className="server-card-glow server-card-glow-pink" />
              <div className="server-card-glow server-card-glow-blue" />

              <div className="discord-server-banner">
                <img src="/asko-cafe-banner.png" alt="Asko Cafe Banner" />
                <span className="discord-server-badge">
                  {t(language, "cardBadge")}
                </span>
              </div>

              <div className="discord-server-content">
                <div className="discord-server-top">
                  <img
                    className="discord-server-icon"
                    src="/asko-cafe-icon.png"
                    alt="Asko Cafe Icon"
                  />

                  <div className="discord-server-meta">
                    <div className="discord-server-name-row">
                      <h3>{t(language, "cardTitle")}</h3>

                      <span
                        className="flag-icon flag-de server-country-flag"
                        title={t(language, "countryTitle")}
                        aria-label={t(language, "countryTitle")}
                      />
                    </div>

                    <p className="discord-server-link">discord.gg/askocafe</p>

                    <div className="discord-server-tags">
                      <span className="server-tag">
                        {t(language, "tagLanguage")}
                      </span>
                      <span className="server-tag">
                        {t(language, "tagCommunity")}
                      </span>
                      <span className="server-tag">
                        {t(language, "tagSupport")}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="discord-server-description">
                  {t(language, "cardText")}
                </p>

                <div className="discord-server-stats">
                  <div className="server-stat-box">
                    <strong>{t(language, "statActiveValue")}</strong>
                    <span>{t(language, "statActiveLabel")}</span>
                  </div>

                  <div className="server-stat-box">
                    <strong>{t(language, "statLanguageValue")}</strong>
                    <span>{t(language, "statLanguageLabel")}</span>
                  </div>

                  <div className="server-stat-box">
                    <strong>{t(language, "statFeaturesValue")}</strong>
                    <span>{t(language, "statFeaturesLabel")}</span>
                  </div>
                </div>

                <div className="discord-server-actions">
                  <a
                    href="https://discord.gg/askocafe"
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    {t(language, "join")}
                  </a>

                  <Link href="/servers" className="btn secondary">
                    {t(language, "serverList")}
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
