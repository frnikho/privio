import {ResultAsync} from "neverthrow";
import {DbException} from "@exceptions/db.exception";
import {CreateUserGame, ListUserGame, UpdateUserGame, UserGame} from "@entity/game.entity";

type Result<T> = ResultAsync<T, DbException>;

export type UserGameInterface = {
    list: (userId: string, page: number, limit: number) => Result<ListUserGame>;
    add: (userId: string, gameId: string, body: CreateUserGame) => Result<void>;
    remove: (userId: string, gameId: string) => Result<void>;
    update: (userId: string, gameId: string, body: UpdateUserGame) => Result<void>;
};