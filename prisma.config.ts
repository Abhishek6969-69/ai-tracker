// Prisma v5 does not expose `prisma/config`. Keep this file TS-safe for builds
// while still providing configuration for tooling that can read it.
// Env loading for local CLI usage (harmless in prod build):
import "dotenv/config";

const config = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

export default config as unknown as Record<string, unknown>;
