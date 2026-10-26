/**
 * Centralized model configuration for all AI providers.
 * Update these defaults when new models are released.
 */

import {ApiKeyType} from './providers';

// Default model names for each provider
export const GEMINI_DEFAULT_MODEL = 'gemini-3.8-flash';
export const VERTEX_AI_DEFAULT_MODEL = 'gemini-3.8-flash';
export const OPENAI_DEFAULT_MODEL = 'openai/gpt-oss-120b-maas';
export const CLAUDE_DEFAULT_MODEL = 'claude-sonnet-5-5';
export const OLLAMA_DEFAULT_MODEL = 'ministral-3';

/**
 * Model option for UI dropdowns and selection.
 */
export interface ModelOption {
  id: string;
  displayName: string;
  apiType: ApiKeyType;
}

/**
 * Suggested Gemini models.
 */
export const GEMINI_MODELS: ModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    displayName: 'Gemini 3.8 Flash',
    apiType: ApiKeyType.GEMINI_API_KEY,
  },
  {
    id: 'gemini-4-argon',
    displayName: 'Gemini 4 Argon',
    apiType: ApiKeyType.GEMINI_API_KEY,
  },
  {
    id: 'gemini-3.1-pro-preview',
    displayName: 'Gemini 3.1 Pro Preview',
    apiType: ApiKeyType.GEMINI_API_KEY,
  },
  {
    id: 'gemini-3-flash-preview',
    displayName: 'Gemini 3 Flash Preview',
    apiType: ApiKeyType.GEMINI_API_KEY,
  },
  {
    id: 'gemini-2.5-flash',
    displayName: 'Gemini 2.5 Flash',
    apiType: ApiKeyType.GEMINI_API_KEY,
  },
  {
    id: 'gemini-2.5-pro',
    displayName: 'Gemini 2.5 Pro',
    apiType: ApiKeyType.GEMINI_API_KEY,
  },
];

/**
 * Suggested Vertex AI models (Gemini, Anthropic Model Garden, OpenAI MaaS).
 */
export const VERTEX_AI_MODELS: ModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    displayName: 'Gemini 3.8 Flash',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
  {
    id: 'gemini-4-argon',
    displayName: 'Gemini 4 Argon',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
  {
    id: 'claude-sonnet-5-5',
    displayName: 'Claude Sonnet 5.5',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
  {
    id: 'claude-opus-5-5',
    displayName: 'Claude Opus 5.5',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
  {
    id: 'openai/gpt-oss-120b-maas',
    displayName: 'GPT-OSS 120B (MaaS)',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
  {
    id: 'gemini-3.1-pro-preview',
    displayName: 'Gemini 3.1 Pro Preview',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
  {
    id: 'gemini-2.5-flash',
    displayName: 'Gemini 2.5 Flash',
    apiType: ApiKeyType.VERTEX_AI_API_KEY,
  },
];

/**
 * Suggested OpenAI models.
 */
export const OPENAI_MODELS: ModelOption[] = [
  {
    id: 'openai/gpt-oss-120b-maas',
    displayName: 'GPT-OSS 120B (Vertex MaaS)',
    apiType: ApiKeyType.OPENAI_API_KEY,
  },
  {
    id: 'gpt-5-mini',
    displayName: 'GPT-5 mini',
    apiType: ApiKeyType.OPENAI_API_KEY,
  },
];

/**
 * Suggested Claude models.
 */
export const CLAUDE_MODELS: ModelOption[] = [
  {
    id: 'claude-sonnet-5-5',
    displayName: 'Claude Sonnet 5.5',
    apiType: ApiKeyType.CLAUDE_API_KEY,
  },
  {
    id: 'claude-opus-5-5',
    displayName: 'Claude Opus 5.5',
    apiType: ApiKeyType.CLAUDE_API_KEY,
  },
  {
    id: 'claude-sonnet-5',
    displayName: 'Claude Sonnet 5',
    apiType: ApiKeyType.CLAUDE_API_KEY,
  },
  {
    id: 'claude-sonnet-4-6',
    displayName: 'Claude Sonnet 4.6',
    apiType: ApiKeyType.CLAUDE_API_KEY,
  },
];

/**
 * Suggested models grouped by provider.
 */
export const MODEL_OPTIONS: Record<ApiKeyType, ModelOption[]> = {
  [ApiKeyType.GEMINI_API_KEY]: GEMINI_MODELS,
  [ApiKeyType.VERTEX_AI_API_KEY]: VERTEX_AI_MODELS,
  [ApiKeyType.OPENAI_API_KEY]: OPENAI_MODELS,
  [ApiKeyType.CLAUDE_API_KEY]: CLAUDE_MODELS,
  [ApiKeyType.OLLAMA_CUSTOM_URL]: [], // Ollama models are user-configured
};

/**
 * Get the default model name for a given API type.
 */
export function getDefaultModelForApiType(apiType: ApiKeyType): string {
  switch (apiType) {
    case ApiKeyType.GEMINI_API_KEY:
      return GEMINI_DEFAULT_MODEL;
    case ApiKeyType.VERTEX_AI_API_KEY:
      return VERTEX_AI_DEFAULT_MODEL;
    case ApiKeyType.OPENAI_API_KEY:
      return OPENAI_DEFAULT_MODEL;
    case ApiKeyType.CLAUDE_API_KEY:
      return CLAUDE_DEFAULT_MODEL;
    case ApiKeyType.OLLAMA_CUSTOM_URL:
      return OLLAMA_DEFAULT_MODEL;
    default:
      return GEMINI_DEFAULT_MODEL;
  }
}

/**
 * All default models by provider, for reference.
 */
export const DEFAULT_MODELS = {
  [ApiKeyType.GEMINI_API_KEY]: GEMINI_DEFAULT_MODEL,
  [ApiKeyType.VERTEX_AI_API_KEY]: VERTEX_AI_DEFAULT_MODEL,
  [ApiKeyType.OPENAI_API_KEY]: OPENAI_DEFAULT_MODEL,
  [ApiKeyType.CLAUDE_API_KEY]: CLAUDE_DEFAULT_MODEL,
  [ApiKeyType.OLLAMA_CUSTOM_URL]: OLLAMA_DEFAULT_MODEL,
} as const;
