import { Card } from "@chakra-ui/react";
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
        <Card.Root className={'min-w-[250px]'}>
            <Card.Body className={''} cursor={'pointer'} gap="2" onClick={() => navigate({to: '/game/$gameId', params: {gameId: game.id}})}>
                <img className="w-full h-48 object-cover rounded-lg" src={game.picture} alt={game.title}/>
                <Card.Title mt="2">{game.title}</Card.Title>
                {review && showReview(review)}
            </Card.Body>
        </Card.Root>
    )
}