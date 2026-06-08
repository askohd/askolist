"use client";

import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HEADER_TEXT = {
  de: {
    servers: "Server",
    submit: "Server eintragen",
    shop: "Shop",
    dashboard: "Server Dashboard",
    admin: "Admin",
  },
  en: {
    servers: "Servers",
    submit: "Submit Server",
    shop: "Shop",
    dashboard: "Server Dashboard",
    admin: "Admin",
  },
  fr: {
    servers: "Serveurs",
    submit: "Ajouter un serveur",
    shop: "Boutique",
    dashboard: "Tableau de bord serveur",
    admin: "Admin",
  },
  it: {
    servers: "Server",
    submit: "Aggiungi server",
    shop: "Shop",
    dashboard: "Dashboard server",
    admin: "Admin",
  },
  pl: {
    servers: "Serwery",
    submit: "Dodaj serwer",
    shop: "Sklep",
    dashboard: "Panel serwera",
    admin: "Admin",
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

        <nav className="nav-links">
          <Link href="/servers">{t(language, "servers")}</Link>
          <Link href="/submit">{t(language, "submit")}</Link>
          <Link href="/shop">{t(language, "shop")}</Link>
          <Link href="/profile">{t(language, "dashboard")}</Link>

          {isAdmin && <Link href="/admin">{t(language, "admin")}</Link>}
        </nav>

        <div className="nav-right-actions">
          <LanguageSwitcher />
          <LoginButton isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}
