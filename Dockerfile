FROM node:20-bookworm-slim as base

FROM base as builder

WORKDIR /home/node/app

COPY package*.json ./
COPY . .

RUN corepack enable pnpm
RUN pnpm install

ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

RUN pnpm build

FROM base as runtime

WORKDIR /home/node/app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /home/node/app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /home/node/app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /home/node/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /home/node/app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /home/node/app/build ./build

USER nextjs

EXPOSE 3000

CMD ["node", "dist/server.js"]
