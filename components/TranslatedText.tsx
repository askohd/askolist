"use client";

import { t, type TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/components/useLanguage";

export default function TranslatedText({ textKey }: { textKey: TranslationKey }) {
  const language = useLanguage();

  return <>{t(language, textKey)}</>;
}
