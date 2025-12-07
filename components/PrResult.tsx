import React from "react"
import type { I18nTexts } from "~lib/i18n"

interface PrResultProps {
  t: I18nTexts
}

const PrResult: React.FC<PrResultProps> = ({ t }) => {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] brutal-border shadow-[8px_8px_0px_0px_var(--color-border)] p-6 mx-5 my-6 text-center">
      <h2 className="text-xl font-black uppercase mb-3 text-[var(--color-text)] border-b-[3px] border-[var(--color-border)] pb-2 inline-block">
        Pull Request Created 🎉
      </h2>
      <p className="text-sm font-medium mb-6 font-mono">
        Your pull request has been successfully generated and placed on GitHub.
        <br />
        You can now close this extension.
      </p>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => window.close()}
          className="brutal-btn bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-2 text-sm font-black uppercase tracking-wider">
          Close Extension
        </button>
      </div>

      <p className="text-xs font-bold mt-6 uppercase">
        Powered by <span className="bg-[var(--color-text)] text-[var(--color-bg)] px-1">PrGPT</span>{" "}
        🚀
      </p>
    </div>
  )
}

export default PrResult

