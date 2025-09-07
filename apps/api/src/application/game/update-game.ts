import {UpdateGameBody} from "@privio/types/game";
import {AuthContext} from "@api/middleware/auth.middleware";
import gameRepo from "@repo/game.repo";
import {db} from "@service/db.service";

type Input = {
    gameId: string;
    auth: AuthContext;
    body: UpdateGameBody;
}

export default function ({body, auth, gameId}: Input)  {
    return gameRepo(db).update(gameId, {
        updatedBy: auth.user.id,
        ...body,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : undefined,
    })
}