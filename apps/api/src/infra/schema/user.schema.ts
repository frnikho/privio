import { InferSelectModel } from "drizzle-orm";
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

type User = InferSelectModel<typeof user>;

/*export const mapUserToEntity = (row: User): entity.User => {
    return {
        ...row,
        password: row.password ?? undefined,
        profilePictureFile: row.profilePictureFile ?? undefined,
        profilePictureUpdatedAt: row.profilePictureUpdatedAt ?? undefined,
        profilePictureUpdatedBy: row.profilePictureUpdatedBy ?? undefined,
        updatedAt: row.updatedAt ?? undefined,
        createdBy: row.createdBy ?? undefined,
        updatedBy: row.updatedBy ?? undefined,
        deletedAt: row.deletedAt ?? undefined,
        deletedBy: row.deletedBy ?? undefined,
    };
};

export const mapUserOption = (row: Option<User>) => mapOption(row, mapUserToEntity);
export const mapUsersToEntities = (rows: User[]) => rows.map(mapUserToEntity);*/
