import { createGateway } from "@ai-sdk/gateway";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// Create gateway instance with API key for all models
const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
        openaiGpt4Model,
        openaiGpt4TurboModel,
        openaiGpt4oModel,
        openaiGpt4oMiniModel,
        anthropicClaude35SonnetModel,
        anthropicClaude3OpusModel,
        anthropicClaude3SonnetModel,
        anthropicClaude3HaikuModel,
        groqLlama31_70bModel,
        groqLlama31_8bModel,
        groqLlama3_70bModel,
        googleGeminiProModel,
        googleGemini15ProModel,
        googleGemini15FlashModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
          "openai-gpt-4": openaiGpt4Model,
          "openai-gpt-4-turbo": openaiGpt4TurboModel,
          "openai-gpt-4o": openaiGpt4oModel,
          "openai-gpt-4o-mini": openaiGpt4oMiniModel,
          "anthropic-claude-3-5-sonnet": anthropicClaude35SonnetModel,
          "anthropic-claude-3-opus": anthropicClaude3OpusModel,
          "anthropic-claude-3-sonnet": anthropicClaude3SonnetModel,
          "anthropic-claude-3-haiku": anthropicClaude3HaikuModel,
          "groq-llama-3-1-70b": groqLlama31_70bModel,
          "groq-llama-3-1-8b": groqLlama31_8bModel,
          "groq-llama-3-70b": groqLlama3_70bModel,
          "google-gemini-pro": googleGeminiProModel,
          "google-gemini-1-5-pro": googleGemini15ProModel,
          "google-gemini-1-5-flash": googleGemini15FlashModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // xAI (Grok) Models - using gateway
        "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
        "chat-model-reasoning": wrapLanguageModel({
          model: gateway.languageModel("xai/grok-3-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": gateway.languageModel("xai/grok-2-1212"),
        "artifact-model": gateway.languageModel("xai/grok-2-1212"),
        // OpenAI Models - using gateway
        "openai-gpt-4": gateway.languageModel("openai/gpt-4"),
        "openai-gpt-4-turbo": gateway.languageModel("openai/gpt-4-turbo"),
        "openai-gpt-4o": gateway.languageModel("openai/gpt-4o"),
        "openai-gpt-4o-mini": gateway.languageModel("openai/gpt-4o-mini"),
        // Anthropic Models - using gateway
        "anthropic-claude-3-5-sonnet": gateway.languageModel(
          "anthropic/claude-3-5-sonnet-20241022"
        ),
        "anthropic-claude-3-opus": gateway.languageModel(
          "anthropic/claude-3-opus-20240229"
        ),
        "anthropic-claude-3-sonnet": gateway.languageModel(
          "anthropic/claude-3-sonnet-20240229"
        ),
        "anthropic-claude-3-haiku": gateway.languageModel(
          "anthropic/claude-3-haiku-20240307"
        ),
        // Groq Models - using gateway
        "groq-llama-3-1-70b": gateway.languageModel(
          "groq/llama-3.1-70b-versatile"
        ),
        "groq-llama-3-1-8b": gateway.languageModel("groq/llama-3.1-8b-instant"),
        "groq-llama-3-70b": gateway.languageModel("groq/llama-3-70b-8192"),
        // Google Models - using gateway
        "google-gemini-pro": gateway.languageModel("google/gemini-pro"),
        "google-gemini-1-5-pro": gateway.languageModel("google/gemini-1.5-pro"),
        "google-gemini-1-5-flash": gateway.languageModel(
          "google/gemini-1.5-flash"
        ),
      },
    });
