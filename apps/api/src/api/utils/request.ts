import {Request} from "express";

export type Req<B = any, Q = any> = Request<any, any, B, Q>;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export type PaginationQuery = {
    page?: number;
    limit?: number;
} | undefined;

export type Pagination = {
    limit: number;
    page: number;
}

export const extractPaginationFromQuery = ({query}: {query: PaginationQuery}): Pagination => {
    let page = DEFAULT_PAGE;
    let limit = DEFAULT_LIMIT;

    if (query) {
        if (query.page && Number.isInteger(Number(query.page)) && Number(query.page) > 0) {
            page = Number(query.page);
        }
        if (query.limit && Number.isInteger(Number(query.limit)) && Number(query.limit) > 0 && Number(query.limit) <= 100) {
            limit = Number(query.limit);
        }
    }

    return {limit, page};
}