import Link from "next/link";
import { cookies } from "next/headers";
import { supabaseRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";
type InfoCard = readonly [string, string, string];

type InfoText = {
  badge: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  discover: string;
  submit: string;
  contact: string;
  statsServers: string;
  statsTeam: string;
  statsPremium: string;
  missionTitle: string;
  missionText: string;
  specialTitle: string;
  specialSubtitle: string;
  functionsTitle: string;
  functionsSubtitle: string;
  eventsTitle: string;
  eventsText: string;
  eventsButton: string;
  feedbackTitle: string;
  feedbackText: string;
  partnerTitle: string;
  partnerText: string;
  teamTitle: string;
  teamSubtitle: string;
  teamLanguage: string;
  noTeam: string;
  legalTitle: string;
  legalText: string;
  cards: readonly InfoCard[];
  specialCards: readonly InfoCard[];
};

const INFO_TEXT: Record<UiLanguage, InfoText> = {
  de: {
    badge: "Info",
    eyebrow: "Discord Server Directory",
    title: "Mehr als nur eine Serverliste",
    subtitle:
      "Asko Cafe ist ein Community-Projekt für Discord-Server, Partnerschaften, Events und faire Sichtbarkeit. Wir wollen Server nicht einfach nur auflisten, sondern Communitys helfen, aktiver und besser gefunden zu werden.",
    discover: "Server entdecken",
    submit: "Server hinzufügen",
    contact: "Partnerschaft anfragen",
    statsServers: "Server",
    statsTeam: "Team",
    statsPremium: "Premium",
    missionTitle: "Unsere Idee",
    missionText:
      "Viele Discord-Server gehen unter, obwohl dort gute Communitys entstehen. Asko Cafe soll genau das ändern: klare Serverprofile, Bumps, Bewertungen, Premium-Designs, Partnerbereiche und ein Team, das auf Qualität und Fairness achtet.",
    specialTitle: "Was Asko Cafe besonders macht",
    specialSubtitle:
      "Wir bauen nicht einfach eine Kopie von anderen Serverlisten. Asko Cafe soll eine eigene Plattform werden, die Communitys verbindet und mit ihnen zusammen wächst.",
    functionsTitle: "Was du auf Asko Cafe nutzen kannst",
    functionsSubtitle:
      "Server finden, eintragen, hervorheben, bewerten und verbessern – alles an einem Ort.",
    eventsTitle: "Events & Community-Projekte",
    eventsText:
      "Wir möchten in Zukunft mit verschiedenen Discord-Servern größere Events planen, gemeinsame Aktionen starten und Communitys miteinander verbinden. Wenn du eine Idee für ein Event, eine Kooperation oder ein besonderes Projekt hast, kannst du jederzeit mit uns sprechen.",
    eventsButton: "Mit uns auf Discord reden",
    feedbackTitle: "Feedback ist willkommen",
    feedbackText:
      "Asko Cafe ist noch im Aufbau und wir verbessern die Plattform Schritt für Schritt. Vorschläge, Kritik, Wünsche oder neue Ideen sind ausdrücklich willkommen. Wir hören gerne zu, wenn etwas besser, fairer oder schöner werden kann.",
    partnerTitle: "Partnerschaften",
    partnerText:
      "Du möchtest mit deinem Server Partner werden, ein gemeinsames Event planen oder eine andere Form der Zusammenarbeit besprechen? Dann melde dich gerne bei uns über den Discord-Support.",
    teamTitle: "Unser Team",
    teamSubtitle:
      "Hier siehst du die Menschen, die Asko Cafe betreuen, prüfen und weiterentwickeln.",
    teamLanguage: "Sprache",
    noTeam: "Noch kein Team eingetragen.",
    legalTitle: "Rechtliches & Sicherheit",
    legalText:
      "Impressum, Datenschutz und Nutzungsbedingungen sind dauerhaft erreichbar.",
    specialCards: [
      [
        "🤝",
        "Community statt Masse",
        "Wir wollen nicht nur möglichst viele Server sammeln, sondern gute Communitys sichtbarer machen.",
      ],
      [
        "🎉",
        "Event-Ideen",
        "Asko Cafe soll später auch bei Discord-Events, Aktionen und Community-Projekten helfen.",
      ],
      [
        "🧭",
        "Faire Orientierung",
        "Sprache, Kategorien, Tags, Bewertungen und Meldungen helfen Nutzern, passende Server zu finden.",
      ],
    ],
    cards: [
      [
        "🔎",
        "Server entdecken",
        "Finde Discord-Server nach Namen, Sprache, Kategorie, Tags oder Community-Thema.",
      ],
      [
        "🚀",
        "Server eintragen",
        "Reiche deinen Server ein und pflege Beschreibung, Sprache, Banner und Invite-Link.",
      ],
      [
        "⭐",
        "Bewertungen",
        "Community-Bewertungen helfen dabei, aktive und passende Server besser einzuschätzen.",
      ],
      [
        "⚡",
        "Bump-System",
        "Server können durch Bumps wieder sichtbarer werden. Premium kann kürzere Bump-Zeiten erhalten.",
      ],
      [
        "👑",
        "Premium-Designs",
        "Premium- und Partner-Server können besondere Layouts, Farben und Startseiten-Sichtbarkeit erhalten.",
      ],
      [
        "🛡️",
        "Moderation",
        "Meldungen, Prüfungen und klare Regeln helfen dabei, Spam, Fake-Server und Missbrauch zu reduzieren.",
      ],
    ],
  },

  en: {
    badge: "Info",
    eyebrow: "Discord Server Directory",
    title: "More than just a server list",
    subtitle:
      "Asko Cafe is a community project for Discord servers, partnerships, events and fair visibility. We do not just want to list servers, we want to help communities become more active and easier to find.",
    discover: "Discover servers",
    submit: "Submit server",
    contact: "Request partnership",
    statsServers: "Servers",
    statsTeam: "Team",
    statsPremium: "Premium",
    missionTitle: "Our idea",
    missionText:
      "Many Discord servers disappear in the crowd even though great communities are being built there. Asko Cafe aims to change that with clear server profiles, bumps, reviews, premium designs, partner areas and a team focused on quality and fairness.",
    specialTitle: "What makes Asko Cafe different",
    specialSubtitle:
      "We are not building a simple copy of other server lists. Asko Cafe is meant to become its own platform that connects communities and grows with them.",
    functionsTitle: "What you can use on Asko Cafe",
    functionsSubtitle:
      "Find, submit, highlight, review and improve servers in one place.",
    eventsTitle: "Events & community projects",
    eventsText:
      "In the future, we want to plan larger events with different Discord servers, start joint activities and connect communities. If you have an idea for an event, cooperation or special project, you can always talk to us.",
    eventsButton: "Talk to us on Discord",
    feedbackTitle: "Feedback is welcome",
    feedbackText:
      "Asko Cafe is still being built and we improve the platform step by step. Suggestions, criticism, wishes and new ideas are very welcome. We are happy to listen when something can become better, fairer or nicer.",
    partnerTitle: "Partnerships",
    partnerText:
      "Do you want your server to become a partner, plan a joint event or discuss another type of cooperation? Contact us through Discord support.",
    teamTitle: "Our Team",
    teamSubtitle:
      "These are the people who support, review and improve Asko Cafe.",
    teamLanguage: "Language",
    noTeam: "No team members have been added yet.",
    legalTitle: "Legal & safety",
    legalText: "Imprint, privacy policy and terms are permanently available.",
    specialCards: [
      [
        "🤝",
        "Community over mass",
        "We do not only want to collect as many servers as possible, but make good communities more visible.",
      ],
      [
        "🎉",
        "Event ideas",
        "Asko Cafe should later help with Discord events, activities and community projects.",
      ],
      [
        "🧭",
        "Fair orientation",
        "Language, categories, tags, reviews and reports help users find suitable servers.",
      ],
    ],
    cards: [
      [
        "🔎",
        "Discover servers",
        "Find Discord servers by name, language, category, tags or community topic.",
      ],
      [
        "🚀",
        "Submit server",
        "Submit your server and manage description, language, banner and invite link.",
      ],
      [
        "⭐",
        "Reviews",
        "Community reviews help users judge active and suitable servers more easily.",
      ],
      [
        "⚡",
        "Bump system",
        "Servers can become more visible again through bumps. Premium may receive shorter bump times.",
      ],
      [
        "👑",
        "Premium designs",
        "Premium and partner servers can receive special layouts, colors and homepage visibility.",
      ],
      [
        "🛡️",
        "Moderation",
        "Reports, reviews and clear rules help reduce spam, fake servers and abuse.",
      ],
    ],
  },

  fr: {
    badge: "Info",
    eyebrow: "Annuaire de serveurs Discord",
    title: "Plus qu’une simple liste de serveurs",
    subtitle:
      "Asko Cafe est un projet communautaire pour les serveurs Discord, les partenariats, les événements et une visibilité équitable.",
    discover: "Découvrir",
    submit: "Ajouter un serveur",
    contact: "Demander un partenariat",
    statsServers: "Serveurs",
    statsTeam: "Équipe",
    statsPremium: "Premium",
    missionTitle: "Notre idée",
    missionText:
      "Beaucoup de serveurs Discord passent inaperçus alors que de bonnes communautés s’y développent. Asko Cafe veut changer cela avec des profils clairs, des bumps, des avis, des designs Premium, des zones partenaires et une modération équitable.",
    specialTitle: "Ce qui rend Asko Cafe différent",
    specialSubtitle:
      "Nous ne voulons pas créer une simple copie d’autres listes. Asko Cafe doit devenir une plateforme qui connecte les communautés.",
    functionsTitle: "Ce que tu peux utiliser sur Asko Cafe",
    functionsSubtitle:
      "Trouver, ajouter, mettre en avant, évaluer et améliorer des serveurs au même endroit.",
    eventsTitle: "Événements & projets communautaires",
    eventsText:
      "À l’avenir, nous voulons organiser de plus grands événements avec différents serveurs Discord, lancer des actions communes et connecter les communautés.",
    eventsButton: "Nous parler sur Discord",
    feedbackTitle: "Les retours sont bienvenus",
    feedbackText:
      "Asko Cafe est encore en développement. Les suggestions, critiques, souhaits et nouvelles idées sont les bienvenus.",
    partnerTitle: "Partenariats",
    partnerText:
      "Tu veux devenir partenaire, organiser un événement ou discuter d’une coopération ? Contacte-nous via le support Discord.",
    teamTitle: "Notre équipe",
    teamSubtitle:
      "Voici les personnes qui accompagnent, vérifient et améliorent Asko Cafe.",
    teamLanguage: "Langue",
    noTeam: "Aucun membre d’équipe ajouté pour le moment.",
    legalTitle: "Légal & sécurité",
    legalText:
      "Mentions légales, confidentialité et conditions restent accessibles.",
    specialCards: [
      [
        "🤝",
        "La communauté avant la masse",
        "Nous voulons rendre les bonnes communautés plus visibles.",
      ],
      [
        "🎉",
        "Idées d’événements",
        "Asko Cafe pourra aider avec des événements et projets Discord.",
      ],
      [
        "🧭",
        "Orientation équitable",
        "Langues, catégories, tags, avis et signalements aident les utilisateurs.",
      ],
    ],
    cards: [
      [
        "🔎",
        "Découvrir des serveurs",
        "Trouve des serveurs Discord par nom, langue, catégorie, tags ou thème.",
      ],
      [
        "🚀",
        "Ajouter un serveur",
        "Ajoute ton serveur et gère description, langue, bannière et invite.",
      ],
      [
        "⭐",
        "Avis",
        "Les avis de la communauté aident à mieux évaluer les serveurs.",
      ],
      [
        "⚡",
        "Bump",
        "Les serveurs peuvent redevenir plus visibles grâce aux bumps.",
      ],
      [
        "👑",
        "Designs Premium",
        "Les serveurs Premium et partenaires peuvent recevoir des layouts spéciaux.",
      ],
      [
        "🛡️",
        "Modération",
        "Les signalements et règles claires réduisent spam, faux serveurs et abus.",
      ],
    ],
  },

  it: {
    badge: "Info",
    eyebrow: "Directory server Discord",
    title: "Più di una semplice lista server",
    subtitle:
      "Asko Cafe è un progetto community per server Discord, partnership, eventi e visibilità equa.",
    discover: "Scopri server",
    submit: "Aggiungi server",
    contact: "Richiedi partnership",
    statsServers: "Server",
    statsTeam: "Team",
    statsPremium: "Premium",
    missionTitle: "La nostra idea",
    missionText:
      "Molti server Discord passano inosservati anche se hanno buone community. Asko Cafe vuole cambiarlo con profili chiari, bump, recensioni, design Premium, aree partner e moderazione equa.",
    specialTitle: "Cosa rende Asko Cafe diverso",
    specialSubtitle:
      "Non vogliamo creare una copia di altre liste. Asko Cafe deve diventare una piattaforma propria che collega community.",
    functionsTitle: "Cosa puoi usare su Asko Cafe",
    functionsSubtitle:
      "Trova, aggiungi, evidenzia, valuta e migliora server in un unico posto.",
    eventsTitle: "Eventi & progetti community",
    eventsText:
      "In futuro vogliamo organizzare eventi più grandi con diversi server Discord, avviare attività comuni e collegare community.",
    eventsButton: "Parla con noi su Discord",
    feedbackTitle: "Il feedback è benvenuto",
    feedbackText:
      "Asko Cafe è ancora in sviluppo. Suggerimenti, critiche, desideri e nuove idee sono benvenuti.",
    partnerTitle: "Partnership",
    partnerText:
      "Vuoi diventare partner, organizzare un evento o parlare di una collaborazione? Contattaci tramite supporto Discord.",
    teamTitle: "Il nostro team",
    teamSubtitle:
      "Le persone che supportano, controllano e migliorano Asko Cafe.",
    teamLanguage: "Lingua",
    noTeam: "Nessun membro del team aggiunto.",
    legalTitle: "Legale & sicurezza",
    legalText: "Impressum, privacy e condizioni sono sempre disponibili.",
    specialCards: [
      [
        "🤝",
        "Community prima della massa",
        "Vogliamo rendere più visibili le buone community.",
      ],
      [
        "🎉",
        "Idee evento",
        "Asko Cafe potrà aiutare con eventi Discord e progetti community.",
      ],
      [
        "🧭",
        "Orientamento equo",
        "Lingue, categorie, tag, recensioni e segnalazioni aiutano gli utenti.",
      ],
    ],
    cards: [
      [
        "🔎",
        "Scopri server",
        "Trova server Discord per nome, lingua, categoria, tag o tema.",
      ],
      [
        "🚀",
        "Aggiungi server",
        "Aggiungi il tuo server e gestisci descrizione, lingua, banner e invite.",
      ],
      [
        "⭐",
        "Recensioni",
        "Le recensioni della community aiutano a valutare i server.",
      ],
      [
        "⚡",
        "Bump system",
        "I server possono diventare più visibili tramite bump.",
      ],
      [
        "👑",
        "Design Premium",
        "Server Premium e Partner possono ricevere layout speciali.",
      ],
      [
        "🛡️",
        "Moderazione",
        "Segnalazioni e regole chiare riducono spam, fake server e abusi.",
      ],
    ],
  },

  pl: {
    badge: "Info",
    eyebrow: "Katalog serwerów Discord",
    title: "Więcej niż zwykła lista serwerów",
    subtitle:
      "Asko Cafe to projekt społecznościowy dla serwerów Discord, partnerstw, eventów i uczciwej widoczności.",
    discover: "Odkryj serwery",
    submit: "Dodaj serwer",
    contact: "Zapytaj o partnerstwo",
    statsServers: "Serwery",
    statsTeam: "Team",
    statsPremium: "Premium",
    missionTitle: "Nasza idea",
    missionText:
      "Wiele serwerów Discord znika w tłumie, mimo że tworzą dobre społeczności. Asko Cafe ma to zmienić dzięki czytelnym profilom, bumpom, ocenom, designom Premium, partnerstwom i uczciwej moderacji.",
    specialTitle: "Co wyróżnia Asko Cafe",
    specialSubtitle:
      "Nie tworzymy zwykłej kopii innych list. Asko Cafe ma być własną platformą łączącą społeczności.",
    functionsTitle: "Co możesz robić na Asko Cafe",
    functionsSubtitle:
      "Znajduj, dodawaj, wyróżniaj, oceniaj i ulepszaj serwery w jednym miejscu.",
    eventsTitle: "Eventy & projekty społeczności",
    eventsText:
      "W przyszłości chcemy planować większe eventy z różnymi serwerami Discord, tworzyć wspólne akcje i łączyć społeczności.",
    eventsButton: "Porozmawiaj z nami na Discord",
    feedbackTitle: "Feedback mile widziany",
    feedbackText:
      "Asko Cafe jest nadal rozwijane. Sugestie, krytyka, życzenia i nowe pomysły są bardzo mile widziane.",
    partnerTitle: "Partnerstwa",
    partnerText:
      "Chcesz zostać partnerem, zaplanować event lub omówić współpracę? Skontaktuj się z nami przez support Discord.",
    teamTitle: "Nasz zespół",
    teamSubtitle:
      "Osoby, które wspierają, sprawdzają i rozwijają Asko Cafe.",
    teamLanguage: "Język",
    noTeam: "Nie dodano jeszcze członków zespołu.",
    legalTitle: "Prawo & bezpieczeństwo",
    legalText: "Impressum, prywatność i warunki są zawsze dostępne.",
    specialCards: [
      [
        "🤝",
        "Społeczność zamiast masy",
        "Chcemy zwiększać widoczność dobrych społeczności.",
      ],
      [
        "🎉",
        "Pomysły na eventy",
        "Asko Cafe ma pomagać przy eventach Discord i projektach społeczności.",
      ],
      [
        "🧭",
        "Uczciwa orientacja",
        "Języki, kategorie, tagi, oceny i zgłoszenia pomagają użytkownikom.",
      ],
    ],
    cards: [
      [
        "🔎",
        "Odkrywaj serwery",
        "Znajdź serwery Discord po nazwie, języku, kategorii, tagach lub temacie.",
      ],
      [
        "🚀",
        "Dodaj serwer",
        "Dodaj własny serwer i zarządzaj opisem, językiem, bannerem i invite.",
      ],
      [
        "⭐",
        "Oceny",
        "Oceny społeczności pomagają lepiej ocenić aktywne serwery.",
      ],
      [
        "⚡",
        "Bump system",
        "Serwery mogą stać się bardziej widoczne dzięki bumpom.",
      ],
      [
        "👑",
        "Designy Premium",
        "Premium i Partner mogą otrzymać specjalne layouty.",
      ],
      [
        "🛡️",
        "Moderacja",
        "Zgłoszenia i jasne zasady ograniczają spam, fake serwery i nadużycia.",
      ],
    ],
  },
};

function normalizeUiLanguage(value: unknown): UiLanguage | null {
  const language = String(value ?? "").trim().toLowerCase();

  if (["de", "de-de", "deutsch", "german"].includes(language)) return "de";
  if (["en", "en-us", "en-gb", "english"].includes(language)) return "en";
  if (["fr", "fr-fr", "français", "francais", "french"].includes(language)) {
    return "fr";
  }
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

function getMemberLanguage(member: any) {
  return (
    member?.staff_language ||
    member?.language ||
    member?.preferred_language ||
    "Deutsch"
  );
}

async function loadServers() {
  try {
    const response = await supabaseRequest(
      "servers?select=id,premium_status,partner_status"
    );

    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Could not load info servers:", error);
    return [];
  }
}

async function loadTeam() {
  try {
    const response = await supabaseRequest(
      "staff_members?select=*&order=role.asc,created_at.asc"
    );

    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Could not load info team:", error);
    return [];
  }
}

export default async function InfoPage() {
  const language = await getUiLanguage();
  const text = INFO_TEXT[language] || INFO_TEXT.de;

  const servers = await loadServers();
  const team = await loadTeam();

  const premiumCount = servers.filter(
    (server: any) => server.premium_status || server.partner_status
  ).length;

  return (
    <main className="container info-page-v4">
      <style>{`
        .info-page-v4 {
          padding-top: 72px;
          padding-bottom: 86px;
        }

        .info-v4-hero {
          position: relative;
          overflow: hidden;
          min-height: 520px;
          padding: clamp(28px, 5vw, 62px);
          border-radius: 38px;
          border: 1px solid rgba(170, 120, 255, 0.23);
          background:
            linear-gradient(135deg, rgba(18, 16, 42, 0.98), rgba(8, 12, 31, 0.96)),
            radial-gradient(circle at 10% 10%, rgba(193, 75, 255, 0.22), transparent 34%),
            radial-gradient(circle at 88% 18%, rgba(87, 211, 255, 0.18), transparent 34%);
          box-shadow: 0 0 50px rgba(116, 84, 255, 0.16);
        }

        .info-v4-hero::before {
          content: "";
          position: absolute;
          inset: -1px;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.05), transparent 28%, rgba(255,255,255,0.04)),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 0,
              rgba(255,255,255,0.035) 1px,
              transparent 1px,
              transparent 70px
            );
          mask-image: linear-gradient(to bottom, black, transparent 78%);
        }

        .info-v4-orbit {
          position: absolute;
          right: -120px;
          top: -120px;
          width: 360px;
          height: 360px;
          border-radius: 999px;
          border: 1px solid rgba(157, 234, 255, 0.22);
          box-shadow:
            inset 0 0 50px rgba(116, 223, 255, 0.07),
            0 0 70px rgba(116, 223, 255, 0.10);
        }

        .info-v4-orbit::after {
          content: "";
          position: absolute;
          left: 54px;
          bottom: 54px;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #9deaff;
          box-shadow: 0 0 22px rgba(157, 234, 255, 0.9);
        }

        .info-v4-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          gap: 34px;
          align-items: center;
        }

        .info-v4-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 13px;
          border-radius: 999px;
          color: #9deaff;
          background: rgba(157, 234, 255, 0.08);
          border: 1px solid rgba(157, 234, 255, 0.20);
          font-weight: 900;
          font-size: 0.85rem;
        }

        .info-v4-hero h1 {
          max-width: 860px;
          margin: 22px 0 0;
          color: #ffffff;
          font-size: clamp(3rem, 8vw, 6.6rem);
          line-height: 0.9;
          letter-spacing: -0.075em;
        }

        .info-v4-hero p {
          max-width: 760px;
          margin: 24px 0 0;
          color: rgba(236, 240, 255, 0.78);
          font-size: 1.08rem;
          line-height: 1.78;
        }

        .info-v4-actions {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .info-v4-panel {
          border-radius: 30px;
          padding: 22px;
          background:
            radial-gradient(circle at top, rgba(181, 76, 255, 0.17), transparent 45%),
            rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .info-v4-stat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .info-v4-stat {
          min-height: 96px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .info-v4-stat strong {
          display: block;
          color: #ffffff;
          font-size: 2.1rem;
          line-height: 1;
        }

        .info-v4-stat span {
          display: block;
          margin-top: 8px;
          color: rgba(236, 240, 255, 0.62);
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.78rem;
        }

        .info-v4-mission {
          margin-top: 24px;
          padding: 28px;
          border-radius: 30px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.032));
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .info-v4-mission h2,
        .info-v4-section h2,
        .info-v4-wide-card h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.9rem, 4vw, 3rem);
          letter-spacing: -0.055em;
        }

        .info-v4-mission p,
        .info-v4-section > p,
        .info-v4-wide-card p {
          margin: 14px 0 0;
          color: rgba(236, 240, 255, 0.72);
          line-height: 1.75;
        }

        .info-v4-section {
          margin-top: 46px;
        }

        .info-v4-section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 22px;
          margin-bottom: 20px;
        }

        .info-v4-section-head p {
          max-width: 650px;
          margin: 0;
          color: rgba(236, 240, 255, 0.64);
          line-height: 1.7;
        }

        .info-v4-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .info-v4-card {
          min-height: 210px;
          padding: 24px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.062), rgba(255,255,255,0.035));
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: 0 0 28px rgba(95, 75, 255, 0.08);
        }

        .info-v4-icon {
          width: 48px;
          height: 48px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          background: linear-gradient(135deg, rgba(181, 76, 255, 0.32), rgba(116, 223, 255, 0.15));
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 22px;
        }

        .info-v4-card h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.22rem;
        }

        .info-v4-card p {
          margin: 12px 0 0;
          color: rgba(236, 240, 255, 0.70);
          line-height: 1.68;
        }

        .info-v4-wide-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .info-v4-wide-card {
          padding: 26px;
          border-radius: 30px;
          background:
            radial-gradient(circle at top right, rgba(157, 234, 255, 0.11), transparent 34%),
            rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .info-v4-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 16px;
        }

        .info-v4-team-card {
          position: relative;
          overflow: hidden;
          padding: 24px;
          border-radius: 28px;
          background:
            radial-gradient(circle at top, rgba(181, 76, 255, 0.15), transparent 45%),
            rgba(255, 255, 255, 0.052);
          border: 1px solid rgba(255, 255, 255, 0.10);
          text-align: center;
        }

        .info-v4-team-avatar {
          width: 88px;
          height: 88px;
          margin: 0 auto 14px;
          border-radius: 28px;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, rgba(181, 76, 255, 0.34), rgba(116, 223, 255, 0.18));
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 0 30px rgba(146, 91, 255, 0.20);
        }

        .info-v4-team-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-v4-team-avatar span {
          font-size: 34px;
        }

        .info-v4-team-card strong {
          display: block;
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 950;
        }

        .info-v4-role {
          display: inline-flex;
          margin-top: 8px;
          min-height: 30px;
          padding: 0 12px;
          align-items: center;
          border-radius: 999px;
          color: #9deaff;
          background: rgba(157, 234, 255, 0.08);
          border: 1px solid rgba(157, 234, 255, 0.18);
          font-weight: 900;
          font-size: 0.82rem;
        }

        .info-v4-language {
          margin-top: 10px;
          color: rgba(236, 240, 255, 0.62);
          font-size: 0.9rem;
        }

        .info-v4-empty {
          padding: 24px;
          border-radius: 24px;
          color: rgba(236, 240, 255, 0.70);
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .info-v4-legal-links {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .info-v4-legal-links a {
          min-height: 38px;
          padding: 0 14px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: rgba(236, 240, 255, 0.78);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .info-v4-legal-links a:hover {
          color: #ffffff;
        }

        @media (max-width: 980px) {
          .info-v4-hero-grid,
          .info-v4-wide-grid {
            grid-template-columns: 1fr;
          }

          .info-v4-section-head {
            align-items: start;
            flex-direction: column;
          }
        }
      `}</style>

      <section className="info-v4-hero">
        <div className="info-v4-orbit" />

        <div className="info-v4-hero-grid">
          <div>
            <span className="info-v4-eyebrow">
              ✦ {text.badge} · {text.eyebrow}
            </span>

            <h1>{text.title}</h1>
            <p>{text.subtitle}</p>

            <div className="info-v4-actions">
              <Link href="/servers" className="btn">
                {text.discover}
              </Link>

              <Link href="/submit" className="btn secondary">
                {text.submit}
              </Link>

              <a
                href="https://discord.gg/asko"
                target="_blank"
                rel="noreferrer"
                className="btn secondary"
              >
                {text.contact}
              </a>
            </div>
          </div>

          <aside className="info-v4-panel">
            <div className="info-v4-stat-grid">
              <div className="info-v4-stat">
                <strong>{servers.length}</strong>
                <span>{text.statsServers}</span>
              </div>

              <div className="info-v4-stat">
                <strong>{team.length}</strong>
                <span>{text.statsTeam}</span>
              </div>

              <div className="info-v4-stat">
                <strong>{premiumCount}</strong>
                <span>{text.statsPremium}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="info-v4-mission">
        <h2>{text.missionTitle}</h2>
        <p>{text.missionText}</p>
      </section>

      <section className="info-v4-section">
        <div className="info-v4-section-head">
          <h2>{text.specialTitle}</h2>
          <p>{text.specialSubtitle}</p>
        </div>

        <div className="info-v4-card-grid">
          {text.specialCards.map(([icon, title, body]) => (
            <article className="info-v4-card" key={title}>
              <div className="info-v4-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-v4-section">
        <div className="info-v4-section-head">
          <h2>{text.functionsTitle}</h2>
          <p>{text.functionsSubtitle}</p>
        </div>

        <div className="info-v4-card-grid">
          {text.cards.map(([icon, title, body]) => (
            <article className="info-v4-card" key={title}>
              <div className="info-v4-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-v4-wide-grid">
        <article className="info-v4-wide-card">
          <h2>{text.eventsTitle}</h2>
          <p>{text.eventsText}</p>
          <div className="info-v4-actions">
            <a
              href="https://discord.gg/asko"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              {text.eventsButton}
            </a>
          </div>
        </article>

        <article className="info-v4-wide-card">
          <h2>{text.partnerTitle}</h2>
          <p>{text.partnerText}</p>
        </article>

        <article className="info-v4-wide-card">
          <h2>{text.feedbackTitle}</h2>
          <p>{text.feedbackText}</p>
        </article>
      </section>

      <section className="info-v4-section">
        <div className="info-v4-section-head">
          <h2>{text.teamTitle}</h2>
          <p>{text.teamSubtitle}</p>
        </div>

        {team.length === 0 ? (
          <div className="info-v4-empty">{text.noTeam}</div>
        ) : (
          <div className="info-v4-team-grid">
            {team.map((member: any) => (
              <article className="info-v4-team-card" key={member.id}>
                <div className="info-v4-team-avatar">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.discord_username} />
                  ) : (
                    <span>{getRoleIcon(member.role)}</span>
                  )}
                </div>

                <strong>{member.discord_username}</strong>
                <span className="info-v4-role">{getRoleLabel(member.role)}</span>
                <div className="info-v4-language">
                  {text.teamLanguage}: {getMemberLanguage(member)}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="info-v4-wide-card">
        <h2>{text.legalTitle}</h2>
        <p>{text.legalText}</p>

        <div className="info-v4-legal-links">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/nutzungsbedingungen">Nutzungsbedingungen</Link>
        </div>
      </section>
    </main>
  );
}
