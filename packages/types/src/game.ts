import {Static, Type} from "@sinclair/typebox";

export const gameSchema = Type.Object({
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
});
export type Game = Static<typeof gameSchema>;

export const listGameSchema = Type.Object({
    games: Type.Array(gameSchema),
    total: Type.Integer(),
});
export type ListGame = Static<typeof listGameSchema>;


const listQuerySort = Type.Union([
    Type.Literal('latest'),
    Type.Literal('rated'),
    Type.Literal('search')
]);

export const gameListQuery = Type.Optional(Type.Object({
    sort: listQuerySort,
    title: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
    page: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000})),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100})),
}));

export type GameListQuery = Static<typeof gameListQuery>;

export const userGameSchema = Type.Object({
    game: gameSchema,
    rating: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
    timePlayed: Type.Optional(Type.Integer({ minimum: 0 })),
    notes: Type.Optional(Type.String({ minLength: 1, maxLength: 500 })),
})

export const userGameCreateSchema = Type.Object({
    gameId: Type.String({ format: 'uuid' }),
    rating: Type.Optional(Type.Integer({ minimum: 1, maximum: 5 })),
    timePlayed: Type.Optional(Type.Integer({ minimum: 0 })),
    notes: Type.Optional(Type.String({ minLength: 1, maxLength: 500 })),
});
export type UserGameCreateBody = Static<typeof userGameCreateSchema>;

export const userGameUpdateSchema = Type.Partial(userGameCreateSchema);
export type UserGameUpdateBody = Static<typeof userGameUpdateSchema>;