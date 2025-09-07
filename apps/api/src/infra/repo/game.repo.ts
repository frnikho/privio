import {NodePgDatabase} from "drizzle-orm/node-postgres";
import {op} from "@infra/utils/db.utils";
import {eq, sql} from "drizzle-orm";
import {oneOreResultOption, oneOrThrow} from "@infra/utils/type.utils";
import {DbException} from "@exceptions/db.exception";
import {GameInterface} from "@interface/game.interface";
import {game} from "@schema/game.schema";
import {mapGameOption, mapGameToEntity} from "@infra/adapter/game.adapter";

export default (db: NodePgDatabase): GameInterface => ({
    findById: (id) => {
        return op(db.select().from(game).where(eq(game.id, id)))
            .andThen(oneOreResultOption)
            .map(mapGameOption)
    },

    create: (body) => {
        return op(
            db.insert(game).values(
                body.map((game) => ({
                    title: game.title,
                    description: game.description,
                    genre: game.genre,
                    picture: game.picture,
                    releaseDate: game.releaseDate,
                    developer: game.developer,
                    publisher: game.publisher,
                    rating: game.rating,
                    createdBy: game.createdBy,
                    updatedBy: null,
                    deletedBy: null,
                }))).returning())
            .andThen((r) => oneOrThrow(r, new DbException("Failed to create user")))
            .map(mapGameToEntity);
    },

    delete: (id) => {
        return op(
            db.delete(game).where(eq(game.id, id)).returning()
        ).andThen((r) => oneOrThrow(r, new DbException("Failed to delete user")))
            .map(mapGameToEntity);
    },

    list: (page, limit) => {
        return op(
            db
                .select({
                    game,
                    total: sql<number>`count(*) over()`
                })
                .from(game)
                .limit(limit)
                .offset((page) * limit),
        ).map((e) => {
            return {
                games: e.map((row) => mapGameToEntity(row.game)),
                total: e.length > 0 ? e[0].total : 0
            }
        })
    },

    findLatest: () => {
        return op(
            db
                .select()
                .from(game)
                .orderBy(sql`${game.createdAt} DESC`)
                .limit(12),
        ).map((games) => {
            return {
                games: games.map((row) => mapGameToEntity(row)),
                total: games.length,
            }
        })
    },

    findMostRated: () => {
        return op(
            db
                .select()
                .from(game)
                .orderBy(sql`${game.rating} DESC`)
                .limit(12),
        ).map((games) => {
            return {
                games: games.map((row) => mapGameToEntity(row)),
                total: games.length,
            }
        })
    },

    update: (id, body) => {
        return op(
            db.update(game).set({
                title: body.title,
                description: body.description,
                genre: body.genre,
                releaseDate: body.releaseDate,
                developer: body.developer,
                publisher: body.publisher,
                rating: body.rating,
                updatedBy: body.updatedBy,
                updatedAt: new Date(),
            }).where(eq(game.id, id)).returning()
        ).andThen((r) => oneOrThrow(r, new DbException("Failed to update user")))
            .map(mapGameToEntity);
    },

    search: (title, page, limit) => {
        return op(
            db
                .select({
                    game,
                    total: sql<number>`count(*) over()`
                })
                .from(game)
                .where(
                    sql`to_tsvector('simple', ${game.title}) @@ plainto_tsquery('simple', ${title})`
                )
                .orderBy(
                    sql`ts_rank(to_tsvector('simple', ${game.title}), plainto_tsquery('simple', ${title})) DESC`
                )
                .offset((page) * limit),
        ).map((e) => {
            return {
                games: e.map((row) => mapGameToEntity(row.game)),
                total: e.length > 0 ? e[0].total : 0
            }
        })
    }
})