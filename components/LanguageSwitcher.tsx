"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  {
    code: "de",
    label: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
  },
  {
    code: "fr",
    label: "Français",
    flag: "🇫🇷",
  },
  {
    code: "it",
    label: "Italiano",
    flag: "🇮🇹",
  },
  {
    code: "pl",
    label: "Polski",
    flag: "🇵🇱",
  },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("de");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("asko_language");

    if (savedLanguage) {
      setSelectedCode(savedLanguage);
    }
  }, []);

  const selectedLanguage =
    LANGUAGES.find((language) => language.code === selectedCode) ??
    LANGUAGES[0];

  function selectLanguage(code: string) {
    localStorage.setItem("asko_language", code);
    document.cookie =
      "asko_language=" +
      code +
      "; path=/; max-age=31536000; SameSite=Lax";

    setSelectedCode(code);
    setOpen(false);

    window.dispatchEvent(
      new CustomEvent("asko-language-change", {
        detail: code,
      })
    );
  }

  return (
    <div className="language-switcher">
      <button
        type="button"
        className="language-switcher-button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Sprache auswählen"
      >
        <span className="language-switcher-flag">
          {selectedLanguage.flag}
        </span>
        <span className="language-switcher-label">
          {selectedLanguage.code.toUpperCase()}
        </span>
      </button>

      {open && (
        <div className="language-switcher-menu">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              className={
                "language-switcher-option " +
                (language.code === selectedCode
                  ? "language-switcher-option-active"
                  : "")
              }
              onClick={() => selectLanguage(language.code)}
            >
              <span>{language.flag}</span>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
