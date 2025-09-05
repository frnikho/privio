import {createFileRoute, redirect} from '@tanstack/react-router'
import {getGameById} from "@app/lib/api.ts";
import {Text} from '@chakra-ui/react';

export const Route = createFileRoute('/game/$gameId')({
    component: RouteComponent,
    loader: ({params}) => getGameById(params.gameId),
    onError: () => {
        console.log('redirect !');
        throw redirect({to: '/'});
    }
})

function RouteComponent() {
    const game = Route.useLoaderData();

    if (!game) {
        return <div>Game not found</div>
    }

    return <div className={'p-8'}>
        <Text className="text-3xl font-bold mb-4">{game.title}</Text>
        <div className={'flex flex-row gap-4'}>
            <img src={game.picture} alt={game.title} className="h-[200px] w-[150px] object-cover mb-4 rounded-2xl"/>
            <div className={"flex flex-col gap-4"}>
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

            </div>
        </div>

    </div>
}
