"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HEADER_TEXT = {
  de: {
    home: "Home",
    servers: "Serverliste",
    submit: "Server eintragen",
    myServer: "Mein Server",
    shop: "Shop",
    support: "Support",
    info: "Info",
    menu: "Menü",
    close: "Schließen",
    subtitle: "Discord Server Network",
  },
  en: {
    home: "Home",
    servers: "Server List",
    submit: "Submit Server",
    myServer: "My Server",
    shop: "Shop",
    support: "Support",
    info: "Info",
    menu: "Menu",
    close: "Close",
    subtitle: "Discord Server Network",
  },
  fr: {
    home: "Accueil",
    servers: "Liste des serveurs",
    submit: "Ajouter un serveur",
    myServer: "Mon serveur",
    shop: "Boutique",
    support: "Support",
    info: "Info",
    menu: "Menu",
    close: "Fermer",
    subtitle: "Réseau de serveurs Discord",
  },
  it: {
    home: "Home",
    servers: "Lista server",
    submit: "Aggiungi server",
    myServer: "Il mio server",
    shop: "Shop",
    support: "Supporto",
    info: "Info",
    menu: "Menu",
    close: "Chiudi",
    subtitle: "Network server Discord",
  },
  pl: {
    home: "Start",
    servers: "Lista serwerów",
    submit: "Dodaj serwer",
    myServer: "Mój serwer",
    shop: "Sklep",
    support: "Pomoc",
    info: "Info",
    menu: "Menu",
    close: "Zamknij",
    subtitle: "Sieć serwerów Discord",
  },
} as const;

const NAV_LINKS = [
  { href: "/", icon: "🏠", key: "home" },
  { href: "/servers", icon: "📋", key: "servers" },
  { href: "/submit", icon: "🚀", key: "submit" },
  { href: "/shop", icon: "🛒", key: "shop" },
  { href: "/support", icon: "💬", key: "support" },
  { href: "/info", icon: "ℹ️", key: "info" },
] as const;

const MOBILE_NAV_LINKS = [
  { href: "/", icon: "🏠", key: "home" },
  { href: "/servers", icon: "📋", key: "servers" },
  { href: "/submit", icon: "🚀", key: "submit" },
  { href: "/profile", icon: "🧩", key: "myServer" },
  { href: "/shop", icon: "🛒", key: "shop" },
  { href: "/support", icon: "💬", key: "support" },
  { href: "/info", icon: "ℹ️", key: "info" },
] as const;

function normalizeLanguage(language: unknown): UiLanguage {
  const value = String(language ?? "").toLowerCase();

  if (value === "en") return "en";
  if (value === "fr") return "fr";
  if (value === "it") return "it";
  if (value === "pl") return "pl";

  return "de";
}

function t(language: UiLanguage, key: keyof typeof HEADER_TEXT.de) {
  return HEADER_TEXT[language][key] || HEADER_TEXT.de[key];
}

export default function HeaderClient({
  isAdmin,
  hasDashboardAlert,
}: {
  isAdmin: boolean;
  hasDashboardAlert?: boolean;
}) {
  const language = normalizeLanguage(useLanguage());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="nav">
      <style>{`
        .nav-alert-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ff1744;
          box-shadow:
            0 0 0 3px rgba(255, 23, 68, 0.18),
            0 0 14px rgba(255, 23, 68, 0.55);
          flex: 0 0 auto;
        }

        .mobile-menu-alert-link {
          position: relative;
        }

        .mobile-menu-alert-dot {
          margin-left: auto;
        }
      `}</style>

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

        <nav
          className="nav-links desktop-nav-links"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="nav-link-icon">{item.icon}</span>
              {t(language, item.key)}
            </Link>
          ))}
        </nav>

        <div className="nav-right-actions desktop-nav-actions">
          <LanguageSwitcher />
          <LoginButton
            isAdmin={isAdmin}
            hasDashboardAlert={Boolean(hasDashboardAlert)}
          />
        </div>

        <div className="mobile-nav-shell">
          <Link className="mobile-brand" href="/" onClick={closeMobileMenu}>
            <span className="logo-mark">
              <Image
                src="/logo.png"
                alt="Asko Cafe Logo"
                width={52}
                height={52}
                priority
              />
            </span>

            <span className="mobile-brand-text">
              <span className="mobile-brand-title">Asko Cafe</span>
              <span className="mobile-brand-subtitle">
                {t(language, "subtitle")}
              </span>
            </span>
          </Link>

          <div className="mobile-icon-dock" aria-label="Mobile Navigation">
            <Link
              className="mobile-icon-link"
              href="/"
              aria-label={t(language, "home")}
              onClick={closeMobileMenu}
            >
              🏠
            </Link>

            <Link
              className="mobile-icon-link"
              href="/servers"
              aria-label={t(language, "servers")}
              onClick={closeMobileMenu}
            >
              📋
            </Link>

            <div className="mobile-language-wrap">
              <LanguageSwitcher />
            </div>

            <button
              className="mobile-menu-toggle"
              type="button"
              aria-label={t(language, "menu")}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              <span>{mobileMenuOpen ? "×" : "≡"}</span>
            </button>
          </div>
        </div>
      </div>

      <button
        className={`mobile-menu-backdrop ${mobileMenuOpen ? "open" : ""}`}
        type="button"
        aria-label={t(language, "close")}
        onClick={closeMobileMenu}
      />

      <div
        id="mobile-menu-panel"
        className={`mobile-menu-panel ${mobileMenuOpen ? "open" : ""}`}
      >
        <div className="mobile-menu-head">
          <div>
            <strong>Asko Cafe</strong>
            <span>{t(language, "menu")}</span>
          </div>

          <button
            className="mobile-menu-close"
            type="button"
            aria-label={t(language, "close")}
            onClick={closeMobileMenu}
          >
            ×
          </button>
        </div>

        <nav
          className="nav-links mobile-menu-links"
          aria-label="Mobile Navigation"
        >
          {MOBILE_NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={
                item.href === "/profile" && hasDashboardAlert
                  ? "mobile-menu-alert-link"
                  : undefined
              }
            >
              <span className="nav-link-icon">{item.icon}</span>
              {t(language, item.key)}

              {item.href === "/profile" && hasDashboardAlert && (
                <span
                  className="nav-alert-dot mobile-menu-alert-dot"
                  aria-label="Neue Dashboard Benachrichtigung"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="nav-right-actions mobile-menu-actions">
          <LanguageSwitcher />
          <LoginButton
            isAdmin={isAdmin}
            hasDashboardAlert={Boolean(hasDashboardAlert)}
          />
        </div>
      </div>
    </header>
  );
}
