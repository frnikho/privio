import gameRepo from "@repo/game.repo";
import registerUser from "@application/auth/register-user";
import {db} from "@service/db.service";

const games = [
    {
        "title": "The Legend of Zelda: Breath of the Wild",
        "description": "Aventure en monde ouvert, exploration et énigmes dans un Hyrule vaste et vivant.",
        "genre": "Action-aventure",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
        "releaseDate": new Date('2017-03-03'),
        "developer": "Nintendo EPD",
        "publisher": "Nintendo",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "The Witcher 3: Wild Hunt",
        "description": "RPG narratif riche avec un monde ouvert, quêtes profondes et choix moraux.",
        "genre": "RPG",
        "picture": "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
        "releaseDate": new Date('2015-05-19'),
        "developer": "CD Projekt Red",
        "publisher": "CD Projekt",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Minecraft",
        "description": "Jeu bac à sable basé sur la créativité, l'exploration et la survie en blocs.",
        "genre": "Sandbox / Survival",
        "picture": "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Minecraft_image1600w.jpg",
        "releaseDate": new Date('2011-11-18'),
        "developer": "Mojang Studios",
        "publisher": "Mojang Studios / Microsoft",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Grand Theft Auto V",
        "description": "Action-aventure en monde ouvert, multiple protagonistes, banditisme et satire sociale.",
        "genre": "Action-aventure",
        "picture": "https://media.rockstargames.com/rockstargames-newsite/uploads/e4e67668228df3eb050e64232a664f454ab7b030.jpg",
        "releaseDate": new Date("2013-09-17"),
        "developer": "Rockstar North",
        "publisher": "Rockstar Games",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Half-Life 2",
        "description": "FPS narratif marquant avec une physique et une mise en scène révolutionnaires pour l'époque.",
        "genre": "FPS",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Half-Life_2_cover.jpg/250px-Half-Life_2_cover.jpg",
        "releaseDate": new Date('2004-11-16'),
        "developer": "Valve",
        "publisher": "Valve",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "The Elder Scrolls V: Skyrim",
        "description": "RPG ouvert avec un monde nordique immense, liberté de jeu et dizaines d'heures de contenu.",
        "genre": "RPG",
        "picture": "https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png",
        "releaseDate": new Date(2011-11-11),
        "developer": "Bethesda Game Studios",
        "publisher": "Bethesda Softworks",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Red Dead Redemption 2",
        "description": "Aventure narrative western en monde ouvert, accent sur l'immersion et les personnages.",
        "genre": "Action-aventure",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Red_Dead_Redemption_II.jpg/250px-Red_Dead_Redemption_II.jpg",
        "releaseDate": new Date("2018-10-26"),
        "developer": "Rockstar Studios",
        "publisher": "Rockstar Games",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Fortnite",
        "description": "Plateforme multijeu avec le mode Battle Royale devenu phénomène culturel.",
        "genre": "Battle Royale / Sandbox",
        "picture": "https://image.api.playstation.com/vulcan/ap/rnd/202505/3100/ef79f649e45961a7e6342ebf26bc827b8b9603d69b2fdb5c.png",
        "releaseDate": new Date("2017-07-25"),
        "developer": "Epic Games",
        "publisher": "Epic Games",
        "rating": 4,
        "createdBy": ""
    },
    {
        "title": "Portal 2",
        "description": "Jeu de réflexion à la première personne basé sur des portails et de l'humour noir.",
        "genre": "Puzzle-platform",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Portal2cover.jpg/250px-Portal2cover.jpg",
        "releaseDate": new Date('2011-04-18'),
        "developer": "Valve",
        "publisher": "Valve",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "DOOM (1993)",
        "description": "FPS culte qui a défini le genre à l'époque, action rapide et atmosphère démoniaque.",
        "genre": "FPS",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Doom_cover_art.jpg/250px-Doom_cover_art.jpg",
        "releaseDate": new Date("1993-12-10"),
        "developer": "id Software",
        "publisher": "id Software",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Counter-Strike: Global Offensive",
        "description": "FPS compétitif en équipes, pilier de l'esport et du jeu tactique.",
        "genre": "FPS / Esport",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/CSGOcoverMarch2020.jpg/250px-CSGOcoverMarch2020.jpg",
        "releaseDate": new Date('2012-08-21'),
        "developer": "Valve, Hidden Path Entertainment",
        "publisher": "Valve",
        "rating": 4,
        "createdBy": ""
    },
    {
        "title": "League of Legends",
        "description": "MOBA leader mondial, très axé compétition et stratégie d'équipe.",
        "genre": "MOBA / Esport",
        "picture": "https://www.pedagojeux.fr/wp-content/uploads/2019/11/1280x720_LoL.jpg",
        "releaseDate": new Date(2009-10-27),
        "developer": "Riot Games",
        "publisher": "Riot Games",
        "rating": 4,
        "createdBy": ""
    },
    {
        "title": "Super Mario Bros.",
        "description": "Plateformer classique qui a popularisé Mario et relancé l'industrie du jeu vidéo.",
        "genre": "Plateforme",
        "picture": "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png",
        "releaseDate": new Date("1985-09-13"),
        "developer": "Nintendo R&D4",
        "publisher": "Nintendo",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Final Fantasy VII",
        "description": "RPG japonais emblématique, récit épique et personnages marquants.",
        "genre": "RPG",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Final_Fantasy_VII_Box_Art.jpg/250px-Final_Fantasy_VII_Box_Art.jpg",
        "releaseDate": new Date("1997-01-31"),
        "developer": "Square (Square Enix)",
        "publisher": "Square / Square Enix",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Metal Gear Solid V: The Phantom Pain",
        "description": "Action/stealth en monde ouvert, fin de cycle pour Kojima chez Konami.",
        "genre": "Action-aventure / Stealth",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Metal_Gear_Solid_V_The_Phantom_Pain_cover.png/250px-Metal_Gear_Solid_V_The_Phantom_Pain_cover.png",
        "releaseDate": new Date('2015-09-01'),
        "developer": "Konami / Kojima Productions",
        "publisher": "Konami",
        "rating": 4,
        "createdBy": ""
    },
    {
        "title": "Halo: Combat Evolved",
        "description": "FPS phare sur Xbox, lancement de l'univers Halo et icône du multijoueur console.",
        "genre": "FPS",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/250px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg",
        "releaseDate": new Date("2001-11-15"),
        "developer": "Bungie",
        "publisher": "Microsoft Game Studios",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Super Mario Odyssey",
        "description": "Mario voyage à travers différents royaumes pour sauver Peach, accompagné de Cappy.",
        "genre": "Plateforme",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Super_Mario_Odyssey.jpg/250px-Super_Mario_Odyssey.jpg",
        "releaseDate": new Date("2017-10-27"),
        "developer": "Nintendo EPD",
        "publisher": "Nintendo",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Dark Souls",
        "description": "RPG d’action réputé pour sa difficulté et son univers mystérieux et interconnecté.",
        "genre": "Action RPG",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Dark_Souls_Cover_Art.jpg/250px-Dark_Souls_Cover_Art.jpg",
        "releaseDate": new Date("2011-09-22"),
        "developer": "FromSoftware",
        "publisher": "Bandai Namco Entertainment",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Pokémon Red and Blue",
        "description": "Les premiers jeux Pokémon, où les joueurs capturent, entraînent et combattent des créatures.",
        "genre": "RPG",
        "picture": "https://glitchworlds.com/Jeux/pokemon-red-and-blue-sequel/miniature/Pok%C3%A9mon%20Red%20and%20blue%20sequel%20miniature.png",
        "releaseDate": new Date("1996-02-27"),
        "developer": "Game Freak",
        "publisher": "Nintendo",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Tetris",
        "description": "Puzzle culte basé sur l’assemblage de pièces géométriques tombantes.",
        "genre": "Puzzle",
        "picture": "https://www.datocms-assets.com/145957/1744284280-tetris-mobile.png",
        "releaseDate": new Date("1984-06-06"),
        "developer": "Alexey Pajitnov",
        "publisher": "Spectrum Holobyte / Nintendo",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Overwatch",
        "description": "FPS multijoueur basé sur des héros uniques avec compétences spéciales.",
        "genre": "FPS / Hero Shooter",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/250px-Overwatch_cover_art.jpg",
        "releaseDate": new Date("2016-05-24"),
        "developer": "Blizzard Entertainment",
        "publisher": "Blizzard Entertainment",
        "rating": 4,
        "createdBy": ""
    },
    {
        "title": "Animal Crossing: New Horizons",
        "description": "Jeu de simulation sociale où le joueur développe son île avec des habitants animaux.",
        "genre": "Simulation",
        "picture": "https://ac-pocketcamp.com/_nuxt/img/bg.4659daa.png",
        "releaseDate": new Date("2020-03-20"),
        "developer": "Nintendo EPD",
        "publisher": "Nintendo",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Chrono Trigger",
        "description": "RPG japonais culte avec voyages dans le temps et scénario épique.",
        "genre": "RPG",
        "picture": "https://www.rpgamers.fr/images/rpgs/Chrono-Trigger-110421111944-2607-titre.jpg",
        "releaseDate": new Date("1995-03-11"),
        "developer": "Square",
        "publisher": "Square",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "The Last of Us",
        "description": "Action-aventure narrative suivant Joel et Ellie dans un monde post-apocalyptique.",
        "genre": "Action-aventure",
        "picture": "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
        "releaseDate": new Date("2013-06-14"),
        "developer": "Naughty Dog",
        "publisher": "Sony Computer Entertainment",
        "rating": 5,
        "createdBy": ""
    },
    {
        "title": "Street Fighter II",
        "description": "Jeu de combat emblématique qui a défini le genre et popularisé l’e-sport arcade.",
        "genre": "Combat",
        "picture": "https://upload.wikimedia.org/wikipedia/en/1/1d/SF2_JPN_flyer.jpg",
        "releaseDate": new Date("1991-02-06"),
        "developer": "Capcom",
        "publisher": "Capcom",
        "rating": 4,
        "createdBy": ""
    },
    {
        "title": "Mass Effect 2",
        "description": "RPG de science-fiction où le joueur mène l’équipage du Normandy dans une mission suicidaire.",
        "genre": "RPG / Action",
        "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/MassEffect2_cover.PNG/250px-MassEffect2_cover.PNG",
        "releaseDate": new Date("2010-01-26"),
        "developer": "BioWare",
        "publisher": "Electronic Arts",
        "rating": 5,
        "createdBy": ""
    },
    {
        title: "Super Mario 64",
        description: "Premier Mario en 3D, pionnier des jeux de plateforme 3D.",
        genre: "Platformer",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Super_Mario_64.png/250px-Super_Mario_64.png",
        releaseDate: new Date('1996-06-23'),
        developer: "Nintendo EAD",
        publisher: "Nintendo",
        rating: 5,
        createdBy: ""
    },
    {
        title: "The Legend of Zelda: Ocarina of Time",
        description: "Épopée 3D de Zelda, souvent citée comme l'un des meilleurs jeux de tous les temps.",
        genre: "Action-adventure",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/The_Legend_of_Zelda_Ocarina_of_Time.jpg/250px-The_Legend_of_Zelda_Ocarina_of_Time.jpg",
        releaseDate: new Date('1998-11-21'),
        developer: "Nintendo EAD",
        publisher: "Nintendo",
        rating: 5,
        createdBy: ""
    },
    {
        title: "Pac-Man",
        description: "Classique arcade, pionnier du game design simple et addictif.",
        genre: "Maze",
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pac-Man_gameplay.png/250px-Pac-Man_gameplay.png",
        releaseDate: new Date('1980-05-22'),
        developer: "Namco",
        publisher: "Namco / Midway (NA)",
        rating: 5,
        createdBy: ""
    },
    {
        title: "Frogger",
        description: "Arcade classique où il faut traverser routes et rivières pour sauver des grenouilles.",
        genre: "Action / Arcade",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Frogger_arcade_flyer.jpg/250px-Frogger_arcade_flyer.jpg",
        releaseDate: new Date('1981-08-01'), // page indique "August 1981" (jour exact non précisé)
        developer: "Konami",
        publisher: "Gremlin / Sega (distribution selon régions)",
        rating: 4,
        createdBy: ""
    },
    {
        title: "GoldenEye 007",
        description: "FPS influenceur sur N64 — campagne + multijoueur local emblématiques.",
        genre: "First-person shooter",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/GoldenEye_007_N64_cover.jpg/250px-GoldenEye_007_N64_cover.jpg",
        releaseDate: new Date('1997-08-23'),
        developer: "Rare",
        publisher: "Nintendo",
        rating: 5,
        createdBy: ""
    },
    {
        title: "Age of Empires",
        description: "RTS historique fondateur, combinaison d'économie et de guerre à travers les âges.",
        genre: "Real-time strategy",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Age_of_Empires_Coverart.jpg/250px-Age_of_Empires_Coverart.jpg",
        releaseDate: new Date('1997-10-13'),
        developer: "Ensemble Studios",
        publisher: "Microsoft",
        rating: 5,
        createdBy: ""
    },
    {
        title: "Harvest Moon",
        description: "Simulation agricole cosy (SNES) — a lancé une longue série cozy/farm-sim.",
        genre: "Farm simulation / RPG",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harvest_Moon_Coverart.png/250px-Harvest_Moon_Coverart.png",
        releaseDate: new Date('1996-08-09'),
        developer: "Amccus",
        publisher: "Pack-In-Video (JP) / Natsume (NA)",
        rating: 4,
        createdBy: ""
    },
    {
        title: "Call of Duty 4: Modern Warfare",
        description: "Révolution du FPS moderne — campagne cinématographique et multijoueur influent.",
        genre: "First-person shooter",
        picture: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/250px-Call_of_Duty_4_Modern_Warfare.jpg",
        releaseDate: new Date('2007-11-05'),
        developer: "Infinity Ward",
        publisher: "Activision",
        rating: 5,
        createdBy: ""
    }
]

const seedGame = () => {
    return gameRepo(db).create(games);
}

const seedUser = () => {
    return registerUser({
        body: {
            email: 'test@gmail.com',
            password: 'test123',
            firstname: 'John',
            lastname:  'Doe'
        }
    })
}

export const seed = () => {
    return seedUser().andThen(({user}) => {
        return gameRepo(db).create(games.map((game) => ({
            ...game,
            createdBy: user.id,
        })));
    });
}

seed().then(() => {
    console.log('Seeding done !');
    process.exit(0);
});