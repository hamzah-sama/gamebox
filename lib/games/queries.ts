import { auth } from "@clerk/nextjs/server"
import "server-only"
import { db } from "../db"
import { and, eq, desc } from "drizzle-orm"
import type { UIMessage } from "ai"
import { games, type Game, type GameSummary } from "../db/schema"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const listGames = async (): Promise<GameSummary[]> => {
  const { orgId } = await auth()

  if (!orgId) {
    return []
  }

  // Skip the messages column so the sidebar doesn't load every chat history
  return db
    .select({
      id: games.id,
      orgId: games.orgId,
      title: games.title,
      createdAt: games.createdAt,
      updatedAt: games.updatedAt,
    })
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

// Replaces the stored chat history of a game.
export const saveMessages = async (gameId: string, messages: UIMessage[]) => {
  await db.update(games).set({ messages }).where(eq(games.id, gameId))
}
