import * as p from "drizzle-orm/pg-core";
import {uid} from "@infra/utils/db.utils";
import {user} from "@schema/user.schema";
import { InferSelectModel } from "drizzle-orm";

export const game = p.pgTable("game", {
    id: uid().primaryKey(),
    title: p.varchar({ length: 255 }).notNull(),
    description: p.text().notNull(),
    genre: p.varchar({ length: 100 }).notNull(),
    releaseDate: p.timestamp("release_date").notNull(),
    developer: p.varchar({ length: 255 }).notNull(),
    picture: p.varchar({ length: 4096 }).notNull(),
    publisher: p.varchar({ length: 255 }).notNull(),
    rating: p.integer("rating").notNull(),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
    createdBy: uid("created_by").references(() => user.id, {
        onDelete: "set null",
    }),
    updatedAt: p.timestamp("updated_at"),
    updatedBy: uid("updated_by").references(() => user.id, {
        onDelete: "set null",
    }),
    deletedAt: p.timestamp("deleted_at"),
    deletedBy: uid("deleted_by").references(() => user.id, {
        onDelete: "set null",
    }),
});

export type Game = InferSelectModel<typeof game>;

