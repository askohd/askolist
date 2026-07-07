import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import ProfileServerEditor from "@/components/ProfileServerEditor";
import ProfileReferralBox from "@/components/ProfileReferralBox";
import ProfileModerationAlerts from "@/components/ProfileModerationAlerts";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

const PROFILE_TEXT = {
  de: {
    loginTitle: "Login erforderlich",
    loginText:
      "Du musst dich mit Discord einloggen, um dein Server Dashboard zu sehen.",
    loginButton: "Mit Discord einloggen",
    dashboard: "Server Dashboard",
    discordUserId: "Discord Nutzer-ID",
    notAvailable: "Nicht verfügbar",
    myServer: "Mein Server",
    addServer: "Server hinzufügen",
    noServerTitle: "Noch kein Server hinzugefügt",
    noServerText:
      "Du hast noch keinen Discord Server eingetragen. Jeder Nutzer kann einen Server hinzufügen.",
    submitServer: "Server eintragen",
    serverSettings: "Server-Einstellungen",
    approved: "Freigegeben",
    waiting: "Wartet auf Freigabe",
    premium: "Premium",
    partner: "Partner",
    bumps: "Bumps",
    openInvite: "Discord Einladung öffnen",
  },

  en: {
    loginTitle: "Login required",
    loginText: "You need to login with Discord to view your server dashboard.",
    loginButton: "Login with Discord",
    dashboard: "Server Dashboard",
    discordUserId: "Discord User ID",
    notAvailable: "Not available",
    myServer: "My Server",
    addServer: "Add Server",
    noServerTitle: "No server added yet",
    noServerText:
      "You have not submitted a Discord server yet. Each user can add one server.",
    submitServer: "Submit your server",
    serverSettings: "Server Settings",
    approved: "Approved",
    waiting: "Waiting for approval",
    premium: "Premium",
    partner: "Partner",
    bumps: "Bumps",
    openInvite: "Open Discord Invite",
  },

  fr: {
    loginTitle: "Connexion requise",
    loginText:
      "Tu dois te connecter avec Discord pour voir ton tableau de bord serveur.",
    loginButton: "Se connecter avec Discord",
    dashboard: "Tableau de bord serveur",
    discordUserId: "ID utilisateur Discord",
    notAvailable: "Non disponible",
    myServer: "Mon serveur",
    addServer: "Ajouter un serveur",
    noServerTitle: "Aucun serveur ajouté",
    noServerText:
      "Tu n'as pas encore ajouté de serveur Discord. Chaque utilisateur peut ajouter un serveur.",
    submitServer: "Ajouter ton serveur",
    serverSettings: "Paramètres du serveur",
    approved: "Approuvé",
    waiting: "En attente d'approbation",
    premium: "Premium",
    partner: "Partenaire",
    bumps: "Bumps",
    openInvite: "Ouvrir l'invitation Discord",
  },

  it: {
    loginTitle: "Accesso richiesto",
    loginText:
      "Devi accedere con Discord per vedere la dashboard del tuo server.",
    loginButton: "Accedi con Discord",
    dashboard: "Dashboard server",
    discordUserId: "ID utente Discord",
    notAvailable: "Non disponibile",
    myServer: "Il mio server",
    addServer: "Aggiungi server",
    noServerTitle: "Nessun server aggiunto",
    noServerText:
      "Non hai ancora aggiunto un server Discord. Ogni utente può aggiungere un server.",
    submitServer: "Aggiungi il tuo server",
    serverSettings: "Impostazioni server",
    approved: "Approvato",
    waiting: "In attesa di approvazione",
    premium: "Premium",
    partner: "Partner",
    bumps: "Bump",
    openInvite: "Apri invito Discord",
  },

  pl: {
    loginTitle: "Wymagane logowanie",
    loginText:
      "Musisz zalogować się przez Discord, aby zobaczyć panel swojego serwera.",
    loginButton: "Zaloguj przez Discord",
    dashboard: "Panel serwera",
    discordUserId: "ID użytkownika Discord",
    notAvailable: "Niedostępne",
    myServer: "Mój serwer",
    addServer: "Dodaj serwer",
    noServerTitle: "Nie dodano jeszcze serwera",
    noServerText:
      "Nie dodałeś jeszcze serwera Discord. Każdy użytkownik może dodać jeden serwer.",
    submitServer: "Dodaj swój serwer",
    serverSettings: "Ustawienia serwera",
    approved: "Zatwierdzony",
    waiting: "Oczekuje na zatwierdzenie",
    premium: "Premium",
    partner: "Partner",
    bumps: "Bumpy",
    openInvite: "Otwórz zaproszenie Discord",
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

function text(language: LanguageCode, key: keyof typeof PROFILE_TEXT.de) {
  return PROFILE_TEXT[language][key] || PROFILE_TEXT.de[key];
}

function getBaseUrl() {
  return SITE_URL.replace(/\/$/, "");
}

function normalizeReferralCode(value: unknown) {
  return String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 32);
}

function createReferralCodeCandidate() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  const timePart = Date.now().toString(36).slice(-3).toUpperCase();

  return `ASKO-${randomPart}${timePart}`;
}

async function getOrCreateReferralInfo(ownerDiscordUserId: string) {
  try {
    const existingRows = await supabaseRequest(
      `server_referral_codes?owner_discord_user_id=eq.${encodeURIComponent(
        ownerDiscordUserId
      )}&select=code,successful_referrals,rewarded_months&limit=1`
    );

    const existing = Array.isArray(existingRows) ? existingRows[0] : null;

    if (existing?.code) {
      return {
        code: normalizeReferralCode(existing.code),
        successfulReferrals: Number(existing.successful_referrals ?? 0),
        rewardedMonths: Number(existing.rewarded_months ?? 0),
      };
    }

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const code = createReferralCodeCandidate();

      try {
        await supabaseRequest("server_referral_codes", {
          method: "POST",
          body: JSON.stringify({
            owner_discord_user_id: ownerDiscordUserId,
            code,
            successful_referrals: 0,
            rewarded_months: 0,
          }),
        });

        return {
          code,
          successfulReferrals: 0,
          rewardedMonths: 0,
        };
      } catch (error) {
        console.error("Could not create dashboard referral code:", error);
      }
    }
  } catch (error) {
    console.error("Could not load dashboard referral info:", error);
  }

  return {
    code: "",
    successfulReferrals: 0,
    rewardedMonths: 0,
  };
}

async function getSuccessfulReferralCount(ownerDiscordUserId: string) {
  try {
    const rows = await supabaseRequest(
      `server_referrals?referrer_discord_user_id=eq.${encodeURIComponent(
        ownerDiscordUserId
      )}&status=eq.completed&select=id`
    );

    return Array.isArray(rows) ? rows.length : 0;
  } catch (error) {
    console.error("Could not load successful referrals:", error);
    return 0;
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const pageLanguage = normalizeLanguage(
    cookieStore.get("asko_language")?.value
  );

  if (!session) {
    return (
      <main className="container profile-page">
        <section className="profile-card">
          <span className="page-badge">{text(pageLanguage, "dashboard")}</span>
          <h1>{text(pageLanguage, "loginTitle")}</h1>
          <p>{text(pageLanguage, "loginText")}</p>

          <Link className="btn" href="/api/auth/signin">
            {text(pageLanguage, "loginButton")}
          </Link>
        </section>
      </main>
    );
  }

  const user = session.user as any;
  const discordUserId = String(user.id || user.discordId || "").trim();

  let myServers: any[] = [];

  if (discordUserId) {
    myServers = await supabaseRequest(
      "servers?owner_discord_user_id=eq." +
        encodeURIComponent(discordUserId) +
        "&select=*&order=created_at.desc"
    );
  }

  const hasServer = myServers.length > 0;

  const referralInfo =
    discordUserId && hasServer
      ? await getOrCreateReferralInfo(discordUserId)
      : {
          code: "",
          successfulReferrals: 0,
          rewardedMonths: 0,
        };

  const successfulReferralCount =
    discordUserId && hasServer
      ? await getSuccessfulReferralCount(discordUserId)
      : 0;

  const successfulReferrals = Math.max(
    Number(referralInfo.successfulReferrals || 0),
    successfulReferralCount
  );

  const referralUrl = referralInfo.code
    ? `${getBaseUrl()}/submit?ref=${encodeURIComponent(referralInfo.code)}`
    : "";

  return (
    <main className="container profile-page">
      <section className="profile-header-card">
        <div className="profile-user">
          {session.user?.image ? (
            <img src={session.user.image} alt="Discord Avatar" />
          ) : (
            <div className="profile-avatar-fallback">?</div>
          )}

          <div>
            <span className="page-badge">
              {text(pageLanguage, "dashboard")}
            </span>
            <h1>{session.user?.name}</h1>
            <p>
              {text(pageLanguage, "discordUserId")}:{" "}
              {discordUserId || text(pageLanguage, "notAvailable")}
            </p>
          </div>
        </div>
      </section>

      {hasServer && (
        <ProfileModerationAlerts servers={myServers} language={pageLanguage} />
      )}

      {hasServer && (
        <ProfileReferralBox
          language={pageLanguage}
          referralUrl={referralUrl}
          successfulReferrals={successfulReferrals}
          rewardedMonths={referralInfo.rewardedMonths}
        />
      )}

      <section className="section">
        <div className="section-title">
          <h2>{text(pageLanguage, "myServer")}</h2>

          {myServers.length === 0 && (
            <Link href="/submit" className="btn">
              {text(pageLanguage, "addServer")}
            </Link>
          )}
        </div>

        {myServers.length === 0 ? (
          <div className="card empty">
            <h3>{text(pageLanguage, "noServerTitle")}</h3>
            <p>{text(pageLanguage, "noServerText")}</p>

            <Link href="/submit" className="btn">
              {text(pageLanguage, "submitServer")}
            </Link>
          </div>
        ) : (
          <div className="profile-server-list">
            {myServers.map((server) => (
              <article className="profile-server-card" key={server.id}>
                <div className="profile-server-summary">
                  <div>
                    <span className="page-badge">
                      {text(pageLanguage, "serverSettings")}
                    </span>
                    <h3>{server.server_name}</h3>
                    <p>
                      {server.category} • {server.language}
                    </p>
                  </div>

                  <div className="profile-server-summary-actions">
                    <div className="badges separated-badges">
                      <span className="badge">
                        {server.approved
                          ? text(pageLanguage, "approved")
                          : text(pageLanguage, "waiting")}
                      </span>

                      {server.premium_status && (
                        <span className="badge premium">
                          {text(pageLanguage, "premium")}
                        </span>
                      )}

                      {server.partner_status && (
                        <span className="badge partner">
                          {text(pageLanguage, "partner")}
                        </span>
                      )}

                      <span className="badge">
                        {text(pageLanguage, "bumps")}: {server.bumps ?? 0}
                      </span>
                    </div>

                    <a
                      className="btn secondary"
                      href={server.invite_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {text(pageLanguage, "openInvite")}
                    </a>
                  </div>
                </div>

                <ProfileServerEditor server={server} />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
