import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { categories, languages } from "@/lib/demoData";
import TagInput from "@/components/TagInput";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

const TERMS_VERSION = "2026-06-10";
const PRIVACY_VERSION = "2026-06-10";

const SUBMIT_TEXT = {
  de: {
    loginBadge: "Discord Login erforderlich",
    loginTitle: "Login erforderlich",
    loginText:
      "Du musst dich mit Discord einloggen, bevor du einen Server eintragen kannst.",
    loginButton: "Mit Discord einloggen",

    badge: "Ein Server pro Discord-Nutzer",
    title: "Discord Server eintragen",
    intro:
      "Füge deine Community zu Asko Cafe hinzu. Nach dem Eintragen wirst du zu Discord weitergeleitet, damit du den Asko Cafe Bot einladen kannst.",

    serverName: "Servername",
    serverNamePlaceholder: "Beispiel: Asko Community",
    inviteLink: "Discord Einladungslink",
    description: "Beschreibung",
    descriptionPlaceholder: "Beschreibe deinen Discord Server: Thema, Sprache, Community, Aktivitäten, Regeln, Events und warum neue Mitglieder beitreten sollten.",
    maxWords: "Mindestens 180 Zeichen. Maximal 1500 Wörter.",
    descriptionHelpTitle: "Tipp für eine gute Beschreibung",
    descriptionHelpText:
      "Eine gute Beschreibung hilft neuen Mitgliedern und Google. Schreibe kurz, worum es auf deinem Server geht, für wen er ist und was Mitglieder dort machen können.",
    banner: "Server-Banner",
    category: "Kategorie",
    language: "Sprache",
    tags: "Tags",
    nsfw: "Dieser Server enthält NSFW-Inhalte",
    submitButton: "Server eintragen und Bot einladen",
    note:
      "Das Server-Logo wird automatisch vom Discord-Server übernommen, sobald der Invite-Link gültig ist. Nach dem Eintragen wirst du zu Discord weitergeleitet, damit du den Asko Cafe Bot einladen kannst.",

    legalPrefix: "Ich akzeptiere die",
    legalTerms: "Nutzungsbedingungen",
    legalAnd: "und die",
    legalPrivacy: "Datenschutzerklärung",
    legalSuffix: "von Asko Cafe.",
    legalRequired:
      "Du musst die Nutzungsbedingungen und Datenschutzerklärung akzeptieren, bevor du fortfahren kannst.",

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
    intro:
      "Add your community to Asko Cafe. After submission, you will be sent to Discord to invite the Asko Cafe bot.",

    serverName: "Server name",
    serverNamePlaceholder: "Example: Asko Community",
    inviteLink: "Discord invite link",
    description: "Description",
    descriptionPlaceholder: "Describe your Discord server: topic, language, community, activities, rules, events and why new members should join.",
    maxWords: "Minimum 180 characters. Maximum 1500 words.",
    descriptionHelpTitle: "Tip for a good description",
    descriptionHelpText:
      "A good description helps new members and Google. Explain what your server is about, who it is for and what members can do there.",
    banner: "Server banner",
    category: "Category",
    language: "Language",
    tags: "Tags",
    nsfw: "This server contains NSFW content",
    submitButton: "Submit server and invite bot",
    note:
      "The server logo will automatically be taken from the Discord server once the invite link is valid. After submitting, you will be redirected to Discord to invite the Asko Cafe bot.",

    legalPrefix: "I accept the",
    legalTerms: "Terms of Use",
    legalAnd: "and the",
    legalPrivacy: "Privacy Policy",
    legalSuffix: "of Asko Cafe.",
    legalRequired:
      "You must accept the Terms of Use and Privacy Policy before continuing.",

    approvalTitle: "How approval works",
    step1Title: "Submit your server",
    step1Text:
      "Submit your server without a server ID and without uploading a logo.",
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
    intro:
      "Ajoute ta communauté à Asko Cafe. Après l'envoi, tu seras redirigé vers Discord pour inviter le bot Asko Cafe.",

    serverName: "Nom du serveur",
    serverNamePlaceholder: "Exemple : Asko Community",
    inviteLink: "Lien d'invitation Discord",
    description: "Description",
    descriptionPlaceholder: "Décris ton serveur Discord : sujet, langue, communauté, activités, règles, événements et pourquoi de nouveaux membres devraient rejoindre.",
    maxWords: "Minimum 180 caractères. Maximum 1500 mots.",
    descriptionHelpTitle: "Conseil pour une bonne description",
    descriptionHelpText:
      "Une bonne description aide les nouveaux membres et Google. Explique le sujet du serveur, pour qui il est fait et ce que les membres peuvent y faire.",
    banner: "Bannière du serveur",
    category: "Catégorie",
    language: "Langue",
    tags: "Tags",
    nsfw: "Ce serveur contient du contenu NSFW",
    submitButton: "Ajouter le serveur et inviter le bot",
    note:
      "Le logo du serveur sera automatiquement repris depuis le serveur Discord dès que le lien d'invitation sera valide. Après l'envoi, tu seras redirigé vers Discord pour inviter le bot Asko Cafe.",

    legalPrefix: "J'accepte les",
    legalTerms: "conditions d’utilisation",
    legalAnd: "et la",
    legalPrivacy: "politique de confidentialité",
    legalSuffix: "d’Asko Cafe.",
    legalRequired:
      "Tu dois accepter les conditions d’utilisation et la politique de confidentialité avant de continuer.",

    approvalTitle: "Fonctionnement de l'approbation",
    step1Title: "Ajouter ton serveur",
    step1Text:
      "Ajoute ton serveur sans ID de serveur et sans téléchargement de logo.",
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
    intro:
      "Aggiungi la tua community ad Asko Cafe. Dopo l'invio, verrai reindirizzato su Discord per invitare il bot Asko Cafe.",

    serverName: "Nome del server",
    serverNamePlaceholder: "Esempio: Asko Community",
    inviteLink: "Link di invito Discord",
    description: "Descrizione",
    descriptionPlaceholder: "Descrivi il tuo server Discord: tema, lingua, community, attività, regole, eventi e perché nuovi membri dovrebbero entrare.",
    maxWords: "Minimo 180 caratteri. Massimo 1500 parole.",
    descriptionHelpTitle: "Consiglio per una buona descrizione",
    descriptionHelpText:
      "Una buona descrizione aiuta i nuovi membri e Google. Spiega di cosa parla il server, per chi è pensato e cosa possono fare i membri.",
    banner: "Banner del server",
    category: "Categoria",
    language: "Lingua",
    tags: "Tag",
    nsfw: "Questo server contiene contenuti NSFW",
    submitButton: "Aggiungi server e invita bot",
    note:
      "Il logo del server verrà preso automaticamente dal server Discord non appena il link di invito sarà valido. Dopo l'invio, verrai reindirizzato su Discord per invitare il bot Asko Cafe.",

    legalPrefix: "Accetto le",
    legalTerms: "condizioni d’uso",
    legalAnd: "e la",
    legalPrivacy: "privacy policy",
    legalSuffix: "di Asko Cafe.",
    legalRequired:
      "Devi accettare le condizioni d’uso e la privacy policy prima di continuare.",

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
    title: "Dodaj swój serwer Discord",
    intro:
      "Dodaj swoją społeczność do Asko Cafe. Po wysłaniu zostaniesz przekierowany do Discorda, aby zaprosić bota Asko Cafe.",

    serverName: "Nazwa serwera",
    serverNamePlaceholder: "Przykład: Asko Community",
    inviteLink: "Link zaproszenia Discord",
    description: "Opis",
    descriptionPlaceholder: "Opisz swój serwer Discord: temat, język, społeczność, aktywności, zasady, wydarzenia i dlaczego nowi członkowie powinni dołączyć.",
    maxWords: "Minimum 180 znaków. Maksymalnie 1500 słów.",
    descriptionHelpTitle: "Wskazówka do dobrego opisu",
    descriptionHelpText:
      "Dobry opis pomaga nowym członkom i Google. Napisz, o czym jest serwer, dla kogo jest i co członkowie mogą tam robić.",
    banner: "Banner serwera",
    category: "Kategoria",
    language: "Język",
    tags: "Tagi",
    nsfw: "Ten serwer zawiera treści NSFW",
    submitButton: "Dodaj serwer i zaproś bota",
    note:
      "Logo serwera zostanie automatycznie pobrane z serwera Discord, gdy link zaproszenia będzie poprawny. Po dodaniu zostaniesz przekierowany do Discorda, aby zaprosić bota Asko Cafe.",

    legalPrefix: "Akceptuję",
    legalTerms: "warunki korzystania",
    legalAnd: "oraz",
    legalPrivacy: "politykę prywatności",
    legalSuffix: "Asko Cafe.",
    legalRequired:
      "Musisz zaakceptować warunki korzystania i politykę prywatności przed kontynuacją.",

    approvalTitle: "Jak działa zatwierdzanie",
    step1Title: "Dodaj serwer",
    step1Text: "Dodaj serwer bez ID serwera i bez przesyłania logo.",
    step2Title: "Zaproś bota",
    step2Text: "Po dodaniu automatycznie otworzy się zaproszenie bota.",
    step3Title: "Sprawdzenie przez admina",
    step3Text: "Po zatwierdzeniu serwer będzie można bumpować.",
  },
} as const;

const SUBMIT_DESCRIPTION_HELP_POINTS = {
  de: [
    "Thema und Zielgruppe des Servers",
    "Sprache, Kategorie und Community-Art",
    "Gaming, Anime, Minecraft, Valorant, Events oder andere Themen",
    "Warum man deinem Discord Server beitreten sollte",
  ],
  en: [
    "Server topic and target audience",
    "Language, category and community type",
    "Gaming, anime, Minecraft, Valorant, events or other topics",
    "Why people should join your Discord server",
  ],
  fr: [
    "Sujet du serveur et public cible",
    "Langue, catégorie et type de communauté",
    "Gaming, anime, Minecraft, Valorant, événements ou autres sujets",
    "Pourquoi rejoindre ton serveur Discord",
  ],
  it: [
    "Tema del server e pubblico target",
    "Lingua, categoria e tipo di community",
    "Gaming, anime, Minecraft, Valorant, eventi o altri temi",
    "Perché entrare nel tuo server Discord",
  ],
  pl: [
    "Temat serwera i grupa docelowa",
    "Język, kategoria i typ społeczności",
    "Gaming, anime, Minecraft, Valorant, wydarzenia lub inne tematy",
    "Dlaczego warto dołączyć do twojego serwera Discord",
  ],
} as const;

const SUBMIT_ERROR_TEXT = {
  de: {
    title: "Eintragen nicht möglich",
    login: "Du musst dich zuerst mit Discord einloggen.",
    user: "Dein Discord-Konto konnte nicht eindeutig erkannt werden. Bitte melde dich neu an.",
    missing: "Bitte fülle Servername, Invite-Link und Beschreibung aus.",
    legal_required:
      "Bitte akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung.",
    only_one_server:
      "Du hast bereits einen Server eingetragen. Pro Discord-Nutzer ist nur ein Server erlaubt. Bearbeite deinen vorhandenen Server im Server-Dashboard.",
    server_already_exists:
      "Dieser Discord-Server ist bereits eingetragen. Ein Discord-Server kann nicht doppelt gelistet werden.",
    unknown:
      "Der Server konnte nicht eingetragen werden. Bitte prüfe deine Angaben und versuche es erneut.",
    dashboardButton: "Zum Server-Dashboard",
    tryAgainButton: "Angaben prüfen",
  },
  en: {
    title: "Submission not possible",
    login: "You need to login with Discord first.",
    user: "Your Discord account could not be identified. Please login again.",
    missing: "Please fill in server name, invite link and description.",
    legal_required: "Please accept the Terms of Use and Privacy Policy.",
    only_one_server:
      "You already submitted a server. Only one server is allowed per Discord user. Edit your existing server in your server dashboard.",
    server_already_exists:
      "This Discord server is already listed. A Discord server cannot be listed twice.",
    unknown:
      "The server could not be submitted. Please check your details and try again.",
    dashboardButton: "Open server dashboard",
    tryAgainButton: "Check details",
  },
  fr: {
    title: "Ajout impossible",
    login: "Tu dois d'abord te connecter avec Discord.",
    user: "Ton compte Discord n'a pas pu être identifié. Connecte-toi à nouveau.",
    missing:
      "Veuillez remplir le nom du serveur, le lien d'invitation et la description.",
    legal_required:
      "Veuillez accepter les conditions d’utilisation et la politique de confidentialité.",
    only_one_server:
      "Tu as déjà ajouté un serveur. Un seul serveur est autorisé par utilisateur Discord. Modifie ton serveur existant dans le tableau de bord.",
    server_already_exists:
      "Ce serveur Discord est déjà listé. Un serveur Discord ne peut pas être listé deux fois.",
    unknown:
      "Le serveur n'a pas pu être ajouté. Vérifie tes informations et réessaie.",
    dashboardButton: "Ouvrir le tableau de bord",
    tryAgainButton: "Vérifier les informations",
  },
  it: {
    title: "Invio non possibile",
    login: "Devi prima accedere con Discord.",
    user: "Il tuo account Discord non è stato riconosciuto. Accedi di nuovo.",
    missing: "Compila nome server, link invito e descrizione.",
    legal_required: "Accetta le condizioni d’uso e la privacy policy.",
    only_one_server:
      "Hai già aggiunto un server. È consentito un solo server per utente Discord. Modifica il server esistente nel dashboard.",
    server_already_exists:
      "Questo server Discord è già presente. Un server Discord non può essere inserito due volte.",
    unknown:
      "Il server non può essere aggiunto. Controlla i dati e riprova.",
    dashboardButton: "Apri dashboard server",
    tryAgainButton: "Controlla dati",
  },
  pl: {
    title: "Nie można dodać",
    login: "Najpierw zaloguj się przez Discord.",
    user: "Nie udało się rozpoznać konta Discord. Zaloguj się ponownie.",
    missing: "Wpisz nazwę serwera, link zaproszenia i opis.",
    legal_required: "Zaakceptuj warunki korzystania i politykę prywatności.",
    only_one_server:
      "Masz już dodany serwer. Dozwolony jest tylko jeden serwer na użytkownika Discord. Edytuj istniejący serwer w panelu.",
    server_already_exists:
      "Ten serwer Discord jest już dodany. Serwer Discord nie może być dodany dwa razy.",
    unknown:
      "Nie udało się dodać serwera. Sprawdź dane i spróbuj ponownie.",
    dashboardButton: "Otwórz panel serwera",
    tryAgainButton: "Sprawdź dane",
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

function text(language: LanguageCode, key: keyof typeof SUBMIT_TEXT.de) {
  return SUBMIT_TEXT[language][key] || SUBMIT_TEXT.de[key];
}

function LegalAcceptanceCheckbox({
  language,
  checkboxName,
}: {
  language: LanguageCode;
  checkboxName: string;
}) {
  return (
    <label className="check-row full legal-accept-row">
      <input type="checkbox" name={checkboxName} value="accepted" required />

      <span>
        {text(language, "legalPrefix")}{" "}
        <Link href="/nutzungsbedingungen" target="_blank">
          {text(language, "legalTerms")}
        </Link>{" "}
        {text(language, "legalAnd")}{" "}
        <Link href="/datenschutz" target="_blank">
          {text(language, "legalPrivacy")}
        </Link>{" "}
        {text(language, "legalSuffix")}
      </span>
    </label>
  );
}


type SearchParamsValue = string | string[] | undefined;

type SubmitPageProps = {
  searchParams?:
    | Promise<Record<string, SearchParamsValue>>
    | Record<string, SearchParamsValue>;
};

async function resolveSearchParams(searchParams: SubmitPageProps["searchParams"]) {
  return await Promise.resolve(searchParams ?? {});
}

function getSearchParam(
  searchParams: Record<string, SearchParamsValue>,
  key: string
) {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}

function getSubmitErrorMessage(language: LanguageCode, errorCode: string) {
  const messages = SUBMIT_ERROR_TEXT[language] || SUBMIT_ERROR_TEXT.de;

  if (
    errorCode === "login" ||
    errorCode === "user" ||
    errorCode === "missing" ||
    errorCode === "legal_required" ||
    errorCode === "only_one_server" ||
    errorCode === "server_already_exists"
  ) {
    return messages[errorCode];
  }

  return messages.unknown;
}

export default async function SubmitPage({ searchParams }: SubmitPageProps) {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const pageLanguage = normalizeLanguage(cookieStore.get("asko_language")?.value);
  const resolvedSearchParams = await resolveSearchParams(searchParams);
  const submitError = getSearchParam(resolvedSearchParams, "error");

  if (!session) {
    return (
      <main className="container submit-page">
        <style>{`
          .legal-login-form {
            margin-top: 20px;
            display: grid;
            gap: 14px;
          }

          .legal-accept-row {
            align-items: flex-start;
          }

          .legal-accept-row input {
            width: 17px;
            height: 17px;
            margin-top: 3px;
            flex: 0 0 auto;
            accent-color: #8b5cf6;
          }

          .legal-accept-row span {
            font-size: 0.92rem;
            line-height: 1.55;
          }

          .legal-accept-row a {
            color: #9deaff;
            font-weight: 950;
            text-decoration: none;
          }

          .legal-accept-row a:hover {
            color: #ffffff;
          }

          .legal-small-note {
            margin: 0;
            color: rgba(236, 240, 255, 0.62);
            font-size: 0.88rem;
            line-height: 1.55;
          }
        `}</style>

        <section className="profile-card">
          <span className="page-badge">{text(pageLanguage, "loginBadge")}</span>
          <h1>{text(pageLanguage, "loginTitle")}</h1>
          <p>{text(pageLanguage, "loginText")}</p>

          <form className="legal-login-form" action="/api/auth/signin" method="GET">
            <LegalAcceptanceCheckbox
              language={pageLanguage}
              checkboxName="legal_acceptance_login"
            />

            <input type="hidden" name="terms_version" value={TERMS_VERSION} />
            <input type="hidden" name="privacy_version" value={PRIVACY_VERSION} />

            <button className="btn" type="submit">
              {text(pageLanguage, "loginButton")}
            </button>

            <p className="legal-small-note">
              {text(pageLanguage, "legalRequired")}
            </p>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="container submit-page">
      <style>{`
        .legal-accept-row {
          align-items: flex-start;
        }

        .legal-accept-row input {
          width: 17px;
          height: 17px;
          margin-top: 3px;
          flex: 0 0 auto;
          accent-color: #8b5cf6;
        }

        .legal-accept-row span {
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .legal-accept-row a {
          color: #9deaff;
          font-weight: 950;
          text-decoration: none;
        }

        .legal-accept-row a:hover {
          color: #ffffff;
        }

        .legal-small-note {
          grid-column: 1 / -1;
          margin: -6px 0 0;
          color: rgba(236, 240, 255, 0.62);
          font-size: 0.88rem;
          line-height: 1.55;
        }

        .description-help-box {
          margin-top: 12px;
          padding: 16px;
          border-radius: 18px;
          background:
            radial-gradient(circle at 0% 0%, rgba(116, 223, 255, 0.12), transparent 38%),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(116, 223, 255, 0.18);
          box-shadow: 0 0 22px rgba(116,223,255,0.08);
        }

        .description-help-box strong {
          display: block;
          color: #ffffff;
          font-size: 0.95rem;
          margin-bottom: 6px;
        }

        .description-help-box p {
          margin: 0;
          color: rgba(236, 240, 255, 0.72);
          font-size: 0.88rem;
          line-height: 1.6;
        }

        .description-help-box ul {
          margin: 12px 0 0;
          padding-left: 18px;
          color: rgba(236, 240, 255, 0.72);
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .description-help-box li + li {
          margin-top: 4px;
        }

        .description-help-box code {
          color: #9deaff;
          font-weight: 950;
          background: rgba(116,223,255,0.10);
          border: 1px solid rgba(116,223,255,0.16);
          border-radius: 999px;
          padding: 2px 8px;
          display: inline-flex;
          margin: 2px 2px 0 0;
        }

        .description-help-box-left {
          margin: 0 0 18px;
        }

        .submit-error-box {
          margin: 0 0 22px;
          padding: 18px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 0% 0%, rgba(255, 77, 109, 0.16), transparent 40%),
            rgba(255, 77, 109, 0.08);
          border: 1px solid rgba(255, 77, 109, 0.28);
          box-shadow: 0 0 28px rgba(255, 77, 109, 0.10);
        }

        .submit-error-box strong {
          display: block;
          color: #ffffff;
          font-size: 1rem;
          margin-bottom: 7px;
        }

        .submit-error-box p {
          margin: 0;
          color: rgba(255, 235, 241, 0.84);
          line-height: 1.6;
        }

        .submit-error-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }

        .submit-error-actions a {
          min-height: 40px;
          padding: 0 14px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 950;
          color: #ffffff;
          text-decoration: none;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
        }

        .submit-error-actions a:first-child {
          background: linear-gradient(135deg, #8b5cf6, #ec4899, #22d3ee);
          border-color: transparent;
        }
      `}</style>

      <section className="submit-hero">
        <span className="page-badge">{text(pageLanguage, "badge")}</span>
        <h1>{text(pageLanguage, "title")}</h1>
        <p>{text(pageLanguage, "intro")}</p>
      </section>

      {submitError && (
        <section className="submit-error-box">
          <strong>{SUBMIT_ERROR_TEXT[pageLanguage].title}</strong>
          <p>{getSubmitErrorMessage(pageLanguage, submitError)}</p>

          <div className="submit-error-actions">
            {(submitError === "only_one_server" ||
              submitError === "server_already_exists") && (
              <Link href="/profile">
                {SUBMIT_ERROR_TEXT[pageLanguage].dashboardButton}
              </Link>
            )}

            <Link href="/submit">
              {SUBMIT_ERROR_TEXT[pageLanguage].tryAgainButton}
            </Link>
          </div>
        </section>
      )}

      <section className="submit-layout">
        <form
          className="submit-card"
          action="/api/submit-server"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="accepted_terms_version" value={TERMS_VERSION} />
          <input
            type="hidden"
            name="accepted_privacy_version"
            value={PRIVACY_VERSION}
          />

          <div className="form-grid">
            <label className="field">
              <span>{text(pageLanguage, "serverName")}</span>
              <input
                className="input"
                name="server_name"
                placeholder={text(pageLanguage, "serverNamePlaceholder")}
                required
              />
            </label>

            <label className="field">
              <span>{text(pageLanguage, "inviteLink")}</span>
              <input
                className="input"
                name="invite_link"
                placeholder="https://discord.gg/..."
                required
              />
            </label>

            <label className="field full">
              <span>{text(pageLanguage, "description")}</span>
              <textarea
                name="description"
                placeholder={text(pageLanguage, "descriptionPlaceholder")}
                minLength={180}
                maxLength={9000}
                required
              />
              <small className="char-counter">
                {text(pageLanguage, "maxWords")}
              </small>
            </label>

            <label className="field">
              <span>{text(pageLanguage, "banner")}</span>
              <input type="file" name="banner" accept="image/*" />
            </label>

            <label className="field">
              <span>{text(pageLanguage, "category")}</span>
              <select name="category">
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{text(pageLanguage, "language")}</span>
              <select name="language">
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>

            <label className="field full">
              <span>{text(pageLanguage, "tags")}</span>
              <TagInput />
            </label>

            <label className="check-row full">
              <input type="checkbox" name="nsfw" />
              <span>{text(pageLanguage, "nsfw")}</span>
            </label>

            <LegalAcceptanceCheckbox
              language={pageLanguage}
              checkboxName="legal_acceptance_submit"
            />

            <p className="legal-small-note">
              {text(pageLanguage, "legalRequired")}
            </p>
          </div>

          <button className="btn submit-button" type="submit">
            {text(pageLanguage, "submitButton")}
          </button>

          <p className="form-note">{text(pageLanguage, "note")}</p>
        </form>

        <aside className="submit-info">
          <div className="description-help-box description-help-box-left">
            <strong>{text(pageLanguage, "descriptionHelpTitle")}</strong>
            <p>{text(pageLanguage, "descriptionHelpText")}</p>

            <ul>
              {SUBMIT_DESCRIPTION_HELP_POINTS[pageLanguage].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <p style={{ marginTop: "12px" }}>
              Gute Wörter sind zum Beispiel: <code>Gaming</code>{" "}
              <code>Anime</code> <code>Minecraft</code>{" "}
              <code>Valorant</code> <code>Community</code>{" "}
              <code>Deutsch</code>
            </p>
          </div>

          <h2>{text(pageLanguage, "approvalTitle")}</h2>

          <div className="info-step">
            <strong>1</strong>
            <div>
              <h3>{text(pageLanguage, "step1Title")}</h3>
              <p>{text(pageLanguage, "step1Text")}</p>
            </div>
          </div>

          <div className="info-step">
            <strong>2</strong>
            <div>
              <h3>{text(pageLanguage, "step2Title")}</h3>
              <p>{text(pageLanguage, "step2Text")}</p>
            </div>
          </div>

          <div className="info-step">
            <strong>3</strong>
            <div>
              <h3>{text(pageLanguage, "step3Title")}</h3>
              <p>{text(pageLanguage, "step3Text")}</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
