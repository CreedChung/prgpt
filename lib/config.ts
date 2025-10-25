// lib/config.ts
import type { ApiConfig } from "~types"

const DEFAULT_CONFIG: ApiConfig = {
  baseURL: "https://api.openai.com/v1",
  apiKey: "",
  model: "gpt-4o-mini"
}

const STORAGE_KEY = "prgpt_api_config"

export const getApiConfig = async (): Promise<ApiConfig> => {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY)
    if (result[STORAGE_KEY]) {
      return { ...DEFAULT_CONFIG, ...result[STORAGE_KEY] }
    }
    return DEFAULT_CONFIG
  } catch (error) {
    console.error("Error getting API config:", error)
    return DEFAULT_CONFIG
  }
}

export const saveApiConfig = async (config: ApiConfig): Promise<void> => {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: config })
  } catch (error) {
    console.error("Error saving API config:", error)
    throw error
  }
}

export const validateApiConfig = (config: ApiConfig): boolean => {
  return !!(config.baseURL && config.apiKey && config.model)
}