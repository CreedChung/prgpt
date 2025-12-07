// PR Language type (for PR generation)
export type Language = 'zh-CN' | 'zh-TW' | 'en' | 'ja' | 'ko'

// System UI Language type (for interface display)
export type SystemLanguage = 'zh-CN' | 'zh-TW' | 'en' | 'ja' | 'ko'

// API Configuration interface
export interface ApiConfig {
  id: string
  name: string
  baseURL: string
  apiKey: string
  model: string
}

// Multiple API Configurations storage
export interface ApiConfigStorage {
  configs: ApiConfig[]
  activeConfigId: string | null
}

// PR Details interface
export interface PrDetails {
  title: string
  description: string
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface GeneratePrResponse {
  title: string
  description: string
}

// Chrome API types extension
declare global {
  interface Window {
    fs?: any
  }

  namespace chrome {
    namespace scripting {
      function executeScript(
        options: {
          target: { tabId: number }
          func: (...args: any[]) => any
          args?: any[]
        },
        callback?: (results: { result: any }[]) => void
      ): void
    }
  }
}
