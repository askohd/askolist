"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const OWNER_NAME = "Tim Buschmann";
const OWNER_STREET = "Schlosstraße 1";
const OWNER_CITY = "23701 Eutin";
const OWNER_COUNTRY_DE = "Deutschland";
const SUPPORT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_INVITE_URL = "https://discord.gg/askocafe";

const IMPRESSUM_TEXT = {
  de: {
    badge: "📄 Impressum",
    title: "Impressum",
    intro:
      "Angaben gemäß § 5 Digitale-Dienste-Gesetz für Asko Cafe. Diese Seite enthält die verantwortliche Kontaktstelle für die Website und die Plattform.",
    providerTitle: "Diensteanbieter",
    contactTitle: "Kontakt",
    emailLabel: "E-Mail",
    discordSupport: "Discord-Support",
    ownContentTitle: "Verantwortlich für eigene Inhalte",
    ownContentText:
      "Verantwortlich für eigene Inhalte auf dieser Website ist der oben genannte Diensteanbieter. Asko Cafe stellt eine Plattform zur Eintragung, Darstellung, Suche, Bewertung und Moderation von Discord-Servern bereit.",
    ownLiabilityTitle: "Haftung für eigene Inhalte",
    ownLiabilityText:
      "Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt und gepflegt. Eine Gewähr für Richtigkeit, Vollständigkeit, Aktualität oder dauerhafte Verfügbarkeit einzelner Inhalte kann dennoch nicht übernommen werden.",
    userContentTitle: "Haftung für Nutzerinhalte",
    userContentText1:
      "Auf Asko Cafe können Inhalte von Nutzern erscheinen, insbesondere Servernamen, Beschreibungen, Banner, Logos, Tags, Bewertungen, Meldungen und sonstige Angaben zu Discord-Servern. Für diese Inhalte ist grundsätzlich der jeweilige Nutzer beziehungsweise Serverbetreiber verantwortlich.",
    userContentText2:
      "Eine dauerhafte inhaltliche Vorabkontrolle aller Nutzerinhalte findet nicht statt. Bei konkreten Hinweisen auf rechtswidrige, missbräuchliche oder regelwidrige Inhalte werden diese geprüft und gegebenenfalls entfernt, gesperrt oder eingeschränkt.",
    externalLinksTitle: "Haftung für externe Links",
    externalLinksText:
      "Diese Website enthält Links zu externen Websites und Discord-Servern. Auf deren Inhalte hat Asko Cafe keinen unmittelbaren Einfluss. Für externe Inhalte ist der jeweilige Anbieter oder Betreiber verantwortlich. Externe Links werden bei Bekanntwerden konkreter Rechtsverletzungen geprüft und gegebenenfalls entfernt.",
    copyrightTitle: "Urheberrecht",
    copyrightText:
      "Eigene Inhalte, Texte, Grafiken, Logos, Designs und Strukturen von Asko Cafe unterliegen dem deutschen Urheberrecht, soweit sie urheberrechtlich geschützt sind. Inhalte Dritter werden als solche behandelt. Nutzer versichern, dass sie nur Inhalte hochladen oder eintragen, für die sie die notwendigen Rechte besitzen.",
    discordTitle: "Hinweis zu Discord",
    discordText:
      "Asko Cafe ist kein offizielles Produkt von Discord Inc. und steht nicht in Verbindung mit Discord Inc. Discord, Discord-Server, Discord-Invite-Links und Discord-Profile unterliegen den jeweiligen Regeln und Bedingungen von Discord.",
    disputeTitle: "Streitbeilegung",
    disputeText:
      "Asko Cafe ist nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    sideTitle: "Rechtliches",
    sideText: "Weitere wichtige Seiten von Asko Cafe.",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    support: "Support kontaktieren",
    country: OWNER_COUNTRY_DE,
  },

  en: {
    badge: "📄 Legal Notice",
    title: "Legal Notice",
    intro:
      "Information according to § 5 German Digital Services Act for Asko Cafe. This page contains the responsible contact point for the website and platform.",
    providerTitle: "Service provider",
    contactTitle: "Contact",
    emailLabel: "Email",
    discordSupport: "Discord support",
    ownContentTitle: "Responsible for own content",
    ownContentText:
      "The service provider named above is responsible for own content on this website. Asko Cafe provides a platform for submitting, displaying, searching, reviewing and moderating Discord servers.",
    ownLiabilityTitle: "Liability for own content",
    ownLiabilityText:
      "The content of this website is created and maintained with the greatest possible care. However, no guarantee can be given for accuracy, completeness, timeliness or permanent availability of individual content.",
    userContentTitle: "Liability for user content",
    userContentText1:
      "User content may appear on Asko Cafe, especially server names, descriptions, banners, logos, tags, reviews, reports and other information about Discord servers. The respective user or server operator is generally responsible for this content.",
    userContentText2:
      "Permanent prior content review of all user content does not take place. If there are specific indications of illegal, abusive or rule-breaking content, it will be reviewed and, where appropriate, removed, locked or restricted.",
    externalLinksTitle: "Liability for external links",
    externalLinksText:
      "This website contains links to external websites and Discord servers. Asko Cafe has no direct influence on their content. The respective provider or operator is responsible for external content. External links will be reviewed and removed where appropriate if specific legal violations become known.",
    copyrightTitle: "Copyright",
    copyrightText:
      "Own content, texts, graphics, logos, designs and structures of Asko Cafe are subject to German copyright law where they are protected by copyright. Third-party content is treated as such. Users confirm that they only upload or submit content for which they have the necessary rights.",
    discordTitle: "Notice about Discord",
    discordText:
      "Asko Cafe is not an official product of Discord Inc. and is not affiliated with Discord Inc. Discord, Discord servers, Discord invite links and Discord profiles are subject to Discord's own rules and terms.",
    disputeTitle: "Dispute resolution",
    disputeText:
      "Asko Cafe is neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
    sideTitle: "Legal",
    sideText: "Other important pages of Asko Cafe.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    support: "Contact support",
    country: "Germany",
  },

  fr: {
    badge: "📄 Mentions légales",
    title: "Mentions légales",
    intro:
      "Informations conformément au § 5 de la loi allemande sur les services numériques pour Asko Cafe. Cette page contient le point de contact responsable du site web et de la plateforme.",
    providerTitle: "Prestataire de services",
    contactTitle: "Contact",
    emailLabel: "E-mail",
    discordSupport: "Support Discord",
    ownContentTitle: "Responsable des contenus propres",
    ownContentText:
      "Le prestataire nommé ci-dessus est responsable des contenus propres de ce site web. Asko Cafe fournit une plateforme permettant d'ajouter, afficher, rechercher, évaluer et modérer des serveurs Discord.",
    ownLiabilityTitle: "Responsabilité pour les contenus propres",
    ownLiabilityText:
      "Les contenus de ce site web sont créés et entretenus avec le plus grand soin possible. Toutefois, aucune garantie ne peut être donnée concernant l'exactitude, l'exhaustivité, l'actualité ou la disponibilité permanente de certains contenus.",
    userContentTitle: "Responsabilité pour les contenus utilisateurs",
    userContentText1:
      "Des contenus utilisateurs peuvent apparaître sur Asko Cafe, notamment des noms de serveurs, descriptions, bannières, logos, tags, avis, signalements et autres informations relatives aux serveurs Discord. L'utilisateur ou l'exploitant du serveur concerné est en principe responsable de ces contenus.",
    userContentText2:
      "Un contrôle préalable permanent de tous les contenus utilisateurs n'a pas lieu. En cas d'indices concrets de contenus illégaux, abusifs ou contraires aux règles, ceux-ci sont examinés et, le cas échéant, supprimés, bloqués ou limités.",
    externalLinksTitle: "Responsabilité pour les liens externes",
    externalLinksText:
      "Ce site contient des liens vers des sites externes et des serveurs Discord. Asko Cafe n'a aucune influence directe sur leurs contenus. Le fournisseur ou exploitant concerné est responsable des contenus externes. Les liens externes sont examinés et, le cas échéant, supprimés en cas de connaissance de violations concrètes.",
    copyrightTitle: "Droit d'auteur",
    copyrightText:
      "Les contenus, textes, graphiques, logos, designs et structures propres à Asko Cafe sont soumis au droit d'auteur allemand lorsqu'ils sont protégés. Les contenus de tiers sont traités comme tels. Les utilisateurs confirment ne télécharger ou soumettre que des contenus pour lesquels ils disposent des droits nécessaires.",
    discordTitle: "Remarque concernant Discord",
    discordText:
      "Asko Cafe n'est pas un produit officiel de Discord Inc. et n'est pas affilié à Discord Inc. Discord, les serveurs Discord, les liens d'invitation Discord et les profils Discord sont soumis aux règles et conditions de Discord.",
    disputeTitle: "Règlement des litiges",
    disputeText:
      "Asko Cafe n'est ni obligé ni disposé à participer à une procédure de règlement des litiges devant un organisme de conciliation des consommateurs.",
    sideTitle: "Juridique",
    sideText: "Autres pages importantes d'Asko Cafe.",
    privacy: "Politique de confidentialité",
    terms: "Conditions d’utilisation",
    support: "Contacter le support",
    country: "Allemagne",
  },

  it: {
    badge: "📄 Note legali",
    title: "Note legali",
    intro:
      "Informazioni ai sensi del § 5 della legge tedesca sui servizi digitali per Asko Cafe. Questa pagina contiene il punto di contatto responsabile per il sito web e la piattaforma.",
    providerTitle: "Fornitore del servizio",
    contactTitle: "Contatto",
    emailLabel: "E-mail",
    discordSupport: "Supporto Discord",
    ownContentTitle: "Responsabile dei propri contenuti",
    ownContentText:
      "Il fornitore indicato sopra è responsabile dei propri contenuti su questo sito web. Asko Cafe mette a disposizione una piattaforma per inserire, mostrare, cercare, recensire e moderare server Discord.",
    ownLiabilityTitle: "Responsabilità per i propri contenuti",
    ownLiabilityText:
      "I contenuti di questo sito web vengono creati e mantenuti con la massima cura possibile. Tuttavia non può essere garantita l'accuratezza, completezza, attualità o disponibilità permanente dei singoli contenuti.",
    userContentTitle: "Responsabilità per contenuti degli utenti",
    userContentText1:
      "Su Asko Cafe possono apparire contenuti degli utenti, in particolare nomi di server, descrizioni, banner, loghi, tag, recensioni, segnalazioni e altre informazioni sui server Discord. Di norma il rispettivo utente o gestore del server è responsabile di tali contenuti.",
    userContentText2:
      "Non viene effettuato un controllo preventivo permanente di tutti i contenuti degli utenti. In presenza di indicazioni concrete su contenuti illegali, abusivi o contrari alle regole, questi vengono controllati e, se necessario, rimossi, bloccati o limitati.",
    externalLinksTitle: "Responsabilità per link esterni",
    externalLinksText:
      "Questo sito contiene link a siti esterni e server Discord. Asko Cafe non ha alcuna influenza diretta sui loro contenuti. Il rispettivo fornitore o gestore è responsabile dei contenuti esterni. I link esterni vengono controllati e, se necessario, rimossi in caso di conoscenza di violazioni concrete.",
    copyrightTitle: "Diritto d'autore",
    copyrightText:
      "I contenuti, testi, grafiche, loghi, design e strutture propri di Asko Cafe sono soggetti al diritto d'autore tedesco quando protetti. I contenuti di terzi vengono trattati come tali. Gli utenti confermano di caricare o inserire solo contenuti per cui possiedono i diritti necessari.",
    discordTitle: "Nota su Discord",
    discordText:
      "Asko Cafe non è un prodotto ufficiale di Discord Inc. e non è affiliato a Discord Inc. Discord, i server Discord, i link di invito Discord e i profili Discord sono soggetti alle regole e condizioni di Discord.",
    disputeTitle: "Risoluzione delle controversie",
    disputeText:
      "Asko Cafe non è obbligato né disposto a partecipare a procedure di risoluzione delle controversie davanti a un organismo di conciliazione dei consumatori.",
    sideTitle: "Legale",
    sideText: "Altre pagine importanti di Asko Cafe.",
    privacy: "Privacy policy",
    terms: "Condizioni d’uso",
    support: "Contatta il supporto",
    country: "Germania",
  },

  pl: {
    badge: "📄 Nota prawna",
    title: "Nota prawna",
    intro:
      "Informacje zgodnie z § 5 niemieckiej ustawy o usługach cyfrowych dla Asko Cafe. Ta strona zawiera odpowiedzialny punkt kontaktowy dla strony internetowej i platformy.",
    providerTitle: "Dostawca usługi",
    contactTitle: "Kontakt",
    emailLabel: "E-mail",
    discordSupport: "Wsparcie Discord",
    ownContentTitle: "Odpowiedzialność za własne treści",
    ownContentText:
      "Za własne treści na tej stronie odpowiada wskazany powyżej dostawca usługi. Asko Cafe udostępnia platformę do dodawania, prezentowania, wyszukiwania, oceniania i moderowania serwerów Discord.",
    ownLiabilityTitle: "Odpowiedzialność za własne treści",
    ownLiabilityText:
      "Treści na tej stronie są tworzone i utrzymywane z możliwie największą starannością. Nie można jednak zagwarantować poprawności, kompletności, aktualności ani trwałej dostępności poszczególnych treści.",
    userContentTitle: "Odpowiedzialność za treści użytkowników",
    userContentText1:
      "Na Asko Cafe mogą pojawiać się treści użytkowników, w szczególności nazwy serwerów, opisy, bannery, logotypy, tagi, recenzje, zgłoszenia i inne informacje o serwerach Discord. Za te treści zasadniczo odpowiada odpowiedni użytkownik lub operator serwera.",
    userContentText2:
      "Nie odbywa się stała wcześniejsza kontrola wszystkich treści użytkowników. W przypadku konkretnych informacji o treściach nielegalnych, nadużyciach lub naruszeniach zasad treści te są sprawdzane i w razie potrzeby usuwane, blokowane lub ograniczane.",
    externalLinksTitle: "Odpowiedzialność za linki zewnętrzne",
    externalLinksText:
      "Ta strona zawiera linki do zewnętrznych stron internetowych i serwerów Discord. Asko Cafe nie ma bezpośredniego wpływu na ich treści. Za treści zewnętrzne odpowiada odpowiedni dostawca lub operator. Linki zewnętrzne są sprawdzane i w razie potrzeby usuwane po uzyskaniu konkretnych informacji o naruszeniach prawa.",
    copyrightTitle: "Prawo autorskie",
    copyrightText:
      "Własne treści, teksty, grafiki, logotypy, projekty i struktury Asko Cafe podlegają niemieckiemu prawu autorskiemu, o ile są chronione. Treści osób trzecich są traktowane jako takie. Użytkownicy potwierdzają, że przesyłają lub dodają wyłącznie treści, do których posiadają wymagane prawa.",
    discordTitle: "Informacja o Discord",
    discordText:
      "Asko Cafe nie jest oficjalnym produktem Discord Inc. i nie jest powiązane z Discord Inc. Discord, serwery Discord, linki zaproszeń Discord oraz profile Discord podlegają zasadom i warunkom Discord.",
    disputeTitle: "Rozstrzyganie sporów",
    disputeText:
      "Asko Cafe nie jest zobowiązane ani gotowe do udziału w postępowaniu przed konsumenckim organem arbitrażowym.",
    sideTitle: "Prawne",
    sideText: "Inne ważne strony Asko Cafe.",
    privacy: "Polityka prywatności",
    terms: "Warunki korzystania",
    support: "Kontakt ze wsparciem",
    country: "Niemcy",
  },
} as const;

function normalizeLanguage(language: unknown): UiLanguage {
  const value = String(language ?? "").toLowerCase();

  if (value === "en") return "en";
  if (value === "fr") return "fr";
  if (value === "it") return "it";
  if (value === "pl") return "pl";

  return "de";
}

export default function ImpressumPage() {
  const language = normalizeLanguage(useLanguage());
  const pageText = IMPRESSUM_TEXT[language];

  return (
    <main className="legal-shell">
      <style>{`
        .legal-shell {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
          padding: 72px 0 90px;
        }

        .legal-hero {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 5vw, 54px);
          border-radius: 34px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.22), transparent 35%),
            radial-gradient(circle at 100% 0%, rgba(116, 223, 255, 0.14), transparent 34%),
            linear-gradient(135deg, rgba(18, 16, 42, 0.98), rgba(9, 10, 26, 0.98));
          border: 1px solid rgba(170, 120, 255, 0.22);
          box-shadow: 0 0 48px rgba(130, 85, 255, 0.14);
        }

        .legal-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          color: #9deaff;
          background: rgba(157, 234, 255, 0.08);
          border: 1px solid rgba(157, 234, 255, 0.20);
          font-weight: 950;
          font-size: 0.85rem;
        }

        .legal-hero h1 {
          margin: 22px 0 0;
          color: #ffffff;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.07em;
        }

        .legal-hero p {
          max-width: 760px;
          margin: 20px 0 0;
          color: rgba(236, 240, 255, 0.76);
          line-height: 1.75;
          font-size: 1.05rem;
        }

        .legal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 22px;
          align-items: start;
          margin-top: 24px;
        }

        .legal-card,
        .legal-side-card {
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)),
            rgba(12, 12, 30, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 0 32px rgba(100, 80, 255, 0.08);
        }

        .legal-card {
          padding: clamp(22px, 4vw, 34px);
        }

        .legal-side-card {
          padding: 22px;
          position: sticky;
          top: 110px;
        }

        .legal-card h2,
        .legal-side-card h2 {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: clamp(1.35rem, 3vw, 2rem);
          letter-spacing: -0.04em;
        }

        .legal-card p,
        .legal-card li,
        .legal-side-card p {
          color: rgba(236, 240, 255, 0.78);
          line-height: 1.75;
        }

        .legal-card p {
          margin: 0 0 14px;
        }

        .legal-contact-box {
          margin: 16px 0 24px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(157, 234, 255, 0.06);
          border: 1px solid rgba(157, 234, 255, 0.16);
        }

        .legal-contact-box strong {
          color: #ffffff;
        }

        .legal-link-list {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }

        .legal-link-list a,
        .legal-button {
          min-height: 42px;
          padding: 0 14px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          color: rgba(236, 240, 255, 0.82);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.10);
          font-weight: 850;
        }

        .legal-link-list a:hover,
        .legal-button:hover {
          color: #ffffff;
          border-color: rgba(157, 234, 255, 0.28);
        }

        @media (max-width: 900px) {
          .legal-grid {
            grid-template-columns: 1fr;
          }

          .legal-side-card {
            position: static;
          }
        }
      `}</style>

      <section className="legal-hero">
        <span className="legal-badge">{pageText.badge}</span>
        <h1>{pageText.title}</h1>
        <p>{pageText.intro}</p>
      </section>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>{pageText.providerTitle}</h2>

          <div className="legal-contact-box">
            <p>
              <strong>{OWNER_NAME}</strong>
              <br />
              {OWNER_STREET}
              <br />
              {OWNER_CITY}
              <br />
              {pageText.country}
            </p>
          </div>

          <h2>{pageText.contactTitle}</h2>
          <p>
            {pageText.emailLabel}:{" "}
            <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </p>

          <p>
            {pageText.discordSupport}:{" "}
            <a
              className="legal-button"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              discord.gg/askocafe
            </a>
          </p>

          <h2>{pageText.ownContentTitle}</h2>
          <p>{pageText.ownContentText}</p>

          <h2>{pageText.ownLiabilityTitle}</h2>
          <p>{pageText.ownLiabilityText}</p>

          <h2>{pageText.userContentTitle}</h2>
          <p>{pageText.userContentText1}</p>
          <p>{pageText.userContentText2}</p>

          <h2>{pageText.externalLinksTitle}</h2>
          <p>{pageText.externalLinksText}</p>

          <h2>{pageText.copyrightTitle}</h2>
          <p>{pageText.copyrightText}</p>

          <h2>{pageText.discordTitle}</h2>
          <p>{pageText.discordText}</p>

          <h2>{pageText.disputeTitle}</h2>
          <p>{pageText.disputeText}</p>
        </article>

        <aside className="legal-side-card">
          <h2>{pageText.sideTitle}</h2>
          <p>{pageText.sideText}</p>

          <div className="legal-link-list">
            <Link href="/datenschutz">{pageText.privacy}</Link>
            <Link href="/nutzungsbedingungen">{pageText.terms}</Link>
            <Link href="/support">{pageText.support}</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
