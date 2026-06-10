"use client";

import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HEADER_TEXT = {
  de: {
    home: "Home",
    servers: "Serverliste",
    submit: "Server eintragen",
    shop: "Shop",
    support: "Support",
    info: "Info",
  },
  en: {
    home: "Home",
    servers: "Server List",
    submit: "Submit Server",
    shop: "Shop",
    support: "Support",
    info: "Info",
  },
  fr: {
    home: "Accueil",
    servers: "Liste des serveurs",
    submit: "Ajouter un serveur",
    shop: "Boutique",
    support: "Support",
    info: "Info",
  },
  it: {
    home: "Home",
    servers: "Lista server",
    submit: "Aggiungi server",
    shop: "Shop",
    support: "Supporto",
    info: "Info",
  },
  pl: {
    home: "Start",
    servers: "Lista serwerów",
    submit: "Dodaj serwer",
    shop: "Sklep",
    support: "Pomoc",
    info: "Info",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof HEADER_TEXT.de) {
  return HEADER_TEXT[language]?.[key] || HEADER_TEXT.de[key];
}

export default function HeaderClient({ isAdmin }: { isAdmin: boolean }) {
  const language = useLanguage() as UiLanguage;

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">
            <Image
              src="/logo.png"
              alt="Asko Cafe Logo"
              width={56}
              height={56}
              priority
            />
          </span>
          <span>Asko Cafe</span>
        </Link>

        <nav className="nav-links" aria-label="Hauptnavigation">
          <Link href="/">
            <span className="nav-link-icon">🏠</span>
            {t(language, "home")}
          </Link>

          <Link href="/servers">
            <span className="nav-link-icon">📋</span>
            {t(language, "servers")}
          </Link>

          <Link href="/submit">
            <span className="nav-link-icon">🚀</span>
            {t(language, "submit")}
          </Link>

          <Link href="/shop">
            <span className="nav-link-icon">🛒</span>
            {t(language, "shop")}
          </Link>

          <Link href="/support">
            <span className="nav-link-icon">💬</span>
            {t(language, "support")}
          </Link>

          <Link href="/info">
            <span className="nav-link-icon">ℹ️</span>
            {t(language, "info")}
          </Link>
        </nav>

        <div className="nav-right-actions">
          <LanguageSwitcher />
          <LoginButton isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}
