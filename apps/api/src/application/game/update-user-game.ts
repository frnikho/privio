import {UpdateUserGame} from "@entity/game.entity";
import userGameRepo from "@repo/user-game.repo";
import {db} from "@service/db.service";

type Input = {
    userId: string;
    gameId: string;
    body: UpdateUserGame;
}

export default ({userId, body, gameId}: Input) => {
    return userGameRepo(db).update(userId, gameId, body);
}