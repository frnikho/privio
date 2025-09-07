import {UserGameInterface} from "@interface/user-game.interface";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import {op} from "@infra/utils/db.utils";
import {userGame} from "@schema/user-game.schema";
import {and, eq, sql} from "drizzle-orm";
import {game} from "@schema/game.schema";
import {mapGameToEntity} from "@infra/adapter/game.adapter";
import {oneOrOption, oneOrThrow} from "@infra/utils/type.utils";
import {isSome, none, some} from "fp-ts/Option";
import {user} from "@schema/user.schema";
import {mapUserToEntity} from "@infra/adapter/user.adapter";

export default (db: NodePgDatabase): UserGameInterface => ({
    add: (userId, gameId, body) => {
        return op(db.insert(userGame).values({
            notes: body.notes,
            rating: body.rating,
            time_played: body.timePlayed,
            gameId,
            userId,
        })).map(() => {});
    },

    update: (userId, gameId, body) => {
        return op(db.update(userGame).set({
            notes: body.notes,
            rating: body.rating,
            time_played: body.timePlayed,
            updatedAt: new Date(),
        }).where(and(eq(userGame.userId, userId), eq(userGame.gameId, gameId)))).map(() => {});
    },

    get: (userId, gameId) => {
        return op(db
            .select({game, userGame})
            .from(userGame)
            .innerJoin(game, eq(userGame.gameId, game.id))
            .where(and(eq(userGame.userId, userId), eq(userGame.gameId, gameId)))
        )
            .map(oneOrOption)
            .map((row) => {
                if (isSome(row)) {
                    return some({
                        game: mapGameToEntity(row.value.game),
                        rating: row.value.userGame.rating ?? undefined,
                        notes: row.value.userGame.notes ?? undefined,
                        timePlayed: row.value.userGame.time_played,
                        createdAt: row.value.userGame.createdAt,
                        userGame: row.value.userGame
                    })
                }
                return none;
        })
    },

    list: (userId, page, limit) => {
        return op(db
            .select({game, userGame, total: sql<number>`count(*) over()`})
            .from(userGame)
            .innerJoin(game, eq(userGame.gameId, game.id))
            .where(eq(userGame.userId, userId))
            .limit(limit)
            .offset(page * limit)
        ).map((rows) => {
            return {
                userGames: rows.map((row) => {
                    return {
                        game: mapGameToEntity(row.game),
                        rating: row.userGame.rating ?? undefined,
                        timePlayed: row.userGame.time_played,
                        createdAt: row.userGame.createdAt,
                        userGame: row.userGame
                    }
                }),
                total: rows.length > 0 ? rows[0].total : 0
            }
        })
    },

    remove: (userId, gameId) => {
        return op(db.delete(userGame).where(and(eq(userGame.gameId, gameId), eq(userGame.userId, userId))))
            .map(() => {});
    },

    listReviews: (gameId, page, limit) => {
        return op(db
            .select({userGame, user, total: sql<number>`count(*) over()`})
            .from(userGame)
            .innerJoin(user, eq(user.id, userGame.userId))
            .where(eq(userGame.gameId, gameId))
            .limit(limit)
            .offset(page * limit)
        ).map((rows) => {
            return {
                reviews: rows.map((row) => {
                    return {
                        user: mapUserToEntity(row.user),
                        review: {
                            rating: row.userGame.rating ?? undefined,
                            timePlayed: row.userGame.time_played,
                            notes: row.userGame.notes ?? undefined,
                            createdAt: row.userGame.createdAt,
                        }
                    }
                }),
                total: rows.length > 0 ? rows[0].total : 0
            }
        })
    }


})