/**
 * 首页「模型价格参考」区块的数据。
 *
 * 价格单位为 USD / 1M Tokens，只保留卡片实际渲染用到的字段；
 * 参考项目里另有折扣历史等字段，仅供已弃用的快速接入弹窗使用。
 */

export interface ModelPriceInfo {
  id: string;
  name: string;
  /** 用于匹配 provider 图标，取值见 ModelProviderIcon。 */
  provider: string;
  providerName: string;
  /** 上下文窗口，经 pricing_contextWindow 插值渲染。 */
  contextSize: string;
  inputPrice: number;
  outputPrice: number;
  /** 走极速通道的模型展示绿色标签，否则展示「非实时价格」。 */
  fastMode?: boolean;
  isNew?: boolean;
}

export const POPULAR_MODELS: ModelPriceInfo[] = [
  {
    id: 'gpt-6-astra',
    name: 'GPT-6 Astra',
    provider: 'OpenAI',
    providerName: 'OpenAI',
    contextSize: '1M',
    inputPrice: 1.1,
    outputPrice: 6.7,
    fastMode: true,
    isNew: true,
  },
  {
    id: 'claude-fable-5.1',
    name: 'Claude Fable 5.1',
    provider: 'Anthropic',
    providerName: 'Anthropic',
    contextSize: '1M',
    inputPrice: 2.47,
    outputPrice: 12.35,
    isNew: true,
  },
  {
    id: 'claude-opus-5',
    name: 'Claude Opus 5',
    provider: 'Anthropic',
    providerName: 'Anthropic',
    contextSize: '1M',
    inputPrice: 1.04,
    outputPrice: 5.2,
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3',
    provider: 'Kimi',
    providerName: 'Kimi',
    contextSize: '1M',
    inputPrice: 2.33,
    outputPrice: 11.64,
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'DeepSeek',
    providerName: 'DeepSeek',
    contextSize: '1M',
    inputPrice: 0.281,
    outputPrice: 0.844,
  },
  {
    id: 'glm-5.3-flash',
    name: 'GLM-5.3-Flash (Ox Alpha)',
    provider: 'GLM',
    providerName: 'GLM',
    contextSize: '1M',
    inputPrice: 0.0612,
    outputPrice: 0.21,
  },
];
