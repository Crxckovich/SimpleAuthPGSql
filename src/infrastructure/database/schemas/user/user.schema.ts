import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { rolesSchema } from "./role.schema.ts";

export const usersSchema = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role_id: integer("role_id")
    .references(() => rolesSchema.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    })
    .notNull(),
});

export const usersRelations = relations(usersSchema, ({ one }) => ({
  role: one(rolesSchema, {
    fields: [usersSchema.role_id],
    references: [rolesSchema.id],
  }),
}));
