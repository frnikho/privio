import { useForm } from "@tanstack/react-form";
import {login} from "@app/lib/api.ts";
import {toaster} from "@components/ui/toaster.tsx";
import {type FormEvent, useCallback} from "react";
import {Button, Input} from "@chakra-ui/react";
import {match} from "ts-pattern";
import type {User} from "@privio/types/user";

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
            login(value.email, value.password).then(async (res) => {
                if (res.status !== 200) {
                    console.log(await res.json());
                    return toaster.create({title: 'Erreur', description: 'Email ou mot de passe incorrect', type: 'error'});
                }
                return onLogged(await res.json());
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
