"use client";

import { useEffect, useState } from "react";
import {
  defaultLanguage,
  normalizeLanguageCode,
  type LanguageCode,
} from "@/lib/i18n";

function saveLanguageCookie(language: LanguageCode) {
  const maxAge = 60 * 60 * 24 * 365;

  document.cookie = `askocafe-language=${language}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `asko-language=${language}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `asko_language=${language}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `language=${language}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `locale=${language}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function useLanguage() {
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    function applyLanguage(value: string | null | undefined) {
      const normalizedLanguage = normalizeLanguageCode(value);

      setLanguage(normalizedLanguage);
      localStorage.setItem("asko_language", normalizedLanguage);
      saveLanguageCookie(normalizedLanguage);
    }

    function readLanguage() {
      const savedLanguage =
        localStorage.getItem("asko_language") ||
        localStorage.getItem("askocafe-language") ||
        localStorage.getItem("asko-language") ||
        localStorage.getItem("language");

      applyLanguage(savedLanguage);
    }

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<string>;
      applyLanguage(customEvent.detail);
    }

    readLanguage();

    window.addEventListener("asko-language-change", handleLanguageChange);
    window.addEventListener("storage", readLanguage);

    return () => {
      window.removeEventListener("asko-language-change", handleLanguageChange);
      window.removeEventListener("storage", readLanguage);
    };
  }, []);

  return language;
}
