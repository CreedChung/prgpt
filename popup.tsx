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
import type { Language } from "~types"

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
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [configValid, setConfigValid] = useState<boolean>(false)

  useEffect(() => {
    checkCurrentTab()
    checkApiConfig()
  }, [])

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
        title: "配置错误",
        description: "请先配置 API 设置（点击右上角设置按钮）"
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
          title: "无法生成标题",
          description: "未找到提交信息或无法访问页面内容"
        })
      }
    } catch (error) {
      console.error("Error generating PR:", error)
      const errorMessage = error instanceof Error ? error.message : "未知错误"
      setPrDetails({
        title: "生成 PR 失败",
        description: `发生错误: ${errorMessage}\n\n请检查你的 API 配置是否正确。`
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
      <div className="relative h-full w-full bg-[#000000] ">
        <div className="app-container min-h-[400px] !z-10">
          <Header />
          
          {/* Settings Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              title="API 设置">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <div className="">
            {!isPrPage ? (
              <NotPrPageWarning />
            ) : (
              <GithubPrContent
                isGenerated={isGenerated}
                isLoading={isLoading}
                prDetails={prDetails}
                onGenerate={generatePr}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            )}
          </div>

          {isLoading && <LoadingOverlay />}
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:6rem_4rem] "></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0)_41%,_rgba(12,2,40,1)_95%)]"></div>
        
        {showSettings && (
          <ApiSettings
            onClose={() => setShowSettings(false)}
            onSave={() => {
              checkApiConfig()
            }}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
