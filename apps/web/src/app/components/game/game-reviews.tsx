import type {Game} from "@privio/types/game";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {api} from "@app/lib/api.ts";
import Review from "@app/components/game/review.tsx";
import {ButtonGroup, IconButton, Pagination} from "@chakra-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

type Props = {
    game: Game
}

export default function GameReviews({game}: Props) {

    const [page, setPage] = useState(0);

    const { data } = useQuery({
        queryKey: ['review', page],
        queryFn: () => api.game.listReviews(game.id, page, 20),
        placeholderData: keepPreviousData,
    });

    if (!data) {
        return;
    }

    return (
        <div className={'flex flex-col gap-4'}>
            <p className={'text-2xl'}>Avis ({data.body.total})</p>
            <div className={'flex flex-col gap-8'}>
                <div className={'flex flex-col gap-4'}>
                    {data.body.reviews.map((r, i) => <Review review={r} key={`${r.user.id + i}`} />)}
                </div>
                <Pagination.Root siblingCount={10} count={data.body.total} pageSize={20} defaultPage={1} page={page+1}>
                    <ButtonGroup variant="outline" size="sm">
                        <Pagination.PrevTrigger asChild>
                            {page > 0 ? <IconButton onClick={() => setPage(page - 1)}>
                                <LuChevronLeft />
                                </IconButton> : null}
                        </Pagination.PrevTrigger>
                        <Pagination.Items
                            render={(page) => (
                                <IconButton onClick={() => setPage(page.value - 1)} variant={{ base: "outline", _selected: "subtle" }}>
                                    {page.value}
                                </IconButton>
                            )}
                        />
                        <Pagination.NextTrigger asChild>
                            {(page + 1) * 20 < data.body.total ? <IconButton onClick={() => setPage(page + 1)}>
                                <LuChevronRight />
                            </IconButton> : null }
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            </div>
        </div>
    )
}