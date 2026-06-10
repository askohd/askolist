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
    legalTitle: "Kurz bestätigen",
    legalPrefix: "Ich akzeptiere die",
    terms: "Nutzungsbedingungen",
    legalAnd: "und die",
    privacy: "Datenschutzerklärung",
    legalSuffix: "von Asko Cafe.",
    legalRequired: "Bitte zuerst das Kästchen aktivieren.",
    continueLogin: "Mit Discord einloggen",
    cancel: "Abbrechen",
  },
  en: {
    login: "Login",
    dashboard: "Server Dashboard",
    profile: "Profile",
    shop: "Premium",
    admin: "Admin",
    logout: "Logout",
    legalTitle: "Quick confirmation",
    legalPrefix: "I accept the",
    terms: "Terms of Use",
    legalAnd: "and the",
    privacy: "Privacy Policy",
    legalSuffix: "of Asko Cafe.",
    legalRequired: "Please check the box first.",
    continueLogin: "Login with Discord",
    cancel: "Cancel",
  },
  fr: {
    login: "Connexion",
    dashboard: "Tableau de bord serveur",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Déconnexion",
    legalTitle: "Confirmation rapide",
    legalPrefix: "J'accepte les",
    terms: "conditions d’utilisation",
    legalAnd: "et la",
    privacy: "politique de confidentialité",
    legalSuffix: "d’Asko Cafe.",
    legalRequired: "Veuillez d'abord cocher la case.",
    continueLogin: "Se connecter avec Discord",
    cancel: "Annuler",
  },
  it: {
    login: "Login",
    dashboard: "Dashboard server",
    profile: "Profilo",
    shop: "Premium",
    admin: "Admin",
    logout: "Logout",
    legalTitle: "Conferma rapida",
    legalPrefix: "Accetto le",
    terms: "condizioni d’uso",
    legalAnd: "e la",
    privacy: "privacy policy",
    legalSuffix: "di Asko Cafe.",
    legalRequired: "Seleziona prima la casella.",
    continueLogin: "Accedi con Discord",
    cancel: "Annulla",
  },
  pl: {
    login: "Login",
    dashboard: "Panel serwera",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Wyloguj",
    legalTitle: "Krótko potwierdź",
    legalPrefix: "Akceptuję",
    terms: "warunki korzystania",
    legalAnd: "oraz",
    privacy: "politykę prywatności",
    legalSuffix: "Asko Cafe.",
    legalRequired: "Najpierw zaznacz pole.",
    continueLogin: "Zaloguj przez Discord",
    cancel: "Anuluj",
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
  const [legalPromptOpen, setLegalPromptOpen] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    return (
      <div className="login-legal-wrapper">
        <style>{`
          .login-legal-wrapper {
            position: relative;
            display: inline-flex;
            align-items: center;
          }

          .login-legal-popup {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            z-index: 9999;
            width: min(330px, calc(100vw - 28px));
            padding: 16px;
            border-radius: 22px;
            background:
              radial-gradient(circle at top left, rgba(181, 76, 255, 0.20), transparent 42%),
              rgba(13, 13, 30, 0.98);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow:
              0 24px 70px rgba(0, 0, 0, 0.55),
              0 0 34px rgba(139, 92, 246, 0.16);
            backdrop-filter: blur(18px);
          }

          .login-legal-popup h3 {
            margin: 0 0 10px;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 950;
          }

          .login-legal-row {
            display: flex;
            align-items: flex-start;
            gap: 9px;
            color: rgba(236, 240, 255, 0.78);
            font-size: 0.84rem;
            line-height: 1.45;
            font-weight: 750;
          }

          .login-legal-row input {
            width: 16px;
            height: 16px;
            margin-top: 2px;
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

          .login-legal-actions {
            margin-top: 14px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .login-legal-actions .btn {
            width: 100%;
            min-height: 42px;
            padding: 0 14px;
            border-radius: 14px;
          }

          .login-legal-disabled {
            opacity: 0.45;
            cursor: not-allowed;
            filter: grayscale(0.25);
            transform: none !important;
          }

          .login-legal-hint {
            margin: 2px 0 0;
            color: rgba(255, 220, 140, 0.78);
            font-size: 0.76rem;
            line-height: 1.35;
          }

          @media (max-width: 768px) {
            .login-legal-popup {
              position: fixed;
              top: 104px;
              left: 14px;
              right: 14px;
              width: auto;
            }
          }
        `}</style>

        <button
          className="btn secondary"
          type="button"
          onClick={() => setLegalPromptOpen((current) => !current)}
        >
          {t(language, "login")}
        </button>

        {legalPromptOpen && (
          <div className="login-legal-popup">
            <h3>{t(language, "legalTitle")}</h3>

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

            <div className="login-legal-actions">
              {legalAccepted ? (
                <Link className="btn" href="/api/auth/signin">
                  {t(language, "continueLogin")}
                </Link>
              ) : (
                <>
                  <button
                    className="btn login-legal-disabled"
                    type="button"
                    disabled
                  >
                    {t(language, "continueLogin")}
                  </button>

                  <p className="login-legal-hint">
                    {t(language, "legalRequired")}
                  </p>
                </>
              )}

              <button
                className="btn secondary"
                type="button"
                onClick={() => {
                  setLegalPromptOpen(false);
                  setLegalAccepted(false);
                }}
              >
                {t(language, "cancel")}
              </button>
            </div>
          </div>
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
