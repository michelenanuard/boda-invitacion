import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !String(supabaseUrl).includes('coloca_aqui') &&
  !String(supabaseAnonKey).includes('coloca_aqui')

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

if (import.meta.env.DEV) {
  console.log('[SupabaseConfig]', {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    isSupabaseConfigured,
  })
}
