FROM node:25-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @forge/api build
RUN pnpm --filter @forge/api --prod deploy isolated

FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/isolated ./

COPY --from=base /app/apps/api/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main"]