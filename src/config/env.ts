import { z } from "zod";

const envSchema = z.object({
  VITE_GROQ_API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.safeParse({
  VITE_GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
});

export const env = parsedEnv.success ? parsedEnv.data : { VITE_GROQ_API_KEY: undefined };

export function hasGroqKey(): boolean {
  return !!env.VITE_GROQ_API_KEY;
}
