"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

const DISCORD_URL = "https://discord.gg/askocafe";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const SUPPORT_TEXT = {
  de: {
    badge: "Support",
    title: "Brauchst du Hilfe?",
    subtitle:
      "Bei Problemen mit Servern, Premium, Freigaben, Bot-Verbindung oder deinem Account helfen wir dir direkt auf unserem Discord.",
    discordButton: "💬 Support auf Discord öffnen",
    submitButton: "Server eintragen",
    serverHelpTitle: "Server Hilfe",
    serverHelpText:
      "Probleme beim Server eintragen, Banner hochladen, Bot einladen oder Bumpen.",
    premiumHelpTitle: "Premium Hilfe",
    premiumHelpText:
      "Fragen zu Premium Layouts, Farben, Effekten, Partner Funktionen oder Anzeige auf der Startseite.",
    accountHelpTitle: "Account Hilfe",
    accountHelpText:
      "Probleme beim Login, Discord Account, Server Dashboard oder fehlenden Berechtigungen.",
    cardCta: "Auf Discord Hilfe bekommen →",
    fastHelpTitle: "Schnellste Hilfe bekommst du auf Discord",
    fastHelpText:
      "Öffne einfach ein Ticket oder schreibe in den Support-Bereich. Unser Team schaut sich dein Problem dort an.",
    discordBottomButton: "Zum Asko Cafe Discord",
  },

  en: {
    badge: "Support",
    title: "Need help?",
    subtitle:
      "If you have problems with servers, premium, approvals, bot connection or your account, we can help you directly on our Discord.",
    discordButton: "💬 Open support on Discord",
    submitButton: "Submit server",
    serverHelpTitle: "Server Help",
    serverHelpText:
      "Problems submitting a server, uploading banners, inviting the bot or bumping.",
    premiumHelpTitle: "Premium Help",
    premiumHelpText:
      "Questions about premium layouts, colors, effects, partner features or homepage display.",
    accountHelpTitle: "Account Help",
    accountHelpText:
      "Problems with login, Discord account, server dashboard or missing permissions.",
    cardCta: "Get help on Discord →",
    fastHelpTitle: "The fastest help is on Discord",
    fastHelpText:
      "Open a ticket or write in the support area. Our team will look into your problem there.",
    discordBottomButton: "Go to Asko Cafe Discord",
  },

  fr: {
    badge: "Support",
    title: "Besoin d’aide ?",
    subtitle:
      "Si tu as des problèmes avec les serveurs, le premium, les validations, la connexion du bot ou ton compte, nous t’aidons directement sur notre Discord.",
    discordButton: "💬 Ouvrir le support sur Discord",
    submitButton: "Ajouter un serveur",
    serverHelpTitle: "Aide serveur",
    serverHelpText:
      "Problèmes pour ajouter un serveur, téléverser une bannière, inviter le bot ou bump.",
    premiumHelpTitle: "Aide Premium",
    premiumHelpText:
      "Questions sur les layouts premium, couleurs, effets, fonctions partenaire ou affichage sur la page d’accueil.",
    accountHelpTitle: "Aide compte",
    accountHelpText:
      "Problèmes de connexion, compte Discord, dashboard serveur ou permissions manquantes.",
    cardCta: "Obtenir de l’aide sur Discord →",
    fastHelpTitle: "L’aide la plus rapide est sur Discord",
    fastHelpText:
      "Ouvre simplement un ticket ou écris dans l’espace support. Notre équipe regardera ton problème.",
    discordBottomButton: "Aller sur le Discord Asko Cafe",
  },

  it: {
    badge: "Supporto",
    title: "Hai bisogno di aiuto?",
    subtitle:
      "Se hai problemi con server, premium, approvazioni, collegamento del bot o account, ti aiutiamo direttamente sul nostro Discord.",
    discordButton: "💬 Apri il supporto su Discord",
    submitButton: "Aggiungi server",
    serverHelpTitle: "Aiuto server",
    serverHelpText:
      "Problemi nell’inserire un server, caricare banner, invitare il bot o fare bump.",
    premiumHelpTitle: "Aiuto Premium",
    premiumHelpText:
      "Domande su layout premium, colori, effetti, funzioni partner o visualizzazione in homepage.",
    accountHelpTitle: "Aiuto account",
    accountHelpText:
      "Problemi con login, account Discord, dashboard server o permessi mancanti.",
    cardCta: "Ricevi aiuto su Discord →",
    fastHelpTitle: "L’aiuto più veloce è su Discord",
    fastHelpText:
      "Apri un ticket o scrivi nell’area supporto. Il nostro team controllerà il tuo problema.",
    discordBottomButton: "Vai al Discord Asko Cafe",
  },

  pl: {
    badge: "Wsparcie",
    title: "Potrzebujesz pomocy?",
    subtitle:
      "Jeśli masz problem z serwerami, premium, zatwierdzeniami, połączeniem bota lub kontem, pomożemy ci bezpośrednio na naszym Discordzie.",
    discordButton: "💬 Otwórz wsparcie na Discordzie",
    submitButton: "Dodaj serwer",
    serverHelpTitle: "Pomoc z serwerem",
    serverHelpText:
      "Problemy z dodaniem serwera, przesłaniem bannera, zaproszeniem bota lub bumpowaniem.",
    premiumHelpTitle: "Pomoc Premium",
    premiumHelpText:
      "Pytania o layouty premium, kolory, efekty, funkcje partnera lub wyświetlanie na stronie głównej.",
    accountHelpTitle: "Pomoc z kontem",
    accountHelpText:
      "Problemy z logowaniem, kontem Discord, panelem serwera lub brakującymi uprawnieniami.",
    cardCta: "Uzyskaj pomoc na Discordzie →",
    fastHelpTitle: "Najszybsza pomoc jest na Discordzie",
    fastHelpText:
      "Otwórz ticket albo napisz w dziale wsparcia. Nasz zespół sprawdzi twój problem.",
    discordBottomButton: "Przejdź na Discord Asko Cafe",
  },
} as const;

function getSupportText(language: UiLanguage, key: keyof typeof SUPPORT_TEXT.de) {
  return SUPPORT_TEXT[language]?.[key] || SUPPORT_TEXT.de[key];
}

export default function SupportPage() {
  const language = useLanguage() as UiLanguage;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "90px 24px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at 0% 20%, rgba(137,32,191,0.35), transparent 34%), radial-gradient(circle at 100% 20%, rgba(56,151,202,0.28), transparent 36%), linear-gradient(135deg, #07000f 0%, #10051f 45%, #10243d 100%)",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 22px",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(29,45,91,0.82), rgba(16,14,52,0.9))",
            border: "1px solid rgba(112,219,255,0.42)",
            color: "#9deaff",
            fontSize: "14px",
            fontWeight: 900,
            boxShadow:
              "0 0 24px rgba(92,211,255,0.18), 0 0 42px rgba(192,91,255,0.12)",
          }}
        >
          {getSupportText(language, "badge")}
        </span>

        <h1
          style={{
            margin: "34px 0 0",
            fontSize: "clamp(44px, 5vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-0.055em",
            fontWeight: 950,
          }}
        >
          {getSupportText(language, "title")}
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "22px auto 0",
            color: "rgba(246,243,255,0.82)",
            fontSize: "17px",
            lineHeight: 1.7,
          }}
        >
          {getSupportText(language, "subtitle")}
        </p>

        <div
          style={{
            marginTop: "34px",
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              minHeight: "50px",
              minWidth: "240px",
              padding: "0 26px",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 950,
              background:
                "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
              boxShadow:
                "0 0 25px rgba(208,85,255,0.34), 0 0 28px rgba(112,221,255,0.18)",
            }}
          >
            {getSupportText(language, "discordButton")}
          </a>

          <Link
            href="/submit"
            style={{
              minHeight: "50px",
              minWidth: "190px",
              padding: "0 24px",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 900,
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            {getSupportText(language, "submitButton")}
          </Link>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1180px",
          margin: "58px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
        }}
      >
        <SupportCard
          icon="🚀"
          title={getSupportText(language, "serverHelpTitle")}
          text={getSupportText(language, "serverHelpText")}
          cta={getSupportText(language, "cardCta")}
        />

        <SupportCard
          icon="👑"
          title={getSupportText(language, "premiumHelpTitle")}
          text={getSupportText(language, "premiumHelpText")}
          cta={getSupportText(language, "cardCta")}
        />

        <SupportCard
          icon="👤"
          title={getSupportText(language, "accountHelpTitle")}
          text={getSupportText(language, "accountHelpText")}
          cta={getSupportText(language, "cardCta")}
        />
      </section>

      <section
        style={{
          maxWidth: "880px",
          margin: "42px auto 0",
          padding: "28px",
          borderRadius: "28px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(24,18,50,0.92), rgba(13,13,32,0.92))",
          border: "1px solid rgba(158,105,255,0.22)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 30px rgba(160,84,255,0.16)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
          }}
        >
          {getSupportText(language, "fastHelpTitle")}
        </h2>

        <p
          style={{
            margin: "12px auto 0",
            maxWidth: "620px",
            color: "rgba(246,243,255,0.76)",
            lineHeight: 1.65,
          }}
        >
          {getSupportText(language, "fastHelpText")}
        </p>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: "20px",
            minHeight: "48px",
            padding: "0 26px",
            borderRadius: "16px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#ffffff",
            fontWeight: 950,
            background:
              "linear-gradient(135deg, #f149d1 0%, #a456ff 45%, #75ddff 100%)",
          }}
        >
          {getSupportText(language, "discordBottomButton")}
        </a>
      </section>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  text,
  cta,
}: {
  icon: string;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noreferrer"
      style={{
        minHeight: "210px",
        padding: "24px",
        borderRadius: "26px",
        textDecoration: "none",
        color: "#ffffff",
        background:
          "linear-gradient(180deg, rgba(20,17,39,0.94), rgba(13,11,30,0.94))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025) inset, 0 0 28px rgba(120,80,255,0.10)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #67e8f9 100%)",
          boxShadow: "0 0 20px rgba(112,221,255,0.2)",
          fontSize: "22px",
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            margin: "22px 0 10px",
            fontSize: "22px",
            lineHeight: 1,
            fontWeight: 950,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "rgba(246,243,255,0.78)",
            lineHeight: 1.5,
            fontSize: "15px",
          }}
        >
          {text}
        </p>
      </div>

      <span
        style={{
          marginTop: "18px",
          color: "#9deaff",
          fontSize: "14px",
          fontWeight: 900,
        }}
      >
        {cta}
      </span>
    </a>
  );
}
