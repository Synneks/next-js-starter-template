import { defineConfig } from "drizzle-kit";

import { env } from "@/env/server";

export default defineConfig({
  dialect: "postgresql",
  // location of the schema
  schema: "./src/db/schema/index.ts",
  // location of the migrations
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
