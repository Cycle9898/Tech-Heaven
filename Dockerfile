# syntax = docker/dockerfile:1.2

FROM node:20-bookworm-slim as base

FROM base as builder

WORKDIR /home/node/app

COPY package*.json ./
COPY . .

RUN corepack enable pnpm
RUN pnpm install

ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

# Include secret file content stored on Render inside the build
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env pnpm build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable pnpm
RUN pnpm install

COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
