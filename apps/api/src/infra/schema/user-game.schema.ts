import * as p from "drizzle-orm/pg-core";
import {uid} from "@infra/utils/db.utils";
import {user} from "@schema/user.schema";
import {game} from "@schema/game.schema";
import { InferSelectModel } from "drizzle-orm";

export const userGame = p.pgTable("user_game", {
    userId: uid("user_id").references(() => user.id, {
        onDelete: "cascade",
    }).notNull(),
    gameId: uid("game_id").references(() => game.id, {
        onDelete: "cascade",
    }),
    rating: p.integer(),
    time_played: p.integer().default(0).notNull(),
    notes: p.text(),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
    updatedAt: p.timestamp("updated_at"),
}, (table) => [p.primaryKey({ columns: [table.userId, table.gameId] })]);

export type UserGame = InferSelectModel<typeof userGame>;