import * as entity from '@entity/game.entity';
import { InferSelectModel } from "drizzle-orm";
import {Option} from "fp-ts/Option";
import {mapOption} from "@infra/utils/type.utils";
import {game} from "@schema/game.schema";

type Game = InferSelectModel<typeof game>;

export const mapGameToEntity = (row: Game): entity.Game => {
    return {
        ...row,
        releaseDate: row.releaseDate,
        createdBy: row.createdBy ?? undefined,
        updatedAt: row.updatedAt ?? undefined,
        updatedBy: row.updatedBy ?? undefined,
        deletedAt: row.deletedAt ?? undefined,
        deletedBy: row.deletedBy ?? undefined,
    };
};

export const mapGameOption = (row: Option<Game>) => mapOption(row, mapGameToEntity);
export const mapGamesToEntities = (rows: Game[]) => rows.map(mapGameToEntity);