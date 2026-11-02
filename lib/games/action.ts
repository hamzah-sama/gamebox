"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
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

  await db.insert(games).values({
    orgId,
    title,
  })

  revalidatePath("/", "layout")
}
