# Étape 1 : Base
FROM oven/bun:1.2.21 AS base
WORKDIR /usr/src/app

# Installer turbo globalement
RUN bun add -g turbo

# Copier le monorepo
COPY . .

# Désactiver télémétrie Turbo
ENV TURBO_TELEMETRY_DISABLED=1

# Étape 2 : Prune
RUN turbo prune @privio/api --docker

WORKDIR /usr/src/app/out/full

# Installer uniquement deps de prod
RUN bun install --no-lockfile --production

# Installer turbo en dev (pour la build)
RUN bun install turbo --dev

# Étape 3 : Build
FROM base AS build
WORKDIR /usr/src/app/out/full
COPY --from=base /usr/src/app/out/full ./
RUN turbo run build --filter=@privio/api...

# Étape 4 : Runner final
FROM oven/bun:1.2.21 AS final
WORKDIR /usr/src/app

# Copier node_modules et build final
COPY --from=build /usr/src/app/out/full .

# Nettoyer éventuels dev deps
RUN rm -rf node_modules && bun install --production --no-lockfile

# Exposer le port de l’API
EXPOSE 3000

# Lancer l’API Express
CMD ["bun", "apps/api/dist/app.js"]
