export type Game = {
    id: string;
    title: string;
    description: string;
    genre: string;
    releaseDate: Date;
    picture: string;
    developer: string;
    publisher: string;
    rating: number;
    createdAt: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

export type CreateGame = {
    title: string;
    description: string;
    genre: string;
    picture: string;
    releaseDate: Date;
    developer: string;
    publisher: string;
    rating: number;
    createdBy?: string;
}

export type UpdateGame = {
    title?: string;
    description?: string;
    genre?: string;
    releaseDate?: Date;
    developer?: string;
    publisher?: string;
    rating?: number;
    updatedBy?: string;
}

export type ListGame = {
    games: Game[];
    total: number;
}

export type UserGame = {
    game: Game,
    rating?: number;
    timePlayed?: number;
    createdAt: Date;
}

export type CreateUserGame = {
    rating?: number;
    timePlayed?: number;
    notes?: string;
};

export type UpdateUserGame = {
    rating?: number;
    timePlayed?: number;
    notes?: string;
}

export type ListUserGame = {
    userGames: UserGame[];
    total: number;
}