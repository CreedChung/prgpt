// src/components/ApiSettings.tsx
import React, { useState, useEffect } from "react"
import type { ApiConfig, SystemLanguage } from "~types"
import { 
  getAllConfigs, 
  updateApiConfig, 
  addApiConfig, 
  deleteApiConfig, 
  setActiveConfig,
  createDefaultConfig 
} from "~lib/config"
import { getSystemLanguage, saveSystemLanguage } from "~lib/i18n"
import SystemLanguageSelector from "./SystemLanguageSelector"
import type { I18nTexts } from "~lib/i18n"

interface ApiSettingsProps {
  onClose: () => void
  onSave: () => void
  onLanguageChange: (lang: SystemLanguage) => void
  t: I18nTexts
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ onClose, onSave, onLanguageChange, t }) => {
  const [configs, setConfigs] = useState<ApiConfig[]>([])
  const [activeConfigId, setActiveConfigId] = useState<string | null>(null)
  const [currentConfig, setCurrentConfig] = useState<ApiConfig>(createDefaultConfig())
  const [systemLanguage, setSystemLanguage] = useState<SystemLanguage>("zh-CN")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    loadConfigs()
  }, [])

  const loadConfigs = async () => {
    try {
      const storage = await getAllConfigs()
      const savedLanguage = await getSystemLanguage()
      setConfigs(storage.configs)
      setActiveConfigId(storage.activeConfigId)
      
      const active = storage.configs.find(c => c.id === storage.activeConfigId)
      if (active) {
        setCurrentConfig(active)
      }
      
      setSystemLanguage(savedLanguage)
    } catch (err) {
      setError(t.configError)
    } finally {
      setLoading(false)
    }
  }

  const handleLanguageChange = async (lang: SystemLanguage) => {
    setSystemLanguage(lang)
    await saveSystemLanguage(lang)
    onLanguageChange(lang)
  }

  const handleConfigSwitch = async (configId: string) => {
    const config = configs.find(c => c.id === configId)
    if (config) {
      setCurrentConfig(config)
      setActiveConfigId(configId)
      await setActiveConfig(configId)
    }
  }

  const handleAddConfig = async () => {
    const newConfig = createDefaultConfig(t.newConfig)
    const added = await addApiConfig(newConfig)
    setConfigs([...configs, added])
    setCurrentConfig(added)
    setActiveConfigId(added.id)
    await setActiveConfig(added.id)
  }

  const handleDeleteConfig = async (configId: string) => {
    if (configs.length <= 1) {
      alert(t.cannotDeleteLast)
      return
    }
    
    if (!confirm(t.confirmDelete)) {
      return
    }

    await deleteApiConfig(configId)
    const newConfigs = configs.filter(c => c.id !== configId)
    setConfigs(newConfigs)
    
    if (activeConfigId === configId && newConfigs.length > 0) {
      const newActive = newConfigs[0]
      setCurrentConfig(newActive)
      setActiveConfigId(newActive.id)
    }
  }

  const handleSave = async () => {
    if (!currentConfig.baseURL || !currentConfig.apiKey || !currentConfig.model) {
      setError(t.configErrorDesc)
      return
    }

    setSaving(true)
    setError("")

    try {
      await updateApiConfig(currentConfig)
      await setActiveConfig(currentConfig.id)
      onSave()
      onClose()
    } catch (err) {
      setError(t.configError)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[var(--color-bg)] bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-[var(--color-bg)] brutal-border p-6 shadow-[8px_8px_0px_0px_var(--color-border)]">
          <div className="text-[var(--color-text)] font-black uppercase tracking-wider">{t.generating}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg)] brutal-border p-6 w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_var(--color-border)]">
        <div className="flex justify-between items-center mb-6 border-b-[3px] border-[var(--color-border)] pb-2">
          <h2 className="text-xl font-black uppercase text-[var(--color-text)]">{t.settingsTitle}</h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors border-[2px] border-transparent hover:border-[var(--color-border)] p-1">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[var(--color-accent)] border-[3px] border-[var(--color-border)] text-[var(--color-bg)] font-bold text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* System Language Selector */}
          <div className="pb-4 border-b-[3px] border-[var(--color-border)]">
            <SystemLanguageSelector
              selectedLanguage={systemLanguage}
              onLanguageChange={handleLanguageChange}
              t={t}
            />
          </div>

          {/* Config Selector */}
          <div className="pb-4 border-b-[3px] border-[var(--color-border)]">
            <label className="block text-sm font-black uppercase text-[var(--color-text)] mb-2">
              {t.activeConfig}
            </label>
            <div className="flex gap-2">
              <select
                value={activeConfigId || ''}
                onChange={(e) => handleConfigSwitch(e.target.value)}
                className="flex-1 px-3 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border-[3px] border-[var(--color-border)] focus:outline-none focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] font-mono">
                {configs.map((config) => (
                  <option key={config.id} value={config.id}>
                    {config.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddConfig}
                className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-text)] border-[3px] border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
                title={t.addNewConfig}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              {configs.length > 1 && (
                <button
                  onClick={() => handleDeleteConfig(currentConfig.id)}
                  className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-text)] border-[3px] border-[var(--color-border)] hover:bg-red-600 hover:text-white transition-colors"
                  title={t.deleteConfig}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* API Settings */}
          <div>
            <h3 className="text-lg font-black uppercase text-[var(--color-text)] mb-4">{t.apiSettings}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase">
                  {t.configName} <span className="text-[var(--color-accent)]">*</span>
                </label>
                <input
                  type="text"
                  value={currentConfig.name}
                  onChange={(e) =>
                    setCurrentConfig({ ...currentConfig, name: e.target.value })
                  }
                  placeholder={t.configNamePlaceholder}
                  className="brutal-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase">
                  {t.apiBaseUrl} <span className="text-[var(--color-accent)]">*</span>
                </label>
                <input
                  type="text"
                  value={currentConfig.baseURL}
                  onChange={(e) =>
                    setCurrentConfig({ ...currentConfig, baseURL: e.target.value })
                  }
                  placeholder="https://api.openai.com/v1"
                  className="brutal-input w-full"
                />
                <p className="mt-1 text-xs text-[var(--color-text)] font-mono">
                  OpenAI compatible API endpoint
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase">
                  {t.apiKey} <span className="text-[var(--color-accent)]">*</span>
                </label>
                <input
                  type="password"
                  value={currentConfig.apiKey}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, apiKey: e.target.value })}
                  placeholder="sk-..."
                  className="brutal-input w-full"
                />
                <p className="mt-1 text-xs text-[var(--color-text)] font-mono">
                  Your API key, stored securely locally
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase">
                  {t.modelName} <span className="text-[var(--color-accent)]">*</span>
                </label>
                <input
                  type="text"
                  value={currentConfig.model}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, model: e.target.value })}
                  placeholder="gpt-4o-mini"
                  className="brutal-input w-full"
                />
                <p className="mt-1 text-xs text-[var(--color-text)] font-mono">
                  Model name to use
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 brutal-btn bg-[var(--color-accent)] text-[var(--color-bg)] py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider">
            {saving ? t.generating : t.saveSettings}
          </button>
          <button
            onClick={onClose}
            className="flex-1 brutal-btn bg-[var(--color-bg)] text-[var(--color-text)] py-3 px-4 uppercase tracking-wider">
            {t.cancelSettings}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApiSettings