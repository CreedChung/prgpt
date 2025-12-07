// src/components/GenerateButton.tsx
import React from "react"
import type { I18nTexts } from "~lib/i18n"

interface GenerateButtonProps {
  onClick: () => void
  isLoading: boolean
  t: I18nTexts
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  isLoading,
  t
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="brutal-btn !z-50 bg-[var(--color-accent)] text-[var(--color-bg)] 
                font-black text-lg py-3 px-6 
                flex items-center justify-center w-48
                disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
      aria-label="Generate PR content">
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-[var(--color-bg)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {t.generating}
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            className="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"></path>
          </svg>
          {t.generateButton}
        </span>
      )}
    </button>
  )
}

export default GenerateButton

