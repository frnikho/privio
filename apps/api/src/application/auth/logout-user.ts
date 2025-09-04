import {AuthContext} from "@api/middleware/auth.middleware";
import {verifyToken} from "@service/jwt.service";
import {redisClient} from "@service/cache.service";
import tokenService from "@service/token.service";

export type Input = {
    auth: AuthContext
}

export default function ({auth}: Input) {
    return verifyToken(auth.accessToken).andThen(({payload}) => {
        const client = redisClient();
        return tokenService(client).invalidateSession(auth.user.id, payload.sessionId);
    });
}