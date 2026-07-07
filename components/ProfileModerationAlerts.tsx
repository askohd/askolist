import Link from "next/link";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

type AlertType = "server" | "bump" | "notice";

const MODERATION_TEXT = {
  de: {
    serverLockedTitle: "Server gesperrt",
    serverLockedText:
      "Dein Server ist aktuell eingeschränkt. Prüfe den Grund und behebe das Problem.",
    bumpLockedTitle: "Bump-Sperre aktiv",
    bumpLockedText:
      "Dein Server kann aktuell nicht gebumpt werden. Nach Ablauf der Sperre oder nach Staff-Prüfung ist Bumpen wieder möglich.",
    dashboardNoticeTitle: "Wichtige Dashboard-Information",
    reasonLabel: "Grund",
    untilLabel: "Gesperrt bis",
    actionLabel: "Was du tun kannst",
    noReasonGiven: "Kein Grund angegeben.",
    noUntilGiven: "Kein Ablaufdatum angegeben.",
    serverLockedAction:
      "Kontrolliere Beschreibung, Invite, NSFW-Angabe, Banner und Regeln. Wenn alles passt, warte auf die Staff-Prüfung oder kontaktiere den Support.",
    bumpLockedAction:
      "Lade den Bot ein, vermeide Bump-Spam und warte bis die Sperre abläuft. Wenn du glaubst, dass die Sperre falsch ist, kontaktiere den Support.",
    supportButton: "Support kontaktieren",
  },
  en: {
    serverLockedTitle: "Server locked",
    serverLockedText:
      "Your server is currently restricted. Check the reason and fix the issue.",
    bumpLockedTitle: "Bump lock active",
    bumpLockedText:
      "Your server cannot be bumped right now. Bumping will be possible again after the lock expires or after staff review.",
    dashboardNoticeTitle: "Important dashboard information",
    reasonLabel: "Reason",
    untilLabel: "Locked until",
    actionLabel: "What you can do",
    noReasonGiven: "No reason given.",
    noUntilGiven: "No end date specified.",
    serverLockedAction:
      "Check description, invite, NSFW setting, banner and rules. If everything is correct, wait for staff review or contact support.",
    bumpLockedAction:
      "Invite the bot, avoid bump spam and wait until the lock expires. If you think the lock is wrong, contact support.",
    supportButton: "Contact support",
  },
  fr: {
    serverLockedTitle: "Serveur bloqué",
    serverLockedText:
      "Ton serveur est actuellement limité. Vérifie la raison et corrige le problème.",
    bumpLockedTitle: "Blocage de bump actif",
    bumpLockedText:
      "Ton serveur ne peut pas être bumpé actuellement. Le bump sera de nouveau possible après expiration du blocage ou après vérification staff.",
    dashboardNoticeTitle: "Information importante du tableau de bord",
    reasonLabel: "Raison",
    untilLabel: "Bloqué jusqu'à",
    actionLabel: "Ce que tu peux faire",
    noReasonGiven: "Aucune raison indiquée.",
    noUntilGiven: "Aucune date de fin indiquée.",
    serverLockedAction:
      "Vérifie la description, l'invitation, le réglage NSFW, la bannière et les règles. Si tout est correct, attends la vérification staff ou contacte le support.",
    bumpLockedAction:
      "Invite le bot, évite les bumps spam et attends la fin du blocage. Si tu penses que le blocage est une erreur, contacte le support.",
    supportButton: "Contacter le support",
  },
  it: {
    serverLockedTitle: "Server bloccato",
    serverLockedText:
      "Il tuo server è attualmente limitato. Controlla il motivo e risolvi il problema.",
    bumpLockedTitle: "Blocco bump attivo",
    bumpLockedText:
      "Il tuo server non può essere bumpato al momento. Il bump sarà di nuovo possibile dopo la scadenza del blocco o dopo una verifica dello staff.",
    dashboardNoticeTitle: "Informazione importante della dashboard",
    reasonLabel: "Motivo",
    untilLabel: "Bloccato fino a",
    actionLabel: "Cosa puoi fare",
    noReasonGiven: "Nessun motivo indicato.",
    noUntilGiven: "Nessuna data di fine indicata.",
    serverLockedAction:
      "Controlla descrizione, invito, impostazione NSFW, banner e regole. Se tutto è corretto, attendi la verifica dello staff o contatta il supporto.",
    bumpLockedAction:
      "Invita il bot, evita bump spam e attendi la fine del blocco. Se pensi che il blocco sia sbagliato, contatta il supporto.",
    supportButton: "Contatta supporto",
  },
  pl: {
    serverLockedTitle: "Serwer zablokowany",
    serverLockedText:
      "Twój serwer jest aktualnie ograniczony. Sprawdź powód i napraw problem.",
    bumpLockedTitle: "Blokada bump aktywna",
    bumpLockedText:
      "Twój serwer nie może być teraz bumpowany. Bump będzie możliwy po zakończeniu blokady albo po sprawdzeniu przez staff.",
    dashboardNoticeTitle: "Ważna informacja w panelu",
    reasonLabel: "Powód",
    untilLabel: "Zablokowany do",
    actionLabel: "Co możesz zrobić",
    noReasonGiven: "Nie podano powodu.",
    noUntilGiven: "Nie podano daty zakończenia.",
    serverLockedAction:
      "Sprawdź opis, zaproszenie, ustawienie NSFW, banner i zasady. Jeśli wszystko jest poprawne, poczekaj na sprawdzenie przez staff lub skontaktuj się z supportem.",
    bumpLockedAction:
      "Zaproś bota, unikaj spamowania bumpami i poczekaj do końca blokady. Jeśli uważasz, że blokada jest błędna, skontaktuj się z supportem.",
    supportButton: "Skontaktuj się z supportem",
  },
} as const;

function tr(language: LanguageCode, key: keyof typeof MODERATION_TEXT.de) {
  return MODERATION_TEXT[language]?.[key] || MODERATION_TEXT.de[key];
}

function getFirstTextValue(server: any, fieldNames: string[]) {
  for (const fieldName of fieldNames) {
    const value = server?.[fieldName];

    if (value !== null && value !== undefined && String(value).trim()) {
      return String(value).trim();
    }
  }

  return "";
}

function getFirstDateValue(server: any, fieldNames: string[]) {
  for (const fieldName of fieldNames) {
    const value = server?.[fieldName];

    if (value !== null && value !== undefined && String(value).trim()) {
      return String(value).trim();
    }
  }

  return "";
}

function isEnabled(value: unknown) {
  const normalized = String(value ?? "").trim().toLowerCase();

  return (
    value === true ||
    value === 1 ||
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "on" ||
    normalized === "locked" ||
    normalized === "blocked" ||
    normalized === "banned" ||
    normalized === "suspended" ||
    normalized === "disabled"
  );
}

function isServerLocked(server: any) {
  const status = String(server?.status ?? "").trim().toLowerCase();
  const moderationStatus = String(
    server?.moderation_status ?? server?.moderationStatus ?? ""
  )
    .trim()
    .toLowerCase();

  return (
    isEnabled(server?.locked) ||
    isEnabled(server?.server_locked) ||
    isEnabled(server?.serverLocked) ||
    isEnabled(server?.is_locked) ||
    isEnabled(server?.isLocked) ||
    isEnabled(server?.blocked) ||
    isEnabled(server?.server_blocked) ||
    isEnabled(server?.serverBlocked) ||
    isEnabled(server?.is_blocked) ||
    isEnabled(server?.isBlocked) ||
    isEnabled(server?.suspended) ||
    isEnabled(server?.server_suspended) ||
    isEnabled(server?.serverSuspended) ||
    isEnabled(server?.banned) ||
    isEnabled(server?.server_banned) ||
    isEnabled(server?.serverBanned) ||
    isEnabled(server?.disabled) ||
    ["locked", "blocked", "banned", "suspended", "disabled", "rejected"].includes(status) ||
    ["locked", "blocked", "banned", "suspended", "disabled", "rejected"].includes(moderationStatus)
  );
}

function isBumpLocked(server: any) {
  const bumpStatus = String(
    server?.bump_status ?? server?.bumpStatus ?? server?.bump_moderation_status ?? ""
  )
    .trim()
    .toLowerCase();

  return (
    isEnabled(server?.bump_locked) ||
    isEnabled(server?.bumpLocked) ||
    isEnabled(server?.bump_blocked) ||
    isEnabled(server?.bumpBlocked) ||
    isEnabled(server?.bump_suspended) ||
    isEnabled(server?.bumpSuspended) ||
    isEnabled(server?.bump_banned) ||
    isEnabled(server?.bumpBanned) ||
    isEnabled(server?.bump_disabled) ||
    isEnabled(server?.bumpDisabled) ||
    isEnabled(server?.bump_restricted) ||
    isEnabled(server?.bumpRestricted) ||
    server?.can_bump === false ||
    server?.canBump === false ||
    ["locked", "blocked", "banned", "suspended", "disabled", "restricted"].includes(bumpStatus)
  );
}

function getDashboardNotice(server: any) {
  return getFirstTextValue(server, [
    "dashboard_message",
    "dashboardMessage",
    "dashboard_notice",
    "dashboardNotice",
    "admin_message",
    "adminMessage",
    "moderation_message",
    "moderationMessage",
    "staff_message",
    "staffMessage",
    "user_message",
    "userMessage",
    "notice",
    "message",
  ]);
}

function getServerLockReason(server: any) {
  return getFirstTextValue(server, [
    "lock_reason",
    "lockReason",
    "locked_reason",
    "lockedReason",
    "server_lock_reason",
    "serverLockReason",
    "server_locked_reason",
    "serverLockedReason",
    "block_reason",
    "blockReason",
    "blocked_reason",
    "blockedReason",
    "ban_reason",
    "banReason",
    "banned_reason",
    "bannedReason",
    "suspension_reason",
    "suspensionReason",
    "moderation_reason",
    "moderationReason",
    "rejection_reason",
    "rejectionReason",
    "admin_reason",
    "adminReason",
  ]);
}

function getServerLockUntil(server: any) {
  return getFirstDateValue(server, [
    "locked_until",
    "lockedUntil",
    "lock_until",
    "lockUntil",
    "server_locked_until",
    "serverLockedUntil",
    "blocked_until",
    "blockedUntil",
    "block_until",
    "blockUntil",
    "banned_until",
    "bannedUntil",
    "ban_until",
    "banUntil",
    "suspended_until",
    "suspendedUntil",
    "suspension_until",
    "suspensionUntil",
    "restriction_until",
    "restrictionUntil",
  ]);
}

function getBumpLockReason(server: any) {
  return getFirstTextValue(server, [
    "bump_lock_reason",
    "bumpLockReason",
    "bump_locked_reason",
    "bumpLockedReason",
    "bump_block_reason",
    "bumpBlockReason",
    "bump_blocked_reason",
    "bumpBlockedReason",
    "bump_ban_reason",
    "bumpBanReason",
    "bump_banned_reason",
    "bumpBannedReason",
    "bump_suspension_reason",
    "bumpSuspensionReason",
    "bump_restriction_reason",
    "bumpRestrictionReason",
    "bump_moderation_reason",
    "bumpModerationReason",
  ]);
}

function getBumpLockUntil(server: any) {
  return getFirstDateValue(server, [
    "bump_locked_until",
    "bumpLockedUntil",
    "bump_lock_until",
    "bumpLockUntil",
    "bump_blocked_until",
    "bumpBlockedUntil",
    "bump_block_until",
    "bumpBlockUntil",
    "bump_banned_until",
    "bumpBannedUntil",
    "bump_ban_until",
    "bumpBanUntil",
    "bump_suspended_until",
    "bumpSuspendedUntil",
    "bump_suspension_until",
    "bumpSuspensionUntil",
    "bump_restricted_until",
    "bumpRestrictedUntil",
    "bump_restriction_until",
    "bumpRestrictionUntil",
  ]);
}

function formatDate(value: string, language: LanguageCode) {
  if (!value) {
    return tr(language, "noUntilGiven");
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  try {
    return new Intl.DateTimeFormat(
      language === "de"
        ? "de-DE"
        : language === "fr"
        ? "fr-FR"
        : language === "it"
        ? "it-IT"
        : language === "pl"
        ? "pl-PL"
        : "en-US",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(date);
  } catch {
    return date.toLocaleString();
  }
}

function getAlerts(servers: any[], language: LanguageCode) {
  const alerts: Array<{
    type: AlertType;
    icon: string;
    title: string;
    text: string;
    reason: string;
    until: string;
    action: string;
    serverName: string;
  }> = [];

  for (const server of servers) {
    const serverName = String(server?.server_name || server?.name || "").trim();

    const dashboardNotice = getDashboardNotice(server);

    if (dashboardNotice) {
      alerts.push({
        type: "notice",
        icon: "ℹ️",
        title: tr(language, "dashboardNoticeTitle"),
        text: dashboardNotice,
        reason: "",
        until: "",
        action: "",
        serverName,
      });
    }

    if (isServerLocked(server)) {
      alerts.push({
        type: "server",
        icon: "⛔",
        title: tr(language, "serverLockedTitle"),
        text: tr(language, "serverLockedText"),
        reason: getServerLockReason(server) || tr(language, "noReasonGiven"),
        until: formatDate(getServerLockUntil(server), language),
        action: tr(language, "serverLockedAction"),
        serverName,
      });
    }

    if (isBumpLocked(server)) {
      alerts.push({
        type: "bump",
        icon: "⏳",
        title: tr(language, "bumpLockedTitle"),
        text: tr(language, "bumpLockedText"),
        reason: getBumpLockReason(server) || tr(language, "noReasonGiven"),
        until: formatDate(getBumpLockUntil(server), language),
        action: tr(language, "bumpLockedAction"),
        serverName,
      });
    }
  }

  return alerts;
}

export default function ProfileModerationAlerts({
  servers,
  language,
}: {
  servers: any[];
  language: LanguageCode;
}) {
  const alerts = getAlerts(servers, language);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <section className="profile-top-alerts">
      <style>{`
        .profile-top-alerts {
          margin: 22px 0 26px;
          display: grid;
          gap: 12px;
        }

        .profile-top-alert {
          padding: 18px;
          border-radius: 24px;
          background:
            radial-gradient(circle at 0% 0%, rgba(255, 45, 85, 0.20), transparent 34%),
            linear-gradient(135deg, rgba(255, 45, 85, 0.14), rgba(181, 76, 255, 0.10));
          border: 1px solid rgba(255, 45, 85, 0.42);
          box-shadow: 0 0 34px rgba(255, 45, 85, 0.12);
        }

        .profile-top-alert.bump {
          background:
            radial-gradient(circle at 0% 0%, rgba(255, 207, 64, 0.18), transparent 34%),
            linear-gradient(135deg, rgba(255, 207, 64, 0.12), rgba(181, 76, 255, 0.10));
          border-color: rgba(255, 207, 64, 0.34);
          box-shadow: 0 0 30px rgba(255, 207, 64, 0.10);
        }

        .profile-top-alert.notice {
          background:
            radial-gradient(circle at 0% 0%, rgba(116, 223, 255, 0.16), transparent 34%),
            linear-gradient(135deg, rgba(116, 223, 255, 0.10), rgba(181, 76, 255, 0.10));
          border-color: rgba(116, 223, 255, 0.28);
          box-shadow: 0 0 30px rgba(116, 223, 255, 0.10);
        }

        .profile-top-alert-head {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .profile-top-alert-icon {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.14);
          font-size: 20px;
        }

        .profile-top-alert h3 {
          margin: 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.02em;
        }

        .profile-top-alert p {
          margin: 6px 0 0;
          color: rgba(255,255,255,0.82);
          line-height: 1.55;
          font-size: 14px;
          font-weight: 720;
        }

        .profile-top-alert-server {
          margin-top: 3px;
          color: rgba(255,255,255,0.58);
          font-size: 12px;
          font-weight: 900;
        }

        .profile-top-alert-meta {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .profile-top-alert-meta div,
        .profile-top-alert-action {
          padding: 12px;
          border-radius: 16px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.11);
        }

        .profile-top-alert-meta span {
          display: block;
          margin-bottom: 5px;
          color: rgba(255,255,255,0.58);
          font-size: 11px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .profile-top-alert-meta strong,
        .profile-top-alert-action {
          color: #ffffff;
          font-size: 13px;
          line-height: 1.45;
          font-weight: 850;
        }

        .profile-top-alert-action {
          margin-top: 10px;
        }

        .profile-top-alert-action strong {
          color: #ffe68a;
        }

        .profile-top-alert-actions {
          margin-top: 12px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .profile-top-alert-actions .btn {
          min-height: 40px;
          padding: 0 14px;
          border-radius: 14px;
        }

        @media (max-width: 720px) {
          .profile-top-alert {
            padding: 15px;
            border-radius: 22px;
          }

          .profile-top-alert-meta {
            grid-template-columns: 1fr;
          }

          .profile-top-alert-head {
            gap: 10px;
          }

          .profile-top-alert-icon {
            width: 38px;
            height: 38px;
            border-radius: 14px;
            font-size: 18px;
          }
        }
      `}</style>

      {alerts.map((alert, index) => (
        <article
          className={`profile-top-alert ${alert.type}`}
          key={`${alert.type}-${index}`}
        >
          <div className="profile-top-alert-head">
            <div className="profile-top-alert-icon">{alert.icon}</div>

            <div>
              <h3>{alert.title}</h3>
              {alert.serverName && (
                <div className="profile-top-alert-server">{alert.serverName}</div>
              )}
              <p>{alert.text}</p>
            </div>
          </div>

          {alert.type !== "notice" && (
            <>
              <div className="profile-top-alert-meta">
                <div>
                  <span>{tr(language, "reasonLabel")}</span>
                  <strong>{alert.reason}</strong>
                </div>

                <div>
                  <span>{tr(language, "untilLabel")}</span>
                  <strong>{alert.until}</strong>
                </div>
              </div>

              <div className="profile-top-alert-action">
                <strong>{tr(language, "actionLabel")}:</strong> {alert.action}
              </div>
            </>
          )}

          <div className="profile-top-alert-actions">
            <Link className="btn secondary" href="/support">
              {tr(language, "supportButton")}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
