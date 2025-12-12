
export const INITIAL_BOOKS = [];

const getEnv = (key: string) => {
    try {
        // @ts-ignore
        return import.meta.env[key];
    } catch(e) {
        return undefined;
    }
};

export const ADMIN_USERNAME = getEnv('VITE_ADMIN_USERNAME');
export const ADMIN_PASSWORD = getEnv('VITE_ADMIN_PASSWORD');
