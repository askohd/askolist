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
    descriptionPlaceholder: "Beschreibe deinen Discord Server...",
    maxWords: "Maximal 1500 Wörter.",
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
    step1 Nutzungsbedingungen und Datenschutzerklärung akzeptieren, bevor du fortfahrenTitle: "Server eintragen",
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
    descriptionPlaceholder: "Describe your Discord server...",
    maxWords: "Maximum 1500 words.",
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
    descriptionPlaceholder: "Décris ton serveur Discord...",
    maxWords: "Maximum 1500 mots.",
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
    descriptionPlaceholder: "Descrivi il tuo server Discord...",
    maxWords: "Massimo 1500 parole.",
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
    descriptionPlaceholder: "Opisz swój serwer Discord...",
    maxWords: "Maksymalnie 1500 słów.",
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

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const pageLanguage = normalizeLanguage(cookieStore.get("asko_language")?.value);

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
      `}</style>

      <section className="submit-hero">
        <span className="page-badge">{text(pageLanguage, "badge")}</span>
        <h1>{text(pageLanguage, "title")}</h1>
        <p>{text(pageLanguage, "intro")}</p>
      </section>

      <section className="submit-layout">
        <form
          className="submit-card"
          action="/api/submit-server"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="accepted_terms" value="true" />
          <input type="hidden" name="accepted_privacy" value="true" />
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
