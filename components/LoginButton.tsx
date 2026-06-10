"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const USER_MENU_TEXT = {
  de: {
    login: "Login",
    dashboard: "Server Dashboard",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Abmelden",
    legalPrefix: "Ich akzeptiere die",
    terms: "Nutzungsbedingungen",
    legalAnd: "und die",
    privacy: "Datenschutzerklärung",
    legalSuffix: "von Asko Cafe.",
    legalRequired: "Bitte zuerst bestätigen.",
  },
  en: {
    login: "Login",
    dashboard: "Server Dashboard",
    profile: "Profile",
    shop: "Premium",
    admin: "Admin",
    logout: "Logout",
    legalPrefix: "I accept the",
    terms: "Terms of Use",
    legalAnd: "and the",
    privacy: "Privacy Policy",
    legalSuffix: "of Asko Cafe.",
    legalRequired: "Please accept first.",
  },
  fr: {
    login: "Connexion",
    dashboard: "Tableau de bord serveur",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Déconnexion",
    legalPrefix: "J'accepte les",
    terms: "conditions d’utilisation",
    legalAnd: "et la",
    privacy: "politique de confidentialité",
    legalSuffix: "d’Asko Cafe.",
    legalRequired: "Veuillez d'abord accepter.",
  },
  it: {
    login: "Login",
    dashboard: "Dashboard server",
    profile: "Profilo",
    shop: "Premium",
    admin: "Admin",
    logout: "Logout",
    legalPrefix: "Accetto le",
    terms: "condizioni d’uso",
    legalAnd: "e la",
    privacy: "privacy policy",
    legalSuffix: "di Asko Cafe.",
    legalRequired: "Accetta prima.",
  },
  pl: {
    login: "Login",
    dashboard: "Panel serwera",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Wyloguj",
    legalPrefix: "Akceptuję",
    terms: "warunki korzystania",
    legalAnd: "oraz",
    privacy: "politykę prywatności",
    legalSuffix: "Asko Cafe.",
    legalRequired: "Najpierw zaakceptuj.",
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

function t(language: UiLanguage, key: keyof typeof USER_MENU_TEXT.de) {
  return USER_MENU_TEXT[language]?.[key] || USER_MENU_TEXT.de[key];
}

export default function LoginButton({ isAdmin }: { isAdmin?: boolean }) {
  const { data: session, status } = useSession();
  const language = normalizeLanguage(useLanguage());
  const [open, setOpen] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    return (
      <div className="login-legal-box">
        <style>{`
          .login-legal-box {
            position: relative;
            display: grid;
            gap: 9px;
            min-width: 190px;
          }

          .login-legal-row {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            color: rgba(236, 240, 255, 0.78);
            font-size: 0.78rem;
            line-height: 1.35;
            font-weight: 750;
          }

          .login-legal-row input {
            width: 15px;
            height: 15px;
            margin-top: 1px;
            flex: 0 0 auto;
            accent-color: #8b5cf6;
          }

          .login-legal-row a {
            color: #9deaff;
            font-weight: 950;
            text-decoration: none;
          }

          .login-legal-row a:hover {
            color: #ffffff;
          }

          .login-legal-button {
            width: 100%;
          }

          .login-legal-button.disabled,
          .login-legal-button:disabled {
            opacity: 0.45;
            cursor: not-allowed;
            filter: grayscale(0.25);
            transform: none !important;
          }

          .login-legal-hint {
            margin: 0;
            color: rgba(255, 220, 140, 0.76);
            font-size: 0.74rem;
            line-height: 1.3;
          }

          @media (max-width: 768px) {
            .login-legal-box {
              min-width: 0;
              width: 100%;
            }

            .login-legal-row {
              font-size: 0.82rem;
            }
          }
        `}</style>

        <label className="login-legal-row">
          <input
            type="checkbox"
            checked={legalAccepted}
            onChange={(event) => setLegalAccepted(event.target.checked)}
          />

          <span>
            {t(language, "legalPrefix")}{" "}
            <Link href="/nutzungsbedingungen" target="_blank">
              {t(language, "terms")}
            </Link>{" "}
            {t(language, "legalAnd")}{" "}
            <Link href="/datenschutz" target="_blank">
              {t(language, "privacy")}
            </Link>{" "}
            {t(language, "legalSuffix")}
          </span>
        </label>

        {legalAccepted ? (
          <Link className="btn secondary login-legal-button" href="/api/auth/signin">
            {t(language, "login")}
          </Link>
        ) : (
          <>
            <button
              className="btn secondary login-legal-button disabled"
              type="button"
              disabled
            >
              {t(language, "login")}
            </button>

            <p className="login-legal-hint">{t(language, "legalRequired")}</p>
          </>
        )}
      </div>
    );
  }

  const image = session.user.image;
  const name = session.user.name ?? "User";

  return (
    <div className="user-menu">
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-label="User menu öffnen"
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="user-menu-avatar"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="user-menu-avatar-fallback">{name.slice(0, 1)}</span>
        )}

        <span className="user-menu-name">{name}</span>
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <div className="user-menu-head">
            {image ? (
              <img
                src={image}
                alt={name}
                className="user-menu-head-avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="user-menu-head-avatar fallback">
                {name.slice(0, 1)}
              </span>
            )}

            <div>
              <strong>{name}</strong>
              <span>{t(language, "profile")}</span>
            </div>
          </div>

          <div className="user-menu-list">
            <Link href="/profile" onClick={() => setOpen(false)}>
              <span>📊</span>
              {t(language, "dashboard")}
            </Link>

            <Link href="/shop" onClick={() => setOpen(false)}>
              <span>👑</span>
              {t(language, "shop")}
            </Link>

            {isAdmin && (
              <Link href="/admin" onClick={() => setOpen(false)}>
                <span>🛡️</span>
                {t(language, "admin")}
              </Link>
            )}

            <button
              type="button"
              className="user-menu-logout"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <span>↪</span>
              {t(language, "logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
