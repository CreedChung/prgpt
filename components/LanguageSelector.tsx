// src/components/LanguageSelector.tsx
import React from "react"
import type { Language } from "~types"

interface LanguageSelectorProps {
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  const languages: { value: Language; label: string; flag: string }[] = [
    { value: "zh-CN", label: "中文", flag: "🇨🇳" },
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "ja", label: "日本語", flag: "🇯🇵" }
  ]

  return (
    <div className="flex flex-col gap-2 mb-4 px-5">
      <label className="text-sm font-medium text-gray-300">
        选择 PR 语言 / Select PR Language
      </label>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => onLanguageChange(lang.value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200 flex-1
              ${
                selectedLanguage === lang.value
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
            `}
            aria-label={`Select ${lang.label}`}>
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector