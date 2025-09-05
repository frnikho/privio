import {Router, Response} from "express";
import {extractPaginationFromQuery, PaginationQuery, Req} from "@api/utils/request";
import {response} from "@api/utils/response";
import listUser from "@application/user/list-user";
import {withAuth} from "@api/middleware/auth.middleware";
import {listUserSchema} from "@privio/types/user";

const list = (req: Req<unknown, PaginationQuery>, res: Response) => {
    const pagination = extractPaginationFromQuery(req);
    return response(res, listUser({pagination}), listUserSchema)
}

const listGame = (req: Req, res: Response) => {

}

const addGame = (req: Req, res: Response) => {

}

const updateGame = (req: Req, res: Response) => {

}

const deleteGame = (req: Req, res: Response) => {

}

export default Router()
    .get('/', withAuth(), list)
    .get('/:userId', (req, res) => {})
    .patch('/:userId', (req, res) => {})
    .get('/:userId/game', withAuth(), listGame)
    .post('/:userId/game', withAuth(), addGame)
    .patch('/:userId/game', withAuth(), updateGame)
    .delete('/:userId/game', withAuth(), deleteGame)
