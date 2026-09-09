import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Server, 
  Key, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DocsViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
}

export const DocsView: React.FC<DocsViewProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const { language } = useLanguage();
  const [activeLang, setActiveLang] = useState<'python' | 'node' | 'curl' | 'go'>('python');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const BASE_URL = 'https://api.foyton.com/v1';
  const SAMPLE_API_KEY = 'sk-foyton-7a91bf428e034ac1a9e7d23';

  const copyText = (text: string, isUrl = false) => {
    navigator.clipboard.writeText(text);
    if (isUrl) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const codeSnippets = {
    python: `# 1. 安装依赖: pip install openai
from openai import OpenAI

# 2. 初始化客户端 (指定 Foyton API 统一基地址与你的 API Key)
client = OpenAI(
    base_url="${BASE_URL}",
    api_key="${SAMPLE_API_KEY}"  # 替换为你的真实 Key
)

# 3. 创建对话补全 (支持 claude-3-7-sonnet-latest, gpt-4o, deepseek-r1 等)
response = client.chat.completions.create(
    model="claude-3-7-sonnet-latest",
    messages=[
        {"role": "system", "content": "你是一位专业高效的全栈架构师助手。"},
        {"role": "user", "content": "请用简短三句话介绍分布式高可用网关的设计关键要素。"}
    ],
    temperature=0.7,
    stream=False
)

print(response.choices[0].message.content)`,

    node: `// 1. 安装依赖: npm install openai
import OpenAI from 'openai';

// 2. 初始化客户端
const openai = new OpenAI({
  baseURL: '${BASE_URL}',
  apiKey: '${SAMPLE_API_KEY}', // 替换为你的真实 Key
});

async function main() {
  // 3. 流式调用示例 (Stream: true)
  const stream = await openai.chat.completions.create({
    model: 'deepseek-r1',
    messages: [{ role: 'user', content: '写一个带超时控制的 TypeScript fetch 函数' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();`,

    curl: `# cURL 快速终端测试
curl ${BASE_URL}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${SAMPLE_API_KEY}" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Hello Foyton API!"
      }
    ],
    "temperature": 0.7
  }'`,

    go: `// 1. 安装依赖: go get github.com/sashabaranov/go-openai
package main

import (
	"context"
	"fmt"
	"github.com/sashabaranov/go-openai"
)

func main() {
	config := openai.DefaultConfig("${SAMPLE_API_KEY}")
	config.BaseURL = "${BASE_URL}" // 设置统一网关地址

	client := openai.NewClientWithConfig(config)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: "claude-3-7-sonnet-latest",
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "你好！",
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\\n", err)
		return
	}

	fmt.Println(resp.Choices[0].Message.Content)
}`
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-[0_4px_32px_rgba(0,0,0,0.03)] mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Foyton API · 极速接入指南</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3 font-sans">
          {language === 'zh' ? '接入文档与开发者指引' : 'Integration Documentation'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-3xl leading-relaxed">
          {language === 'zh'
            ? 'Foyton API 严格遵循 OpenAI 标准协议规范。无论您使用 Python、Node.js、Go 还是原生 HTTP 请求，仅需修改 base_url 与 API Key，即可实现 0 成本无缝迁移与全系大模型中转。'
            : 'Foyton API adheres strictly to the OpenAI specification standard. Seamlessly integrate Claude, DeepSeek, GPT-4o, and Gemini with zero migration friction.'}
        </p>

        {/* Global Connection Specs */}
        <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-neutral-500" />
                统一 API 网关地址 (Base URL)
              </span>
              <button
                onClick={() => copyText(BASE_URL, true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? '已复制' : '复制'}</span>
              </button>
            </div>
            <code className="text-xs font-mono font-bold text-neutral-900 bg-white px-3 py-2 rounded-xl border border-neutral-200 block truncate">
              {BASE_URL}
            </code>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-neutral-500" />
                身份鉴权请求头 (Headers)
              </span>
              <button
                onClick={() => onNavigate('console-apikeys')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>前往控制台生成 Key</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <code className="text-xs font-mono font-bold text-neutral-900 bg-white px-3 py-2 rounded-xl border border-neutral-200 block truncate">
              Authorization: Bearer sk-foyton-...
            </code>
          </div>
        </div>
      </div>

      {/* 3-Step Quickstart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs relative">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono font-black text-sm flex items-center justify-center mb-3">
            1
          </div>
          <h3 className="text-sm font-bold text-neutral-900 mb-1">
            {language === 'zh' ? '获取 API Key' : 'Create API Key'}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed mb-4">
            进入控制台「API 密钥」板块，一键创建专属子 Key，支持自定义独立月度消费上限与调用限额。
          </p>
          <button
            onClick={() => onNavigate('console-apikeys')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>立即管理密钥</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs relative">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono font-black text-sm flex items-center justify-center mb-3">
            2
          </div>
          <h3 className="text-sm font-bold text-neutral-900 mb-1">
            {language === 'zh' ? '配置 Base URL' : 'Set Base URL'}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed mb-4">
            在现有项目或任何 AI 客户端软件（如 NextChat、CherryStudio、Dify）中将原地址替换为 Foyton 专线网关。
          </p>
          <span className="text-xs font-mono text-neutral-600 bg-neutral-50 px-2 py-1 rounded border border-neutral-200">
            https://api.foyton.com/v1
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs relative">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono font-black text-sm flex items-center justify-center mb-3">
            3
          </div>
          <h3 className="text-sm font-bold text-neutral-900 mb-1">
            {language === 'zh' ? '选择模型即刻调用' : 'Call Any Model'}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed mb-4">
            直接在模型参数填入如 claude-3-7-sonnet-latest 或 deepseek-r1，系统自动完成动态多线容灾转发。
          </p>
          <button
            onClick={() => onNavigate('models')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>查看完整模型列表</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden mb-8">
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              {language === 'zh' ? '多语言 SDK 接入示例' : 'SDK Code Examples'}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              支持流式输出 (Stream: true)、工具调用 (Tool Call)、视觉多模态输入与长上下文解析
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
            {(['python', 'node', 'curl', 'go'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLang === lang
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {lang === 'python' ? 'Python' : lang === 'node' ? 'Node.js' : lang === 'curl' ? 'cURL' : 'Go'}
              </button>
            ))}
          </div>
        </div>

        {/* Code Box */}
        <div className="relative bg-[#0f1218] p-5 sm:p-6 text-neutral-100 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed">
          <div className="absolute right-4 top-4 z-10">
            <button
              onClick={() => copyText(codeSnippets[activeLang])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors border border-neutral-700 cursor-pointer shadow-sm"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? '已复制全部' : '复制代码'}</span>
            </button>
          </div>

          <pre className="pt-6 sm:pt-2 whitespace-pre text-neutral-200">
            {codeSnippets[activeLang]}
          </pre>
        </div>
      </div>

      {/* Endpoints & Status Codes Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Endpoints */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs">
          <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>核心兼容端点 (Endpoints)</span>
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-purple-700">POST /v1/chat/completions</span>
              <span className="text-neutral-500">对话补全 / 智能体交互 / 流式输出</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-blue-700">GET /v1/models</span>
              <span className="text-neutral-500">获取当前可用模型列表及元信息</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-emerald-700">POST /v1/embeddings</span>
              <span className="text-neutral-500">文本向量化生成 (知识库 / RAG)</span>
            </div>
          </div>
        </div>

        {/* Error Codes */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs">
          <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>常见 HTTP 状态码说明</span>
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-emerald-600">200 OK</span>
              <span className="text-neutral-500">请求成功，正常返回模型响应</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-amber-600">401 Unauthorized</span>
              <span className="text-neutral-500">API Key 无效、已撤销或格式有误</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-red-600">402 Payment Required</span>
              <span className="text-neutral-500">账户余额不足，请在控制台钱包充值</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <span className="font-mono font-bold text-purple-600">429 Rate Limit</span>
              <span className="text-neutral-500">已达子 Key 设置的并发或频率上限</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
