import * as entity from '@entity/user.entity';
import { InferSelectModel } from "drizzle-orm";
import {user} from "@schema/user.schema";
import {Option} from "fp-ts/Option";
import {mapOption} from "@infra/utils/type.utils";

type User = InferSelectModel<typeof user>;

export const mapUserToEntity = (row: User): entity.User => {
    return {
        ...row,
        updatedAt: row.updatedAt ?? undefined,
        updatedBy: row.updatedBy ?? undefined,
        deletedAt: row.deletedAt ?? undefined,
        deletedBy: row.deletedBy ?? undefined,
    };
};

export const mapUserOption = (row: Option<User>) => mapOption(row, mapUserToEntity);
export const mapUsersToEntities = (rows: User[]) => rows.map(mapUserToEntity);
