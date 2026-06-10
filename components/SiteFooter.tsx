"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const DISCORD_INVITE_URL = "https://discord.gg/askocafe";
const SUPPORT_EMAIL = "dcaskocafe@gmail.com";

const FOOTER_TEXT = {
  de: {
    brandTitle: "Asko Cafe",
    brandSub: "Discord Server Directory",
    brandText:
      "Finde neue Discord-Communitys, trage deinen eigenen Server ein und nutze Premium-Features für mehr Sichtbarkeit.",
    platform: "Plattform",
    serverList: "Serverliste",
    submit: "Server eintragen",
    premium: "Premium",
    support: "Support",
    info: "Info",
    legal: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    supportText: "Support über Discord-Ticket oder E-Mail",
    discord: "Discord",
    rights: "Alle Rechte vorbehalten.",
  },
  en: {
    brandTitle: "Asko Cafe",
    brandSub: "Discord Server Directory",
    brandText:
      "Discover new Discord communities, submit your own server and use premium features for more visibility.",
    platform: "Platform",
    serverList: "Server list",
    submit: "Submit server",
    premium: "Premium",
    support: "Support",
    info: "Info",
    legal: "Legal",
    imprint: "Imprint",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    supportText: "Support via Discord ticket or email",
    discord: "Discord",
    rights: "All rights reserved.",
  },
  fr: {
    brandTitle: "Asko Cafe",
    brandSub: "Annuaire de serveurs Discord",
    brandText:
      "Découvre de nouvelles communautés Discord, ajoute ton serveur et utilise les fonctions Premium pour plus de visibilité.",
    platform: "Plateforme",
    serverList: "Liste des serveurs",
    submit: "Ajouter un serveur",
    premium: "Premium",
    support: "Support",
    info: "Info",
    legal: "Légal",
    imprint: "Mentions légales",
    privacy: "Confidentialité",
    terms: "Conditions d’utilisation",
    supportText: "Support via ticket Discord ou e-mail",
    discord: "Discord",
    rights: "Tous droits réservés.",
  },
  it: {
    brandTitle: "Asko Cafe",
    brandSub: "Directory server Discord",
    brandText:
      "Scopri nuove community Discord, aggiungi il tuo server e usa le funzioni Premium per maggiore visibilità.",
    platform: "Piattaforma",
    serverList: "Lista server",
    submit: "Aggiungi server",
    premium: "Premium",
    support: "Supporto",
    info: "Info",
    legal: "Legale",
    imprint: "Impressum",
    privacy: "Privacy",
    terms: "Condizioni d’uso",
    supportText: "Supporto tramite ticket Discord o e-mail",
    discord: "Discord",
    rights: "Tutti i diritti riservati.",
  },
  pl: {
    brandTitle: "Asko Cafe",
    brandSub: "Katalog serwerów Discord",
    brandText:
      "Odkrywaj nowe społeczności Discord, dodaj własny serwer i korzystaj z funkcji Premium dla lepszej widoczności.",
    platform: "Platforma",
    serverList: "Lista serwerów",
    submit: "Dodaj serwer",
    premium: "Premium",
    support: "Support",
    info: "Info",
    legal: "Prawne",
    imprint: "Impressum",
    privacy: "Polityka prywatności",
    terms: "Warunki korzystania",
    supportText: "Support przez ticket Discord lub e-mail",
    discord: "Discord",
    rights: "Wszelkie prawa zastrzeżone.",
  },
} as const;

function normalizeLanguage(language: unknown): UiLanguage {
  const value = String(language ?? "").toLowerCase();

  if (value === "en") return "en";
  if (value === "fr") return "fr";
  if (value === "it") return "it";
  if (value === "pl") return "pl";

  return "de";
}

function tx(language: UiLanguage, key: keyof typeof FOOTER_TEXT.de) {
  return FOOTER_TEXT[language]?.[key] || FOOTER_TEXT.de[key];
}

export default function SiteFooter() {
  const language = normalizeLanguage(useLanguage());

  return (
    <footer className="site-footer-v2">
      <div className="site-footer-v2-glow" />

      <div className="container site-footer-v2-inner">
        <section className="site-footer-v2-card" aria-label="Asko Cafe">
          <div className="site-footer-v2-brand">
            <Link href="/" className="site-footer-v2-logo" aria-label="Asko Cafe">
              <Image
                src="/logo.png"
                alt="Asko Cafe Logo"
                width={42}
                height={42}
              />
            </Link>

            <div>
              <strong>{tx(language, "brandTitle")}</strong>
              <small>{tx(language, "brandSub")}</small>
            </div>
          </div>

          <p className="site-footer-v2-text">{tx(language, "brandText")}</p>
        </section>

        <nav className="site-footer-v2-column" aria-label={tx(language, "platform")}>
          <span>{tx(language, "platform")}</span>

          <Link href="/servers">{tx(language, "serverList")}</Link>
          <Link href="/submit">{tx(language, "submit")}</Link>
          <Link href="/shop">{tx(language, "premium")}</Link>
          <Link href="/support">{tx(language, "support")}</Link>
          <Link href="/info">{tx(language, "info")}</Link>
        </nav>

        <nav className="site-footer-v2-column" aria-label={tx(language, "legal")}>
          <span>{tx(language, "legal")}</span>

          <Link href="/impressum">{tx(language, "imprint")}</Link>
          <Link href="/datenschutz">{tx(language, "privacy")}</Link>
          <Link href="/nutzungsbedingungen">{tx(language, "terms")}</Link>
        </nav>
      </div>

      <div className="container site-footer-v2-bottom">
        <p>
          © 2026 Asko Cafe · {tx(language, "rights")}
        </p>

        <p>
          {tx(language, "supportText")}:{" "}
          <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            {tx(language, "discord")}
          </a>{" "}
          · <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </div>
    </footer>
  );
}
