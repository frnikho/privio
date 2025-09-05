# Privio - Game App

## Constraints

| Side             | Stack   |
|------------------|---------|
| Frontend         | React   |
| API              | Express |
| Database         | SQL     |
| Containerization | Docker  |

## Features

### Authentication

Création de compte utilisateur avec login et mot de passe

### Backoffice

Ajout, suppression et modification de jeux avec les attributs suivants :

- Titre
- Note sur 5
- Temps passé sur le jeu
  Possibilité de rechercher et trier les jeux par :
- Titre
- Note
- Temps passé
- Date d’ajout

### Public side

Affichage des jeux les plus populaires (les mieux notés ou les plus joués)
Affichage des jeux récemment ajoutés
Recherche de jeux par titre

### Pagination

Pagination des résultats dans les espaces utilisateur et public




### Choix techniques

- Typebox
- Drizzle
- Tanstack Router, Query and Form
- Zustand
- Tailwind CSS
- Chakra UI


# Production
```bash
docker-compose -f docker-compose.prod.yml up --build
```