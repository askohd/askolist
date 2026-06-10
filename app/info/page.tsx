import Link from "next/link";
import { cookies } from "next/headers";
import { supabaseRequest } from "@/lib/supabase";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const INFO_TEXT = {
  de: {
    badge: "Info",
    title: "Finde aktive Discord-Server",
    subtitle:
      "Asko Cafe hilft dir dabei, echte Communitys zu entdecken, Server einzutragen und Server fair zu bewerten.",
    discover: "Server entdecken",
    submit: "Server hinzufügen",
    statsServers: "Server",
    statsTeam: "Team",
    statsPremium: "Premium",
    differenceTitle: "Was uns unterscheidet",
    differenceSubtitle:
      "Ein Directory mit Fokus auf Übersicht, Aktivität und Moderation.",
    functionsTitle: "Funktionen",
    functionsSubtitle:
      "Alles, was du brauchst, um Server zu finden oder deinen eigenen Server sichtbarer zu machen.",
    teamTitle: "Das Team",
    teamSubtitle: "Die Menschen hinter Asko Cafe.",
    legalTitle: "Rechtliches & Sicherheit",
    legalText:
      "Impressum, Datenschutz und Nutzungsbedingungen sind dauerhaft erreichbar.",
    cards: [
      ["🛡️", "Moderation", "Server können geprüft, angenommen, abgelehnt, gemeldet oder gesperrt werden."],
      ["🔎", "Sofortsuche", "Finde Server nach Name, Sprache, Tags oder Kategorie."],
      ["⭐", "Bewertungen", "Community-Bewertungen helfen dabei, passende Server zu finden."],
      ["⚡", "Bump-System", "Server können durch Bumps wieder sichtbarer werden."],
      ["👑", "Premium", "Premium-Server erhalten Design-Funktionen und mehr Sichtbarkeit."],
      ["🤝", "Partner", "Partner-Server können besonders hervorgehoben werden."],
    ],
    differenceCards: [
      ["💬", "Community-Fokus", "Asko Cafe ist auf Discord-Communitys und Server-Sichtbarkeit ausgelegt."],
      ["👁️", "Transparenz", "Meldungen, Bewertungen und Moderation sorgen für bessere Kontrolle."],
      ["🎨", "Design", "Premium-Layouts geben Servern einen eigenen Stil."],
    ],
  },

  en: {
    badge: "Info",
    title: "Find active Discord servers",
    subtitle:
      "Asko Cafe helps you discover real communities, submit servers and rate servers fairly.",
    discover: "Discover servers",
    submit: "Submit server",
    statsServers: "Servers",
    statsTeam: "Team",
    statsPremium: "Premium",
    differenceTitle: "What makes us different",
    differenceSubtitle:
      "A directory focused on clarity, activity and moderation.",
    functionsTitle: "Features",
    functionsSubtitle:
      "Everything you need to find servers or make your own server more visible.",
    teamTitle: "The Team",
    teamSubtitle: "The people behind Asko Cafe.",
    legalTitle: "Legal & safety",
    legalText:
      "Imprint, privacy policy and terms are permanently available.",
    cards: [
      ["🛡️", "Moderation", "Servers can be reviewed, approved, rejected, reported or locked."],
      ["🔎", "Instant search", "Find servers by name, language, tags or category."],
      ["⭐", "Reviews", "Community reviews help users find suitable servers."],
      ["⚡", "Bump system", "Servers can become more visible again through bumps."],
      ["👑", "Premium", "Premium servers receive design features and more visibility."],
      ["🤝", "Partner", "Partner servers can be highlighted in a special way."],
    ],
    differenceCards: [
      ["💬", "Community focus", "Asko Cafe is built for Discord communities and server visibility."],
      ["👁️", "Transparency", "Reports, reviews and moderation provide better control."],
      ["🎨", "Design", "Premium layouts give servers their own style."],
    ],
  },

  fr: {
    badge: "Info",
    title: "Trouve des serveurs Discord actifs",
    subtitle:
      "Asko Cafe t’aide à découvrir de vraies communautés, ajouter des serveurs et les évaluer équitablement.",
    discover: "Découvrir",
    submit: "Ajouter un serveur",
    statsServers: "Serveurs",
    statsTeam: "Équipe",
    statsPremium: "Premium",
    differenceTitle: "Ce qui nous distingue",
    differenceSubtitle:
      "Un annuaire axé sur la clarté, l’activité et la modération.",
    functionsTitle: "Fonctions",
    functionsSubtitle:
      "Tout ce qu’il faut pour trouver des serveurs ou rendre ton serveur plus visible.",
    teamTitle: "L’équipe",
    teamSubtitle: "Les personnes derrière Asko Cafe.",
    legalTitle: "Légal & sécurité",
    legalText:
      "Mentions légales, confidentialité et conditions restent accessibles.",
    cards: [
      ["🛡️", "Modération", "Les serveurs peuvent être vérifiés, acceptés, refusés, signalés ou bloqués."],
      ["🔎", "Recherche rapide", "Trouve des serveurs par nom, langue, tags ou catégorie."],
      ["⭐", "Avis", "Les avis de la communauté aident à trouver les bons serveurs."],
      ["⚡", "Bump", "Les serveurs peuvent redevenir plus visibles grâce aux bumps."],
      ["👑", "Premium", "Les serveurs Premium obtiennent du design et plus de visibilité."],
      ["🤝", "Partenaire", "Les serveurs partenaires peuvent être mis en avant."],
    ],
    differenceCards: [
      ["💬", "Focus communauté", "Asko Cafe est conçu pour les communautés Discord."],
      ["👁️", "Transparence", "Signalements, avis et modération améliorent le contrôle."],
      ["🎨", "Design", "Les layouts Premium donnent un style unique aux serveurs."],
    ],
  },

  it: {
    badge: "Info",
    title: "Trova server Discord attivi",
    subtitle:
      "Asko Cafe ti aiuta a scoprire community reali, aggiungere server e valutarli in modo corretto.",
    discover: "Scopri server",
    submit: "Aggiungi server",
    statsServers: "Server",
    statsTeam: "Team",
    statsPremium: "Premium",
    differenceTitle: "Cosa ci distingue",
    differenceSubtitle:
      "Una directory focalizzata su chiarezza, attività e moderazione.",
    functionsTitle: "Funzioni",
    functionsSubtitle:
      "Tutto ciò che serve per trovare server o rendere il tuo server più visibile.",
    teamTitle: "Il Team",
    teamSubtitle: "Le persone dietro Asko Cafe.",
    legalTitle: "Legale & sicurezza",
    legalText:
      "Impressum, privacy e condizioni sono sempre disponibili.",
    cards: [
      ["🛡️", "Moderazione", "I server possono essere controllati, approvati, rifiutati, segnalati o bloccati."],
      ["🔎", "Ricerca rapida", "Trova server per nome, lingua, tag o categoria."],
      ["⭐", "Recensioni", "Le recensioni della community aiutano a trovare server adatti."],
      ["⚡", "Bump system", "I server possono diventare di nuovo più visibili tramite bump."],
      ["👑", "Premium", "I server Premium ricevono funzioni design e più visibilità."],
      ["🤝", "Partner", "I server Partner possono essere messi in evidenza."],
    ],
    differenceCards: [
      ["💬", "Focus community", "Asko Cafe è pensato per community Discord."],
      ["👁️", "Trasparenza", "Segnalazioni, recensioni e moderazione danno più controllo."],
      ["🎨", "Design", "I layout Premium danno uno stile unico ai server."],
    ],
  },

  pl: {
    badge: "Info",
    title: "Znajdź aktywne serwery Discord",
    subtitle:
      "Asko Cafe pomaga odkrywać prawdziwe społeczności, dodawać serwery i uczciwie je oceniać.",
    discover: "Odkryj serwery",
    submit: "Dodaj serwer",
    statsServers: "Serwery",
    statsTeam: "Team",
    statsPremium: "Premium",
    differenceTitle: "Co nas wyróżnia",
    differenceSubtitle:
      "Katalog skupiony na przejrzystości, aktywności i moderacji.",
    functionsTitle: "Funkcje",
    functionsSubtitle:
      "Wszystko, czego potrzebujesz, aby znaleźć serwer lub zwiększyć widoczność własnego.",
    teamTitle: "Zespół",
    teamSubtitle: "Ludzie stojący za Asko Cafe.",
    legalTitle: "Prawo & bezpieczeństwo",
    legalText:
      "Impressum, prywatność i warunki są zawsze dostępne.",
    cards: [
      ["🛡️", "Moderacja", "Serwery mogą być sprawdzane, akceptowane, odrzucane, zgłaszane lub blokowane."],
      ["🔎", "Szybkie wyszukiwanie", "Znajdź serwery po nazwie, języku, tagach lub kategorii."],
      ["⭐", "Oceny", "Oceny społeczności pomagają znaleźć odpowiednie serwery."],
      ["⚡", "Bump system", "Serwery mogą ponownie stać się bardziej widoczne dzięki bumpom."],
      ["👑", "Premium", "Serwery Premium otrzymują funkcje designu i większą widoczność."],
      ["🤝", "Partner", "Serwery Partner mogą być specjalnie wyróżnione."],
    ],
    differenceCards: [
      ["💬", "Fokus na społeczność", "Asko Cafe jest stworzone dla społeczności Discord."],
      ["👁️", "Przejrzystość", "Zgłoszenia, oceny i moderacja dają większą kontrolę."],
      ["🎨", "Design", "Layouty Premium nadają serwerom własny styl."],
    ],
  },
} as const;

function normalizeUiLanguage(value: unknown): UiLanguage | null {
  const language = String(value ?? "").trim().toLowerCase();

  if (["de", "de-de", "deutsch", "german"].includes(language)) return "de";
  if (["en", "en-us", "en-gb", "english"].includes(language)) return "en";
  if (["fr", "fr-fr", "français", "francais", "french"].includes(language)) return "fr";
  if (["it", "it-it", "italiano", "italian"].includes(language)) return "it";
  if (["pl", "pl-pl", "polski", "polish"].includes(language)) return "pl";

  return null;
}

async function getUiLanguage() {
  const cookieStore = await cookies();

  const candidates = [
    cookieStore.get("askocafe-language")?.value,
    cookieStore.get("asko-language")?.value,
    cookieStore.get("asko_language")?.value,
    cookieStore.get("language")?.value,
    cookieStore.get("locale")?.value,
    cookieStore.get("NEXT_LOCALE")?.value,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeUiLanguage(candidate);

    if (normalized) return normalized;
  }

  return "de";
}

function tx(language: UiLanguage, key: keyof typeof INFO_TEXT.de) {
  return INFO_TEXT[language]?.[key] || INFO_TEXT.de[key];
}

function getRoleLabel(role: string) {
  if (role === "owner") return "Owner";
  if (role === "admin") return "Admin";
  return "Supporter";
}

function getRoleIcon(role: string) {
  if (role === "owner") return "👑";
  if (role === "admin") return "🛡️";
  return "💬";
}

export default async function InfoPage() {
  const language = await getUiLanguage();

  const serversResponse = await supabaseRequest("servers?select=id,premium_status,partner_status");
  const staffResponse = await supabaseRequest("staff_members?select=*&order=role.asc,created_at.asc");

  const servers: any[] = Array.isArray(serversResponse) ? serversResponse : [];
  const team: any[] = Array.isArray(staffResponse) ? staffResponse : [];

  const premiumCount = servers.filter(
    (server) => server.premium_status || server.partner_status
  ).length;

  return (
    <main className="container info-page">
      <section className="info-hero-card">
        <span className="page-badge">ℹ️ {tx(language, "badge")}</span>

        <div className="info-hero-layout">
          <div>
            <h1>{tx(language, "title")}</h1>
            <p>{tx(language, "subtitle")}</p>

            <div className="info-hero-actions">
              <Link href="/servers" className="btn">
                {tx(language, "discover")}
              </Link>

              <Link href="/submit" className="btn secondary">
                {tx(language, "submit")}
              </Link>
            </div>
          </div>

          <div className="info-stats-grid">
            <div className="info-stat-box">
              <strong>{servers.length}</strong>
              <span>{tx(language, "statsServers")}</span>
            </div>

            <div className="info-stat-box">
              <strong>{team.length}</strong>
              <span>{tx(language, "statsTeam")}</span>
            </div>

            <div className="info-stat-box">
              <strong>{premiumCount}</strong>
              <span>{tx(language, "statsPremium")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>{tx(language, "differenceTitle")}</h2>
        <p>{tx(language, "differenceSubtitle")}</p>

        <div className="info-card-grid three">
          {tx(language, "differenceCards").map(([icon, title, text]) => (
            <article className="info-feature-card" key={title}>
              <div className="info-feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>{tx(language, "functionsTitle")}</h2>
        <p>{tx(language, "functionsSubtitle")}</p>

        <div className="info-card-grid">
          {tx(language, "cards").map(([icon, title, text]) => (
            <article className="info-feature-card" key={title}>
              <div className="info-feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>{tx(language, "teamTitle")}</h2>
        <p>{tx(language, "teamSubtitle")}</p>

        {team.length === 0 ? (
          <div className="info-empty-team">Noch kein Team eingetragen.</div>
        ) : (
          <div className="info-team-grid">
            {team.map((member) => (
              <article className="info-team-card" key={member.id}>
                <div className="info-team-avatar">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.discord_username} />
                  ) : (
                    <span>{getRoleIcon(member.role)}</span>
                  )}
                </div>

                <strong>{member.discord_username}</strong>
                <small>{getRoleLabel(member.role)}</small>
              </article>
            ))}
          </div>
        )}
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
