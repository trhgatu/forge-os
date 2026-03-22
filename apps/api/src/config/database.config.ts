export default () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      '❌ [Config] DATABASE_URL is missing! Kiểm tra lại file .env ở Root ngay ông giáo ơi.',
    );
  }

  return {
    databaseUrl: databaseUrl,

    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
    },
  };
};
