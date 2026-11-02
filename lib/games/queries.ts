import { auth } from "@clerk/nextjs/server"
import "server-only"
import { db } from "../db"
import { and, asc, eq, desc } from "drizzle-orm"
import type { UIMessage } from "ai"
import { games, messages, type Game } from "../db/schema"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const listGames = async (): Promise<Game[]> => {
  const { orgId } = await auth()

  if (!orgId) {
    return []
  }

  return db
    .select()
    .from(games)
    .where(eq(games.orgId, orgId))
    .orderBy(desc(games.createdAt))
}

// Returns the game only if it belongs to the active organization.
export const getGame = async (id: string): Promise<Game | null> => {
  const { orgId } = await auth()

  if (!orgId || !UUID_RE.test(id)) {
    return null
  }

  const [game] = await db
    .select()
    .from(games)
    .where(and(eq(games.id, id), eq(games.orgId, orgId)))
    .limit(1)

  return game ?? null
}

export const listMessages = async (gameId: string): Promise<UIMessage[]> => {
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.gameId, gameId))
    .orderBy(asc(messages.createdAt))

  return rows.map(({ id, role, parts }) => ({ id, role, parts }))
}

// Inserts messages that are not stored yet; existing ids are left untouched.
export const saveMessages = async (gameId: string, items: UIMessage[]) => {
  if (items.length === 0) {
    return
  }

  await db
    .insert(messages)
    .values(items.map(({ id, role, parts }) => ({ id, gameId, role, parts })))
    .onConflictDoNothing({ target: messages.id })
}
