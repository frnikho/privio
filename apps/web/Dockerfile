# Étape 1 : Builder avec Bun
FROM oven/bun:1.2.21 AS builder
WORKDIR /usr/src/app

# Installer Turbo globalement si tu es en monorepo
RUN bun add -g turbo

# Copier les sources
COPY . .

# Désactiver la télémétrie Turbo
ENV TURBO_TELEMETRY_DISABLED=1

# Prune pour ne garder que l’app web
RUN turbo prune @privio/web --docker

WORKDIR /usr/src/app/out/full

# Installer uniquement les deps de prod
RUN bun install --no-lockfile --production

# Installer turbo en dev (nécessaire pour la build)
RUN bun install turbo --dev

# Étape 2 : Build de l'app
FROM builder AS build
RUN turbo run build --filter=@privio/web

# Étape 3 : Image finale avec Nginx
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Copier le build de Vite
COPY --from=build /usr/src/app/out/full/apps/web/dist ./

# Exposer le port Nginx
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
