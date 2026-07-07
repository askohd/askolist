"use client";

import { useEffect, useMemo, useState } from "react";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

type ReferralInvitePopupProps = {
  language: LanguageCode;
  referralCode: string;
  referralUrl: string;
  botInviteUrl?: string;
};

const TEXT = {
  de: {
    successTitle: "Server eingetragen",
    successText:
      "Lade jetzt den Asko Cafe Bot ein. Danach kannst du Freunde einladen und Premium verdienen.",
    botButton: "Bot jetzt einladen",
    popupTitle: "Lade Freunde mit Discord Server ein",
    popupText:
      "Teile deinen Einladungslink mit Freunden, die einen Discord Server besitzen. Wenn 2 Serverbesitzer sich über deinen Link registrieren und ihren Server eintragen, bekommst du 1 Monat Premium. Bei 4 erfolgreichen Einladungen bekommst du 2 Monate Premium.",
    laterText:
      "Du kannst das auch später machen. Dein Einladungslink ist immer oben im Server-Dashboard kopierbar.",
    copyButton: "Einladungslink kopieren",
    closeButton: "Später erinnern",
    dismissButton: "Nicht interessieren",
    copied: "Einladungslink wurde kopiert.",
    missingBot: "Bot-Einladungslink fehlt. Öffne dein Dashboard, falls der Bot noch nicht eingeladen wurde.",
  },
  en: {
    successTitle: "Server submitted",
    successText:
      "Invite the Asko Cafe bot now. After that, you can invite friends and earn Premium.",
    botButton: "Invite bot now",
    popupTitle: "Invite friends with Discord servers",
    popupText:
      "Share your invite link with friends who own a Discord server. When 2 server owners register through your link and submit their server, you get 1 month of Premium. With 4 successful invites, you get 2 months of Premium.",
    laterText:
      "You can also do this later. Your invite link is always available at the top of your server dashboard.",
    copyButton: "Copy invite link",
    closeButton: "Remind me later",
    dismissButton: "Not interested",
    copied: "Invite link copied.",
    missingBot: "Bot invite link is missing. Open your dashboard if the bot has not been invited yet.",
  },
  fr: {
    successTitle: "Serveur ajouté",
    successText:
      "Invite maintenant le bot Asko Cafe. Ensuite, tu peux inviter des amis et gagner Premium.",
    botButton: "Inviter le bot",
    popupTitle: "Invite des amis avec un serveur Discord",
    popupText:
      "Partage ton lien d'invitation avec des amis qui possèdent un serveur Discord. Si 2 propriétaires s'inscrivent via ton lien et ajoutent leur serveur, tu reçois 1 mois de Premium. Avec 4 invitations réussies, tu reçois 2 mois de Premium.",
    laterText:
      "Tu peux aussi le faire plus tard. Ton lien est toujours disponible en haut du tableau de bord de ton serveur.",
    copyButton: "Copier le lien",
    closeButton: "Me le rappeler plus tard",
    dismissButton: "Pas intéressé",
    copied: "Lien d'invitation copié.",
    missingBot: "Le lien d'invitation du bot manque. Ouvre ton tableau de bord si le bot n'a pas encore été invité.",
  },
  it: {
    successTitle: "Server aggiunto",
    successText:
      "Invita ora il bot Asko Cafe. Dopo potrai invitare amici e guadagnare Premium.",
    botButton: "Invita bot",
    popupTitle: "Invita amici con server Discord",
    popupText:
      "Condividi il tuo link con amici che possiedono un server Discord. Quando 2 proprietari si registrano tramite il tuo link e aggiungono il server, ricevi 1 mese di Premium. Con 4 inviti riusciti, ricevi 2 mesi di Premium.",
    laterText:
      "Puoi farlo anche più tardi. Il link resta sempre copiabile in alto nel dashboard del server.",
    copyButton: "Copia link",
    closeButton: "Ricordamelo più tardi",
    dismissButton: "Non mi interessa",
    copied: "Link copiato.",
    missingBot: "Manca il link di invito del bot. Apri il dashboard se il bot non è ancora stato invitato.",
  },
  pl: {
    successTitle: "Serwer dodany",
    successText:
      "Zaproś teraz bota Asko Cafe. Potem możesz zapraszać znajomych i zdobyć Premium.",
    botButton: "Zaproś bota",
    popupTitle: "Zaproś znajomych z serwerem Discord",
    popupText:
      "Udostępnij swój link znajomym, którzy mają serwer Discord. Jeśli 2 właścicieli zarejestruje się przez twój link i doda swój serwer, dostajesz 1 miesiąc Premium. Za 4 skuteczne zaproszenia dostajesz 2 miesiące Premium.",
    laterText:
      "Możesz zrobić to później. Link jest zawsze dostępny na górze panelu serwera.",
    copyButton: "Kopiuj link",
    closeButton: "Przypomnij później",
    dismissButton: "Nie interesuje mnie",
    copied: "Link skopiowany.",
    missingBot: "Brakuje linku zaproszenia bota. Otwórz panel, jeśli bot nie został jeszcze zaproszony.",
  },
} as const;

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

function normalizeLanguage(language: string): LanguageCode {
  if (language === "en" || language === "fr" || language === "it" || language === "pl") {
    return language;
  }

  return "de";
}

export default function ReferralInvitePopup({
  language,
  referralCode,
  referralUrl,
  botInviteUrl,
}: ReferralInvitePopupProps) {
  const safeLanguage = normalizeLanguage(language);
  const t = TEXT[safeLanguage];
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("");

  const storageKey = useMemo(
    () => `asko-referral-popup-${referralCode || "default"}`,
    [referralCode]
  );

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return;
    }

    try {
      const data = JSON.parse(raw);

      if (data?.dismissed === true) {
        setShowPopup(false);
        return;
      }

      if (data?.remindAt && Number(data.remindAt) > Date.now()) {
        setShowPopup(false);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  function shouldOpenPopup() {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return true;
    }

    try {
      const data = JSON.parse(raw);

      if (data?.dismissed === true) {
        return false;
      }

      if (data?.remindAt && Number(data.remindAt) > Date.now()) {
        return false;
      }

      return true;
    } catch {
      return true;
    }
  }

  function openBotInvite() {
    if (botInviteUrl) {
      window.open(botInviteUrl, "_blank", "noopener,noreferrer");
    }

    if (shouldOpenPopup()) {
      setShowPopup(true);
    }
  }

  async function copyReferralUrl() {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setStatus(t.copied);
    } catch {
      setStatus(referralUrl);
    }
  }

  function remindLater() {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        remindAt: Date.now() + TWO_WEEKS_MS,
      })
    );

    setShowPopup(false);
  }

  function dismissForever() {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        dismissed: true,
      })
    );

    setShowPopup(false);
  }

  return (
    <>
      <style>{`
        .referral-success-card {
          width: 100%;
          max-width: 720px;
          padding: 28px;
          border-radius: 28px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181,76,255,0.18), transparent 38%),
            rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 0 34px rgba(139,92,246,0.18);
        }

        .referral-success-card h1 {
          margin: 0;
          font-size: clamp(34px, 6vw, 62px);
          line-height: 0.96;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .referral-success-card p {
          margin: 14px 0 0;
          color: rgba(246,243,255,0.76);
          font-size: 15px;
          line-height: 1.7;
          font-weight: 750;
        }

        .referral-success-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .referral-success-actions button,
        .referral-success-actions a {
          min-height: 46px;
          padding: 0 17px;
          border-radius: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          font-weight: 950;
          border: 0;
          cursor: pointer;
          background: linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%);
        }

        .referral-success-actions a {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.13);
        }

        .referral-popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(4,0,12,0.72);
          backdrop-filter: blur(16px);
        }

        .referral-popup {
          width: 100%;
          max-width: 560px;
          padding: 24px;
          border-radius: 28px;
          background:
            radial-gradient(circle at 0% 0%, rgba(255,207,64,0.18), transparent 34%),
            radial-gradient(circle at 100% 0%, rgba(116,223,255,0.18), transparent 36%),
            linear-gradient(180deg, rgba(26,14,46,0.98), rgba(9,8,28,0.98));
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 0 44px rgba(139,92,246,0.28);
        }

        .referral-popup h2 {
          margin: 0;
          font-size: clamp(28px, 5vw, 44px);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 950;
          color: #ffffff;
        }

        .referral-popup p {
          margin: 13px 0 0;
          color: rgba(246,243,255,0.76);
          line-height: 1.7;
          font-weight: 720;
        }

        .referral-popup-link {
          margin-top: 15px;
          padding: 12px;
          border-radius: 15px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: #9deaff;
          font-size: 12px;
          font-weight: 900;
          overflow-wrap: anywhere;
        }

        .referral-popup-actions {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .referral-popup-actions button {
          min-height: 44px;
          border: 0;
          border-radius: 15px;
          color: #ffffff;
          font-weight: 950;
          cursor: pointer;
        }

        .referral-popup-actions .copy {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #b54cff 0%, #6fddff 100%);
        }

        .referral-popup-actions .later {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.13);
        }

        .referral-popup-actions .dismiss {
          background: rgba(255,88,88,0.12);
          border: 1px solid rgba(255,88,88,0.28);
          color: #ffb4b4;
        }

        .referral-popup-status {
          margin-top: 10px !important;
          color: #9deaff !important;
          font-size: 13px !important;
        }

        @media (max-width: 520px) {
          .referral-popup-actions {
            grid-template-columns: 1fr;
          }

          .referral-popup-actions .copy {
            grid-column: auto;
          }
        }
      `}</style>

      <section className="referral-success-card">
        <h1>{t.successTitle}</h1>
        <p>{t.successText}</p>

        {!botInviteUrl && <p>{t.missingBot}</p>}

        <div className="referral-success-actions">
          <button type="button" onClick={openBotInvite}>
            {t.botButton}
          </button>

          <a href="/profile">Server-Dashboard öffnen</a>
        </div>
      </section>

      {showPopup && (
        <div className="referral-popup-backdrop" role="dialog" aria-modal="true">
          <div className="referral-popup">
            <h2>{t.popupTitle}</h2>
            <p>{t.popupText}</p>
            <p>{t.laterText}</p>

            <div className="referral-popup-link">{referralUrl}</div>

            <div className="referral-popup-actions">
              <button className="copy" type="button" onClick={copyReferralUrl}>
                {t.copyButton}
              </button>

              <button className="later" type="button" onClick={remindLater}>
                {t.closeButton}
              </button>

              <button className="dismiss" type="button" onClick={dismissForever}>
                {t.dismissButton}
              </button>
            </div>

            {status && <p className="referral-popup-status">{status}</p>}
          </div>
        </div>
      )}
    </>
  );
}
