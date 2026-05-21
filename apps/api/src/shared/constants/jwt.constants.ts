export const JWT_CONSTANTS = {
  secret: 'FORGE_OS_SUPER_SECRET_KEY_2026_VERSION_FINAL',
  expiresIn: '15m',
  refreshSecret: 'FORGE_OS_REFRESH_SECRET_KEY_2026',
  refreshExpiresIn: '7d',
} as const;

export type JwtConstants = typeof JWT_CONSTANTS;
