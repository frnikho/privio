import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import UpsertGameForm from "@app/components/form/upsert-game-form.tsx";
import type {Game} from "@privio/types/game";

type Props = {
    open: boolean;
    updateOpen: (open: boolean) => void;
    onGameCreated: (game: Game) => void
}

export default function CreateGameModal({open, updateOpen, onGameCreated}: Props) {

    return (
        <Dialog.Root size={'md'} lazyMount open={open} onOpenChange={({open}) => updateOpen(open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Ajouter un nouveau jeu</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body className={'flex flex-col gap-8'}>
                            <UpsertGameForm type={'create'} onGameUpsert={onGameCreated}/>
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