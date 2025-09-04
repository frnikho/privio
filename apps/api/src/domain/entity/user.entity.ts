export type User = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
};

export type PublicUser = Omit<User, "password">;

export type CreateUser = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    createdBy?: string;
};

export type UpdateUser = {
    email?: string;
    firstname?: string;
    lastname?: string;
    updatedBy?: string;
};

export type ListUser = {
    users: User[];
    total: number;
}