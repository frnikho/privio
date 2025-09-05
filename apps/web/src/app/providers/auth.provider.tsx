import {type PropsWithChildren, useCallback, useEffect, useState} from "react";
import {AuthContext, type AuthContextType} from "@context/auth.context";
import type {User} from "@privio/types/user";
import {useQuery} from "@tanstack/react-query";
import {api} from "@app/lib/api.ts";

type Props = Omit<AuthContextType, 'login' | 'logout' | 'isLoading'>

export function AuthContextProvider({ ctx, children }: PropsWithChildren<{ ctx: Props }>) {

    const {data, isLoading, isFetched} = useQuery({queryKey: ['get-me'], queryFn: api.auth.getMe});

    const [context, updateContext] = useState<Props>({user: ctx.user, isAuthenticated: ctx.isAuthenticated});

    const login = useCallback((user: User) => {
        return updateContext({user, isAuthenticated: true});
    }, []);

    const logout = useCallback(() => {
        return updateContext({user: undefined, isAuthenticated: false});
    }, []);

    useEffect(() => {
        if (isFetched && data) {
            if (data.status === 200) {
                updateContext({user: data.body, isAuthenticated: true});
            }
        }
    }, [isFetched, data]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated: context.isAuthenticated,
            isLoading,
            user: context.user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}
