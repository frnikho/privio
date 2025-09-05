import {createContext} from "react";
import type {User} from "@privio/types/user";

export type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user?: User;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(undefined as never)

