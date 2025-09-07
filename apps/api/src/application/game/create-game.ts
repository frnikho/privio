import gameRepo from "@repo/game.repo";
import {db} from "@service/db.service";
import {CreateGameBody} from "@privio/types/game";
import {AuthContext} from "@api/middleware/auth.middleware";

type Input = {
    auth: AuthContext;
    body: CreateGameBody;
}

export default ({auth, body}: Input) => {
    return gameRepo(db).create([{
        ...body,
        releaseDate: new Date(body.releaseDate),
        createdBy: auth.user.id,
    }]);
}