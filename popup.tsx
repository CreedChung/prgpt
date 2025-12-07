// src/popup/index.tsx
import React, { useEffect, useState } from "react"

import "./style.css"

import ApiSettings from "~components/ApiSettings"
import GithubPrContent from "~components/GithubPrContent"
import Header from "~components/header"
import LoadingOverlay from "~components/LoadingOverlay"
import NotPrPageWarning from "~components/NotPrPageWarning"
import { ThemeProvider } from "~components/ThemeContext"
import { getApiConfig, validateApiConfig } from "~lib/config"
import {
  fetchCommitMessagesFromPage,
  fetchUsernameFromPage,
  fillPrForm
} from "~lib/helpers"
import { generatePrWithOpenAI } from "~lib/openai-api"
import type { Language, SystemLanguage } from "~types"
import { getSystemLanguage, getTranslation } from "~lib/i18n"

interface PrDetails {
  title: string
  description: string
}

function IndexPopup(): JSX.Element {
  const [isPrPage, setIsPrPage] = useState<boolean>(false)
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [prDetails, setPrDetails] = useState<PrDetails>({
    title: "",
    description: ""
  })
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("zh-CN")
  const [systemLanguage, setSystemLanguage] = useState<SystemLanguage>("zh-CN")
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [configValid, setConfigValid] = useState<boolean>(false)

  // Get translations based on current system language
  const t = getTranslation(systemLanguage)

  useEffect(() => {
    checkCurrentTab()
    checkApiConfig()
    loadSystemLanguage()
  }, [])

  const loadSystemLanguage = async () => {
    const lang = await getSystemLanguage()
    setSystemLanguage(lang)
  }

  const checkApiConfig = async (): Promise<void> => {
    const config = await getApiConfig()
    setConfigValid(validateApiConfig(config))
  }

  const checkCurrentTab = (): void => {
    chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || ""
      setCurrentUrl(url)

      // Check if the current URL matches the GitHub PR pattern
      const isGithubPrUrl =
        /https:\/\/github\.com\/[\w-]+\/[\w-]+\/compare\/[\w-]+/.test(url)
      setIsPrPage(isGithubPrUrl)
    })
  }

  const generatePr = async (): Promise<void> => {
    // 检查配置
    const config = await getApiConfig()
    if (!validateApiConfig(config)) {
      setPrDetails({
        title: t.configError,
        description: t.configErrorDesc
      })
      setIsGenerated(true)
      return
    }

    setIsLoading(true)
    try {
      const commitMessages = await fetchCommitMessagesFromPage()
      const username = await fetchUsernameFromPage()

      if (commitMessages.length > 0) {
        await generateTitleDescription(
          commitMessages,
          currentUrl,
          username,
          selectedLanguage,
          config
        )
      } else {
        setPrDetails({
          title: t.generationFailed,
          description: t.noCommits
        })
      }
    } catch (error) {
      console.error("Error generating PR:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setPrDetails({
        title: t.generationFailed,
        description: `${t.generationFailed}: ${errorMessage}\n\n${t.configErrorDesc}`
      })
    } finally {
      setIsGenerated(true)
      setIsLoading(false)
    }
  }

  const generateTitleDescription = async (
    commitMessages: string[],
    currentUrl: string,
    username: string | undefined,
    language: Language,
    config: any
  ): Promise<void> => {
    try {
      const result = await generatePrWithOpenAI({
        commits: commitMessages,
        currentUrl,
        username,
        language,
        config
      })

      setPrDetails({
        title: result.title,
        description: result.description
      })

      fillPrForm(result.title, result.description)
    } catch (error) {
      console.error("Error generating title and description:", error)
      throw error
    }
  }

  return (
    <ThemeProvider>
      <div className="relative h-full w-full bg-[var(--color-bg)]">
        <div className="app-container min-h-[400px] !z-10">
          <Header />
          
          {/* Settings Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 brutal-btn"
              title={t.apiSettings}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={3}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={3}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <div className="">
            {!isPrPage ? (
              <NotPrPageWarning t={t} />
            ) : (
              <GithubPrContent
                isGenerated={isGenerated}
                isLoading={isLoading}
                prDetails={prDetails}
                onGenerate={generatePr}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                t={t}
              />
            )}
          </div>

          {isLoading && <LoadingOverlay />}
        </div>
        
        {showSettings && (
          <ApiSettings
            onClose={() => setShowSettings(false)}
            onSave={() => {
              checkApiConfig()
            }}
            onLanguageChange={(lang) => setSystemLanguage(lang)}
            t={t}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup

