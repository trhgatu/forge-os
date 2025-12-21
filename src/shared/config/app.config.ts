const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const APP_CONFIG = {
    auth: {
        // Auth config placeholders
    },
};
