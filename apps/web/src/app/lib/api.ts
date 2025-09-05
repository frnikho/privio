import {type Game, type ListGame, type UserGameCreateBody} from "@privio/types/game";
import type {AuthLoginRequest, AuthRegisterReq} from "@privio/types/auth";
import type {User} from "@privio/types/user";
import type {ListUserGame} from "@privio/api/dist/domain/entity/game.entity.ts";

const ENDPOINT = import.meta.env.VITE_API_URL;

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
        getLatest: () => apiFetch<{200: ListGame}>('/game?sort=latest'),
        getMostRated: () => apiFetch<{200: ListGame}>('/game?sort=rated'),
        findById: (id: string) => apiFetch<{200: Game}>(`/game/${id}`),
        search: (query: string) => apiFetch<{200: ListGame}>(`/game?sort=search&title=${query}`),
        addToLibrary: (userId: string, body: UserGameCreateBody) => apiFetch<{200: void}>(`/user/${userId}/game`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }),
        listUserGames: (userId: string, page: number, limit: number) => {
            return apiFetch<{200: ListUserGame}>(`/user/${userId}/game?page=${page}&limit=${limit}`, {credentials: 'include'});
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