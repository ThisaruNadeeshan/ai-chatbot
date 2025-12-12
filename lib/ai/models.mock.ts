import type { LanguageModel } from "ai";

const createMockModel = (): LanguageModel => {
  return {
    specificationVersion: "v2",
    provider: "mock",
    modelId: "mock-model",
    defaultObjectGenerationMode: "tool",
    supportedUrls: [],
    supportsImageUrls: false,
    supportsStructuredOutputs: false,
    doGenerate: async () => ({
      rawCall: { rawPrompt: null, rawSettings: {} },
      finishReason: "stop",
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
      content: [{ type: "text", text: "Hello, world!" }],
      warnings: [],
    }),
    doStream: async () => ({
      stream: new ReadableStream({
        start(controller) {
          controller.enqueue({
            type: "text-delta",
            id: "mock-id",
            delta: "Mock response",
          });
          controller.close();
        },
      }),
      rawCall: { rawPrompt: null, rawSettings: {} },
    }),
  } as unknown as LanguageModel;
};

export const chatModel = createMockModel();
export const reasoningModel = createMockModel();
export const titleModel = createMockModel();
export const artifactModel = createMockModel();

// OpenAI Mock Models
export const openaiGpt4Model = createMockModel();
export const openaiGpt4TurboModel = createMockModel();
export const openaiGpt4oModel = createMockModel();
export const openaiGpt4oMiniModel = createMockModel();

// Anthropic Mock Models
export const anthropicClaude35SonnetModel = createMockModel();
export const anthropicClaude3OpusModel = createMockModel();
export const anthropicClaude3SonnetModel = createMockModel();
export const anthropicClaude3HaikuModel = createMockModel();

// Groq Mock Models
export const groqLlama31_70bModel = createMockModel();
export const groqLlama31_8bModel = createMockModel();
export const groqLlama3_70bModel = createMockModel();

// Google Mock Models
export const googleGeminiProModel = createMockModel();
export const googleGemini15ProModel = createMockModel();
export const googleGemini15FlashModel = createMockModel();