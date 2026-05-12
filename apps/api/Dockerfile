FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

# 1. Cài đặt toàn bộ dependencies (bao gồm cả symlinks giữa các gói)
RUN pnpm install --frozen-lockfile

# 2. Sinh Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# 3. Build toàn bộ workspace (để có dist cho @forge/shared, v.v.)
RUN pnpm turbo build --filter=@forge/api

# --- STAGE RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 4. Copy node_modules (chứa các symlink)
COPY --from=base /app/node_modules ./node_modules

# 5. QUAN TRỌNG: Copy các gói nội bộ (chứa code đã build của shared packages)
COPY --from=base /app/packages ./packages

# 6. Copy bản build của API
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/main"]