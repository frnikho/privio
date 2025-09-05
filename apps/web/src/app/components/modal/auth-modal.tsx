import {CloseButton, Dialog, Portal} from "@chakra-ui/react"
import {match} from "ts-pattern";
import LoginForm from "@app/components/form/login-form.tsx";
import RegisterForm from "@app/components/form/register-form.tsx";
import {useCallback} from "react";
import {useAuth} from "@app/hooks/auth.hook.ts";
import type {User} from "@privio/types/user";
import {toaster} from "@components/ui/toaster.tsx";

type Props = {
    type: 'login' | 'register';
    open: boolean;
    updateOpen: (open: boolean) => void;
}

export default function AuthModal({open, updateOpen, type}: Props){

    const {login} = useAuth();

    const onLogged = useCallback((user: User) => {
        updateOpen(false);
        login(user)
        toaster.create({title: 'Bienvenue', description: 'Vous êtes maintenant connecté', type: 'success'});
    }, [login, updateOpen]);

    const onRegistered = useCallback((user: User) => {
        updateOpen(false);
        login(user)
        toaster.create({title: 'Bienvenue', description: 'Votre compte a bien été créé', type: 'success'});
    }, [login, updateOpen]);

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={({open}) => updateOpen(open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                {match(type)
                                    .with('login', () => 'Se connecter')
                                    .with('register', () => "S'inscrire")
                                    .exhaustive()}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {match(type)
                                .with('login', () => <LoginForm onLogged={onLogged}/>)
                                .with('register', () => <RegisterForm onRegistered={onRegistered}/>)
                                .exhaustive()}
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