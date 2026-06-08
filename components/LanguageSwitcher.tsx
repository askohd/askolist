"use client";

import { useEffect, useState } from "react";
import { normalizeLanguageCode, type LanguageCode } from "@/lib/i18n";

const LANGUAGES: Array<{
  code: LanguageCode;
  label: string;
  short: string;
  flag: string;
}> = [
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹" },
  { code: "pl", label: "Polski", short: "PL", flag: "🇵🇱" },
];

function saveLanguage(language: LanguageCode) {
  localStorage.setItem("asko_language", language);

  document.cookie =
    "asko_language=" +
    language +
    "; path=/; max-age=31536000; SameSite=Lax";

  window.dispatchEvent(
    new CustomEvent("asko-language-change", {
      detail: language,
    })
  );
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<LanguageCode>("de");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = normalizeLanguageCode(
      localStorage.getItem("asko_language")
    );

    setLanguage(savedLanguage);

    document.cookie =
      "asko_language=" +
      savedLanguage +
      "; path=/; max-age=31536000; SameSite=Lax";
  }, []);

  const currentLanguage =
    LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  function chooseLanguage(nextLanguage: LanguageCode) {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
    setOpen(false);

    window.location.reload();
  }

  return (
    <div className="language-switcher">
      <button
        type="button"
        className="language-switcher-button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Website Sprache auswählen"
      >
        <span className="language-flag">{currentLanguage.flag}</span>
      </button>

      {open && (
        <div className="language-switcher-menu">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              className={
                "language-switcher-option " +
                (item.code === language ? "active" : "")
              }
              onClick={() => chooseLanguage(item.code)}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
              <strong>{item.short}</strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
