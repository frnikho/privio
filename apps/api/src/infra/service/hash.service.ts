import { fromPromise, type ResultAsync } from "neverthrow";
import {HashException} from "@exceptions/hash.exception";

export const secretConfig: Bun.Password.Argon2Algorithm = {
    algorithm: "argon2id",
    memoryCost: 4,
    timeCost: 3,
};

type HashSecretInput = {
    secret: string;
    hashedSecret: string;
};

export const hashSecret = ({ secret }: { secret: string }): ResultAsync<string, HashException> => {
    return fromPromise(Bun.password.hash(secret, secretConfig), () => new HashException("Error while hashing secret !"));
};

export const verifySecret = ({ secret, hashedSecret }: HashSecretInput): ResultAsync<boolean, HashException> => {
    return fromPromise(
        Bun.password.verify(secret, hashedSecret, secretConfig.algorithm),
        () => new HashException("Error while hashing password"),
    );
};
