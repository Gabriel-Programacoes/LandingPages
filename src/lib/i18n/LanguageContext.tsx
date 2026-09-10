"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { Dictionary, Locale, ProfileData, ProjectData } from "./types";
import { getDictionary, getLocalizedProfile, getLocalizedProjects } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
  profile: ProfileData;
  projects: ProjectData[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio_lang";
const LANG_CHANGE_EVENT = "portfolio_lang_change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getClientLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "en";

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get("lang")?.toLowerCase();

    if (queryLang) {
      if (queryLang === "pt" || queryLang === "pt-br" || queryLang === "pt_br") {
        return "pt-BR";
      }
      if (queryLang === "en" || queryLang === "en-us") {
        return "en";
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "pt-BR") {
      return saved;
    }

    if (navigator.language.toLowerCase().startsWith("pt")) {
      return "pt-BR";
    }
  } catch {
    // fallback
  }

  return "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useSyncExternalStore(
    subscribe,
    getClientLocaleSnapshot,
    getServerLocaleSnapshot
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    } catch {
      // Ignore errors
    }
  }, []);

  const toggleLocale = useCallback(() => {
    try {
      const current = getClientLocaleSnapshot();
      const next = current === "en" ? "pt-BR" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    } catch {
      // Ignore errors
    }
  }, []);

  const t = useMemo(() => getDictionary(locale), [locale]);
  const profile = useMemo(() => getLocalizedProfile(locale), [locale]);
  const projects = useMemo(() => getLocalizedProjects(locale), [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      profile,
      projects,
    }),
    [locale, setLocale, toggleLocale, t, profile, projects]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    const fallbackLocale: Locale = "en";
    return {
      locale: fallbackLocale,
      setLocale: () => {},
      toggleLocale: () => {},
      t: getDictionary(fallbackLocale),
      profile: getLocalizedProfile(fallbackLocale),
      projects: getLocalizedProjects(fallbackLocale),
    };
  }
  return context;
}
