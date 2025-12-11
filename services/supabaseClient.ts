
import { createClient } from '@supabase/supabase-js';

// Tenta pegar as variáveis de ambiente.
// Nota: Em um ambiente React/Vite puro, usamos import.meta.env ou process.env dependendo da config.
// Para compatibilidade geral aqui, usamos process.env, assumindo que o bundler vai injetar.
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase URL ou Key não encontradas. O modo de persistência pode falhar.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
