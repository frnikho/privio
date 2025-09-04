import {Response} from 'express';
import {ResultAsync} from "neverthrow";
import {TSchema} from "@sinclair/typebox";
import {AppException} from "@exceptions/app.exception";
import { Value } from "@sinclair/typebox/value";

export const response = <T, Z, S extends TSchema>(res: Response, result: ResultAsync<T, Error>, schema?: S) => {
    return result.match((data) => {
        return send(res.status(200), data, schema);
    }, (err) => {
        return res.status(400).json(err);
    });
};

export const send = <T, S extends TSchema>(res: Response, value: T, schema?: S) => {
    if (schema) {
        return res.send(Value.Clean(schema, value))
    }
    return res.send(value);
}

export const handleResponse = <T, Z>(res: Response, result: ResultAsync<T, AppException>, fn: (data: T) => Z) => {
    return result.match((data) => {
        return fn(data);
    }, (err) => {
        return res.status(400).json(err);
    });
};


/*
export const cleanSchema = <S extends TSchema, T extends TypeCheck<S>, Z>(schema: T, value: Z): S => {
   return Result.fromThrowable(
       () => schema.Decode(value),
       () => appException('', StatusCodes.INTERNAL_SERVER_ERROR),
   )
}*/
