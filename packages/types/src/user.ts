import { type Static, Type } from "@sinclair/typebox";
import {TypeCompiler} from "@sinclair/typebox/compiler";

export const userSchema = Type.Object({
    id: Type.String(),
    firstname: Type.String(),
    lastname: Type.String(),
    email: Type.String(),
    createdAt: Type.Date(),
});

export const userSchemaRes = TypeCompiler.Compile(userSchema);
export type User = Static<typeof userSchema>;

const updateUserRequest = Type.Partial(
    Type.Object({
        firstname: Type.String(),
        lastname: Type.String(),
    }),
);

export const listUserSchema = Type.Object({
    users: Type.Array(userSchema),
    total: Type.Number(),
});

export type ListUserSchema = Static<typeof listUserSchema>;