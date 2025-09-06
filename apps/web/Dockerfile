## Build stage
FROM oven/bun:1.2.21 AS builder
WORKDIR /usr/src/app

RUN bun add -g turbo

COPY . .

ENV TURBO_TELEMETRY_DISABLED=1

RUN turbo prune @privio/web --docker

WORKDIR /usr/src/app/out/full

RUN bun install --no-lockfile --production

RUN bun install turbo --dev

## Production stage
FROM builder AS build
RUN turbo run build --filter=@privio/web

## Final stage
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/out/full/apps/web/dist ./

COPY /apps/web/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]