FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

# 1. Cài đặt với cấu hình hoisted (đã có .npmrc)
RUN pnpm install --frozen-lockfile

# 2. Sinh Prisma Client vào đúng vị trí mặc định
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# 3. Build code NestJS
RUN pnpm turbo build --filter=@forge/api

# --- STAGE RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 4. Copy TOÀN BỘ node_modules từ gốc (vì chúng ta đã dùng hoisted layout nên mọi thứ đều ở đây)
COPY --from=base /app/node_modules ./node_modules

# 5. Copy bản build của API
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001

# Chạy lệnh
CMD ["node", "dist/main"]