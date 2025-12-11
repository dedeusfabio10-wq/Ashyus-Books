
import { createClient } from '@supabase/supabase-js';

// No ambiente Vite/Vercel, usamos import.meta.env.
// O "process.env" causa erro de "process is not defined" e tela preta.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase URL ou Key não encontradas. O modo de persistência pode falhar.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
