FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY . .

# 1. Cài đặt toàn bộ dependencies
RUN pnpm install --frozen-lockfile

# 2. Sinh Prisma Client (lệnh này sẽ tạo ra thư mục .prisma ở đâu đó trong node_modules)
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# 3. Build dự án
RUN pnpm turbo build --filter=@forge/api

# 4. Deploy production dependencies vào thư mục isolated
RUN pnpm --filter @forge/api --prod deploy isolated

# 5. QUAN TRỌNG: Tìm và copy thư mục .prisma vào isolated (Sửa lỗi Module Not Found)
# Chúng ta tìm ở cả gốc và apps/api để đảm bảo không sót
RUN find node_modules -name ".prisma" -type d -exec cp -r {} isolated/node_modules/ \; || true

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy mọi thứ từ isolated sang runner
COPY --from=base /app/isolated/node_modules ./node_modules
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]