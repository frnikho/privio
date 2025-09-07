import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Text} from '@chakra-ui/react';
import ListUserGame from "@app/components/game/list-user-game.tsx";
import {useAuth} from "@app/hooks/auth.hook.ts";

export const Route = createFileRoute('/library/')({
  component: RouteComponent,
})

function RouteComponent() {

    const {user} = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return navigate({to: '/'});
    }

    return (
        <div className={'px-8 py-4 flex flex-col gap-8'}>
            <Text className={'text-4xl'}>Ma bibliothèque</Text>
            <ListUserGame userId={user.id}/>
        </div>
    )
}
