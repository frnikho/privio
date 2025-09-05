import { useContext } from "react";
import {AuthContext, type AuthContextType} from "@context/auth.context.ts";

export function useAuth() {
    return useContext<AuthContextType>(AuthContext);
}
