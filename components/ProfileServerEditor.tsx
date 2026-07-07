"use client";

import { useMemo, useState } from "react";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

type ProfileReferralBoxProps = {
  language: LanguageCode;
  referralUrl: string;
  successfulReferrals: number;
  rewardedMonths: number;
};

const REFERRAL_TEXT = {
  de: {
    title: "1 Monat kostenlos Premium für 2 Freunde",
    text:
      "Lade Freunde ein, die einen Discord Server besitzen. Wenn sich 2 Serverbesitzer über deinen Link registrieren und ihren Server eintragen, bekommst du 1 Monat Premium. Bei 4 erfolgreichen Einladungen bekommst du 2 Monate Premium.",
    later:
      "Du kannst deinen Einladungslink jederzeit hier im Server-Dashboard kopieren.",
    linkLabel: "Dein Einladungslink",
    copy: "Einladungslink kopieren",
    copied: "Einladungslink wurde kopiert.",
    progress: "Erfolgreiche Einladungen",
    firstRewardOpen: "Noch {count} erfolgreiche Einladung(en) bis 1 Monat Premium.",
    secondRewardOpen:
      "1 Monat Premium erreicht. Noch {count} erfolgreiche Einladung(en) bis 2 Monate Premium.",
    completed: "2 Monate Premium erreicht.",
    rewardOne: "2 Einladungen = 1 Monat Premium",
    rewardTwo: "4 Einladungen = 2 Monate Premium",
    missingLinkTitle: "Einladungslink wird vorbereitet",
    missingLinkText:
      "Falls hier noch kein Link steht, wurde der Referral-Code noch nicht erstellt. Prüfe bitte, ob die Supabase-Tabelle server_referral_codes vorhanden ist und lade das Dashboard danach neu.",
  },
  en: {
    title: "1 free month of Premium for 2 friends",
    text:
      "Invite friends who own a Discord server. When 2 server owners register through your link and submit their server, you get 1 month of Premium. With 4 successful invites, you get 2 months of Premium.",
    later:
      "You can copy your invite link here in your server dashboard anytime.",
    linkLabel: "Your invite link",
    copy: "Copy invite link",
    copied: "Invite link copied.",
    progress: "Successful invites",
    firstRewardOpen: "{count} successful invite(s) left until 1 month of Premium.",
    secondRewardOpen:
      "1 month of Premium reached. {count} successful invite(s) left until 2 months of Premium.",
    completed: "2 months of Premium reached.",
    rewardOne: "2 invites = 1 month Premium",
    rewardTwo: "4 invites = 2 months Premium",
    missingLinkTitle: "Invite link is being prepared",
    missingLinkText:
      "If no link appears here yet, the referral code has not been created. Please check whether the Supabase table server_referral_codes exists and reload the dashboard.",
  },
  fr: {
    title: "1 mois Premium gratuit pour 2 amis",
    text:
      "Invite des amis qui possèdent un serveur Discord. Si 2 propriétaires s'inscrivent via ton lien et ajoutent leur serveur, tu reçois 1 mois de Premium. Avec 4 invitations réussies, tu reçois 2 mois de Premium.",
    later:
      "Tu peux copier ton lien d'invitation ici dans le tableau de bord à tout moment.",
    linkLabel: "Ton lien d'invitation",
    copy: "Copier le lien",
    copied: "Lien d'invitation copié.",
    progress: "Invitations réussies",
    firstRewardOpen: "Encore {count} invitation(s) réussie(s) pour 1 mois de Premium.",
    secondRewardOpen:
      "1 mois de Premium atteint. Encore {count} invitation(s) réussie(s) pour 2 mois de Premium.",
    completed: "2 mois de Premium atteints.",
    rewardOne: "2 invitations = 1 mois Premium",
    rewardTwo: "4 invitations = 2 mois Premium",
    missingLinkTitle: "Lien d'invitation en préparation",
    missingLinkText:
      "Si aucun lien n'apparaît ici, le code de parrainage n'a pas encore été créé. Vérifie si la table Supabase server_referral_codes existe puis recharge le tableau de bord.",
  },
  it: {
    title: "1 mese Premium gratis per 2 amici",
    text:
      "Invita amici che possiedono un server Discord. Quando 2 proprietari si registrano tramite il tuo link e aggiungono il server, ricevi 1 mese di Premium. Con 4 inviti riusciti, ricevi 2 mesi di Premium.",
    later:
      "Puoi copiare il tuo link qui nella dashboard del server in qualsiasi momento.",
    linkLabel: "Il tuo link di invito",
    copy: "Copia link",
    copied: "Link copiato.",
    progress: "Inviti riusciti",
    firstRewardOpen: "Mancano {count} invito/i riuscito/i per 1 mese di Premium.",
    secondRewardOpen:
      "1 mese di Premium raggiunto. Mancano {count} invito/i riuscito/i per 2 mesi di Premium.",
    completed: "2 mesi di Premium raggiunti.",
    rewardOne: "2 inviti = 1 mese Premium",
    rewardTwo: "4 inviti = 2 mesi Premium",
    missingLinkTitle: "Link di invito in preparazione",
    missingLinkText:
      "Se qui non appare ancora nessun link, il codice referral non è stato creato. Controlla se la tabella Supabase server_referral_codes esiste e ricarica la dashboard.",
  },
  pl: {
    title: "1 miesiąc Premium za darmo za 2 znajomych",
    text:
      "Zaproś znajomych, którzy mają serwer Discord. Jeśli 2 właścicieli zarejestruje się przez twój link i doda swój serwer, dostajesz 1 miesiąc Premium. Za 4 skuteczne zaproszenia dostajesz 2 miesiące Premium.",
    later:
      "Możesz skopiować swój link tutaj w panelu serwera w dowolnym momencie.",
    linkLabel: "Twój link zaproszenia",
    copy: "Kopiuj link",
    copied: "Link skopiowany.",
    progress: "Skuteczne zaproszenia",
    firstRewardOpen: "Jeszcze {count} skuteczne zaproszenie/a do 1 miesiąca Premium.",
    secondRewardOpen:
      "1 miesiąc Premium osiągnięty. Jeszcze {count} skuteczne zaproszenie/a do 2 miesięcy Premium.",
    completed: "2 miesiące Premium osiągnięte.",
    rewardOne: "2 zaproszenia = 1 miesiąc Premium",
    rewardTwo: "4 zaproszenia = 2 miesiące Premium",
    missingLinkTitle: "Link zaproszenia jest przygotowywany",
    missingLinkText:
      "Jeśli link jeszcze się tu nie pojawia, kod referral nie został utworzony. Sprawdź, czy tabela Supabase server_referral_codes istnieje i odśwież panel.",
  },
} as const;

function normalizeLanguage(language: LanguageCode): LanguageCode {
  if (
    language === "de" ||
    language === "en" ||
    language === "fr" ||
    language === "it" ||
    language === "pl"
  ) {
    return language;
  }

  return "de";
}

function replaceCount(text: string, count: number) {
  return text.replace("{count}", String(count));
}

export default function ProfileReferralBox({
  language,
  referralUrl,
  successfulReferrals,
  rewardedMonths,
}: ProfileReferralBoxProps) {
  const safeLanguage = normalizeLanguage(language);
  const t = REFERRAL_TEXT[safeLanguage];
  const [status, setStatus] = useState("");

  const safeSuccessfulReferrals = Math.max(0, Number(successfulReferrals || 0));
  const progressPercent = Math.min(100, (safeSuccessfulReferrals / 4) * 100);
  const hasReferralUrl = Boolean(referralUrl);

  const nextRewardText = useMemo(() => {
    if (safeSuccessfulReferrals >= 4 || rewardedMonths >= 2) {
      return t.completed;
    }

    if (safeSuccessfulReferrals >= 2 || rewardedMonths >= 1) {
      return replaceCount(
        t.secondRewardOpen,
        Math.max(0, 4 - safeSuccessfulReferrals)
      );
    }

    return replaceCount(
      t.firstRewardOpen,
      Math.max(0, 2 - safeSuccessfulReferrals)
    );
  }, [rewardedMonths, safeSuccessfulReferrals, t]);

  async function copyReferralUrl() {
    if (!referralUrl) {
      setStatus(t.missingLinkText);
      return;
    }

    try {
      await navigator.clipboard.writeText(referralUrl);
      setStatus(t.copied);
    } catch {
      setStatus(referralUrl);
    }
  }

  return (
    <section className="profile-referral-box">
      <style>{`
        .profile-referral-box {
          margin: 18px 0 22px;
          padding: 18px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 0% 0%, rgba(255, 207, 64, 0.18), transparent 34%),
            radial-gradient(circle at 100% 0%, rgba(116, 223, 255, 0.15), transparent 36%),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(255,207,64,0.22);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.025) inset,
            0 0 34px rgba(139,92,246,0.16);
        }

        .profile-referral-header {
          display: grid;
          gap: 7px;
        }

        .profile-referral-badge {
          width: fit-content;
          min-height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: #ffe68a;
          font-size: 0.72rem;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(255,207,64,0.12);
          border: 1px solid rgba(255,207,64,0.28);
        }

        .profile-referral-header h2 {
          margin: 0;
          font-size: clamp(22px, 3vw, 32px);
          line-height: 1.05;
          letter-spacing: -0.055em;
          font-weight: 950;
          color: #ffffff;
        }

        .profile-referral-header h2 span {
          color: #ffe68a;
          text-shadow: 0 0 18px rgba(255,207,64,0.25);
        }

        .profile-referral-header p {
          margin: 0;
          color: rgba(236,240,255,0.76);
          font-size: 0.80rem;
          line-height: 1.55;
          font-weight: 750;
        }

        .profile-referral-rewards {
          margin-top: 12px;
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .profile-referral-rewards span {
          min-height: 30px;
          padding: 0 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: #ffe68a;
          font-size: 0.76rem;
          font-weight: 950;
          background: rgba(255,207,64,0.10);
          border: 1px solid rgba(255,207,64,0.22);
        }

        .profile-referral-link-area {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }

        .profile-referral-link-area label {
          color: rgba(255,255,255,0.84);
          font-size: 0.76rem;
          font-weight: 950;
        }

        .profile-referral-copy-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
        }

        .profile-referral-copy-row input {
          width: 100%;
          min-width: 0;
          min-height: 40px;
          padding: 0 12px;
          border-radius: 15px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.13);
          color: #9deaff;
          outline: none;
          font-size: 0.80rem;
          font-weight: 850;
        }

        .profile-referral-copy-row button {
          min-height: 40px;
          padding: 0 16px;
          border: 0;
          border-radius: 15px;
          color: #ffffff;
          font-weight: 950;
          cursor: pointer;
          background: linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%);
          box-shadow: 0 0 20px rgba(116,223,255,0.13);
        }

        .profile-referral-copy-row button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .profile-referral-progress {
          margin-top: 12px;
          padding: 12px;
          border-radius: 18px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .profile-referral-progress-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,0.88);
          font-size: 0.80rem;
          font-weight: 950;
        }

        .profile-referral-progress-track {
          margin-top: 10px;
          height: 8px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .profile-referral-progress-fill {
          height: 100%;
          width: var(--progress);
          border-radius: inherit;
          background: linear-gradient(135deg, #ffe68a, #f35acd, #6fddff);
        }

        .profile-referral-progress p,
        .profile-referral-status,
        .profile-referral-missing {
          margin: 10px 0 0;
          color: rgba(236,240,255,0.72);
          font-size: 0.80rem;
          line-height: 1.55;
          font-weight: 750;
        }

        .profile-referral-status {
          color: #9deaff;
          font-weight: 950;
          overflow-wrap: anywhere;
        }

        .profile-referral-missing {
          color: #ffe68a;
          font-weight: 850;
        }

        @media (max-width: 620px) {
          .profile-referral-copy-row {
            grid-template-columns: 1fr;
          }

          .profile-referral-copy-row button {
            width: 100%;
          }
        }
      `}</style>

      <div className="profile-referral-header">
        <span className="profile-referral-badge">✨ Premium Belohnung</span>
        <h2>
          {safeLanguage === "de" ? (
            <>
              1 Monat kostenlos <span>Premium</span> für 2 Freunde
            </>
          ) : (
            t.title
          )}
        </h2>
        <p>{t.text}</p>
        <p>{t.later}</p>
      </div>

      <div className="profile-referral-rewards">
        <span>{t.rewardOne}</span>
        <span>{t.rewardTwo}</span>
      </div>

      <div className="profile-referral-link-area">
        <label>{t.linkLabel}</label>

        <div className="profile-referral-copy-row">
          <input
            value={
              hasReferralUrl
                ? referralUrl
                : "Referral-Link konnte noch nicht geladen werden"
            }
            readOnly
          />
          <button type="button" onClick={copyReferralUrl} disabled={!hasReferralUrl}>
            {t.copy}
          </button>
        </div>

        {!hasReferralUrl && (
          <p className="profile-referral-missing">
            <strong>{t.missingLinkTitle}:</strong> {t.missingLinkText}
          </p>
        )}

        {status && <p className="profile-referral-status">{status}</p>}
      </div>

      <div className="profile-referral-progress">
        <div className="profile-referral-progress-top">
          <span>{t.progress}</span>
          <span>{safeSuccessfulReferrals} / 4</span>
        </div>

        <div
          className="profile-referral-progress-track"
          style={{ "--progress": `${progressPercent}%` } as React.CSSProperties}
        >
          <div className="profile-referral-progress-fill" />
        </div>

        <p>{nextRewardText}</p>
      </div>
    </section>
  );
}
