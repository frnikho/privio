import gameRepo from "@repo/game.repo";
import {db} from "@service/db.service";
import {CreateGameBody} from "@privio/types/game";
import {AuthContext} from "@api/middleware/auth.middleware";

type Input = {
    auth: AuthContext;
    gameId: string
}

export default ({auth, gameId}: Input) => {
    return gameRepo(db).delete(gameId);
}