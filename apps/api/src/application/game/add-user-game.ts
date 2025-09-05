import {AuthContext} from "@api/middleware/auth.middleware";
import {UserGameCreateBody} from "@privio/types/game";
import gameRepo from "@repo/game.repo";
import {db} from "@service/db.service";
import {optionToResult} from "@infra/utils/type.utils";
import {appException} from "@api/exception/app.exception";
import userGameRepo from "@repo/user-game.repo";

type Input = {
    auth: AuthContext;
    gameId: string;
    body: UserGameCreateBody,
}

type Output = {

}

export default ({auth, gameId, body}: Input) => {
    const pool = db;
    return gameRepo(pool).findById(gameId)
        .andThen((game) => optionToResult(game, appException('Game not found')))
        .andThen(() => userGameRepo(pool).add(auth.user.id, gameId, body))
}