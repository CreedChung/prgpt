// lib/config.ts
import type { ApiConfig, ApiConfigStorage } from "~types"

const STORAGE_KEY = "prgpt_api_configs"

// Generate unique ID
const generateId = (): string => {
  return `config_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Create default config
export const createDefaultConfig = (name: string = "默认配置"): ApiConfig => {
  return {
    id: generateId(),
    name,
    baseURL: "https://api.openai.com/v1",
    apiKey: "",
    model: "gpt-4o-mini"
  }
}

// Get all configs
export const getAllConfigs = async (): Promise<ApiConfigStorage> => {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY)
    if (result[STORAGE_KEY]) {
      return result[STORAGE_KEY]
    }
    // Return default storage with one default config
    const defaultConfig = createDefaultConfig()
    return {
      configs: [defaultConfig],
      activeConfigId: defaultConfig.id
    }
  } catch (error) {
    console.error("Error getting API configs:", error)
    const defaultConfig = createDefaultConfig()
    return {
      configs: [defaultConfig],
      activeConfigId: defaultConfig.id
    }
  }
}

// Get active config
export const getApiConfig = async (): Promise<ApiConfig> => {
  const storage = await getAllConfigs()
  const activeConfig = storage.configs.find(c => c.id === storage.activeConfigId)
  return activeConfig || storage.configs[0] || createDefaultConfig()
}

// Save all configs
export const saveAllConfigs = async (storage: ApiConfigStorage): Promise<void> => {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: storage })
  } catch (error) {
    console.error("Error saving API configs:", error)
    throw error
  }
}

// Add new config
export const addApiConfig = async (config: Omit<ApiConfig, 'id'>): Promise<ApiConfig> => {
  const storage = await getAllConfigs()
  const newConfig: ApiConfig = {
    ...config,
    id: generateId()
  }
  storage.configs.push(newConfig)
  await saveAllConfigs(storage)
  return newConfig
}

// Update config
export const updateApiConfig = async (config: ApiConfig): Promise<void> => {
  const storage = await getAllConfigs()
  const index = storage.configs.findIndex(c => c.id === config.id)
  if (index !== -1) {
    storage.configs[index] = config
    await saveAllConfigs(storage)
  }
}

// Delete config
export const deleteApiConfig = async (configId: string): Promise<void> => {
  const storage = await getAllConfigs()
  storage.configs = storage.configs.filter(c => c.id !== configId)

  // If deleted config was active, set first config as active
  if (storage.activeConfigId === configId && storage.configs.length > 0) {
    storage.activeConfigId = storage.configs[0].id
  }

  await saveAllConfigs(storage)
}

// Set active config
export const setActiveConfig = async (configId: string): Promise<void> => {
  const storage = await getAllConfigs()
  if (storage.configs.find(c => c.id === configId)) {
    storage.activeConfigId = configId
    await saveAllConfigs(storage)
  }
}

// Validate config
export const validateApiConfig = (config: ApiConfig): boolean => {
  return !!(config.baseURL && config.apiKey && config.model)
}

// Legacy support - save single config (deprecated)
export const saveApiConfig = async (config: ApiConfig): Promise<void> => {
  await updateApiConfig(config)
}