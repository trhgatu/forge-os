FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Generate Prisma Client vào thư mục apps/api/prisma-client
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# Build dự án
RUN pnpm turbo build --filter=@forge/api

# Copy Prisma Client vào trong dist để NestJS nhận diện được khi chạy
RUN cp -r apps/api/prisma-client apps/api/dist/prisma-client

# Gom các dependencies cho production
RUN pnpm --filter @forge/api --prod deploy isolated

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy các dependencies sạch
COPY --from=base /app/isolated/node_modules ./node_modules

# Copy bản build (lúc này đã chứa prisma-client bên trong)
COPY --from=base /app/apps/api/dist ./dist

# Copy package.json
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]