import {useSearchStore} from "@app/stores/search.store.ts";
import { useDebounce } from "@uidotdev/usehooks";
import {useEffect, useMemo} from "react";
import {useMutation} from "@tanstack/react-query";
import {searchGame} from "@app/lib/api.ts";
import {Text} from '@chakra-ui/react';
import {match, P} from "ts-pattern";
import {GameJacket} from "@app/components/game-jacket.tsx";

export default function SearchGamePanel() {

    const search = useSearchStore((s) => s.search);
    const debouncedSearch = useDebounce(search, 350);

    const { isPending, data, mutate } = useMutation({
        mutationFn: () => searchGame(debouncedSearch),
    })

    useEffect(() => {
        if (!debouncedSearch) {
            return
        }
        mutate()
    }, [debouncedSearch, mutate]);

    const showSearchResult = useMemo(() => {
        return match({isPending, data})
            .with({isPending: true}, () => <p>loading...</p>)
            .with({data: P.nonNullable}, ({data}) => (
                <div className={''}>
                    {data.games.length === 0 && <Text className={'text-lg'}>Aucun résultat</Text>}
                    {data.games.length > 0 && (
                        <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'}>
                            {data.games.map((game) => (
                                <GameJacket key={game.id} game={game}/>
                            ))}
                        </div>
                    )}
                </div>
            ))
            .otherwise(() => <p>loading</p>)
    }, [data, isPending])

    if (!search) {
        return;
    }

    return (
        <div className={'px-8 py-4 flex flex-col gap-4'}>
            <Text className={'text-2xl'}>Résultat pour: <span className={'font-bold'}>{search}</span></Text>
            {showSearchResult}
        </div>
    )

}