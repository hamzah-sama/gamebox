import { auth } from "@clerk/nextjs/server"
import "server-only"
import { db } from "../db"
import { eq, desc } from "drizzle-orm"
import { games, type Game } from "../db/schema"

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
