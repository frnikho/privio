import type { Option } from "fp-ts/Option";
import type { ResultAsync } from "neverthrow";
import {DbException} from "@exceptions/db.exception";
import {CreateGame, Game, ListGame, UpdateGame} from "@entity/game.entity";

type Result<T> = ResultAsync<T, DbException>;

export type GameInterface = {
    create: (body: CreateGame[]) => Result<Game>;
    findLatest: () => ResultAsync<ListGame, DbException>;
    findMostRated: () => ResultAsync<ListGame, DbException>;
    list: (page: number, limit: number) => ResultAsync<ListGame, DbException>;
    search: (title: string, page: number, limit: number) => ResultAsync<ListGame, DbException>;
    findById: (id: string) => ResultAsync<Option<Game>, DbException>;
    update: (id: string, body: UpdateGame) => ResultAsync<Game, DbException>;
};