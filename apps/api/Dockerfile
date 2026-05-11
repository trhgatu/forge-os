FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Generate Prisma Client từ bên trong folder apps/api để đảm bảo vị trí node_modules
RUN cd apps/api && pnpm prisma generate

# Build dự án
RUN pnpm turbo build --filter=@forge/api

# Sử dụng pnpm deploy để lọc ra các dependencies cần thiết
RUN pnpm --filter @forge/api --prod deploy isolated

# QUAN TRỌNG: Copy thư mục .prisma từ apps/api vào isolated (Đây là nơi pnpm lưu nó trong monorepo)
RUN cp -r apps/api/node_modules/.prisma isolated/node_modules/

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy toàn bộ isolated/node_modules (lúc này đã có đủ .prisma và utils)
COPY --from=base /app/isolated/node_modules ./node_modules

# Copy bản build
COPY --from=base /app/apps/api/dist ./dist

# Copy package.json
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]