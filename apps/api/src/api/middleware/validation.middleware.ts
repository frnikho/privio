import {NextFunction, Request, Response} from 'express';
import type { TSchema } from "@sinclair/typebox";
import type { TypeCheck } from "@sinclair/typebox/compiler";

export function validate<B extends TypeCheck<TSchema>, Q extends TypeCheck<TSchema>>({body, query}: {body?: B, query?: Q}) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = [
            ...body?.Errors(req.body) ?? [],
            ...query?.Errors(req.query) ?? [],
        ];
        if (errors.length === 0) {
            return next();
        } else {
            return res.status(400).json({ errors });
        }
    }

}