import { useForm } from "@tanstack/react-form";
import {api} from "@app/lib/api.ts";
import {toaster} from "@components/ui/toaster.tsx";
import {type FormEvent, useCallback} from "react";
import {Button, Input} from "@chakra-ui/react";
import {match} from "ts-pattern";
import type {User} from "@privio/types/user";

type Props = {
    onRegistered: (user: User) => void;
}

export default function RegisterForm({onRegistered}: Props) {

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: ''
        },
        onSubmit: ({value}) => {
            api.auth.register(value).then(async (res) => {
                if (res.status !== 200) {
                    return toaster.create({title: 'Erreur', description: 'Impossible de créer un compte, merci de verifier vos informations', type: 'error'});
                }
                return onRegistered(res.body);
            })
        }
    });

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
        },
        [form],
    );

    return (
        <form onSubmit={handleSubmit} className={'flex flex-col gap-2'}>
            <form.Field name={'email'} children={(field) => (
                <>
                    <Input placeholder="Adresse email"
                           value={field.state.value}
                           onBlur={field.handleBlur}
                           onChange={(e) => field.handleChange(e.target.value)}/>
                </>
            )}/>
            <form.Field name={'password'} children={(field) => (
                <>
                    <Input placeholder="Mot de passe"
                           value={field.state.value}
                           type={'password'}
                           onBlur={field.handleBlur}
                           onChange={(e) => field.handleChange(e.target.value)}/>
                </>
            )}/>
            <div className={'grid grid-cols-2 gap-2'}>
                <form.Field name={'lastname'} children={(field) => (
                    <>
                        <Input placeholder="Nom"
                               value={field.state.value}
                               onBlur={field.handleBlur}
                               onChange={(e) => field.handleChange(e.target.value)}/>
                    </>
                )}/>
                <form.Field name={'firstname'} children={(field) => (
                    <>
                        <Input placeholder="Prénom"
                               value={field.state.value}
                               onBlur={field.handleBlur}
                               onChange={(e) => field.handleChange(e.target.value)}/>
                    </>
                )}/>
            </div>
            <form.Subscribe children={({canSubmit, isSubmitting}) => (
                <Button marginTop={6} type={'submit'} disabled={!canSubmit}>
                    {match(isSubmitting)
                        .with(true, () => 'Chargement...')
                        .otherwise(() => 'Se connecter')
                    }
                </Button>
            )}/>
        </form>
    )
}
