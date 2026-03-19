export default () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('❌ [Config] DATABASE_URL is missing in environment variables!');
  }

  return {
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/forge-os-fallback',
    databaseUrl: databaseUrl,
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
    },
  };
};
