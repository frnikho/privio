import {createToken} from "@service/jwt.service";
import tokenRepo from "@repo/token.repo";
import {RedisClient} from "bun";

const ACCESS_TOKEN_TTL = '7d';

export default (client: RedisClient) => ({
    createAccessToken: (sessionId: string, userId: string) => {
        return createToken({ sessionId, userId }, ACCESS_TOKEN_TTL).andThen((accessToken) =>
            tokenRepo(client).insert(`session:${userId}:${sessionId}`, "active").map(() => accessToken)
        );
    },

    invalidateSession: (sessionId: string, userId: string) => {
        return tokenRepo(client)
            .delete(`session:${userId}:${sessionId}`);
    }

})