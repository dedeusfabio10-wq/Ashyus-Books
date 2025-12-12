
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Função auxiliar para obter variáveis de ambiente de forma segura
const getEnv = (viteKey: string, processKey?: string) => {
    try {
        // Tenta Vite
        const val = (import.meta as any).env?.[viteKey];
        if (val) return val;
    } catch(e) {}

    try {
        // Tenta Process
        if (typeof process !== 'undefined' && process.env) {
            return process.env[viteKey] || (processKey ? process.env[processKey] : undefined);
        }
    } catch(e) {}
    
    return undefined;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', 'SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY');

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    try {
        client = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
        console.warn("Falha ao inicializar Supabase Client:", e);
    }
} else {
    console.warn("Supabase URL ou Key não encontradas. O site rodará em modo offline/demo.");
}

// Exporta o cliente (pode ser null)
export const supabase = client;
