import {createFileRoute, redirect, useNavigate, useRouter} from '@tanstack/react-router'
import {api, getGameById} from "@app/lib/api.ts";
import {Button, HStack, Text} from '@chakra-ui/react';
import {useAuth} from "@app/hooks/auth.hook.ts";
import {FaPlus, FaStar, FaTrash} from "react-icons/fa";
import AddGameModal from "@app/components/modal/add-game-modal.tsx";
import {useMemo, useState} from "react";
import type {Game} from "@privio/types/game";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import type {User} from "@privio/types/user";
import {toaster} from "@components/ui/toaster.tsx";
import {FaPencil} from "react-icons/fa6";
import UpdateGameModal from "@app/components/modal/update-game.tsx";
import ConfirmModal from "@app/components/modal/confirm-modal.tsx";
import UpdateUserGameModal from "@app/components/modal/update-user-game-modal.tsx";
import GameReviews from "@app/components/game/game-reviews.tsx";

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
    const {user} = useAuth();

    if (!game) {
        return <div>Game not found</div>
    }

    const onGameUpdated = () => {
        return router.invalidate({})
    }

    return (
        <>
            <div className={'p-8'}>
                <Text className="text-3xl font-bold mb-4">{game.title}</Text>
                <div className={'flex flex-row gap-4 mb-10'}>
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
                        {user && <GameUserPanel game={game} onGameUpdated={onGameUpdated} user={user}/>}
                    </div>
                </div>
                <GameReviews game={game}/>
            </div>
        </>
    )
}

type GamePanelProps = {
    game: Game,
    onGameUpdated: () => void,
    user: User
}

type ModalType = {
    open: boolean,
    type: 'addUserGame' | 'updateGame' | 'confirm' | 'editUserGame';
}

function GameUserPanel({game, onGameUpdated, user}: GamePanelProps) {
    const [menu, setMenu] = useState<ModalType>({open: false, type: 'addUserGame'});
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const {data, refetch} = useQuery({
        queryKey: ['user_game', game.id],
        queryFn: () => api.game.getUserGame(user.id, game.id),
    });

    const userGame = useMemo(() => {
        if (data && data.body && data.body.game) {
            return data.body;
        }
        return null;
    }, [data]);

    const onClickRemove = () => {
        api.game.deleteUserGame(user.id, game.id).then(() => {
            toaster.create({title: 'Succès', description: "Le jeu a bien été retiré de votre collection", type: 'success'});
            return refetch();
        });
    }

    const deleteGame = () => {
        api.game.delete(game.id).then(() => {
            toaster.create({title: 'Succès', description: "Le jeu a bien été supprimé", type: 'success'});
            return navigate({to: '/game'});
        });
    }

    return (
        <>
            <UpdateGameModal game={game} open={menu.open && menu.type === 'updateGame'} updateOpen={(e) => setMenu({ ...menu, open: e})} onGameUpdated={() => {
                setMenu({open: false, type: 'updateGame'});
                onGameUpdated();
            }}/>
            <AddGameModal game={game} open={menu.open && menu.type === 'addUserGame'} updateOpen={(e) => setMenu({ ...menu, open: e})} userId={user.id} onGameAdded={async () => {
                setMenu({open: false, type: 'addUserGame'});
                await queryClient.invalidateQueries({queryKey: ['review']});
                await refetch();
                onGameUpdated();
            }}/>
            {userGame && <UpdateUserGameModal userGame={userGame} game={game} open={menu.open && menu.type === 'editUserGame'} updateOpen={(e) => setMenu({ ...menu, open: e})} userId={user.id} onGameAdded={async () => {
                setMenu({open: false, type: 'editUserGame'});
                await queryClient.invalidateQueries({queryKey: ['review']});
                await refetch();
                onGameUpdated();
            }}/>}
            <ConfirmModal title={`Supprimer ${game.title} ?`} open={menu.open && menu.type === 'confirm'} updateOpen={(e) => setMenu({ ...menu, open: e})} onConfirm={deleteGame}/>
            <div className={'flex flex-row gap-12'}>
                <HStack>
                    {!userGame && <Button onClick={() => setMenu({open: true, type: 'addUserGame'})}>Ajouter à ma librairie <FaPlus className={'w-2'}/></Button>}
                    {userGame && <Button variant={'surface'} onClick={onClickRemove}>Retirer de ma bibliothèque <FaTrash className={'w-2'}/></Button>}
                    {userGame && <Button onClick={() => setMenu({open: true, type: 'editUserGame'})} variant={'surface'} >Modifier mon avis <FaStar className={'w-3'}/></Button>}
                </HStack>
                <HStack>
                    <Button variant={'subtle'} onClick={() => setMenu({open: true, type: 'updateGame'})}>Mettre à jour <FaPencil className={'w-2'}/></Button>
                    <Button variant={'subtle'} onClick={() => setMenu({open: true, type: 'confirm'})} colorPalette={'red'}>Supprimer <FaTrash className={'w-2'}/></Button>
                </HStack>
            </div>
        </>
    );
}