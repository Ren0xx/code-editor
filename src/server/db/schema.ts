// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
	integer,
	pgTableCreator,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { FILE_SHARE_LIMIT } from "@/utils/constants";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `code-editor_${name}`);

// export const posts = createTable(
// 	"post",
// 	{
// 		id: serial("id").primaryKey(),
// 		name: varchar("name", { length: 256 }),
// 		createdAt: timestamp("created_at", { withTimezone: true })
// 			.default(sql`CURRENT_TIMESTAMP`)
// 			.notNull(),
// 		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
// 			() => new Date()
// 		),
// 	},
// 	(example) => ({
// 		nameIndex: index("name_idx").on(example.name),
// 	})
// );
export const files = createTable("files", {
	id: serial("id").primaryKey(),
	linkId: uuid("link_id").defaultRandom().notNull().unique(),
	name: varchar("name", { length: 255 }).notNull(),
	content: text("content").notNull(),
	language: varchar("language", { length: 50 }),
	createdAt: timestamp("created_at").defaultNow(),
	ownerId: varchar("owner_id", { length: 50 })
		.notNull()
		.references(() => users.id),
});

export const users = createTable("users", {
	id: varchar("id", { length: 50 }).primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	remainingFileShare: integer("remainingFileShare")
		.default(FILE_SHARE_LIMIT)
		.notNull(),
});

