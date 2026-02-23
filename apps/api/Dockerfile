FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api ./apps/api
COPY packages ./packages

RUN pnpm install --no-frozen-lockfile

RUN pnpm --filter @forge/api build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/node_modules ./node_modules
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]