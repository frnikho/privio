import { createFileRoute } from '@tanstack/react-router'
import {Button, Text} from '@chakra-ui/react';
import { TbDeviceGamepad } from "react-icons/tb";

export const Route = createFileRoute('/library/')({
  component: RouteComponent,
})

function RouteComponent() {

    return (
        <div className={'px-8 py-4 flex flex-col gap-8'}>
            <Text className={'text-4xl'}>Ma bibliothèque</Text>
            <Button className={'w-fit'}>Ajouter un jeu non référencé <TbDeviceGamepad/></Button>
        </div>
    )
}
