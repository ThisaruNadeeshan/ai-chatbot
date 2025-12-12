export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
  provider?: string;
};

export const chatModels: ChatModel[] = [
  // xAI (Grok) Models
  {
    id: "chat-model",
    name: "Grok Vision",
    description: "Advanced multimodal model with vision and text capabilities",
    provider: "xAI",
  },
  {
    id: "chat-model-reasoning",
    name: "Grok Reasoning",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
    provider: "xAI",
  },
  // OpenAI Models
  {
    id: "openai-gpt-4",
    name: "GPT-4",
    description: "OpenAI's most capable model with advanced reasoning",
    provider: "OpenAI",
  },
  {
    id: "openai-gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Faster and more efficient GPT-4 with extended context",
    provider: "OpenAI",
  },
  {
    id: "openai-gpt-4o",
    name: "GPT-4o",
    description: "OpenAI's latest optimized model with multimodal capabilities",
    provider: "OpenAI",
  },
  {
    id: "openai-gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Fast and efficient GPT-4o variant for quick responses",
    provider: "OpenAI",
  },
  // Anthropic Models
  {
    id: "anthropic-claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most capable model with advanced reasoning",
    provider: "Anthropic",
  },
  {
    id: "anthropic-claude-3-opus",
    name: "Claude 3 Opus",
    description: "Anthropic's most powerful model for complex tasks",
    provider: "Anthropic",
  },
  {
    id: "anthropic-claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Balanced performance and speed for most tasks",
    provider: "Anthropic",
  },
  {
    id: "anthropic-claude-3-haiku",
    name: "Claude 3 Haiku",
    description: "Fast and efficient model for quick responses",
    provider: "Anthropic",
  },
  // Groq Models
  {
    id: "groq-llama-3-1-70b",
    name: "Llama 3.1 70B",
    description: "Meta's Llama 3.1 70B via Groq - fast inference",
    provider: "Groq",
  },
  {
    id: "groq-llama-3-1-8b",
    name: "Llama 3.1 8B",
    description: "Meta's Llama 3.1 8B via Groq - ultra-fast responses",
    provider: "Groq",
  },
  {
    id: "groq-llama-3-70b",
    name: "Llama 3 70B",
    description: "Meta's Llama 3 70B via Groq - high performance",
    provider: "Groq",
  },
  // Google Models
  {
    id: "google-gemini-pro",
    name: "Gemini Pro",
    description: "Google's advanced multimodal AI model",
    provider: "Google",
  },
  {
    id: "google-gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    description: "Google's latest Pro model with extended context",
    provider: "Google",
  },
  {
    id: "google-gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    description: "Google's fast and efficient model for quick tasks",
    provider: "Google",
  },
];
