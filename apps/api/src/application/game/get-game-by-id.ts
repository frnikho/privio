import {ResultAsync} from "neverthrow";
import {AppException} from "@exceptions/app.exception";
import gameRepo from "@repo/game.repo";
import {db} from "@service/db.service";
import {Game} from "@privio/types/game";
import {optionToResult} from "@infra/utils/type.utils";
import {appException} from "@api/exception/app.exception";

type Input = {
    gameId: string;
}

type Output = Game;

export default ({gameId}: Input): ResultAsync<Output, AppException> => {
    return gameRepo(db).findById(gameId)
        .andThen((r) => optionToResult(r, appException('Game not found')));
}