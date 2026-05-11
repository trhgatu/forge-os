import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "apps/api/prisma/schema.prisma",
  migrations: {
    path: "apps/api/prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL", "postgresql://localhost:5432/unused"),
  },
});
