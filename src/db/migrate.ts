import { migrate } from "drizzle-orm/postgres-js/migrator";

import { env } from "@/env/server";

import db, { client } from ".";
import config from "../../drizzle.config";

if (!env.DB_MIGRATING) {
  throw new Error("DB_MIGRATING has to be true");
}

await migrate(db, { migrationsFolder: config.out! });

await client.end();
