import { FormatRegistry, type Static, Type } from "@sinclair/typebox";
import {TypeCompiler} from "@sinclair/typebox/compiler";

FormatRegistry.Set("email", (value) =>
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
        value,
    ),
);

const email = Type.String({ format: "email", minLength: 5, maxLength: 255, default: '' });
const password = Type.String({ minLength: 8, maxLength: 128 });

const authRegisterSchema = Type.Object({
    email,
    password,
    firstname: Type.String({ maxLength: 128, minLength: 2 }),
    lastname: Type.String({ maxLength: 128, minLength: 2 }),
});
export const authRegisterReq = TypeCompiler.Compile(authRegisterSchema);
export type AuthRegisterReq = Static<typeof authRegisterSchema>;

export const authLoginSchema = Type.Object({
    email,
    password,
});

export const authLoginReq = TypeCompiler.Compile(authLoginSchema);
export type AuthLoginRequest = Static<typeof authLoginSchema>;

