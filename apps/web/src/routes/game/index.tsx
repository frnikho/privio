import { createFileRoute } from '@tanstack/react-router'
import ListGame from "@app/components/list-game.tsx";
import {Text} from '@chakra-ui/react';

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className={'p-8'}>
          <Text className={'text-3xl font-bold'}>Tout les jeux</Text>
          <ListGame/>
      </div>
  )
}
