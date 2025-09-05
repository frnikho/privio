import {useQuery} from "@tanstack/react-query";
import {GameJacket} from "@app/components/game-jacket.tsx";
import {Text} from "@chakra-ui/react";
import {api} from "@app/lib/api.ts";

export default function MostRatedGame() {

    const {data, error, isLoading} = useQuery({queryKey: ['most-rated-game'], queryFn: api.game.getMostRated});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>Error unknown</div>;
    }

    if (data) {
        return (
            <div className="p-8">
                <Text className={'text-3xl font-semibold mb-4'}>Les Jeux les mieux notés</Text>
                <div className="flex flex-row overflow-auto gap-4 w-full scrollbar pb-4">
                    {data.body.games.map((game) => (
                        <GameJacket key={game.id} game={game}/>
                    ))}
                </div>
            </div>
        );
    }

  return <div>LatestGame</div>;
}