import { z } from "zod";
import { chatModels } from "@/lib/ai/models";

const textPartSchema = z.object({
  type: z.enum(["text"]),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(["file"]),
  mediaType: z.enum(["image/jpeg", "image/png"]),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

// Create enum from all available model IDs
const modelIds = chatModels.map((model) => model.id) as [string, ...string[]];
const chatModelEnum = z.enum(modelIds);

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    role: z.enum(["user"]),
    parts: z.array(partSchema),
  }),
  selectedChatModel: chatModelEnum,
  selectedVisibilityType: z.enum(["public", "private"]),
  enableWebSearch: z.boolean().optional().default(false),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
