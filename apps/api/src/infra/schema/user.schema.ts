import * as p from "drizzle-orm/pg-core";
import {uid} from "@infra/utils/db.utils";

export const user = p.pgTable("user", {
    id: uid().primaryKey(),
    password: p.varchar().notNull(),
    email: p.varchar().notNull().unique(),
    firstname: p.varchar({ length: 255 }).notNull(),
    lastname: p.varchar({ length: 255 }).notNull(),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
    updatedAt: p.timestamp("updated_at"),
    updatedBy: p.varchar("updated_by").references((): p.AnyPgColumn => user.id, {
        onDelete: "set null",
    }),
    deletedAt: p.timestamp("deleted_at"),
    deletedBy: p.varchar("deleted_by").references((): p.AnyPgColumn => user.id, {
        onDelete: "set null",
    }),
});