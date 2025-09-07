import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {api} from "@app/lib/api.ts";
import {GameJacket} from "@app/components/game/game-jacket.tsx";
import {Button, ButtonGroup, IconButton, Menu, Pagination, Portal} from "@chakra-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {Link} from "@tanstack/react-router";

type Props = {
    userId: string;
}

export default function ListUserGame({userId}: Props) {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const { data } = useQuery({
        queryKey: ['user_game_page', page, limit],
        queryFn: () => api.game.listUserGames(userId, page, limit),
        placeholderData: keepPreviousData,
    });

    if (data && data.body.userGames.length > 0) {
        return (
            <div className={'flex flex-col gap-4 p-4'}>
                <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'}>
                    {data.body.userGames.map((userGame) => <GameJacket key={userGame.game.id} game={userGame.game} review={userGame}/>)}
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
                                        {[10, 20, 50, 100].map((i) => (
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
        )
    }

    if (data && data.body.userGames.length === 0) {
        return (
            <div className="flex flex-col justify-center ">
                <p className="text-lg">Aucun jeu dans votre bibliothèque.</p>
                <p className="text-lg">Cliquer <Link to={'/game'} className={'font-black cursor-pointer'}>ici</Link> pour trouver des jeux à ajouter a votre bibliothèques</p>
            </div>
        );
    }

    return (
        <div>

        </div>
    )
}