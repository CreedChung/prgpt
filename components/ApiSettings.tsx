// src/components/ApiSettings.tsx
import React, { useState, useEffect } from "react"
import type { ApiConfig } from "~types"
import { getApiConfig, saveApiConfig, validateApiConfig } from "~lib/config"

interface ApiSettingsProps {
  onClose: () => void
  onSave: () => void
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ onClose, onSave }) => {
  const [config, setConfig] = useState<ApiConfig>({
    baseURL: "",
    apiKey: "",
    model: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const savedConfig = await getApiConfig()
      setConfig(savedConfig)
    } catch (err) {
      setError("加载配置失败")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!validateApiConfig(config)) {
      setError("请填写所有必填项")
      return
    }

    setSaving(true)
    setError("")

    try {
      await saveApiConfig(config)
      onSave()
      onClose()
    } catch (err) {
      setError("保存配置失败")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="text-white">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-[500px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">API 配置</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Base URL <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={config.baseURL}
              onChange={(e) =>
                setConfig({ ...config, baseURL: e.target.value })
              }
              placeholder="https://api.openai.com/v1"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              OpenAI 兼容的 API 地址
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API Key <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              placeholder="sk-..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              你的 API 密钥，将安全存储在本地
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              placeholder="gpt-4o-mini"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              要使用的模型名称
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? "保存中..." : "保存配置"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
            取消
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApiSettings