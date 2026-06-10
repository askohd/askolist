"use client";

import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const CONTACT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_SUPPORT_URL = "https://discord.gg/asko";

const PROVIDER_NAME = "[Dein vollständiger Name]";
const PROVIDER_STREET = "[Straße und Hausnummer]";
const PROVIDER_CITY = "[PLZ] [Ort]";
const PROVIDER_COUNTRY = "Deutschland";

const IMPRINT_TEXT = {
  de: {
    badge: "Rechtliches",
    title: "Impressum",
    legalBase: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).",
    legalNote:
      "Die deutsche Fassung dieses Impressums ist rechtlich maßgeblich. Übersetzungen dienen nur der besseren Verständlichkeit.",

    providerTitle: "Diensteanbieter",
    contentResponsibleTitle: "Verantwortlich für den Inhalt",
    contentResponsibleText:
      "Verantwortlich für eigene Inhalte auf dieser Website ist der oben genannte Diensteanbieter.",

    projectTitle: "Projektbeschreibung",
    projectText:
      "Asko Cafe ist eine Plattform zur Eintragung, Darstellung, Suche, Bewertung und Moderation von Discord-Servern. Nutzer können Server einreichen, Serverinformationen pflegen, Bewertungen abgeben, Inhalte melden und – sofern freigeschaltet – Premium- oder Partner-Funktionen nutzen.",

    ownContentTitle: "Haftung für eigene Inhalte",
    ownContentText:
      "Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Eine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch nicht übernommen. Als Diensteanbieter bin ich für eigene Inhalte nach den allgemeinen gesetzlichen Vorschriften verantwortlich.",

    userContentTitle: "Haftung für fremde Inhalte und Nutzerinhalte",
    userContentText1:
      "Auf Asko Cafe können Inhalte von Nutzern erscheinen, insbesondere Servernamen, Beschreibungen, Banner, Tags, Bewertungen, Meldungen und sonstige Angaben zu Discord-Servern. Für diese von Nutzern bereitgestellten Inhalte sind grundsätzlich die jeweiligen Nutzer oder Serverbetreiber verantwortlich.",
    userContentText2:
      "Eine dauerhafte inhaltliche Vorabkontrolle sämtlicher Nutzerinhalte findet nicht statt. Bei Bekanntwerden konkreter Rechtsverletzungen oder Regelverstöße werden die betreffenden Inhalte geprüft und, soweit erforderlich, entfernt, gesperrt oder anderweitig moderiert.",

    linksTitle: "Haftung für externe Links",
    linksText:
      "Diese Website enthält Links zu externen Websites und Discord-Servern. Auf deren Inhalte habe ich keinen unmittelbaren Einfluss. Für Inhalte, Regeln, Moderation, Verfügbarkeit und Rechtmäßigkeit externer Angebote sind ausschließlich die jeweiligen Betreiber verantwortlich. Bei Bekanntwerden konkreter Rechtsverletzungen werden entsprechende Links geprüft und gegebenenfalls entfernt.",

    copyrightTitle: "Urheberrecht",
    copyrightText:
      "Eigene Inhalte dieser Website unterliegen dem deutschen Urheberrecht. Beiträge Dritter werden als solche behandelt. Nutzer versichern, dass sie über die notwendigen Rechte an von ihnen hochgeladenen oder eingereichten Inhalten verfügen oder zur Nutzung berechtigt sind.",

    discordTitle: "Hinweis zu Discord",
    discordText:
      "Asko Cafe ist kein offizielles Angebot von Discord Inc. Discord, Discord-Server, Discord-Accounts und Discord-Invite-Links unterliegen den jeweiligen Bedingungen und Regeln von Discord.",

    contactTitle: "Kontakt und Support",
    contactIntro:
      "Bei rechtlichen Anfragen, Support-Fällen, Löschanfragen, Datenschutzfragen oder Meldungen erreichst du Asko Cafe über:",
    email: "E-Mail",
    discordTicket: "Discord-Ticketsystem",
  },

  en: {
    badge: "Legal",
    title: "Imprint",
    legalBase: "Information according to § 5 German Digital Services Act (DDG).",
    legalNote:
      "The German version of this imprint is legally authoritative. Translations are provided for better understanding only.",

    providerTitle: "Service provider",
    contentResponsibleTitle: "Responsible for content",
    contentResponsibleText:
      "The service provider named above is responsible for own content on this website.",

    projectTitle: "Project description",
    projectText:
      "Asko Cafe is a platform for submitting, displaying, searching, reviewing and moderating Discord servers. Users may submit servers, maintain server information, submit reviews, report content and, where enabled, use premium or partner features.",

    ownContentTitle: "Liability for own content",
    ownContentText:
      "The content of this website is created with the greatest possible care. However, no guarantee is given for accuracy, completeness or timeliness. As a service provider, I am responsible for my own content according to general legal provisions.",

    userContentTitle: "Liability for third-party and user content",
    userContentText1:
      "User-generated content may appear on Asko Cafe, especially server names, descriptions, banners, tags, reviews, reports and other information about Discord servers. The respective users or server operators are generally responsible for such content.",
    userContentText2:
      "Permanent prior review of all user content does not take place. Upon becoming aware of specific legal violations or rule violations, the relevant content will be reviewed and, where necessary, removed, restricted or otherwise moderated.",

    linksTitle: "Liability for external links",
    linksText:
      "This website contains links to external websites and Discord servers. I have no direct influence on their content. The respective operators are solely responsible for content, rules, moderation, availability and legality of external offers. Upon becoming aware of specific legal violations, such links will be reviewed and removed where appropriate.",

    copyrightTitle: "Copyright",
    copyrightText:
      "Own content on this website is subject to German copyright law. Third-party contributions are treated as such. Users confirm that they hold the necessary rights to content they upload or submit, or are authorized to use it.",

    discordTitle: "Notice regarding Discord",
    discordText:
      "Asko Cafe is not an official offer of Discord Inc. Discord, Discord servers, Discord accounts and Discord invite links are subject to Discord’s respective terms and rules.",

    contactTitle: "Contact and support",
    contactIntro:
      "For legal requests, support cases, deletion requests, privacy questions or reports, you can contact Asko Cafe via:",
    email: "Email",
    discordTicket: "Discord ticket system",
  },

  fr: {
    badge: "Légal",
    title: "Mentions légales",
    legalBase:
      "Informations conformément au § 5 de la loi allemande sur les services numériques (DDG).",
    legalNote:
      "La version allemande de ces mentions légales fait foi juridiquement. Les traductions servent uniquement à une meilleure compréhension.",

    providerTitle: "Fournisseur du service",
    contentResponsibleTitle: "Responsable du contenu",
    contentResponsibleText:
      "Le fournisseur nommé ci-dessus est responsable de ses propres contenus sur ce site.",

    projectTitle: "Description du projet",
    projectText:
      "Asko Cafe est une plateforme permettant de soumettre, afficher, rechercher, évaluer et modérer des serveurs Discord. Les utilisateurs peuvent soumettre des serveurs, gérer les informations des serveurs, publier des avis, signaler des contenus et, si activé, utiliser des fonctions Premium ou Partenaire.",

    ownContentTitle: "Responsabilité pour les contenus propres",
    ownContentText:
      "Les contenus de ce site sont créés avec le plus grand soin possible. Aucune garantie n’est toutefois donnée quant à leur exactitude, exhaustivité ou actualité. En tant que fournisseur de service, je suis responsable de mes propres contenus selon les dispositions légales générales.",

    userContentTitle: "Responsabilité pour les contenus tiers et utilisateurs",
    userContentText1:
      "Des contenus créés par des utilisateurs peuvent apparaître sur Asko Cafe, notamment noms de serveurs, descriptions, bannières, tags, avis, signalements et autres informations relatives aux serveurs Discord. Les utilisateurs ou exploitants de serveurs concernés sont généralement responsables de ces contenus.",
    userContentText2:
      "Il n’y a pas de contrôle préalable permanent de tous les contenus utilisateurs. Dès la connaissance de violations juridiques concrètes ou de violations des règles, les contenus concernés sont vérifiés et, si nécessaire, supprimés, restreints ou modérés autrement.",

    linksTitle: "Responsabilité pour les liens externes",
    linksText:
      "Ce site contient des liens vers des sites externes et des serveurs Discord. Je n’ai aucune influence directe sur leurs contenus. Les exploitants respectifs sont seuls responsables des contenus, règles, modération, disponibilité et légalité des offres externes. En cas de connaissance de violations juridiques concrètes, ces liens sont vérifiés et supprimés si nécessaire.",

    copyrightTitle: "Droit d’auteur",
    copyrightText:
      "Les contenus propres de ce site sont soumis au droit d’auteur allemand. Les contributions de tiers sont traitées comme telles. Les utilisateurs confirment disposer des droits nécessaires sur les contenus qu’ils téléversent ou soumettent, ou être autorisés à les utiliser.",

    discordTitle: "Remarque concernant Discord",
    discordText:
      "Asko Cafe n’est pas une offre officielle de Discord Inc. Discord, les serveurs Discord, les comptes Discord et les liens d’invitation Discord sont soumis aux conditions et règles respectives de Discord.",

    contactTitle: "Contact et support",
    contactIntro:
      "Pour les demandes juridiques, le support, les demandes de suppression, les questions de confidentialité ou les signalements, tu peux contacter Asko Cafe via :",
    email: "E-mail",
    discordTicket: "Système de tickets Discord",
  },

  it: {
    badge: "Legale",
    title: "Impressum",
    legalBase:
      "Informazioni ai sensi del § 5 della legge tedesca sui servizi digitali (DDG).",
    legalNote:
      "La versione tedesca di questo impressum è giuridicamente vincolante. Le traduzioni servono solo per una migliore comprensione.",

    providerTitle: "Fornitore del servizio",
    contentResponsibleTitle: "Responsabile dei contenuti",
    contentResponsibleText:
      "Il fornitore sopra indicato è responsabile dei propri contenuti su questo sito.",

    projectTitle: "Descrizione del progetto",
    projectText:
      "Asko Cafe è una piattaforma per inserire, mostrare, cercare, recensire e moderare server Discord. Gli utenti possono inserire server, gestire informazioni, pubblicare recensioni, segnalare contenuti e, se abilitato, utilizzare funzioni Premium o Partner.",

    ownContentTitle: "Responsabilità per contenuti propri",
    ownContentText:
      "I contenuti di questo sito sono creati con la massima cura possibile. Tuttavia non si garantisce correttezza, completezza o attualità. In qualità di fornitore del servizio, sono responsabile dei miei contenuti secondo le disposizioni generali di legge.",

    userContentTitle: "Responsabilità per contenuti di terzi e utenti",
    userContentText1:
      "Su Asko Cafe possono apparire contenuti generati dagli utenti, in particolare nomi server, descrizioni, banner, tag, recensioni, segnalazioni e altre informazioni sui server Discord. Gli utenti o gestori dei server interessati sono generalmente responsabili di tali contenuti.",
    userContentText2:
      "Non avviene un controllo preventivo permanente di tutti i contenuti degli utenti. In caso di conoscenza di violazioni legali concrete o violazioni delle regole, i contenuti interessati vengono controllati e, se necessario, rimossi, limitati o moderati in altro modo.",

    linksTitle: "Responsabilità per link esterni",
    linksText:
      "Questo sito contiene link a siti esterni e server Discord. Non ho influenza diretta sui loro contenuti. I rispettivi gestori sono responsabili esclusivi di contenuti, regole, moderazione, disponibilità e legalità delle offerte esterne. In caso di conoscenza di violazioni legali concrete, tali link vengono controllati e rimossi se necessario.",

    copyrightTitle: "Diritto d’autore",
    copyrightText:
      "I contenuti propri di questo sito sono soggetti al diritto d’autore tedesco. I contributi di terzi vengono trattati come tali. Gli utenti confermano di disporre dei diritti necessari sui contenuti caricati o inviati, oppure di essere autorizzati a usarli.",

    discordTitle: "Nota su Discord",
    discordText:
      "Asko Cafe non è un’offerta ufficiale di Discord Inc. Discord, server Discord, account Discord e link invito Discord sono soggetti alle rispettive condizioni e regole di Discord.",

    contactTitle: "Contatto e supporto",
    contactIntro:
      "Per richieste legali, supporto, richieste di cancellazione, domande sulla privacy o segnalazioni puoi contattare Asko Cafe tramite:",
    email: "E-mail",
    discordTicket: "Sistema ticket Discord",
  },

  pl: {
    badge: "Prawne",
    title: "Impressum",
    legalBase:
      "Informacje zgodnie z § 5 niemieckiej ustawy o usługach cyfrowych (DDG).",
    legalNote:
      "Niemiecka wersja tego impressum jest prawnie wiążąca. Tłumaczenia służą wyłącznie lepszemu zrozumieniu.",

    providerTitle: "Dostawca usługi",
    contentResponsibleTitle: "Odpowiedzialny za treść",
    contentResponsibleText:
      "Za własne treści na tej stronie odpowiada wyżej wskazany dostawca usługi.",

    projectTitle: "Opis projektu",
    projectText:
      "Asko Cafe to platforma do dodawania, prezentowania, wyszukiwania, oceniania i moderowania serwerów Discord. Użytkownicy mogą dodawać serwery, zarządzać informacjami, publikować oceny, zgłaszać treści oraz, jeśli aktywne, korzystać z funkcji Premium lub Partner.",

    ownContentTitle: "Odpowiedzialność za własne treści",
    ownContentText:
      "Treści tej strony są tworzone z możliwie największą starannością. Nie udziela się jednak gwarancji poprawności, kompletności ani aktualności. Jako dostawca usługi odpowiadam za własne treści zgodnie z ogólnymi przepisami prawa.",

    userContentTitle: "Odpowiedzialność za treści osób trzecich i użytkowników",
    userContentText1:
      "Na Asko Cafe mogą pojawiać się treści użytkowników, w szczególności nazwy serwerów, opisy, bannery, tagi, oceny, zgłoszenia i inne informacje o serwerach Discord. Za takie treści zasadniczo odpowiadają odpowiedni użytkownicy lub operatorzy serwerów.",
    userContentText2:
      "Nie odbywa się stała wcześniejsza kontrola wszystkich treści użytkowników. Po uzyskaniu wiedzy o konkretnych naruszeniach prawa lub zasad odpowiednie treści są sprawdzane i w razie potrzeby usuwane, ograniczane lub moderowane w inny sposób.",

    linksTitle: "Odpowiedzialność za linki zewnętrzne",
    linksText:
      "Ta strona zawiera linki do zewnętrznych stron i serwerów Discord. Nie mam bezpośredniego wpływu na ich treści. Za treści, zasady, moderację, dostępność i legalność zewnętrznych ofert odpowiadają wyłącznie ich operatorzy. Po uzyskaniu wiedzy o konkretnych naruszeniach prawa takie linki są sprawdzane i w razie potrzeby usuwane.",

    copyrightTitle: "Prawo autorskie",
    copyrightText:
      "Własne treści tej strony podlegają niemieckiemu prawu autorskiemu. Wkłady osób trzecich są traktowane jako takie. Użytkownicy potwierdzają, że posiadają wymagane prawa do przesyłanych lub dodawanych treści albo są uprawnieni do ich użycia.",

    discordTitle: "Informacja dotycząca Discord",
    discordText:
      "Asko Cafe nie jest oficjalną ofertą Discord Inc. Discord, serwery Discord, konta Discord i linki zaproszeń Discord podlegają odpowiednim warunkom i zasadom Discord.",

    contactTitle: "Kontakt i support",
    contactIntro:
      "W sprawach prawnych, supportu, usunięcia danych, pytań o prywatność lub zgłoszeń można skontaktować się z Asko Cafe przez:",
    email: "E-mail",
    discordTicket: "System ticketów Discord",
  },
} as const;

function tx(language: UiLanguage, key: keyof typeof IMPRINT_TEXT.de) {
  return IMPRINT_TEXT[language]?.[key] || IMPRINT_TEXT.de[key];
}

export default function ImpressumPage() {
  const language = useLanguage() as UiLanguage;

  return (
    <main className="legal-page">
      <section className="legal-card">
        <span className="page-badge">⚖️ {tx(language, "badge")}</span>
        <h1>{tx(language, "title")}</h1>

        <p className="legal-small">{tx(language, "legalBase")}</p>
        <p className="legal-small">{tx(language, "legalNote")}</p>

        <h2>{tx(language, "providerTitle")}</h2>
        <p>
          <strong>{PROVIDER_NAME}</strong>
          <br />
          {PROVIDER_STREET}
          <br />
          {PROVIDER_CITY}
          <br />
          {PROVIDER_COUNTRY}
        </p>

        <h2>{tx(language, "contentResponsibleTitle")}</h2>
        <p>{tx(language, "contentResponsibleText")}</p>

        <h2>{tx(language, "projectTitle")}</h2>
        <p>{tx(language, "projectText")}</p>

        <h2>{tx(language, "ownContentTitle")}</h2>
        <p>{tx(language, "ownContentText")}</p>

        <h2>{tx(language, "userContentTitle")}</h2>
        <p>{tx(language, "userContentText1")}</p>
        <p>{tx(language, "userContentText2")}</p>

        <h2>{tx(language, "linksTitle")}</h2>
        <p>{tx(language, "linksText")}</p>

        <h2>{tx(language, "copyrightTitle")}</h2>
        <p>{tx(language, "copyrightText")}</p>

        <h2>{tx(language, "discordTitle")}</h2>
        <p>{tx(language, "discordText")}</p>

        <div className="legal-contact-box">
          <h2>{tx(language, "contactTitle")}</h2>
          <p>{tx(language, "contactIntro")}</p>

          <p>
            {tx(language, "email")}:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            {tx(language, "discordTicket")}:{" "}
            <a href={DISCORD_SUPPORT_URL} target="_blank" rel="noreferrer">
              {DISCORD_SUPPORT_URL}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
