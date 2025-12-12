import type { UserType } from "@/app/(auth)/auth";
import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      "chat-model",
      "chat-model-reasoning",
      "openai-gpt-4o-mini",
      "anthropic-claude-3-haiku",
      "groq-llama-3-1-8b",
      "google-gemini-1-5-flash",
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      // xAI Models
      "chat-model",
      "chat-model-reasoning",
      // OpenAI Models
      "openai-gpt-4",
      "openai-gpt-4-turbo",
      "openai-gpt-4o",
      "openai-gpt-4o-mini",
      // Anthropic Models
      "anthropic-claude-3-5-sonnet",
      "anthropic-claude-3-opus",
      "anthropic-claude-3-sonnet",
      "anthropic-claude-3-haiku",
      // Groq Models
      "groq-llama-3-1-70b",
      "groq-llama-3-1-8b",
      "groq-llama-3-70b",
      // Google Models
      "google-gemini-pro",
      "google-gemini-1-5-pro",
      "google-gemini-1-5-flash",
    ],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
