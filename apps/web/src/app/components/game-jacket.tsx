import { Card } from "@chakra-ui/react";
import type {Game} from "@privio/types/game";
import {useRouter} from "@tanstack/react-router";

export function GameJacket({game}: {game: Game}) {

    const {navigate} = useRouter();

    return (
        <Card.Root className={'min-w-[250px]'}>
            <Card.Body className={''} cursor={'pointer'} gap="2" onClick={() => navigate({to: '/game/$gameId', params: {gameId: game.id}})}>
                <img className="w-full h-48 object-cover rounded-lg" src={game.picture} alt={game.title}/>
                <Card.Title mt="2">{game.title}</Card.Title>
            </Card.Body>
        </Card.Root>
    )
}