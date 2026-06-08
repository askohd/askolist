"use client";

import { useEffect, useState } from "react";
import { defaultLanguage, normalizeLanguageCode, type LanguageCode } from "@/lib/i18n";

export function useLanguage() {
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    function readLanguage() {
      const savedLanguage = localStorage.getItem("asko_language");
      setLanguage(normalizeLanguageCode(savedLanguage));
    }

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<string>;
      setLanguage(normalizeLanguageCode(customEvent.detail));
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
