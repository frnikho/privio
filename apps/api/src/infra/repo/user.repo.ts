import {NodePgDatabase} from "drizzle-orm/node-postgres";
import {UserInterface} from "@interface/user.interface";
import {op} from "@infra/utils/db.utils";
import {user} from "@schema/user.schema";
import {eq, sql} from "drizzle-orm";
import {oneOreResultOption, oneOrThrow} from "@infra/utils/type.utils";
import {mapUserOption, mapUserToEntity} from "@infra/adapter/user.adapter";
import {DbException} from "@exceptions/db.exception";

export default (db: NodePgDatabase): UserInterface => ({
    findById: (id) => {
        return op(db.select().from(user).where(eq(user.id, id)))
            .andThen(oneOreResultOption)
            .map(mapUserOption)
    },

    findByEmail: (email) => {
        return op(db.select().from(user).where(eq(user.email, email)))
            .andThen(oneOreResultOption)
            .map(mapUserOption)
    },

    create: (body) => {
        return op(
            db.insert(user).values({
                email: body.email,
                password: body.password,
                firstname: body.firstname,
                lastname: body.lastname,
            }).returning())
            .andThen((r) => oneOrThrow(r, new DbException("Failed to create user")))
            .map(mapUserToEntity);
    },

    list: (page, limit) => {
        return op(
            db
                .select({
                    user,
                    total: sql<number>`count(*) over()`
                })
                .from(user)
                .limit(limit)
                .offset((page) * limit),
        ).map((e) => {
            return {
                users: e.map((row) => mapUserToEntity(row.user)),
                total: e.length > 0 ? e[0].total : 0
            }
        })
    },

    update: (id, body) => {
        return op(
            db.update(user).set({
                email: body.email,
                firstname: body.firstname,
                lastname: body.lastname,
                updatedAt: new Date(),
            }).where(eq(user.id, id)).returning()
        ).andThen((r) => oneOrThrow(r, new DbException("Failed to update user")))
            .map(mapUserToEntity);
    },
})