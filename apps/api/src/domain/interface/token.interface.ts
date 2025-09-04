import type { Option } from "fp-ts/Option";
import type { ResultAsync } from "neverthrow";
import {CacheException} from "@exceptions/cache.exception";

type Value = string | Bun.ArrayBufferView | Blob;
type Result<T> = ResultAsync<T, CacheException>

export type TokenInterface = {
    insert: (key: string, value: Value, expiration?: number) => Result<void>;
    get: (key: string) => Result<Option<String>>;
    delete: (key: string) => Result<void>;
    deleteAll: (key: string) => Result<void>;
};