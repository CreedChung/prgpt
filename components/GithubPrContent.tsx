// src/components/GithubPrContent.tsx
import React from "react"

// import GenerateButton from "./GenerateButton"
import GenerateButton from "./GenerateButton"
import LanguageSelector from "./LanguageSelector"
import PrResult from "./PrResult"
import StarOnGithubBtn from "./StarOnGithubBtn"
import type { Language } from "~types"
import type { I18nTexts } from "~lib/i18n"

interface PrDetails {
  title: string
  description: string
}

interface GithubPrContentProps {
  isGenerated: boolean
  isLoading: boolean
  prDetails: PrDetails
  onGenerate: () => void
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
  t: I18nTexts
}

const GithubPrContent: React.FC<GithubPrContentProps> = ({
  isGenerated,
  isLoading,
  prDetails,
  onGenerate,
  selectedLanguage,
  onLanguageChange,
  t
}) => {
  return (
    <div className="flex flex-col h-full !z-10">
      <div className="mb-6 border-b-[3px] border-[var(--color-border)]">
        <h3 className="text-xl font-black mb-2 px-5 pt-3 uppercase tracking-tighter">
          GitHub Pull Request
        </h3>
        <p className="text-sm font-medium px-5 pb-3 font-mono">
          {t.appSubtitle}
        </p>
      </div>

      {!isGenerated ? (
        <div className="flex flex-col py-4">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            t={t}
          />
          <div className="mb-6 text-center px-5">
            <div className="brutal-border p-4 mb-4 bg-[var(--color-secondary)]">
              <svg
                className="w-16 h-16 mx-auto mb-3 text-[var(--color-text)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="3"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>

              <p className="text-sm font-bold uppercase">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="mb-2">
              <StarOnGithubBtn />
            </div>
            <GenerateButton onClick={onGenerate} isLoading={isLoading} t={t} />
          </div>
        </div>
      ) : (
        <PrResult t={t} />
      )}
    </div>
  )
}

export default GithubPrContent

