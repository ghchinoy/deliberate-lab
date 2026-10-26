/** Experimenter types and functions. */

import {Timestamp} from 'firebase/firestore';
import {UnifiedTimestamp} from './shared';
import {ApiKeyType} from './providers';

// ************************************************************************* //
// TYPES                                                                     //
// ************************************************************************* //

/** Experimenter public profile (written to Firestore under experimenters/{id}). */
export interface ExperimenterProfile {
  name: string;
  email: string;
  lastLogin: UnifiedTimestamp | null; // null if never logged in
}

/** Full experimenter profile built from allowlist and experimenter data. */
export interface ExperimenterProfileExtended extends ExperimenterProfile {
  id: string;
  isAdmin: boolean;
  hasResearchTemplateAccess: boolean;
}

/** Experimenter data (written to Firestore under experimenterData/{id}). */
export interface ExperimenterData {
  id: string;
  email: string;
  apiKeys: APIKeyConfig;
  // List of experiment IDs that the user has clicked on
  viewedExperiments: string[];
  showAlphaFeatures: boolean;
}

export interface APIKeyConfig {
  geminiApiKey: string; // distinct types since we don't want to lose information when switching between them
  vertexAIConfig?: VertexAIConfig;
  openAIApiKey?: OpenAIServerConfig;
  claudeApiKey?: ClaudeServerConfig;
  ollamaApiKey: OllamaServerConfig;
}

export interface VertexAIConfig {
  apiKey?: string; // For express mode
  project?: string; // For service account auth
  location?: string; // For service account auth
  serviceAccountJson?: string; // Paste full service account JSON
}

export interface OpenAIServerConfig {
  apiKey: string;
  baseUrl: string;
}

export interface ClaudeServerConfig {
  apiKey: string;
  baseUrl: string;
}

export interface OllamaServerConfig {
  url: string;
  apiKey?: string;
}

// ************************************************************************* //
// CONSTANTS                                                                 //
// ************************************************************************* //

const INVALID_API_KEY = '';
const EMPTY_BASE_URL = '';

// ************************************************************************* //
// FUNCTIONS                                                                 //
// ************************************************************************* //

export function getFullExperimenterConfig(
  experimenter: Partial<ExperimenterProfileExtended> = {},
): ExperimenterProfileExtended {
  return {
    id: experimenter.id ?? '',
    name: experimenter.name ?? '',
    email: experimenter.email ?? '',
    isAdmin: experimenter.isAdmin ?? false,
    hasResearchTemplateAccess: experimenter.hasResearchTemplateAccess ?? false,
    lastLogin: experimenter.lastLogin ?? null,
  };
}

export function createOpenAIServerConfig(): OpenAIServerConfig {
  return {
    apiKey: INVALID_API_KEY,
    baseUrl: EMPTY_BASE_URL,
  };
}

export function createClaudeServerConfig(): ClaudeServerConfig {
  return {
    apiKey: INVALID_API_KEY,
    baseUrl: EMPTY_BASE_URL,
  };
}

export function createExperimenterData(
  experimenterId: string,
  experimenterEmail: string,
): ExperimenterData {
  return {
    id: experimenterId,
    apiKeys: {
      geminiApiKey: INVALID_API_KEY,
      openAIApiKey: createOpenAIServerConfig(),
      ollamaApiKey: {url: INVALID_API_KEY, apiKey: INVALID_API_KEY},
    },
    email: experimenterEmail,
    viewedExperiments: [],
    showAlphaFeatures: false,
  };
}

export function checkApiKeyExists(
  apiKeyType: ApiKeyType,
  experimenterData: ExperimenterData | null | undefined,
): boolean {
  if (experimenterData === null || experimenterData === undefined) {
    return false;
  }
  // Google Cloud Vertex AI (Application Default Credentials) is enabled by default
  // for Vertex AI, Gemini, Claude (Vertex Model Garden), and OpenAI (Vertex MaaS).
  if (
    apiKeyType === ApiKeyType.VERTEX_AI_API_KEY ||
    apiKeyType === ApiKeyType.GEMINI_API_KEY ||
    apiKeyType === ApiKeyType.CLAUDE_API_KEY ||
    apiKeyType === ApiKeyType.OPENAI_API_KEY
  ) {
    return true;
  }

  // if active API key type is Ollama, require an explicit server URL
  if (apiKeyType === ApiKeyType.OLLAMA_CUSTOM_URL) {
    return experimenterData.apiKeys.ollamaApiKey.url !== INVALID_API_KEY;
  }

  return false; // false if no valid condition is met
}
