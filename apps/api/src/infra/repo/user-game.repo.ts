import {UserGameInterface} from "@interface/user-game.interface";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import {op} from "@infra/utils/db.utils";
import {userGame} from "@schema/user-game.schema";
import {and, eq, sql} from "drizzle-orm";
import {game} from "@schema/game.schema";
import {mapGameToEntity} from "@infra/adapter/game.adapter";

export default (db: NodePgDatabase): UserGameInterface => ({
    add: (userId, gameId, body) => {
        return op(db.insert(userGame).values({
            ...body,
            gameId,
            userId,
        })).map(() => {});
    },

    update: (userId, gameId, body) => {
        return op(db.update(userGame).set({
            ...body,
            updatedAt: new Date(),
        }).where(and(eq(userGame.userId, userId), eq(userGame.gameId, gameId)))).map(() => {});
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
    }
})