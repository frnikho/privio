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

export default Router()
    //auth middleware .use(auth);
    .get('/', withAuth(), list)
    .get('/:userId', (req, res) => {})
    .patch('/:userId', (req, res) => {})