import "server-only"


import { parseEnv } from "@neon/env"
import neonConfig from "@/neon"
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"

const { postgres } = parseEnv(neonConfig, ["DATABASE_URL"])

const globalForDb = globalThis as unknown as { pool?: Pool }

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: postgres.databaseUrl,
  })

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool

export const db = drizzle(pool, { schema })
