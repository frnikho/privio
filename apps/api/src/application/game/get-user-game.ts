import {UserGame} from "@privio/types/game";
import userGameRepo from "@repo/user-game.repo";
import {db} from "@service/db.service";
import {optionToResult} from "@infra/utils/type.utils";
import {appException} from "@api/exception/app.exception";

type Input = {
    userId: string;
    gameId: string;
}

type Output = UserGame

export default ({userId, gameId}: Input) => {
    return userGameRepo(db).get(userId, gameId)
        .andThen((r) => optionToResult(r, appException('User game not found')));
}