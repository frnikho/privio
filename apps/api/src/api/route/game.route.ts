import {Router, Response, Request} from "express";
import {extractPaginationFromQuery, Req} from "@api/utils/request";
import {
    CreateGameBody,
    createGameReq,
    createGameSchema,
    GameListQuery,
    gameSchema,
    listReviewSchema
} from "@privio/types/game";
import {handleResponse, response, send} from "@api/utils/response";
import listGame from "@application/game/list-game";
import getGameById from "@application/game/get-game-by-id";
import {withAuth} from "@api/middleware/auth.middleware";
import {validate} from "@api/middleware/validation.middleware";
import createGame from "@application/game/create-game";
import deleteGame from "@application/game/delete-game";
import listReview from "@application/game/list-review";

const list = (req: Req<unknown, GameListQuery>, res: Response) => {
    const pagination = extractPaginationFromQuery(req);
    const query = req.query
    return response(res, listGame({limit: pagination.limit, page: pagination.page, sort: query?.sort ?? 'list', title: query?.title}));
}

const byId = (req: Request<{gameId: string}>, res: Response) => {
    return response(res, getGameById({gameId: req.params.gameId}), gameSchema);
}

const create = (req: Req<CreateGameBody>, res: Response) => {
    return handleResponse(res, createGame({auth: req.auth, body: req.body}), (game) => {
        return send(res.status(201), game, gameSchema);
    });
}

const _deleteGame = (req: Request<{gameId: string}>, res: Response) => {
    return handleResponse(res, deleteGame({gameId: req.params.gameId, auth: req.auth}), () => {
        return send(res.status(200), {message: 'Game deleted'});
    });
};

const _listReview = (req: Request<{gameId: string}>, res: Response) => {
    const pagination = extractPaginationFromQuery(req);
    return response(res, listReview({pagination, gameId: req.params.gameId}), listReviewSchema)
}

export default Router()
    .get('/', list)
    .post('/', withAuth(), validate({body: createGameReq}), create)
    .get('/:gameId', byId)
    .delete('/:gameId', withAuth(), _deleteGame)
    .get('/:gameId/reviews',_listReview)