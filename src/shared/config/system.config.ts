export const SYSTEM_CONFIG = {
  identity: {
    githubUsername: "trhgatu",
    role: "System Architect",
    level: "Level 9",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000",
  },
};
