import userGameRepo from "@repo/user-game.repo";
import {db} from "@service/db.service";

type Input = {
    userId: string;
    gameId: string;
}

export default ({userId, gameId}: Input) => {
    return userGameRepo(db).remove(userId, gameId);
}