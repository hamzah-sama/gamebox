"use server"

import { auth } from "@clerk/nextjs/server"
import { generateId } from "ai"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "../db"
import { games } from "../db/schema"

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
          parts: [{ type: "text", text: title }],
        },
      ],
    })
    .returning({ id: games.id })

  revalidatePath("/", "layout")
  redirect(`/games/${game.id}`)
}
