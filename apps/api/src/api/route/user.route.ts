import {Router, Response, Request} from "express";
import {extractPaginationFromQuery, PaginationQuery, Req} from "@api/utils/request";
import {handleResponse, response} from "@api/utils/response";
import listUser from "@application/user/list-user";
import {withAuth} from "@api/middleware/auth.middleware";
import {listUserSchema} from "@privio/types/user";
import {validate} from "@api/middleware/validation.middleware";
import {userGameCreateReq, userGameUpdateReq} from "@privio/types/user-game";
import listUserGame from "@application/game/list-user-game";
import addUserGame from "@application/game/add-user-game";
import updateUserGame from "@application/game/update-user-game";
import removeUserGame from "@application/game/remove-user-game";
import getUserGame from "@application/game/get-user-game";

const list = (req: Req<unknown, PaginationQuery>, res: Response) => {
    const pagination = extractPaginationFromQuery(req);
    return response(res, listUser({pagination}), listUserSchema)
}

const listGame = (req: Request<{userId: string}>, res: Response) => {
    const pagination = extractPaginationFromQuery(req);
    return response(res, listUserGame({userId: req.params.userId, pag: pagination}))
}

const addGame = (req: Request<{userId: string}>, res: Response) => {
    return handleResponse(res, addUserGame({auth: req.auth, body: req.body}), () => {
        return res.status(201).send();
    })
}

const updateGame = (req: Request<{userId: string, gameId: string}>, res: Response) => {
    return handleResponse(res, updateUserGame({gameId: req.params.gameId, userId: req.params.userId, body: req.body}), () => {
        return res.status(200).send();
    })
}

const deleteGame = (req: Request<{userId: string, gameId: string}>, res: Response) => {
    return handleResponse(res, removeUserGame({gameId: req.params.gameId, userId: req.params.userId}), () => {
        return res.status(204).send();
    })
}

const getGame = (req: Request<{userId: string, gameId: string}>, res: Response) => {
    return response(res, getUserGame({gameId: req.params.gameId, userId: req.params.userId}));
}

export default Router()
    .get('/', withAuth(), list)
    .get('/:userId', (req, res) => {})
    .patch('/:userId', (req, res) => {})
    .get('/:userId/game', withAuth(), listGame)
    .post('/:userId/game', validate({body: userGameCreateReq}), withAuth(), addGame)
    .get('/:userId/game/:gameId', withAuth(), getGame)
    .patch('/:userId/game/:gameId', validate({body: userGameUpdateReq}), withAuth(), updateGame)
    .delete('/:userId/game/:gameId', withAuth(), deleteGame)
