"use client";

import { useLocale } from "./locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "pl" : "en")}
      className="min-h-7 rounded-md border border-cracker-200 px-2 py-1 text-xs font-semibold text-cracker-600 transition hover:bg-cracker-50"
      aria-label="Switch language"
    >
      {locale === "en" ? "PL" : "EN"}
    </button>
  );
}
