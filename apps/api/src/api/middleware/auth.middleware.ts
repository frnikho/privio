import {NextFunction, Request, Response} from 'express';
import {verifyToken} from "@service/jwt.service";
import tokenRepo from "@repo/token.repo";
import {redisClient} from "@service/cache.service";
import {optionToResult} from "@infra/utils/type.utils";
import {appException} from "@api/exception/app.exception";
import userRepo from "@repo/user.repo";
import {db} from "@service/db.service";
import {User} from "@entity/user.entity";

export type AuthContext = {
    user: User;
    accessToken: string;
}

declare global {
    namespace Express {
        interface Request {
            auth: AuthContext
        }
    }
}

export function withAuth() {
    return (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const result = verifyToken(accessToken)
            .andThen(({payload}) => {
                const client = redisClient();
                return tokenRepo(client).get(`session:${payload.userId}:${payload.sessionId}`)
                    .andThen((r) => optionToResult(r, appException('Session not found')))
                    .map(() => ({payload}));
            })
            .andThen(({payload}) => userRepo(db).findById(payload.userId))
            .andThen((usr) => optionToResult(usr, appException('User not found')))

        return result.match((user) => {
            req.auth = {
                user,
                accessToken,
            }
            return next();
        }, (err) => {
            console.info(err);
            return res.status(401).json({ message: 'Unauthorized' });
        })
    }
}