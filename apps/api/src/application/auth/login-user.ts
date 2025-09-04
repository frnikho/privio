import {AuthLoginRequest} from "@privio/types/auth";
import {User} from "@entity/user.entity";
import {errAsync, okAsync, ResultAsync} from "neverthrow";
import {AppException} from "@exceptions/app.exception";
import userRepo from "@repo/user.repo";
import {db} from "@service/db.service";
import {optionToResult} from "@infra/utils/type.utils";
import {appException} from "@api/exception/app.exception";
import {verifySecret} from "@service/hash.service";
import tokenService from "@service/token.service";
import {redisClient} from "@service/cache.service";
import {createId} from "@paralleldrive/cuid2";

type Input = {
    body: AuthLoginRequest;
}

type Output = {
    user: User;
    accessToken: string;
}

export default function ({body}: Input): ResultAsync<Output, AppException> {
    const user = userRepo(db)
        .findByEmail(body.email)
        .andThen((user) => optionToResult(user, appException('User not found')))
        .andThen((user) => {
            return verifySecret({secret: body.password, hashedSecret: user.password})
                .andThen((valid) => {
                    if (!valid) {
                        return errAsync(appException('Invalid credentials'));
                    }
                    return okAsync(user);
                })
                .map(() => user)
        });

    return user.andThen((user) => {
        const client = redisClient();
        const sessionId = createId();

        return tokenService(client)
            .createAccessToken(sessionId, user.id)
            .map((accessToken) => ({accessToken, user}));
    })
}