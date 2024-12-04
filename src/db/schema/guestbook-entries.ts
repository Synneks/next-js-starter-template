import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import users from "./users";

const guestbookEntries = pgTable("guestbook_entries", {
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
});

export default guestbookEntries;
