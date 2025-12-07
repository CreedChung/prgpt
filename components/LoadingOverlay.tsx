// src/components/LoadingOverlay.tsx
import React from "react"

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg)] brutal-border p-8 shadow-[8px_8px_0px_0px_var(--color-border)] flex flex-col items-center max-w-sm w-full mx-4">
        <div className="mb-6">
          <div className="w-16 h-16 border-[4px] border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin"></div>
        </div>

        <div className="text-center w-full">
          <h3 className="text-xl font-black uppercase text-[var(--color-text)] mb-2 tracking-wider">
            Generating...
          </h3>
          <p className="text-sm font-mono text-[var(--color-text)] mb-6 border-b-[2px] border-[var(--color-border)] pb-2 inline-block">
            ANALYZING COMMITS
          </p>
        </div>

        <div className="w-full border-[3px] border-[var(--color-border)] h-6 p-[2px]">
          <div className="bg-[var(--color-accent)] h-full w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
