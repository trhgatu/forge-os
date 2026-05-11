FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

# Cài đặt toàn bộ dependencies (bao gồm devDeps để build)
RUN pnpm install --frozen-lockfile

# Build dự án
RUN pnpm turbo build --filter=@forge/api

# Sử dụng pnpm deploy để tạo thư mục isolated chỉ chứa production deps
RUN pnpm --filter @forge/api --prod deploy isolated

# QUAN TRỌNG: Sinh Prisma Client trực tiếp vào thư mục isolated
# Điều này đảm bảo .prisma nằm đúng trong isolated/node_modules
RUN cd isolated && ../node_modules/.bin/prisma generate --schema=../apps/api/prisma/schema.prisma

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy mọi thứ từ isolated (đã có đủ node_modules và .prisma chuẩn)
COPY --from=base /app/isolated/node_modules ./node_modules
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]