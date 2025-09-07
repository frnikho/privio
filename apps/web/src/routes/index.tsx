import {createFileRoute, useNavigate} from '@tanstack/react-router'
import LatestGame from "@app/components/game/latest-game.tsx";
import MostRatedGame from "@app/components/game/most-rated-game.tsx";
import SearchGamePanel from "@app/components/game/search-game-panel.tsx";
import {Button} from "@chakra-ui/react";
import {FaGamepad} from "react-icons/fa";

type GameSearch = {
    query?: string
}

export const Route = createFileRoute('/')({
    component: Index,
    validateSearch: (search): GameSearch => {
        return {
            query: search.page as (string | undefined)
        }
    }
})

function Index() {

    const navigate = useNavigate();

    return (
        <div className={'flex flex-col gap-12 px-8 py-4'}>
            <SearchGamePanel/>
            <LatestGame/>
            <MostRatedGame/>
            <Button onClick={() => navigate({to: '/game'})} className={'w-fit'}>Voir tout les jeux <FaGamepad/></Button>
        </div>
    )
}