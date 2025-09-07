import {
    type CreateGameBody,
    type Game,
    type ListGame, type ListReview,
    type ListUserGame, type UpdateGameBody,
    type UserGame,
    type UserGameCreateBody, type UserGameUpdateBody
} from "@privio/types/game";
import type {AuthLoginRequest, AuthRegisterReq} from "@privio/types/auth";
import type {User} from "@privio/types/user";

const ENDPOINT = (window as any).__ENV__?.API_URL ?? "http://localhost:4000";

export const apiFetch = async <Schemas extends Record<number, any>>(path: string, options?: RequestInit): Promise<
    {
        [K in keyof Schemas]: { status: K; body: Schemas[K] }
    }[keyof Schemas]
> => {
    const res = await fetch(`${ENDPOINT}${path}`, options);
    const json = await res.json().catch(() => ({}));
    return {
        status: res.status as keyof Schemas,
        body: json,
    } as any;
};

export const api = {
    auth: {
        getMe: () => apiFetch<{200: User}>('/auth/me', {credentials: 'include'}),
        login: (body: AuthLoginRequest) => {
            return apiFetch<{ 200: User }>('/auth/login', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        },
        register: (body: AuthRegisterReq) => {
            return apiFetch<{ 200: User }>('/auth/register', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        }
    },
    game: {

        create: (body: CreateGameBody) => {
            return apiFetch<{201: Game}>('/game', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        },

        update: (id: string, body: UpdateGameBody) => {
            return apiFetch<{200: Game}>(`/game/${id}`, {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        },

        delete: (id: string) => {
            return apiFetch<{200: void}>(`/game/${id}`, {
                credentials: 'include',
                method: 'DELETE',
            })
        },

        getLatest: () => apiFetch<{200: ListGame}>('/game?sort=latest'),

        getMostRated: () => apiFetch<{200: ListGame}>('/game?sort=rated'),

        findById: (id: string) => apiFetch<{200: Game}>(`/game/${id}`),

        search: (query: string) => apiFetch<{200: ListGame}>(`/game?sort=search&title=${query}`),

        addToLibrary: (userId: string, body: UserGameCreateBody) => apiFetch<{201: void}>(`/user/${userId}/game`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }),

        updateUserGame: (userId: string, gameId: string, body: UserGameUpdateBody) => {
            return apiFetch<{200: void}>(`/user/${userId}/game/${gameId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        },

        list: (page: number, limit: number) => {
            return apiFetch<{200: ListGame}>(`/game?page=${page}&limit=${limit}`);
        },

        listUserGames: (userId: string, page: number, limit: number) => {
            return apiFetch<{200: ListUserGame}>(`/user/${userId}/game?page=${page}&limit=${limit}`, {credentials: 'include'});
        },

        getUserGame: (userId: string, gameId: string) => {
            return apiFetch<{200: UserGame}>(`/user/${userId}/game/${gameId}`, {credentials: 'include'});
        },

        deleteUserGame: (userId: string, gameId: string) => {
            return apiFetch<{200: void}>(`/user/${userId}/game/${gameId}`, {method: 'DELETE', credentials: 'include'});
        },

        listReviews: (gameId: string, page: number, limit: number) => {
            return apiFetch<{200: ListReview}>(`/game/${gameId}/reviews?page=${page}&limit=${limit}`);
        },

    }}

export const getMe = (): Promise<User> => {
    return fetch(`${ENDPOINT}/auth/me`, {credentials: 'include'}).then((d) => d.json());
}

export const getGameById = (id: string): Promise<Game> => {
    return fetch(`${ENDPOINT}/game/${id}`).then((d) => d.json());
}

export const searchGame = (query: string): Promise<ListGame> => {
    return fetch(`${ENDPOINT}/game?sort=search&title=${query}`).then((d) => d.json());
}

