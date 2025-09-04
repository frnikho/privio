import type { Option } from "fp-ts/Option";
import type { ResultAsync } from "neverthrow";
import {CreateUser, ListUser, PublicUser, UpdateUser, User} from "@entity/user.entity";
import {DbException} from "@exceptions/db.exception";

type Result<T> = ResultAsync<T, DbException>;

export type UserInterface = {
    create: (body: CreateUser) => Result<User>;
    list: (page: number, limit: number) => ResultAsync<ListUser, DbException>;
    findById: (id: string) => ResultAsync<Option<User>, DbException>;
    findByEmail: (email: string) => ResultAsync<Option<User>, DbException>;
    update: (id: string, body: UpdateUser) => ResultAsync<PublicUser, DbException>;
};
