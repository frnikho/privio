import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import type {Game, UserGame} from "@privio/types/game";
import UpsertUserGameForm from "@app/components/form/upsert-user-game-form.tsx";

type Props = {
    game: Game;
    userGame: UserGame;
    open: boolean;
    updateOpen: (open: boolean) => void;
    onGameAdded: () => void
    userId: string;
}

export default function UpdateUserGameModal({open, updateOpen, game, userGame, onGameAdded, userId}: Props) {

    return (
        <Dialog.Root size={'md'} lazyMount open={open} onOpenChange={({open}) => updateOpen(open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Modifier votre avis
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body className={'flex flex-col gap-8'}>
                            <img className={'h-full rounded-xl'} src={game.picture} alt={game.title}/>
                            <UpsertUserGameForm userGame={userGame} gameId={game.id} userId={userId} onGameUpsert={onGameAdded}/>
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