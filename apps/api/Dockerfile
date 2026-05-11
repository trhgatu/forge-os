FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Generate Prisma Client vào thư mục cố định
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# Build dự án
RUN pnpm turbo build --filter=@forge/api

# Copy Prisma Client vào trong dist (đảm bảo cấu hình thư mục giống hệt src)
RUN mkdir -p apps/api/dist/prisma && cp -r apps/api/prisma/generated-client apps/api/dist/prisma/

# Lọc dependencies
RUN pnpm --filter @forge/api --prod deploy isolated

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy dependencies
COPY --from=base /app/isolated/node_modules ./node_modules

# Copy bản build (đã có sẵn prisma/generated-client bên trong)
COPY --from=base /app/apps/api/dist ./dist

# Copy package.json
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]