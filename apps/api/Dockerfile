FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# --- STAGE BUILDER ---
FROM base AS builder
# Copy files needed for dependency installation first (Better Caching)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma
COPY packages ./packages

# Cài đặt để build (chỉ những gì cần thiết cho workspace này)
RUN pnpm install --frozen-lockfile

# Bây giờ mới copy code
COPY . .

# Sinh Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build API
RUN pnpm turbo build --filter=@forge/api

# Deploy ra thư mục riêng
RUN pnpm --filter=@forge/api --prod deploy out/api

# --- STAGE RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# Bảo mật: Chạy với user node, không dùng root
ENV NODE_ENV=production
RUN chown -R node:node /app
USER node

# Copy từ builder
COPY --from=builder --chown=node:node /app/out/api ./

EXPOSE 3001

CMD ["node", "dist/main"]