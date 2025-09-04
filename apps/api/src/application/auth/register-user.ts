import {AuthRegisterReq} from "@privio/types/auth";
import {User} from "@entity/user.entity";
import userRepo from "@repo/user.repo";
import {db} from "@service/db.service";
import {errAsync, okAsync, ResultAsync} from "neverthrow";
import {isSome} from "fp-ts/Option";
import {AppException} from "@exceptions/app.exception";
import {appException} from "@api/exception/app.exception";
import {hashSecret} from "@service/hash.service";
import tokenService from "@service/token.service";
import {redisClient} from "@service/cache.service";
import {createId} from "@paralleldrive/cuid2";

type Input = {
    body: AuthRegisterReq;
}

type Output = {
    user: User;
    accessToken: string;
}

export default function ({body}: Input): ResultAsync<Output, AppException> {

    const userInterface = userRepo(db);

    const createdUser = userInterface.findByEmail(body.email)
        .andThen((existingUser) => {
            if (isSome(existingUser)) {
                return errAsync(appException('User with this email already exists', 400));
            }
            return okAsync(existingUser);
        })
        .andThen(() => hashSecret({secret: body.password}))
        .andThen((password) => userInterface.create({
            ...body,
            password
        }));

    return createdUser.andThen((user) => {
        const client = redisClient();
        const sessionId = createId();

        return tokenService(client).createAccessToken(sessionId, user.id)
            .map((accessToken) => ({
                user,
                accessToken
            }))
    });
}