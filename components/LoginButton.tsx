"use client";

import Image from "next/image";
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
  },
  en: {
    login: "Login",
    dashboard: "Server Dashboard",
    profile: "Profile",
    shop: "Premium",
    admin: "Admin",
    logout: "Logout",
  },
  fr: {
    login: "Connexion",
    dashboard: "Tableau de bord serveur",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Déconnexion",
  },
  it: {
    login: "Login",
    dashboard: "Dashboard server",
    profile: "Profilo",
    shop: "Premium",
    admin: "Admin",
    logout: "Logout",
  },
  pl: {
    login: "Login",
    dashboard: "Panel serwera",
    profile: "Profil",
    shop: "Premium",
    admin: "Admin",
    logout: "Wyloguj",
  },
} as const;

function t(language: UiLanguage, key: keyof typeof USER_MENU_TEXT.de) {
  return USER_MENU_TEXT[language]?.[key] || USER_MENU_TEXT.de[key];
}

export default function LoginButton({ isAdmin }: { isAdmin?: boolean }) {
  const { data: session, status } = useSession();
  const language = useLanguage() as UiLanguage;
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    return (
      <Link className="btn secondary" href="/api/auth/signin">
        {t(language, "login")}
      </Link>
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
          <Image
            src={image}
            alt={name}
            width={34}
            height={34}
            className="user-menu-avatar"
          />
        ) : (
          <span className="user-menu-avatar-fallback">
            {name.slice(0, 1)}
          </span>
        )}

        <span className="user-menu-name">{name}</span>
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <div className="user-menu-head">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={44}
                height={44}
                className="user-menu-head-avatar"
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
