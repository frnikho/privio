import {Pagination} from "@api/utils/request";
import userGameRepo from "@repo/user-game.repo";
import {db} from "@service/db.service";

type Input = {
    gameId: string;
    pagination: Pagination;
}

export default ({gameId, pagination}: Input) => {
    return userGameRepo(db)
        .listReviews(gameId, pagination.page, pagination.limit);
}