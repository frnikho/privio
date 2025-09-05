import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import type {Game} from "@privio/types/game";
import AddUserGameForm from "@app/components/form/add-user-game-form.tsx";

type Props = {
    game: Game;
    open: boolean;
    updateOpen: (open: boolean) => void;
    onGameAdded: () => void
    userId: string;
}

export default function AddGameModal({open, updateOpen, game, onGameAdded, userId}: Props) {

    return (
        <Dialog.Root size={'md'} lazyMount open={open} onOpenChange={({open}) => updateOpen(open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Ajouter {game.title} à votre collection
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body className={'flex flex-col gap-8'}>
                            <img className={'h-full rounded-xl'} src={game.picture} alt={game.title}/>
                            <AddUserGameForm gameId={game.id} userId={userId} onGameAdded={onGameAdded}/>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}