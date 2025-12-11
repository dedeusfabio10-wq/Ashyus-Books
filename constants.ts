
export const INITIAL_BOOKS = [];

// No Vite (usado pela Vercel para React), acessamos variáveis via import.meta.env
// As variáveis DEVEM começar com VITE_ para serem visíveis no navegador.
export const ADMIN_USERNAME = (import.meta as any).env.VITE_ADMIN_USERNAME;
export const ADMIN_PASSWORD = (import.meta as any).env.VITE_ADMIN_PASSWORD;
