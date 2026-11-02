import {
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  jsonb,
} from "drizzle-orm/pg-core"
import type { UIMessage } from "ai"

// Users are keyed by their Clerk user ID.
export const games = pgTable(
  "games",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: text("org_id").notNull(),
    title: text("title").notNull(),
    // Chat history in the AI SDK UIMessage format.
    messages: jsonb("messages").$type<UIMessage[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("games_org_id_created_at_idx").on(
      table.orgId,
      table.createdAt.desc()
    ),
  ]
)

export type Game = typeof games.$inferSelect
export type NewGame = typeof games.$inferInsert
// A game without its chat history, for lists such as the sidebar.
export type GameSummary = Omit<Game, "messages">
