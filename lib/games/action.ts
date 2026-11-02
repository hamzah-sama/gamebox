"use server"

import { auth } from "@clerk/nextjs/server"
import { generateId } from "ai"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "../db"
import { games } from "../db/schema"
import { generateGameTitle } from "./title"

export const createGame = async (formData: FormData) => {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An active organization is required to create a game.")
  }

  const value = formData.get("prompt")
  const prompt = typeof value === "string" ? value.trim() : ""

  if (!prompt) {
    return
  }

  const title = await generateGameTitle(prompt)

  // The prompt becomes the first message; the game page asks the AI to reply to it.
  const [game] = await db
    .insert(games)
    .values({
      orgId,
      title,
      messages: [
        {
          id: generateId(),
          role: "user",
          parts: [{ type: "text", text: prompt }],
        },
      ],
    })
    .returning({ id: games.id })

  revalidatePath("/", "layout")
  redirect(`/games/${game.id}`)
}
