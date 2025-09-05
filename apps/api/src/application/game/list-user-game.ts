import userGameRepo from "@repo/user-game.repo";
import {db} from "@service/db.service";
import {Pagination} from "@api/utils/request";

type Input = {
    userId: string;
    pag: Pagination;
}

export default ({userId, pag}: Input) => {
    return userGameRepo(db).list(userId, pag.page, pag.limit);
}