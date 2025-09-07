import {ResultAsync} from "neverthrow";
import {DbException} from "@exceptions/db.exception";
import {CreateUserGame, ListReview, ListUserGame, UpdateUserGame, UserGame} from "@entity/game.entity";
import {Option} from "fp-ts/Option";

type Result<T> = ResultAsync<T, DbException>;

export type UserGameInterface = {
    list: (userId: string, page: number, limit: number) => Result<ListUserGame>;
    add: (userId: string, gameId: string, body: CreateUserGame) => Result<void>;
    get: (userId: string, gameId: string) => Result<Option<UserGame>>;
    remove: (userId: string, gameId: string) => Result<void>;
    update: (userId: string, gameId: string, body: UpdateUserGame) => Result<void>;
    listReviews: (gameId: string, page: number, limit: number) => Result<ListReview>;
};