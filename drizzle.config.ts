import { config } from "dotenv"

config({ path: ".env" })

import { parseEnv } from "@neon/env"
import { defineConfig } from "drizzle-kit"
import neonConfig from "./neon"

const { postgres } = parseEnv(neonConfig, ["DATABASE_URL_UNPOOLED"])

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: postgres.databaseUrlUnpooled,
  },
})
