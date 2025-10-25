// Language type
export type Language = 'zh-CN' | 'en' | 'ja'

// API Configuration interface
export interface ApiConfig {
  baseURL: string
  apiKey: string
  model: string
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
