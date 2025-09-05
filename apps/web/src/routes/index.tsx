import {createFileRoute} from '@tanstack/react-router'
import LatestGame from "@app/components/latest-game.tsx";
import MostRatedGame from "@app/components/most-rated-game.tsx";
import SearchGamePanel from "@app/components/search-game-panel.tsx";

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
    return (
        <div className={'flex flex-col gap-4'}>
            <SearchGamePanel/>
            <LatestGame/>
            <MostRatedGame/>
        </div>
    )
}