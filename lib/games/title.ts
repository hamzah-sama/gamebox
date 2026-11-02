import "server-only"
import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

const MAX_WORDS = 4

// Keeps letters, numbers, spaces and inner apostrophes/hyphens, then caps the word count.
const toTitle = (text: string) =>
  text
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_WORDS)
    .join(" ")

// Names the game from the user's prompt, e.g. "a voxel survival game with dragons" → "Dragon Voxel Survival".
export const generateGameTitle = async (prompt: string): Promise<string> => {
  try {
    const { text } = await generateText({
      model: anthropic("claude-haiku-5-5"),
      instructions: `You name video games. Read the user's game idea and reply with only a catchy game title of at most ${MAX_WORDS} words, in Title Case, in the same language as the idea. No quotes, no punctuation, no explanation.`,
      prompt,
      maxOutputTokens: 20,
    })

    const title = toTitle(text)
    if (title) return title
  } catch (error) {
    console.error("Failed to generate game title:", error)
  }

  return toTitle(prompt) || "Untitled Game"
}
