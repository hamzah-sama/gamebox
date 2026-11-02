"use server"

import { auth } from "@clerk/nextjs/server"
import { generateId } from "ai"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "../db"
import { games, messages } from "../db/schema"

export const createGame = async (formData: FormData) => {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An active organization is required to create a game.")
  }

  const prompt = formData.get("prompt")
  const title = typeof prompt === "string" ? prompt.trim() : ""

  if (!title) {
    return
  }

  const [game] = await db
    .insert(games)
    .values({
      orgId,
      title,
    })
    .returning({ id: games.id })

  // The prompt becomes the first message; the game page asks the AI to reply to it.
  await db.insert(messages).values({
    id: generateId(),
    gameId: game.id,
    role: "user",
    parts: [{ type: "text", text: title }],
  })

  revalidatePath("/", "layout")
  redirect(`/games/${game.id}`)
}
