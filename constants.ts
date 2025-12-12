
export const INITIAL_BOOKS = [];

const getEnv = (key: string) => {
    try {
        // Tenta Vite
        const val = (import.meta as any).env?.[key];
        if (val) return val;
    } catch(e) {}

    try {
        // Tenta Process
        if (typeof process !== 'undefined' && process.env) {
            return process.env[key];
        }
    } catch(e) {}
    
    return undefined;
};

export const ADMIN_USERNAME = getEnv('VITE_ADMIN_USERNAME');
export const ADMIN_PASSWORD = getEnv('VITE_ADMIN_PASSWORD');
