import {Router, Response, Request} from "express";
import {extractPaginationFromQuery, Req} from "@api/utils/request";
import {GameListQuery, gameSchema} from "@privio/types/game";
import {response} from "@api/utils/response";
import listGame from "@application/game/list-game";
import getGameById from "@application/game/get-game-by-id";

const list = (req: Req<unknown, GameListQuery>, res: Response) => {
    const pagination = extractPaginationFromQuery(req);
    const query = req.query
    return response(res, listGame({limit: pagination.limit, page: pagination.page, sort: query?.sort ?? 'list', title: query?.title}));
}

const byId = (req: Request<{gameId: string}>, res: Response) => {
    return response(res, getGameById({gameId: req.params.gameId}), gameSchema);
}

export default Router()
    .get('/', list)
    .get('/:gameId', byId)