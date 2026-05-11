FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Generate Prisma Client vào trong thư mục src/generated/client
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# Build dự án (NestJS sẽ gom cả thư mục generated vào dist)
RUN pnpm turbo build --filter=@forge/api

# Gom các dependencies cho production
RUN pnpm --filter @forge/api --prod deploy isolated

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy các dependencies sạch (đã được pnpm deploy lọc)
COPY --from=base /app/isolated/node_modules ./node_modules

# Copy bản build đã bao gồm Prisma Client bên trong
COPY --from=base /app/apps/api/dist ./dist

# Copy package.json để node nhận diện mode ES/CommonJS nếu cần
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]