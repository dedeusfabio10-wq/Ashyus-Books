
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Função simplificada e SEGURA para Vite
// Removemos qualquer tentativa de ler process.env, pois isso quebra o build do Vite na Vercel
const getEnv = (key: string) => {
    try {
        // @ts-ignore
        return import.meta.env[key];
    } catch (e) {
        return undefined;
    }
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

let client: SupabaseClient | null = null;

console.log("Inicializando Supabase...", supabaseUrl ? "URL encontrada" : "URL ausente");

if (supabaseUrl && supabaseAnonKey) {
    try {
        client = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false
            }
        });
    } catch (e) {
        console.error("Falha ao inicializar Supabase Client:", e);
    }
} else {
    console.warn("Supabase URL ou Key não encontradas no import.meta.env.");
}

export const supabase = client;
    