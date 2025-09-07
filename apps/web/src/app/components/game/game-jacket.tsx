import type {Game, Review} from "@privio/types/game";
import {useRouter} from "@tanstack/react-router";
import {FaStar} from "react-icons/fa";

type Props = {
    game: Game
    review?: Review['review'];
}

export function GameJacket({game, review}: Props) {

    const {navigate} = useRouter();

    const showReview = (review: Review['review']) => {
        return (
            <div className={'flex flex-row items-center'}>
                {[...Array(review.rating ?? 0).keys()].map(() => (
                    <FaStar className={'w-3'} color={'yellow'}/>
                ))}
                <p className={'ml-2 text-sm text-gray-500'}>({review.timePlayed} minutes)</p>
            </div>
        )
    }


    return (
        <div className={'cursor-pointer min-w-[300px]'} onClick={() => navigate({to: '/game/$gameId', params: {gameId: game.id}})}>
            <img className="w-[400px] h-48 object-cover rounded-lg" src={game.picture} alt={game.title}/>
            <p className={'py-2 px-1 text-xl font-semibold'}>{game.title}</p>
            {review && showReview(review)}
        </div>
    )
}