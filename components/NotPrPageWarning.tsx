// src/components/NotPrPageWarning.tsx
import React from "react"
import type { I18nTexts } from "~lib/i18n"
import StarOnGithubBtn from "./StarOnGithubBtn"

interface NotPrPageWarningProps {
  t: I18nTexts
}

const NotPrPageWarning: React.FC<NotPrPageWarningProps> = ({ t }) => {
  return (
    <div className="flex flex-col items-center !z-10 justify-center py-8 text-center">
      <div className="bg-[var(--color-bg)] brutal-border p-6 mb-4 text-[var(--color-text)] max-w-md shadow-[8px_8px_0px_0px_var(--color-border)]">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-[var(--color-text)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="3"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h3 className="text-xl font-black uppercase mb-2">
          {t.notPrPage}
        </h3>
        <p className="text-sm font-medium mb-4">
          {t.notPrPageDesc}
        </p>
        <div className="mt-4 flex items-center justify-center">
          <StarOnGithubBtn />
        </div>
      </div>

      <div className="mt-8 max-w-md w-full px-4">
        <h4 className="font-black text-lg mb-4 uppercase border-b-[3px] border-[var(--color-border)] inline-block">How to use PrGPT:</h4>
        <ol className="text-left text-sm space-y-3 font-mono">
          <li className="flex items-center">
            <span className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold px-2 py-1 mr-2">1</span>
            Navigate to your GitHub repository
          </li>
          <li className="flex items-center">
            <span className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold px-2 py-1 mr-2">2</span>
            Click on "Pull requests" tab
          </li>
          <li className="flex items-center">
            <span className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold px-2 py-1 mr-2">3</span>
            Click "New pull request"
          </li>
          <li className="flex items-center">
            <span className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold px-2 py-1 mr-2">4</span>
            Select branches to compare
          </li>
          <li className="flex items-center">
            <span className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold px-2 py-1 mr-2">5</span>
            Open PrGPT extension
          </li>
        </ol>
      </div>
    </div>
  )
}

export default NotPrPageWarning

