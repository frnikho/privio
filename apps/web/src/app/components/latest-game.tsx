import {useQuery} from "@tanstack/react-query";
import {getLatestGames} from "@app/lib/api.ts";
import {GameJacket} from "@app/components/game-jacket.tsx";
import {Text} from "@chakra-ui/react";

export default function LatestGame() {

    const {data, error, isLoading} = useQuery({queryKey: ['latest-game'], queryFn: getLatestGames});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error unknown</div>;
    }

    if (data) {
        return (
            <div className="p-8">
                <Text className={'text-3xl font-semibold mb-4'}>Derniers jeux ajoutés</Text>
                <div className="flex flex-row overflow-auto gap-4 w-full scrollbar pb-4">
                    {data.games.map((game) => (
                        <GameJacket key={game.id} game={game}/>
                    ))}
                </div>
            </div>
        );
    }

  return <div>LatestGame</div>;
}