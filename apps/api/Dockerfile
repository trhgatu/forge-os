FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Generate Prisma Client trước khi build
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

RUN pnpm turbo build --filter=@forge/api

# Sử dụng deploy để gom các file cần thiết
RUN pnpm --filter @forge/api --prod deploy isolated

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy các file từ bước build sang
COPY --from=base /app/isolated ./

# Copy thư mục dist của API
COPY --from=base /app/apps/api/dist ./dist

# QUAN TRỌNG: Copy cả thư mục node_modules/@prisma và .prisma để không bị lỗi thiếu module
COPY --from=base /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3001
CMD ["node", "dist/main"]