FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

# Cài đặt với lockfile mới (shamefully-hoist=true)
RUN pnpm install --frozen-lockfile

# Sinh Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build dự án
RUN pnpm turbo build --filter=@forge/api

# Deploy production dependencies
RUN pnpm --filter @forge/api --prod deploy isolated

# Đảm bảo .prisma được copy vào isolated
RUN find node_modules -name ".prisma" -type d -exec cp -r {} isolated/node_modules/ \; || true

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/isolated/node_modules ./node_modules
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]