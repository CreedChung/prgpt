// lib/openai-api.ts
import type { ApiConfig, Language } from "~types"

interface GeneratePrParams {
  commits: string[]
  currentUrl: string
  username?: string
  language: Language
  config: ApiConfig
}

const languagePrompts: Record<Language, string> = {
  "zh-CN": "请使用简体中文",
  "zh-TW": "請使用繁體中文",
  "en": "Please use English",
  "ja": "日本語を使用してください",
  "ko": "한국어를 사용해주세요"
}

export const generatePrWithOpenAI = async ({
  commits,
  currentUrl,
  username,
  language,
  config
}: GeneratePrParams): Promise<{ title: string; description: string }> => {
  const languageInstruction = languagePrompts[language]

  const systemPrompt = `你是一个专业的 GitHub PR 助手。${languageInstruction}生成清晰、专业的 PR 标题和描述。

要求：
1. 标题要简洁明了，总结主要改动
2. 描述要包含：改动概述、主要变更点、影响范围
3. 使用 Markdown 格式
4. 保持专业和技术性`

  const userPrompt = `基于以下 commit 信息生成 PR：

Commits:
${commits.map((c, i) => `${i + 1}. ${c}`).join("\n")}

${username ? `作者: ${username}` : ""}
${currentUrl ? `URL: ${currentUrl}` : ""}

请返回 JSON 格式：
{
  "title": "PR标题",
  "description": "PR描述（Markdown格式）"
}`

  try {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API 请求失败: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error("API 返回内容为空")
    }

    const result = JSON.parse(content)

    return {
      title: result.title || "PR Title",
      description: result.description || "No description provided"
    }
  } catch (error) {
    console.error("OpenAI API 调用失败:", error)
    throw error
  }
}