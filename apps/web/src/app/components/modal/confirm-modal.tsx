import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";

type Props = {
    open: boolean;
    title: string;
    description?: string;
    updateOpen: (open: boolean) => void;
    onConfirm: () => void;
}

export default function ConfirmModal({open, updateOpen, onConfirm, title, description}: Props) {

    return (
        <Dialog.Root size={'md'} lazyMount open={open} onOpenChange={({open}) => updateOpen(open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body className={'flex flex-col gap-8'}>
                            {description}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Annuler</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={onConfirm}>Confirmer</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}