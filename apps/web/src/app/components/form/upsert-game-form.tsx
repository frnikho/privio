import {useForm, useStore} from "@tanstack/react-form";
import {type FormEvent, useCallback, useMemo} from "react";
import type {CreateGameBody, Game, UpdateGameBody} from "@privio/types/game";
import {Button, Field, Input, NumberInput, RatingGroup, Textarea} from "@chakra-ui/react";
import {isValidUrl} from "@app/lib/url.ts";
import {api} from "@app/lib/api.ts";
import {toaster} from "@components/ui/toaster.tsx";
import {match} from "ts-pattern";

type Props = {
    game?: Game;
    type: 'create' | 'update';
    onGameUpsert: (game: Game) => void
}

export default function UpsertGameForm({onGameUpsert, game, type}: Props) {

    const form = useForm({
        defaultValues: {
            title: game?.title ?? '',
            description: game?.description ?? '',
            genre: game?.genre ?? '',
            picture: game?.picture ?? '',
            releaseDate: game?.releaseDate
                ? new Date(game.releaseDate).getFullYear().toString()
                : '2020',
            developer: game?.developer ?? '',
            publisher: game?.publisher ?? '',
            rating: game?.rating ?? 3,
        },
        onSubmit: ({value}) => {
            return match(type)
                .with('update', () => update(value))
                .with('create', () => create(value))
                .exhaustive();

        }
    });

    const create = useCallback((value: CreateGameBody) => {
        return api.game.create({
            ...value,
            releaseDate: new Date(new Date().setFullYear(Number.parseInt(value?.releaseDate), 0, 1))?.toISOString()
        }).then((value) => {
            if (value.status !== 201) {
                return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de la création du jeu", type: 'error'});
            }
            return onGameUpsert(value.body);
        }).catch(() => {
            toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de la création du jeu", type: 'error'});
        });
    }, [onGameUpsert]);

    const update = useCallback((value: UpdateGameBody) => {
        return api.game.update(game!.id, {
            ...value,
            releaseDate: value.releaseDate && new Date(new Date().setFullYear(Number.parseInt(value.releaseDate), 0, 1)).toISOString()
        }).then((value) => {
            if (value.status !== 200) {
                return toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de la mise à jour du jeu", type: 'error'});
            }
            return onGameUpsert(value.body);
        }).catch(() => {
            toaster.create({title: 'Erreur', description: "Une erreur est survenue lors de la mise à jour du jeu", type: 'error'});
        });
    }, [game, onGameUpsert]);

    const picture = useStore(form.store, (state) => state.values.picture)

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
        },
        [form],
    );

    const isImgValid = useMemo(() => isValidUrl(picture), [picture]);

    return (
        <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
            <form.Field name={'title'} children={(field) => (
                <Field.Root>
                    <Field.Label>Titre</Field.Label>
                    <Input variant='flushed' placeholder='Call of duty' value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                </Field.Root>
            )}/>
            <form.Field name={'description'} children={(field) => (
                <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea variant='flushed' placeholder='Call of Duty ou COD est une série de jeux vidéo de tir à la première personne sur la guerre, dont le premier opus est...' value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                </Field.Root>
            )}/>
            <form.Field name={'genre'} children={(field) => (
                <Field.Root>
                    <Field.Label>Genre</Field.Label>
                    <Input variant='flushed' placeholder='FPS' value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                </Field.Root>
            )}/>
            <form.Field name={'picture'} children={(field) => (
                <Field.Root>
                    <Field.Label>Image (url)</Field.Label>
                    <Input variant='flushed' placeholder='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U' value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                </Field.Root>
            )}/>
            {isImgValid && <img src={form.state.values.picture} alt="Game picture" className={'w-full object-cover h-[200px]'}/>}
            <div className={'grid grid-cols-2 gap-4'}>
                <form.Field name={'releaseDate'} children={(field) => (
                    <NumberInput.Root defaultValue={'2000'} variant={'flushed'} className={'flex flex-col gap-2'} value={field.state.value} onValueChange={(e) => field.handleChange(e.value)}>
                        <NumberInput.Label>Année de sortie</NumberInput.Label>
                        <NumberInput.Input />
                    </NumberInput.Root>
                )}/>
                <form.Field name={'rating'} children={(field) => (
                    <RatingGroup.Root
                        className={'flex flex-col gap-2'}
                        count={5}
                        value={field.state.value}
                        onValueChange={(e) => field.handleChange(e.value)}>
                        <RatingGroup.Label>Note</RatingGroup.Label>
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                    </RatingGroup.Root>
                )}/>

            </div>
            <div className={'grid grid-cols-2 gap-4'}>
                <form.Field name={'developer'} children={(field) => (
                    <Field.Root>
                        <Field.Label>Développeur</Field.Label>
                        <Input variant='flushed' placeholder='Activision' value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                    </Field.Root>
                )}/>
                <form.Field name={'publisher'} children={(field) => (
                    <Field.Root>
                        <Field.Label>Editeurs</Field.Label>
                        <Input variant='flushed' placeholder='Treyarch' value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)}/>
                    </Field.Root>
                )}/>
            </div>
            <form.Subscribe children={({canSubmit, isSubmitting}) => (
                <Button marginTop={6} type={'submit'} disabled={!canSubmit}>
                    {match(isSubmitting)
                        .with(true, () => 'Chargement...')
                        .otherwise(() => type === 'create' ? 'Créer' : 'Mettre à jour')
                    }
                </Button>
            )}/>
        </form>
    )

}