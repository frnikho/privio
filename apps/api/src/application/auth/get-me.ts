import {AuthContext} from "@api/middleware/auth.middleware";
import {User} from "@privio/types/user";
import {okAsync} from "neverthrow";

export type Input = {
    auth: AuthContext
}

type Output = User;

export default function ({auth}: Input) {
    return okAsync(auth.user);
}