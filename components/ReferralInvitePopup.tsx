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
    successBadge: "Eintragung erfolgreich",
    successTitle: "Server eingetragen",
    successText:
      "Dein Server ist gespeichert. Lade jetzt den Asko Cafe Bot ein, damit dein Server später gebumpt werden kann und nicht unten in der Liste verschwindet.",
    approvalInfoTitle: "Was passiert jetzt?",
    approvalInfoOne:
      "Dein Server wird geprüft. Die Freigabe kann bis zu 1 Tag dauern.",
    approvalInfoTwo:
      "Schau morgen kurz im Server-Dashboard vorbei, ob dein Server verfügbar ist.",
    approvalInfoThree:
      "Wichtig: Lade den Bot auf deinen Discord Server ein. Nur mit Bot kann dein Server gebumpt werden und weiter oben in der Liste erscheinen.",
    approvalInfoFour:
      "Ohne Bot bleibt dein Server weit unten und wird deutlich schlechter gefunden.",
    botButton: "Bot jetzt einladen",
    dashboardButton: "Server-Dashboard öffnen",
    inviteFriendsButton: "Premium-Link anzeigen",
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
    rewardBadgeOne: "2 Freunde = 1 Monat Premium",
    rewardBadgeTwo: "4 Freunde = 2 Monate Premium",
  },
  en: {
    successBadge: "Submission successful",
    successTitle: "Server submitted",
    successText:
      "Your server has been saved. Invite the Asko Cafe bot now so your server can be bumped later and does not disappear at the bottom of the list.",
    approvalInfoTitle: "What happens now?",
    approvalInfoOne:
      "Your server will be reviewed. Approval can take up to 1 day.",
    approvalInfoTwo:
      "Check your server dashboard again tomorrow to see whether your server is available.",
    approvalInfoThree:
      "Important: Invite the bot to your Discord server. Only with the bot can your server be bumped and appear higher in the list.",
    approvalInfoFour:
      "Without the bot, your server stays far down and is much harder to find.",
    botButton: "Invite bot now",
    dashboardButton: "Open server dashboard",
    inviteFriendsButton: "Show Premium link",
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
    rewardBadgeOne: "2 friends = 1 month Premium",
    rewardBadgeTwo: "4 friends = 2 months Premium",
  },
  fr: {
    successBadge: "Ajout réussi",
    successTitle: "Serveur ajouté",
    successText:
      "Ton serveur est enregistré. Invite maintenant le bot Asko Cafe pour que ton serveur puisse être bumpé plus tard et ne reste pas en bas de la liste.",
    approvalInfoTitle: "Que se passe-t-il maintenant ?",
    approvalInfoOne:
      "Ton serveur va être vérifié. L'approbation peut prendre jusqu'à 1 jour.",
    approvalInfoTwo:
      "Reviens demain dans le tableau de bord pour voir si ton serveur est disponible.",
    approvalInfoThree:
      "Important : invite le bot sur ton serveur Discord. Seul le bot permet de bumper ton serveur et de le faire apparaître plus haut dans la liste.",
    approvalInfoFour:
      "Sans le bot, ton serveur reste beaucoup plus bas et sera moins visible.",
    botButton: "Inviter le bot",
    dashboardButton: "Ouvrir le tableau de bord",
    inviteFriendsButton: "Afficher le lien Premium",
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
    rewardBadgeOne: "2 amis = 1 mois Premium",
    rewardBadgeTwo: "4 amis = 2 mois Premium",
  },
  it: {
    successBadge: "Invio riuscito",
    successTitle: "Server aggiunto",
    successText:
      "Il tuo server è stato salvato. Invita ora il bot Asko Cafe così il server potrà essere bumpato più tardi e non resterà in fondo alla lista.",
    approvalInfoTitle: "Cosa succede ora?",
    approvalInfoOne:
      "Il tuo server verrà controllato. L'approvazione può richiedere fino a 1 giorno.",
    approvalInfoTwo:
      "Controlla domani la dashboard per vedere se il server è disponibile.",
    approvalInfoThree:
      "Importante: invita il bot nel tuo server Discord. Solo con il bot il server può essere bumpato e comparire più in alto nella lista.",
    approvalInfoFour:
      "Senza bot, il server rimane molto più in basso ed è più difficile da trovare.",
    botButton: "Invita bot",
    dashboardButton: "Apri dashboard server",
    inviteFriendsButton: "Mostra link Premium",
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
    rewardBadgeOne: "2 amici = 1 mese Premium",
    rewardBadgeTwo: "4 amici = 2 mesi Premium",
  },
  pl: {
    successBadge: "Dodano pomyślnie",
    successTitle: "Serwer dodany",
    successText:
      "Twój serwer został zapisany. Zaproś teraz bota Asko Cafe, aby serwer mógł być bumpowany i nie zniknął na dole listy.",
    approvalInfoTitle: "Co teraz?",
    approvalInfoOne:
      "Twój serwer zostanie sprawdzony. Akceptacja może potrwać do 1 dnia.",
    approvalInfoTwo:
      "Zajrzyj jutro do panelu serwera, aby sprawdzić, czy serwer jest już dostępny.",
    approvalInfoThree:
      "Ważne: zaproś bota na swój serwer Discord. Tylko z botem serwer może być bumpowany i pojawiać się wyżej na liście.",
    approvalInfoFour:
      "Bez bota serwer zostaje dużo niżej i jest trudniejszy do znalezienia.",
    botButton: "Zaproś bota",
    dashboardButton: "Otwórz panel serwera",
    inviteFriendsButton: "Pokaż link Premium",
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
    rewardBadgeOne: "2 znajomych = 1 miesiąc Premium",
    rewardBadgeTwo: "4 znajomych = 2 miesiące Premium",
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

  const afterBotStorageKey = useMemo(
    () => `${storageKey}-after-bot-invite`,
    [storageKey]
  );

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

  function openReferralPopup() {
    if (shouldOpenPopup()) {
      setShowPopup(true);
    }
  }

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

  useEffect(() => {
    function showPopupAfterReturningFromDiscord() {
      const shouldShowAfterBotInvite =
        window.sessionStorage.getItem(afterBotStorageKey) === "1";

      if (!shouldShowAfterBotInvite) {
        return;
      }

      window.sessionStorage.removeItem(afterBotStorageKey);
      openReferralPopup();
    }

    window.addEventListener("focus", showPopupAfterReturningFromDiscord);
    document.addEventListener("visibilitychange", showPopupAfterReturningFromDiscord);

    return () => {
      window.removeEventListener("focus", showPopupAfterReturningFromDiscord);
      document.removeEventListener(
        "visibilitychange",
        showPopupAfterReturningFromDiscord
      );
    };
  }, [afterBotStorageKey]);

  function openBotInvite() {
    window.sessionStorage.setItem(afterBotStorageKey, "1");
    openReferralPopup();

    if (botInviteUrl) {
      window.open(botInviteUrl, "_blank", "noopener,noreferrer");
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
          position: relative;
          width: 100%;
          max-width: 920px;
          overflow: hidden;
          padding: 32px;
          border-radius: 34px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181,76,255,0.26), transparent 34%),
            radial-gradient(circle at 100% 0%, rgba(116,223,255,0.18), transparent 32%),
            linear-gradient(180deg, rgba(34,18,55,0.96), rgba(16,10,34,0.97));
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.025) inset,
            0 0 46px rgba(139,92,246,0.18);
        }

        .referral-success-card::before {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          right: -95px;
          top: -110px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,207,64,0.22), transparent 67%);
          pointer-events: none;
        }

        .referral-success-badge {
          min-height: 34px;
          padding: 0 13px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: #9deaff;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(116,223,255,0.10);
          border: 1px solid rgba(116,223,255,0.24);
        }

        .referral-success-card h1 {
          position: relative;
          margin: 16px 0 0;
          max-width: 760px;
          font-size: clamp(42px, 7vw, 76px);
          line-height: 0.92;
          letter-spacing: -0.065em;
          font-weight: 950;
          color: #ffffff;
        }

        .referral-success-card > p {
          position: relative;
          max-width: 720px;
          margin: 15px 0 0;
          color: rgba(246,243,255,0.78);
          font-size: 16px;
          line-height: 1.72;
          font-weight: 780;
        }

        .referral-success-grid {
          position: relative;
          margin-top: 22px;
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
          gap: 16px;
          align-items: stretch;
        }

        .referral-success-info,
        .referral-premium-teaser {
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,0.058);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .referral-success-info {
          background:
            radial-gradient(circle at 0% 0%, rgba(116,223,255,0.12), transparent 38%),
            rgba(255,255,255,0.055);
          border-color: rgba(116,223,255,0.19);
        }

        .referral-success-info strong,
        .referral-premium-teaser strong {
          display: block;
          margin-bottom: 11px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 950;
        }

        .referral-success-info ul {
          margin: 0;
          padding-left: 20px;
          color: rgba(246,243,255,0.78);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 760;
        }

        .referral-success-info li + li {
          margin-top: 7px;
        }

        .referral-success-info .important {
          color: #ffe68a;
          font-weight: 950;
        }

        .referral-premium-teaser {
          background:
            radial-gradient(circle at 0% 0%, rgba(255,207,64,0.17), transparent 40%),
            rgba(255,255,255,0.055);
          border-color: rgba(255,207,64,0.22);
        }

        .referral-premium-teaser p {
          margin: 0;
          color: rgba(246,243,255,0.78);
          line-height: 1.6;
          font-size: 14px;
          font-weight: 760;
        }

        .referral-premium-badges {
          margin-top: 13px;
          display: grid;
          gap: 9px;
        }

        .referral-premium-badges span {
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          color: #ffe68a;
          font-size: 12px;
          font-weight: 950;
          background: rgba(255,207,64,0.11);
          border: 1px solid rgba(255,207,64,0.24);
        }

        .referral-success-actions {
          position: relative;
          margin-top: 22px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .referral-success-actions button,
        .referral-success-actions a {
          min-height: 50px;
          padding: 0 18px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
          border: 0;
          cursor: pointer;
          background: linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%);
          box-shadow: 0 0 20px rgba(116,223,255,0.12);
        }

        .referral-success-actions a,
        .referral-success-actions .ghost {
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: none;
        }

        .referral-success-actions .premium-link {
          color: #ffe68a;
          background: rgba(255,207,64,0.10);
          border: 1px solid rgba(255,207,64,0.25);
          box-shadow: 0 0 18px rgba(255,207,64,0.08);
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

        @media (max-width: 760px) {
          .referral-success-card {
            padding: 24px;
            border-radius: 28px;
          }

          .referral-success-grid {
            grid-template-columns: 1fr;
          }

          .referral-success-actions button,
          .referral-success-actions a {
            width: 100%;
          }
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

      {!showPopup && (
        <section className="referral-success-card">
          <span className="referral-success-badge">✅ {t.successBadge}</span>

          <h1>{t.successTitle}</h1>
          <p>{t.successText}</p>

          <div className="referral-success-grid">
            <div className="referral-success-info">
              <strong>{t.approvalInfoTitle}</strong>

              <ul>
                <li>{t.approvalInfoOne}</li>
                <li>{t.approvalInfoTwo}</li>
                <li className="important">{t.approvalInfoThree}</li>
                <li>{t.approvalInfoFour}</li>
              </ul>
            </div>

            <div className="referral-premium-teaser">
              <strong>✨ {t.premiumBadge}</strong>
              <p>{t.popupTitle}</p>

              <div className="referral-premium-badges">
                <span>{t.rewardBadgeOne}</span>
                <span>{t.rewardBadgeTwo}</span>
              </div>
            </div>
          </div>

          {!botInviteUrl && <p>{t.missingBot}</p>}

          <div className="referral-success-actions">
            <button type="button" onClick={openBotInvite}>
              {t.botButton}
            </button>

            <button
              className="premium-link"
              type="button"
              onClick={openReferralPopup}
            >
              {t.inviteFriendsButton}
            </button>

            <a href="/profile">{t.dashboardButton}</a>
          </div>
        </section>
      )}

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
