import type {Game, ListGame} from "@privio/types/game";
import type {AuthRegisterReq} from "@privio/types/auth";
import type {User} from "@privio/types/user";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const getLatestGames = (): Promise<ListGame> => {
    return fetch(`${ENDPOINT}/game?sort=latest`).then((d) => d.json());
}

export const getMostRatedGame = (): Promise<ListGame> => {
    return fetch(`${ENDPOINT}/game?sort=rated`).then((d) => d.json());
}

export const getMe = (): Promise<User> => {
    return fetch(`${ENDPOINT}/auth/me`, {credentials: 'include'}).then((d) => d.json());
}

export const getGameById = (id: string): Promise<Game> => {
    return fetch(`${ENDPOINT}/game/${id}`).then((d) => d.json());
}

export const searchGame = (query: string): Promise<ListGame> => {
    return fetch(`${ENDPOINT}/game?sort=search&title=${query}`).then((d) => d.json());
}

export const login = (email: string, password: string) => {
    return fetch(`${ENDPOINT}/auth/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
}

export const register = (body: AuthRegisterReq) => {
    return fetch(`${ENDPOINT}/auth/register`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}