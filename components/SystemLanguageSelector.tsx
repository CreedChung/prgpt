// src/components/SystemLanguageSelector.tsx
import React from "react"
import type { SystemLanguage } from "~types"
import type { I18nTexts } from "~lib/i18n"

interface SystemLanguageSelectorProps {
  selectedLanguage: SystemLanguage
  onLanguageChange: (language: SystemLanguage) => void
  t: I18nTexts
}

const SystemLanguageSelector: React.FC<SystemLanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  t
}) => {
  const languages: { value: SystemLanguage; label: string; flag: string }[] = [
    { value: "zh-CN", label: t.languages['zh-CN'], flag: "🇨🇳" },
    { value: "zh-TW", label: t.languages['zh-TW'], flag: "🇹🇼" },
    { value: "en", label: t.languages['en'], flag: "🇺🇸" },
    { value: "ja", label: t.languages['ja'], flag: "🇯🇵" },
    { value: "ko", label: t.languages['ko'], flag: "🇰🇷" }
  ]

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-black text-[var(--color-text)] uppercase tracking-wider">
        {t.selectSystemLanguage}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => onLanguageChange(lang.value)}
            className={`
              flex items-center gap-2 px-3 py-2 font-bold text-sm
              border-[2px] border-[var(--color-border)]
              transition-all duration-100
              ${
                selectedLanguage === lang.value
                  ? "bg-[var(--color-text)] text-[var(--color-bg)] shadow-[4px_4px_0px_0px_var(--color-border)] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
              }
            `}
            aria-label={`Select ${lang.label}`}>
            <span className="text-lg">{lang.flag}</span>
            <span className="text-xs">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SystemLanguageSelector
