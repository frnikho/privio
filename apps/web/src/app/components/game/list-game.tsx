import {useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {api} from "@app/lib/api.ts";
import {Button, ButtonGroup, IconButton, Menu, Pagination, Portal} from "@chakra-ui/react"
import {GameJacket} from "@app/components/game/game-jacket.tsx";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import CreateGameModal from "@app/components/modal/create-new-game.tsx";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "@tanstack/react-router";
import type {Game} from "@privio/types/game";

const limitOptions = [10, 20, 50, 100];

export default function ListGame() {

    const [menu, setMenu] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();

    const { data } = useQuery({
            queryKey: ['game_page', page, limit],
            queryFn: () => api.game.list(page, limit),
            placeholderData: keepPreviousData,
    });

    const onGameCreated = (game: Game) => {
        return navigate({to: '/game/$gameId', params: {gameId: game.id}});
    }

    if (data) {
        return (
            <>
                <CreateGameModal open={menu} onGameCreated={onGameCreated} updateOpen={setMenu}/>
                <div className={'flex flex-col gap-4 mt-4'}>
                    <Button className={'w-fit'} onClick={() => setMenu(true)}>Ajouter un nouveau jeu <FaPlus className={'w-2'}/></Button>
                    <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'}>
                        {data.body.games.map((game) => <GameJacket key={game.id} game={game}/>)}
                    </div>
                    <div className={'flex flex-row gap-4 items-center justify-between'}>
                        <Pagination.Root siblingCount={10} count={data.body.total} pageSize={limit} defaultPage={1} page={page+1}>
                            <ButtonGroup variant="outline" size="sm">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton onClick={() => setPage(page - 1)}>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>
                                <Pagination.Items
                                    render={(page) => (
                                        <IconButton onClick={() => setPage(page.value - 1)} variant={{ base: "outline", _selected: "solid" }}>
                                            {page.value}
                                        </IconButton>
                                    )}
                                />
                                <Pagination.NextTrigger asChild>
                                    <IconButton onClick={() => setPage(page + 1)}>
                                        <LuChevronRight />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                        <div>
                            <Menu.Root>
                                <Menu.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        {String(limit)} par page
                                    </Button>
                                </Menu.Trigger>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            {limitOptions.map((i) => (
                                                <Menu.Item onClick={() => {
                                                    setLimit(i)
                                                }} key={i} value={String(i)}>
                                                    {i}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}