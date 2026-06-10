"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const FOOTER_TEXT = {
  de: {
    bots: "Bots",
    events: "Events",
    info: "Info",
    premium: "Premium",
    addServer: "Server hinzufügen",
    support: "Support",
    imprint: "Impressum",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    copyright: "© 2026 Asko Cafe",
  },
  en: {
    bots: "Bots",
    events: "Events",
    info: "Info",
    premium: "Premium",
    addServer: "Add server",
    support: "Support",
    imprint: "Imprint",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    copyright: "© 2026 Asko Cafe",
  },
  fr: {
    bots: "Bots",
    events: "Événements",
    info: "Info",
    premium: "Premium",
    addServer: "Ajouter un serveur",
    support: "Support",
    imprint: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d’utilisation",
    copyright: "© 2026 Asko Cafe",
  },
  it: {
    bots: "Bot",
    events: "Eventi",
    info: "Info",
    premium: "Premium",
    addServer: "Aggiungi server",
    support: "Supporto",
    imprint: "Impressum",
    privacy: "Informativa privacy",
    terms: "Condizioni d’uso",
    copyright: "© 2026 Asko Cafe",
  },
  pl: {
    bots: "Boty",
    events: "Wydarzenia",
    info: "Info",
    premium: "Premium",
    addServer: "Dodaj serwer",
    support: "Support",
    imprint: "Impressum",
    privacy: "Polityka prywatności",
    terms: "Warunki korzystania",
    copyright: "© 2026 Asko Cafe",
  },
} as const;

function tx(language: UiLanguage, key: keyof typeof FOOTER_TEXT.de) {
  return FOOTER_TEXT[language]?.[key] || FOOTER_TEXT.de[key];
}

export default function SiteFooter() {
  const language = useLanguage() as UiLanguage;

  return (
    <footer
      style={{
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(13,17,32,0.92), rgba(9,12,24,0.98))",
        color: "rgba(235,241,255,0.72)",
      }}
    >
      <div
        style={{
          width: "min(1180px, calc(100% - 32px))",
          margin: "0 auto",
          padding: "28px 0 24px",
          display: "grid",
          gap: "18px",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        <nav
          aria-label="Footer Navigation"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            flexWrap: "wrap",
            fontSize: "13px",
            fontWeight: 800,
          }}
        >
          <Link className="site-footer-link" href="/bots">
            🤖 {tx(language, "bots")}
          </Link>
          <Link className="site-footer-link" href="/events">
            📅 {tx(language, "events")}
          </Link>
          <Link className="site-footer-link" href="/info">
            ℹ️ {tx(language, "info")}
          </Link>
        </nav>

        <nav
          aria-label="Footer Aktionen"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            flexWrap: "wrap",
            fontSize: "13px",
            fontWeight: 800,
          }}
        >
          <Link className="site-footer-link" href="/shop">
            👑 {tx(language, "premium")}
          </Link>
          <Link className="site-footer-link" href="/submit">
            ➕ {tx(language, "addServer")}
          </Link>
          <Link className="site-footer-link" href="/support">
            🎮 {tx(language, "support")}
          </Link>
        </nav>

        <nav
          aria-label="Rechtliches"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            flexWrap: "wrap",
            fontSize: "12px",
            color: "rgba(235,241,255,0.55)",
          }}
        >
          <Link className="site-footer-link muted" href="/impressum">
            {tx(language, "imprint")}
          </Link>
          <Link className="site-footer-link muted" href="/datenschutz">
            {tx(language, "privacy")}
          </Link>
          <Link className="site-footer-link muted" href="/nutzungsbedingungen">
            {tx(language, "terms")}
          </Link>
        </nav>

        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "rgba(235,241,255,0.45)",
          }}
        >
          {tx(language, "copyright")}
        </p>
      </div>
    </footer>
  );
}
