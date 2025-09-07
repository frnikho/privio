import { useForm } from "@tanstack/react-form";
import {toaster} from "@components/ui/toaster.tsx";
import {type FormEvent, useCallback} from "react";
import {Button, Input} from "@chakra-ui/react";
import {match} from "ts-pattern";
import type {User} from "@privio/types/user";
import {api} from "@app/lib/api.ts";

type Props = {
    onLogged: (user: User) => void;
}

export default function LoginForm({onLogged}: Props) {

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        onSubmit: ({value}) => {
            api.auth.login(value).then(async (res) => {
                if (res.status !== 200) {
                    return toaster.create({title: 'Erreur', description: 'Email ou mot de passe incorrect', type: 'error'});
                }
                return onLogged(res.body);
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
