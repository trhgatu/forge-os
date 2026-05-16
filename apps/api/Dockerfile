# --- STAGE BASE ---
FROM node:26-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# --- STAGE BUILDER ---
FROM base AS builder
# Copy các file cấu hình monorepo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages ./packages

# Cài đặt mọi thứ để build
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy mã nguồn
COPY . .

# Sinh Prisma Client cho bước build (Type safety)
RUN ./node_modules/.bin/prisma generate --schema=apps/api/prisma/schema.prisma

# Build API và các packages liên quan
RUN pnpm turbo build --filter=@forge/api

# --- STAGE RUNNER ---
FROM base AS runner
ENV NODE_ENV=production

# Copy cấu hình để cài prod dependencies
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
# Cần copy package.json của các workspace packages để pnpm link được
COPY --from=builder /app/packages ./packages

# Cài đặt duy nhất Prod Dependencies (Tạo ra node_modules vật lý chuẩn)
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --filter=@forge/api

# Copy kết quả đã build
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Sinh Prisma Client cuối cùng trong môi trường production
WORKDIR /app/apps/api
RUN npx prisma generate

# Bảo mật
RUN chown -R node:node /app
USER node

EXPOSE 3001
CMD ["node", "dist/main"]