import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente. O terceiro argumento '' permite ler variáveis sem prefixo VITE_ no ambiente de build
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Tenta obter a chave de várias fontes possíveis (Vercel env, .env file)
  const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
    },
    define: {
      // Injeta a variável no código cliente de forma segura substituindo a string
      'process.env.API_KEY': JSON.stringify(apiKey),
    }
  };
});