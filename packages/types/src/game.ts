import {Static, Type} from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {userSchema} from "./user";

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

export const createGameSchema = Type.Object({
    title: Type.String({ minLength: 1, maxLength: 100 }),
    description: Type.String({ minLength: 1, maxLength: 1000 }),
    genre: Type.String({ minLength: 1, maxLength: 100 }),
    picture: Type.String(),
    releaseDate: Type.String(),
    developer: Type.String({ minLength: 1, maxLength: 100 }),
    publisher: Type.String({ minLength: 1, maxLength: 100 }),
    rating: Type.Number(),
});

export type CreateGameBody = Static<typeof createGameSchema>;
export type UpdateGameBody = Partial<CreateGameBody>;
export const createGameReq = TypeCompiler.Compile(createGameSchema);
export const updateGameReq = TypeCompiler.Compile(Type.Partial(createGameSchema));

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
    createdAt: Type.Date(),
});

export type UserGame = Static<typeof userGameSchema>;

export const listUserGameSchema = Type.Object({
    userGames: Type.Array(userGameSchema),
    games: Type.Array(userGameSchema),
    total: Type.Integer(),
});

export type ListUserGame = Static<typeof listUserGameSchema>;

export const userGameCreateSchema = Type.Object({
    gameId: Type.String({ format: 'uuid' }),
    rating: Type.Optional(Type.Integer({ minimum: 1, maximum: 5 })),
    timePlayed: Type.Optional(Type.Integer({ minimum: 0 })),
    notes: Type.Optional(Type.String({ minLength: 1, maxLength: 500 })),
});
export type UserGameCreateBody = Static<typeof userGameCreateSchema>;

export const userGameUpdateSchema = Type.Partial(userGameCreateSchema);
export type UserGameUpdateBody = Static<typeof userGameUpdateSchema>;

const reviewSchema = Type.Object({
    user: userSchema,
    review: Type.Object({
        rating: Type.Optional(Type.Integer()),
        timePlayed: Type.Optional(Type.Integer()),
        notes: Type.Optional(Type.String()),
        createdAt: Type.Date(),
    })
});

export type Review = Static<typeof reviewSchema>;

export const listReviewSchema = Type.Object({
    reviews: Type.Array(reviewSchema),
    total: Type.Integer(),
});

export type ListReview = Static<typeof listReviewSchema>;