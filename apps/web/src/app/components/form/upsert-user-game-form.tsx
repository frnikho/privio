import {useForm} from "@tanstack/react-form";
import {type FormEvent, useCallback} from "react";
import {Button, Field, NumberInput, RatingGroup, Textarea} from "@chakra-ui/react";
import {match} from "ts-pattern";
import {api} from "@app/lib/api.ts";
import {toaster} from "@components/ui/toaster.tsx";
import type {UserGame, UserGameCreateBody, UserGameUpdateBody} from "@privio/types/game";

type Props = {
    userGame?: UserGame;
    onGameUpsert: () => void;
    gameId: string;
    userId: string;
}

export default function UpsertUserGameForm({gameId, userId, onGameUpsert, userGame}: Props) {

    const form = useForm({
        defaultValues: {
            gameId,
            rating: userGame?.rating ?? 3,
            timePlayed: userGame?.timePlayed ?? 0,
            notes: userGame?.notes ?? ''
        },
        onSubmit: ({value}) => {
            return match(!!userGame)
                .with(true, () => update(value))
                .with(false, () => create(value))
                .exhaustive();
        }
    });

    const create = useCallback((value: UserGameCreateBody) => {
        return api.game.addToLibrary(userId, {
            ...value,
            gameId,
        }).then((d) => {
            if (d.status !== 201) {
                return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de l'ajout du jeu à votre collection", type: 'error'});
            }
            toaster.create({title: 'Succès', description: "Le jeu a bien été ajouté à votre collection", type: 'success'});
            return onGameUpsert()
        }).catch(() => {
            return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de l'ajout du jeu à votre collection", type: 'error'});
        })
    }, [gameId, onGameUpsert, userId]);

    const update = useCallback((value: UserGameUpdateBody) => {
        return api.game.updateUserGame(userId, gameId, value).then((d) => {
            if (d.status !== 200) {
                return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de la mise à jour de votre avis", type: 'error'});
            }
            toaster.create({title: 'Succès', description: "Votre avis a bien été mis à jour", type: 'success'});
            return onGameUpsert()
        }).catch(() => {
            return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de la mise à jour de votre avis", type: 'error'});
        })
    }, [gameId, onGameUpsert, userId]);

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
        },
        [form],
    );

    return (
        <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
            <form.Field name={'notes'} children={(field) => (
                <Field.Root>
                    <Field.Label>Avis</Field.Label>
                    <Textarea placeholder={''} value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                </Field.Root>
            )}/>
            <form.Field name={'timePlayed'} children={(field) => (
                <NumberInput.Root value={String(field.state.value)}
                                  onValueChange={(e) => field.handleChange(e.valueAsNumber)}>
                    <NumberInput.Label>Temps de jeu (en minutes)</NumberInput.Label>
                    <NumberInput.Input/>
                </NumberInput.Root>
            )}/>
            <form.Field name={'rating'} children={(field) => (
                (<RatingGroup.Root className={'flex flex-col gap-2'}
                                   count={5}
                                   value={field.state.value}
                                   onValueChange={(e) => field.handleChange(e.value)} size="sm">
                        <RatingGroup.Label>Note</RatingGroup.Label>
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control/>
                    </RatingGroup.Root>
                )
            )}/>
            <form.Subscribe children={({canSubmit, isSubmitting}) => (
                <Button marginTop={6} type={'submit'} disabled={!canSubmit}>
                    {match(isSubmitting)
                        .with(true, () => 'Chargement...')
                        .otherwise(() => !userGame ? 'Ajouter à ma librairie' : 'Modifier mon avis')
                    }
                </Button>
            )}/>
        </form>
    )
}