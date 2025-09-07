import {Type} from "@sinclair/typebox";
import {TypeCompiler} from "@sinclair/typebox/compiler";

export const userGameSchema = Type.Object({
    game: Type.Object({
        id: Type.String(),
        title: Type.String(),
        description: Type.String(),
        genre: Type.String(),
        picture: Type.String(),
        releaseDate: Type.Date(),
        developer: Type.String(),
        publisher: Type.String(),
        rating: Type.Number(),
        createdAt: Type.Date(),
    }),
    rating: Type.Optional(Type.Integer({ minimum: 1, maximum: 5 })),
    timePlayed: Type.Optional(Type.Integer({ minimum: 0 })),
    notes: Type.Optional(Type.String({ minLength: 0, maxLength: 500 })),
});

export type UserGame = typeof userGameSchema;

export const userGameCreateSchema = Type.Object({
    gameId: Type.String(),
    rating: Type.Optional(Type.Integer({ minimum: 1, maximum: 5 })),
    timePlayed: Type.Optional(Type.Integer({ minimum: 0 })),
    notes: Type.Optional(Type.String({ minLength: 0, maxLength: 500 })),
});

export type UserGameCreateBody = typeof userGameCreateSchema;
export const userGameCreateReq = TypeCompiler.Compile(userGameCreateSchema);

export const userGameUpdateSchema = Type.Partial(userGameCreateSchema);
export const userGameUpdateReq = TypeCompiler.Compile(userGameUpdateSchema);
export type UserGameUpdateBody = typeof userGameUpdateSchema;