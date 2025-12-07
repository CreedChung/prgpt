// lib/i18n.ts - 国际化配置
import type { SystemLanguage } from "~types"

export interface I18nTexts {
    // Header
    appTitle: string
    appSubtitle: string

    // Settings
    settingsTitle: string
    apiSettings: string
    systemLanguage: string
    selectSystemLanguage: string

    // PR Generation
    selectPrLanguage: string
    generateButton: string
    fillButton: string
    regenerateButton: string

    // Warnings & Errors
    notPrPage: string
    notPrPageDesc: string
    configError: string
    configErrorDesc: string
    generationFailed: string
    noCommits: string

    // API Settings
    apiBaseUrl: string
    apiKey: string
    modelName: string
    saveSettings: string
    cancelSettings: string

    // Config Management
    configName: string
    configNamePlaceholder: string
    addNewConfig: string
    deleteConfig: string
    switchConfig: string
    activeConfig: string
    confirmDelete: string
    cannotDeleteLast: string
    newConfig: string

    // Loading
    generating: string

    // Languages
    languages: {
        'zh-CN': string
        'zh-TW': string
        'en': string
        'ja': string
        'ko': string
    }
}

export const translations: Record<SystemLanguage, I18nTexts> = {
    'zh-CN': {
        appTitle: "PR GPT",
        appSubtitle: "AI 驱动的 PR 生成器",

        settingsTitle: "设置",
        apiSettings: "API 设置",
        systemLanguage: "系统语言",
        selectSystemLanguage: "选择系统语言",

        selectPrLanguage: "选择 PR 语言",
        generateButton: "生成 PR",
        fillButton: "填充到表单",
        regenerateButton: "重新生成",

        notPrPage: "这不是 GitHub PR 页面",
        notPrPageDesc: "请在 GitHub PR 创建页面使用此扩展",
        configError: "配置错误",
        configErrorDesc: "请先配置 API 设置（点击右上角设置按钮）",
        generationFailed: "生成 PR 失败",
        noCommits: "未找到提交信息或无法访问页面内容",

        apiBaseUrl: "API 基础 URL",
        apiKey: "API 密钥",
        modelName: "模型名称",
        saveSettings: "保存设置",
        cancelSettings: "取消",

        configName: "配置名称",
        configNamePlaceholder: "例如：OpenAI、智谱AI",
        addNewConfig: "添加新配置",
        deleteConfig: "删除配置",
        switchConfig: "切换配置",
        activeConfig: "当前配置",
        confirmDelete: "确定要删除此配置吗？",
        cannotDeleteLast: "无法删除最后一个配置",
        newConfig: "新配置",

        generating: "正在生成...",

        languages: {
            'zh-CN': '简体中文',
            'zh-TW': '繁體中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어'
        }
    },

    'zh-TW': {
        appTitle: "PR GPT",
        appSubtitle: "AI 驅動的 PR 生成器",

        settingsTitle: "設定",
        apiSettings: "API 設定",
        systemLanguage: "系統語言",
        selectSystemLanguage: "選擇系統語言",

        selectPrLanguage: "選擇 PR 語言",
        generateButton: "生成 PR",
        fillButton: "填充到表單",
        regenerateButton: "重新生成",

        notPrPage: "這不是 GitHub PR 頁面",
        notPrPageDesc: "請在 GitHub PR 創建頁面使用此擴展",
        configError: "配置錯誤",
        configErrorDesc: "請先配置 API 設定（點擊右上角設定按鈕）",
        generationFailed: "生成 PR 失敗",
        noCommits: "未找到提交信息或無法訪問頁面內容",

        apiBaseUrl: "API 基礎 URL",
        apiKey: "API 密鑰",
        modelName: "模型名稱",
        saveSettings: "保存設定",
        cancelSettings: "取消",

        configName: "配置名稱",
        configNamePlaceholder: "例如：OpenAI、智譜AI",
        addNewConfig: "添加新配置",
        deleteConfig: "刪除配置",
        switchConfig: "切換配置",
        activeConfig: "當前配置",
        confirmDelete: "確定要刪除此配置嗎？",
        cannotDeleteLast: "無法刪除最後一個配置",
        newConfig: "新配置",

        generating: "正在生成...",

        languages: {
            'zh-CN': '简体中文',
            'zh-TW': '繁體中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어'
        }
    },

    'en': {
        appTitle: "PR GPT",
        appSubtitle: "AI-Powered PR Generator",

        settingsTitle: "Settings",
        apiSettings: "API Settings",
        systemLanguage: "System Language",
        selectSystemLanguage: "Select System Language",

        selectPrLanguage: "Select PR Language",
        generateButton: "Generate PR",
        fillButton: "Fill Form",
        regenerateButton: "Regenerate",

        notPrPage: "Not a GitHub PR Page",
        notPrPageDesc: "Please use this extension on a GitHub PR creation page",
        configError: "Configuration Error",
        configErrorDesc: "Please configure API settings first (click settings button in top-right corner)",
        generationFailed: "PR Generation Failed",
        noCommits: "No commit messages found or unable to access page content",

        apiBaseUrl: "API Base URL",
        apiKey: "API Key",
        modelName: "Model Name",
        saveSettings: "Save Settings",
        cancelSettings: "Cancel",

        configName: "Config Name",
        configNamePlaceholder: "e.g., OpenAI, Zhipu AI",
        addNewConfig: "Add New Config",
        deleteConfig: "Delete Config",
        switchConfig: "Switch Config",
        activeConfig: "Active Config",
        confirmDelete: "Are you sure you want to delete this configuration?",
        cannotDeleteLast: "Cannot delete the last configuration",
        newConfig: "New Config",

        generating: "Generating...",

        languages: {
            'zh-CN': '简体中文',
            'zh-TW': '繁體中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어'
        }
    },

    'ja': {
        appTitle: "PR GPT",
        appSubtitle: "AI駆動のPRジェネレーター",

        settingsTitle: "設定",
        apiSettings: "API設定",
        systemLanguage: "システム言語",
        selectSystemLanguage: "システム言語を選択",

        selectPrLanguage: "PR言語を選択",
        generateButton: "PRを生成",
        fillButton: "フォームに入力",
        regenerateButton: "再生成",

        notPrPage: "GitHub PRページではありません",
        notPrPageDesc: "この拡張機能はGitHub PR作成ページでご使用ください",
        configError: "設定エラー",
        configErrorDesc: "まずAPI設定を行ってください（右上の設定ボタンをクリック）",
        generationFailed: "PR生成に失敗しました",
        noCommits: "コミット情報が見つからないか、ページコンテンツにアクセスできません",

        apiBaseUrl: "APIベースURL",
        apiKey: "APIキー",
        modelName: "モデル名",
        saveSettings: "設定を保存",
        cancelSettings: "キャンセル",

        configName: "設定名",
        configNamePlaceholder: "例：OpenAI、Zhipu AI",
        addNewConfig: "新しい設定を追加",
        deleteConfig: "設定を削除",
        switchConfig: "設定を切り替え",
        activeConfig: "現在の設定",
        confirmDelete: "この設定を削除してもよろしいですか？",
        cannotDeleteLast: "最後の設定は削除できません",
        newConfig: "新しい設定",

        generating: "生成中...",

        languages: {
            'zh-CN': '简体中文',
            'zh-TW': '繁體中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어'
        }
    },

    'ko': {
        appTitle: "PR GPT",
        appSubtitle: "AI 기반 PR 생성기",

        settingsTitle: "설정",
        apiSettings: "API 설정",
        systemLanguage: "시스템 언어",
        selectSystemLanguage: "시스템 언어 선택",

        selectPrLanguage: "PR 언어 선택",
        generateButton: "PR 생성",
        fillButton: "양식 채우기",
        regenerateButton: "다시 생성",

        notPrPage: "GitHub PR 페이지가 아닙니다",
        notPrPageDesc: "GitHub PR 생성 페이지에서 이 확장 프로그램을 사용하세요",
        configError: "구성 오류",
        configErrorDesc: "먼저 API 설정을 구성하세요 (오른쪽 상단의 설정 버튼 클릭)",
        generationFailed: "PR 생성 실패",
        noCommits: "커밋 메시지를 찾을 수 없거나 페이지 콘텐츠에 액세스할 수 없습니다",

        apiBaseUrl: "API 기본 URL",
        apiKey: "API 키",
        modelName: "모델 이름",
        saveSettings: "설정 저장",
        cancelSettings: "취소",

        configName: "설정 이름",
        configNamePlaceholder: "예: OpenAI, Zhipu AI",
        addNewConfig: "새 설정 추가",
        deleteConfig: "설정 삭제",
        switchConfig: "설정 전환",
        activeConfig: "현재 설정",
        confirmDelete: "이 설정을 삭제하시겠습니까?",
        cannotDeleteLast: "마지막 설정은 삭제할 수 없습니다",
        newConfig: "새 설정",

        generating: "생성 중...",

        languages: {
            'zh-CN': '简体中文',
            'zh-TW': '繁體中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어'
        }
    }
}

// 获取当前系统语言的翻译
export const getTranslation = (lang: SystemLanguage): I18nTexts => {
    return translations[lang] || translations['zh-CN']
}

// 保存系统语言到 localStorage
export const saveSystemLanguage = async (lang: SystemLanguage): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({ systemLanguage: lang })
    }
}

// 从 localStorage 获取系统语言
export const getSystemLanguage = async (): Promise<SystemLanguage> => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get('systemLanguage')
        return result.systemLanguage || 'zh-CN'
    }
    return 'zh-CN'
}
