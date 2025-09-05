import {useForm} from "@tanstack/react-form";
import {type FormEvent, useCallback} from "react";
import {Button, Field, NumberInput, RatingGroup, Textarea} from "@chakra-ui/react";
import {match} from "ts-pattern";
import {api} from "@app/lib/api.ts";
import {toaster} from "@components/ui/toaster.tsx";

type Props = {
    onGameAdded: () => void;
    gameId: string;
    userId: string;
}

export default function AddUserGameForm({gameId, userId, onGameAdded}: Props) {

    const form = useForm({
        defaultValues: {
            gameId,
            rating: 3,
            timesPlayed: 0,
            notes: ''
        },
        onSubmit: ({value}) => {
            return api.game.addToLibrary(userId, {
                ...value,
                gameId,
            }).then(() => {
                toaster.create({title: 'Succès', description: "Le jeu a bien été ajouté à votre collection", type: 'success'});
                return onGameAdded()
            }).catch(() => {
                return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de l'ajout du jeu à votre collection", type: 'error'});
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
        <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
            <form.Field name={'notes'} children={(field) => (
                <Field.Root>
                    <Field.Label>Notes</Field.Label>
                    <Textarea placeholder={''} value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                </Field.Root>
            )}/>
            <form.Field name={'timesPlayed'} children={(field) => (
                <NumberInput.Root value={String(field.state.value)}
                                  onValueChange={(e) => field.handleChange(e.valueAsNumber)}>
                    <NumberInput.Label>Temps de jeu (en minutes)</NumberInput.Label>
                    <NumberInput.Input value={field.state.value}

                                       onChange={(e) => field.handleChange(e.currentTarget.valueAsNumber)}/>
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
                        .otherwise(() => 'Ajouter à ma librairie')
                    }
                </Button>
            )}/>
        </form>
    )
}