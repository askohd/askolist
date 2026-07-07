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
      "Lade jetzt den Asko Cafe Bot ein. Danach kannst du Freunde einladen und kostenlos Premium verdienen.",
    botButton: "Bot jetzt einladen",
    popupTitle: "1 Monat kostenlos Premium für 2 Freunde",
    introBefore:
      "Teile deinen Einladungslink mit Freunden, die einen Discord Server besitzen.",
    rewardTwoBefore: "Wenn sich",
    rewardTwoStrong: "2 Serverbesitzer",
    rewardTwoAfter:
      "über deinen Link registrieren und ihren Server eintragen, bekommst du",
    rewardTwoPremium: "1 Monat Premium kostenlos.",
    rewardFourBefore: "Bei",
    rewardFourStrong: "4 erfolgreichen Einladungen",
    rewardFourAfter: "bekommst du",
    rewardFourPremium: "2 Monate Premium kostenlos.",
    laterText:
      "Du kannst das auch später machen. Dein Einladungslink ist immer oben im Server-Dashboard kopierbar.",
    copyButton: "Einladungslink kopieren",
    closeButton: "Später erinnern",
    dismissButton: "Nicht interessieren",
    copied: "Einladungslink wurde kopiert.",
    missingBot:
      "Bot-Einladungslink fehlt. Öffne dein Dashboard, falls der Bot noch nicht eingeladen wurde.",
    premiumBadge: "Premium Belohnung",
  },
  en: {
    successTitle: "Server submitted",
    successText:
      "Invite the Asko Cafe bot now. After that, you can invite friends and earn Premium for free.",
    botButton: "Invite bot now",
    popupTitle: "1 free month of Premium for 2 friends",
    introBefore:
      "Share your invite link with friends who own a Discord server.",
    rewardTwoBefore: "When",
    rewardTwoStrong: "2 server owners",
    rewardTwoAfter:
      "register through your link and submit their server, you get",
    rewardTwoPremium: "1 month of Premium for free.",
    rewardFourBefore: "With",
    rewardFourStrong: "4 successful invites",
    rewardFourAfter: "you get",
    rewardFourPremium: "2 months of Premium for free.",
    laterText:
      "You can also do this later. Your invite link is always available at the top of your server dashboard.",
    copyButton: "Copy invite link",
    closeButton: "Remind me later",
    dismissButton: "Not interested",
    copied: "Invite link copied.",
    missingBot:
      "Bot invite link is missing. Open your dashboard if the bot has not been invited yet.",
    premiumBadge: "Premium reward",
  },
  fr: {
    successTitle: "Serveur ajouté",
    successText:
      "Invite maintenant le bot Asko Cafe. Ensuite, tu peux inviter des amis et gagner Premium gratuitement.",
    botButton: "Inviter le bot",
    popupTitle: "1 mois Premium gratuit pour 2 amis",
    introBefore:
      "Partage ton lien d'invitation avec des amis qui possèdent un serveur Discord.",
    rewardTwoBefore: "Si",
    rewardTwoStrong: "2 propriétaires de serveur",
    rewardTwoAfter:
      "s'inscrivent via ton lien et ajoutent leur serveur, tu reçois",
    rewardTwoPremium: "1 mois Premium gratuit.",
    rewardFourBefore: "Avec",
    rewardFourStrong: "4 invitations réussies",
    rewardFourAfter: "tu reçois",
    rewardFourPremium: "2 mois Premium gratuits.",
    laterText:
      "Tu peux aussi le faire plus tard. Ton lien est toujours disponible en haut du tableau de bord de ton serveur.",
    copyButton: "Copier le lien",
    closeButton: "Me le rappeler plus tard",
    dismissButton: "Pas intéressé",
    copied: "Lien d'invitation copié.",
    missingBot:
      "Le lien d'invitation du bot manque. Ouvre ton tableau de bord si le bot n'a pas encore été invité.",
    premiumBadge: "Récompense Premium",
  },
  it: {
    successTitle: "Server aggiunto",
    successText:
      "Invita ora il bot Asko Cafe. Dopo potrai invitare amici e guadagnare Premium gratis.",
    botButton: "Invita bot",
    popupTitle: "1 mese Premium gratis per 2 amici",
    introBefore:
      "Condividi il tuo link con amici che possiedono un server Discord.",
    rewardTwoBefore: "Quando",
    rewardTwoStrong: "2 proprietari di server",
    rewardTwoAfter:
      "si registrano tramite il tuo link e aggiungono il server, ricevi",
    rewardTwoPremium: "1 mese Premium gratis.",
    rewardFourBefore: "Con",
    rewardFourStrong: "4 inviti riusciti",
    rewardFourAfter: "ricevi",
    rewardFourPremium: "2 mesi Premium gratis.",
    laterText:
      "Puoi farlo anche più tardi. Il link resta sempre copiabile in alto nel dashboard del server.",
    copyButton: "Copia link",
    closeButton: "Ricordamelo più tardi",
    dismissButton: "Non mi interessa",
    copied: "Link copiato.",
    missingBot:
      "Manca il link di invito del bot. Apri il dashboard se il bot non è ancora stato invitato.",
    premiumBadge: "Ricompensa Premium",
  },
  pl: {
    successTitle: "Serwer dodany",
    successText:
      "Zaproś teraz bota Asko Cafe. Potem możesz zapraszać znajomych i zdobyć Premium za darmo.",
    botButton: "Zaproś bota",
    popupTitle: "1 miesiąc Premium za darmo za 2 znajomych",
    introBefore:
      "Udostępnij swój link znajomym, którzy mają serwer Discord.",
    rewardTwoBefore: "Jeśli",
    rewardTwoStrong: "2 właścicieli serwera",
    rewardTwoAfter:
      "zarejestruje się przez twój link i doda swój serwer, dostajesz",
    rewardTwoPremium: "1 miesiąc Premium za darmo.",
    rewardFourBefore: "Za",
    rewardFourStrong: "4 skuteczne zaproszenia",
    rewardFourAfter: "dostajesz",
    rewardFourPremium: "2 miesiące Premium za darmo.",
    laterText:
      "Możesz zrobić to później. Link jest zawsze dostępny na górze panelu serwera.",
    copyButton: "Kopiuj link",
    closeButton: "Przypomnij później",
    dismissButton: "Nie interesuje mnie",
    copied: "Link skopiowany.",
    missingBot:
      "Brakuje linku zaproszenia bota. Otwórz panel, jeśli bot nie został jeszcze zaproszony.",
    premiumBadge: "Nagroda Premium",
  },
} as const;

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

function normalizeLanguage(language: string): LanguageCode {
  if (
    language === "en" ||
    language === "fr" ||
    language === "it" ||
    language === "pl"
  ) {
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
          max-width: 580px;
          padding: 24px;
          border-radius: 28px;
          background:
            radial-gradient(circle at 0% 0%, rgba(255,207,64,0.25), transparent 33%),
            radial-gradient(circle at 100% 0%, rgba(116,223,255,0.18), transparent 36%),
            linear-gradient(180deg, rgba(26,14,46,0.98), rgba(9,8,28,0.98));
          border: 1px solid rgba(255,207,64,0.22);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 0 44px rgba(139,92,246,0.28),
            0 0 32px rgba(255,207,64,0.10);
        }

        .referral-popup-premium-badge {
          margin-bottom: 12px;
          min-height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: #ffe68a;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(255,207,64,0.13);
          border: 1px solid rgba(255,207,64,0.32);
          box-shadow: 0 0 18px rgba(255,207,64,0.10);
        }

        .referral-popup h2 {
          margin: 0;
          font-size: clamp(32px, 6vw, 48px);
          line-height: 0.96;
          letter-spacing: -0.055em;
          font-weight: 950;
          color: #ffffff;
        }

        .referral-popup h2 .premium-word,
        .referral-premium-highlight {
          color: #ffe68a;
          text-shadow: 0 0 18px rgba(255,207,64,0.28);
        }

        .referral-popup p {
          margin: 13px 0 0;
          color: rgba(246,243,255,0.78);
          line-height: 1.72;
          font-weight: 780;
        }

        .referral-popup strong {
          color: #ffffff;
          font-weight: 950;
        }

        .referral-reward-card {
          margin-top: 15px;
          padding: 15px;
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(255,207,64,0.13), rgba(255,255,255,0.055));
          border: 1px solid rgba(255,207,64,0.24);
        }

        .referral-reward-card p {
          margin: 0;
        }

        .referral-reward-card p + p {
          margin-top: 9px;
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
          background: linear-gradient(135deg, #b54cff 0%, #f35acd 42%, #6fddff 100%);
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
            <span className="referral-popup-premium-badge">
              ✨ {t.premiumBadge}
            </span>

            <h2>
              {t.popupTitle.includes("Premium") ? (
                <>
                  {t.popupTitle.split("Premium")[0]}
                  <span className="premium-word">Premium</span>
                  {t.popupTitle.split("Premium").slice(1).join("Premium")}
                </>
              ) : (
                t.popupTitle
              )}
            </h2>

            <p>{t.introBefore}</p>

            <div className="referral-reward-card">
              <p>
                {t.rewardTwoBefore} <strong>{t.rewardTwoStrong}</strong>{" "}
                {t.rewardTwoAfter}{" "}
                <strong className="referral-premium-highlight">
                  {t.rewardTwoPremium}
                </strong>
              </p>

              <p>
                {t.rewardFourBefore} <strong>{t.rewardFourStrong}</strong>{" "}
                {t.rewardFourAfter}{" "}
                <strong className="referral-premium-highlight">
                  {t.rewardFourPremium}
                </strong>
              </p>
            </div>

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
