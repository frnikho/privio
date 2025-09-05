import {createFileRoute, redirect, useRouter} from '@tanstack/react-router'
import {getGameById} from "@app/lib/api.ts";
import {Button, HStack, Text} from '@chakra-ui/react';
import {useAuth} from "@app/hooks/auth.hook.ts";
import {FaPlus} from "react-icons/fa";
import AddGameModal from "@app/components/modal/add-game-modal.tsx";
import {useState} from "react";
import type {Game} from "@privio/types/game";

export const Route = createFileRoute('/game/$gameId')({
    component: RouteComponent,
    loader: ({params}) => getGameById(params.gameId),
    onError: () => {
        throw redirect({to: '/'});
    }
})

function RouteComponent() {
    const game = Route.useLoaderData()
    const router = useRouter();

    if (!game) {
        return <div>Game not found</div>
    }

    const onGameAdd = () => {
        return router.invalidate()
    }

    return (
        <>
            <div className={'p-8'}>
                <Text className="text-3xl font-bold mb-4">{game.title}</Text>
                <div className={'flex flex-row gap-4'}>
                    <img src={game.picture} alt={game.title} className="h-[200px] w-[150px] object-cover mb-4 rounded-2xl"/>
                    <div className={"flex flex-col gap-6"}>
                        <div>
                            <p className={'text-sm'}>Description:</p>
                            <p className="text-lg">{game.description}</p>
                        </div>
                        <div className={'flex flex-row gap-16'}>
                            <div>
                                <p className={'text-sm'}>Genre:</p>
                                <p className="text-lg">{game.genre}</p>
                            </div>
                            <div>
                                <p className={'text-sm'}>Developer:</p>
                                <p className="text-lg">{game.developer}</p>
                            </div>
                            <div>
                                <p className={'text-sm'}>Publisher:</p>
                                <p className="text-lg">{game.publisher}</p>
                            </div>
                        </div>
                        <GameUserPanel game={game} onGameAdd={onGameAdd}/>
                    </div>
                </div>
            </div>
        </>
    )
}

function GameUserPanel({game, onGameAdd}: {game: Game, onGameAdd: () => void}) {
    const {user, isAuthenticated} = useAuth();
    const [open, setOpen] = useState(false);

    if (!isAuthenticated || !user) {
        return;
    }

    return (
        <>
            <AddGameModal game={game} open={open} updateOpen={setOpen} userId={user.id} onGameAdded={() => {
                setOpen(false);
                onGameAdd();
            }}/>
            <HStack>
                <Button onClick={() => setOpen(true)}>Ajouter à ma librairie <FaPlus className={'w-2'}/></Button>
            </HStack>
        </>
    );
}