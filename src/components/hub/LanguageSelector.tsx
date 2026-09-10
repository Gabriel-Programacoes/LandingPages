"use client";

import { motion } from "framer-motion";
import { GlobeHemisphereWestIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/types";

type LanguageSelectorProps = {
  className?: string;
  variant?: "header" | "compact";
  showIcon?: boolean;
};

const OPTIONS: { locale: Locale; label: string; fullLabel: string }[] = [
  { locale: "en", label: "EN", fullLabel: "English" },
  { locale: "pt-BR", label: "PT-BR", fullLabel: "Português (Brasil)" },
];

export default function LanguageSelector({
  className = "",
  variant = "header",
  showIcon = true,
}: LanguageSelectorProps) {
  const { locale, setLocale } = useLanguage();

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 ${className}`}
        role="group"
        aria-label="Selecionar idioma / Select language"
      >
        {OPTIONS.map((opt) => {
          const isActive = locale === opt.locale;
          return (
            <button
              key={opt.locale}
              type="button"
              onClick={() => setLocale(opt.locale)}
              aria-pressed={isActive}
              title={opt.fullLabel}
              className={`relative flex-1 py-1 px-2 text-center font-[family-name:var(--font-geist-mono)] text-[9px] font-bold uppercase tracking-[0.14em] transition-colors ${
                isActive ? "text-white" : "text-white/36 hover:text-white/70"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-lang-compact"
                  className="absolute inset-0 rounded-lg bg-white/12 border border-white/14 shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-white/[0.10] bg-black/40 p-0.5 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)] ${className}`}
      role="group"
      aria-label="Selecionar idioma / Select language"
    >
      {showIcon && (
        <span className="pl-2 pr-1 text-white/30" aria-hidden>
          <GlobeHemisphereWestIcon className="size-3.5" weight="duotone" />
        </span>
      )}
      <div className="flex items-center gap-0.5">
        {OPTIONS.map((opt) => {
          const isActive = locale === opt.locale;
          return (
            <button
              key={opt.locale}
              type="button"
              onClick={() => setLocale(opt.locale)}
              aria-pressed={isActive}
              title={opt.fullLabel}
              className={`relative rounded-md px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                isActive ? "text-white" : "text-white/40 hover:text-white/75"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-lang-pill"
                  className="absolute inset-0 rounded-md bg-white/[0.14] border border-white/20 shadow-[0_0_14px_rgba(255,255,255,0.08)]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
