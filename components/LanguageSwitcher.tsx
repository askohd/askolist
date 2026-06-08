"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  {
    code: "de",
    label: "Deutsch",
    flagClass: "flag-de",
  },
  {
    code: "en",
    label: "English",
    flagClass: "flag-en",
  },
  {
    code: "fr",
    label: "Français",
    flagClass: "flag-fr",
  },
  {
    code: "it",
    label: "Italiano",
    flagClass: "flag-it",
  },
  {
    code: "pl",
    label: "Polski",
    flagClass: "flag-pl",
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
        className="language-switcher-button flag-only"
        onClick={() => setOpen((current) => !current)}
        aria-label="Sprache auswählen"
      >
        <span
          className={"language-flag " + selectedLanguage.flagClass}
          aria-hidden="true"
        />
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
              <span
                className={"language-flag " + language.flagClass}
                aria-hidden="true"
              />
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
