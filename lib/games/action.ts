"use server"

import { auth } from "@clerk/nextjs/server"
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

  const [game] = await db
    .insert(games)
    .values({
      orgId,
      title,
    })
    .returning({ id: games.id })

  revalidatePath("/", "layout")
  redirect(`/games/${game.id}`)
}

export const sendMessage = async (gameId: string, formData: FormData) => {
  const prompt = formData.get("prompt")
  const value = typeof prompt === "string" ? prompt.trim() : ""

  if (!value) {
    return
  }

  console.log({ gameId, value })
}
