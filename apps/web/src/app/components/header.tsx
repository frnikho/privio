import {useAuth} from "@app/hooks/auth.hook.ts";
import {Button, HStack, IconButton, Text} from "@chakra-ui/react";
import {match} from "ts-pattern";
import AuthModal from "@app/components/modal/auth-modal.tsx";
import {type ChangeEvent, useCallback, useState} from "react";
import {Link, useNavigate, useRouterState} from "@tanstack/react-router";
import { Input } from "@chakra-ui/react"
import { useSearchStore } from "@app/stores/search.store";
import {FaGamepad, FaUser} from "react-icons/fa";

export default function Header() {
    const {user, isAuthenticated} = useAuth();
    const {search, setSearch} = useSearchStore()
    const location = useRouterState({ select: (s) => s.location })
    const navigate = useNavigate();
    const [menu, setMenu] = useState<{open: boolean, type: 'login' | 'register'}>({open: false, type: 'login'});

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (location.pathname !== '/' && e.target.value.trim().length > 0) {
            return navigate({to: '/'});
        }
    }

    const showHeaderMenu = useCallback(() => {
        return match(isAuthenticated)
            .with(true, () => (
                <HStack spaceX={2}>
                    <IconButton onClick={() => navigate({to: '/library'})} rounded={10}><FaGamepad className={'w-3'}/></IconButton>
                    <Button onClick={() => navigate({to: '/account'})}>{user?.firstname} {user?.lastname} <FaUser className={'w-3'}/></Button>
                </HStack>
            ))
            .otherwise(() => (
                <HStack>
                    <Button onClick={() => setMenu({open: true, type: 'login'})}>Se connecter</Button>
                    <Button onClick={() => setMenu({open: true, type: 'register'})}>S'inscrire</Button>
                </HStack>
            ))
    }, [isAuthenticated, user, navigate]);

    return (
        <>
            <AuthModal open={menu.open} updateOpen={(o) => setMenu({open: o, type: menu.type})} type={menu.type}/>
            <div className={'p-4 h-20 flex flex-row justify-between items-center'}>
                <div className={'flex flex-row gap-4'}>
                    <Text className={'cursor-pointer'}>
                        <Link to={'/'}>Accueil</Link>
                    </Text>
                    <Text className={'cursor-pointer'}>
                        <Link to={'/game'}>Jeux</Link>
                    </Text>
                </div>
                <div className={'w-[400px]'}>
                    <Input placeholder="Entrer le nom d'un jeu" value={search} onChange={onChangeSearch} />
                </div>
                <div className={''}>
                    {showHeaderMenu()}
                </div>
            </div>
        </>
    )
}