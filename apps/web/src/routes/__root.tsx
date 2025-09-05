import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from "@app/components/header.tsx";
import {AuthContextProvider} from "@provider/auth.provider.tsx";
import {Provider} from "@components/ui/provider.tsx";
import {Toaster} from "@components/ui/toaster.tsx";

const queryClient = new QueryClient()

const RootLayout = () => {

    return (
        <>
            <Provider>
                <QueryClientProvider client={queryClient}>
                    <AuthContextProvider ctx={{isAuthenticated: false}}>
                        <Header/>
                        <Outlet />
                        <Toaster />
                    </AuthContextProvider>
                </QueryClientProvider>
                <TanStackRouterDevtools />
            </Provider>
        </>
    )
}

export const Route = createRootRoute({ component: RootLayout })