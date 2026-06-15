import type { RealtimeChannel } from '@supabase/supabase-js'
import { isSupabaseConfigured as hasSupabaseConfig, supabase } from '../lib/supabaseClient'

export type SiteSettings = {
  liveMessagesEnabled: boolean
}

type SupabaseSiteSettingsRow = {
  id: string
  live_messages_enabled: boolean | null
  updated_at?: string | null
}

const SITE_SETTINGS_TABLE = 'site_settings'
const SITE_SETTINGS_ID = 'main'
const SITE_SETTINGS_STORAGE_KEY = 'wedding-site-settings'
export const SITE_SETTINGS_UPDATED_EVENT = 'site-settings-updated'

const defaultSiteSettings: SiteSettings = {
  liveMessagesEnabled: false,
}

function createRealtimeChannelName(baseName: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${baseName}:${crypto.randomUUID()}`
  }

  return `${baseName}:${Date.now()}:${Math.random().toString(36).slice(2)}`
}

function logSiteSettings(message: string, data?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[SupabaseMessages] ${message}`, data ?? '')
  }
}

function warnSiteSettings(message: string, error?: unknown) {
  if (import.meta.env.DEV) {
    console.warn(`[SupabaseMessages] ${message}`, error ?? '')
  }
}

function errorSiteSettings(message: string, error?: unknown) {
  console.error(`[SupabaseMessages] ${message}`, error ?? '')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isSiteSettingsSupabaseConfigured() {
  return hasSupabaseConfig && supabase !== null
}

function canUseLocalStorageFallback() {
  return import.meta.env.DEV && !isSiteSettingsSupabaseConfigured()
}

function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase no esta configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  }

  return supabase
}

function normalizeSettings(settings: Partial<SiteSettings> = {}): SiteSettings {
  return {
    liveMessagesEnabled: settings.liveMessagesEnabled === true,
  }
}

function mapSupabaseSiteSettings(row: SupabaseSiteSettingsRow): SiteSettings {
  return normalizeSettings({
    liveMessagesEnabled: row.live_messages_enabled === true,
  })
}

function getLocalSiteSettings(fallbackSettings: SiteSettings = defaultSiteSettings) {
  if (typeof window === 'undefined') {
    return fallbackSettings
  }

  const rawSettings = window.localStorage.getItem(SITE_SETTINGS_STORAGE_KEY)

  if (!rawSettings) {
    return fallbackSettings
  }

  try {
    const parsedSettings = JSON.parse(rawSettings)

    if (!isRecord(parsedSettings)) {
      return fallbackSettings
    }

    return normalizeSettings({
      liveMessagesEnabled:
        typeof parsedSettings.liveMessagesEnabled === 'boolean'
          ? parsedSettings.liveMessagesEnabled
          : fallbackSettings.liveMessagesEnabled,
    })
  } catch (error) {
    warnSiteSettings('Error leyendo configuracion local', error)
    return fallbackSettings
  }
}

function saveLocalSiteSettings(settings: SiteSettings) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SITE_SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new CustomEvent(SITE_SETTINGS_UPDATED_EVENT, { detail: settings }))
}

function getSettingsUserMessage(error: unknown) {
  const text = error instanceof Error ? error.message : String(error ?? '')
  const lowerText = text.toLowerCase()

  if (lowerText.includes('relation') && lowerText.includes('does not exist')) {
    return 'La tabla site_settings no existe en Supabase. Ejecuta el SQL de configuracion.'
  }

  if (lowerText.includes('row-level security') || lowerText.includes('permission denied')) {
    return 'Supabase rechazo el cambio por permisos. Revisa las politicas RLS de site_settings.'
  }

  return 'No se pudo guardar la configuracion de Mensajes.'
}

export async function getSiteSettings(fallbackSettings: SiteSettings = defaultSiteSettings) {
  const normalizedFallback = normalizeSettings(fallbackSettings)

  if (canUseLocalStorageFallback()) {
    logSiteSettings('Fallback localStorage activo para configuracion del sitio', normalizedFallback)
    return getLocalSiteSettings(normalizedFallback)
  }

  if (!isSiteSettingsSupabaseConfigured()) {
    return normalizedFallback
  }

  const client = getSupabaseClient()
  const { data, error } = await client
    .from(SITE_SETTINGS_TABLE)
    .select('*')
    .eq('id', SITE_SETTINGS_ID)
    .maybeSingle()

  if (error) {
    errorSiteSettings('Error cargando configuracion del sitio', error)
    throw new Error(getSettingsUserMessage(error))
  }

  if (!data) {
    return normalizedFallback
  }

  return mapSupabaseSiteSettings(data as SupabaseSiteSettingsRow)
}

export async function saveSiteSettings(settings: SiteSettings) {
  const normalizedSettings = normalizeSettings(settings)

  if (canUseLocalStorageFallback()) {
    saveLocalSiteSettings(normalizedSettings)
    logSiteSettings('Configuracion guardada en fallback localStorage', normalizedSettings)
    return normalizedSettings
  }

  const client = getSupabaseClient()
  const { data, error } = await client
    .from(SITE_SETTINGS_TABLE)
    .upsert({
      id: SITE_SETTINGS_ID,
      live_messages_enabled: normalizedSettings.liveMessagesEnabled,
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single()

  if (error || !data) {
    errorSiteSettings('Error guardando configuracion del sitio', error)
    throw new Error(getSettingsUserMessage(error))
  }

  const savedSettings = mapSupabaseSiteSettings(data as SupabaseSiteSettingsRow)
  logSiteSettings('Configuracion del sitio guardada', savedSettings)
  return savedSettings
}

function subscribeToLocalSiteSettings(callback: (settings: SiteSettings) => void, fallbackSettings: SiteSettings) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handleLocalUpdate = () => callback(getLocalSiteSettings(fallbackSettings))
  const handleStorage = (event: StorageEvent) => {
    if (event.key === SITE_SETTINGS_STORAGE_KEY) {
      handleLocalUpdate()
    }
  }

  window.addEventListener(SITE_SETTINGS_UPDATED_EVENT, handleLocalUpdate)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(SITE_SETTINGS_UPDATED_EVENT, handleLocalUpdate)
    window.removeEventListener('storage', handleStorage)
  }
}

export function subscribeToSiteSettings(
  callback: (settings: SiteSettings) => void,
  fallbackSettings: SiteSettings = defaultSiteSettings,
) {
  const normalizedFallback = normalizeSettings(fallbackSettings)

  if (canUseLocalStorageFallback()) {
    return subscribeToLocalSiteSettings(callback, normalizedFallback)
  }

  if (!isSiteSettingsSupabaseConfigured()) {
    return () => undefined
  }

  const client = getSupabaseClient()
  const channel: RealtimeChannel = client
    .channel(createRealtimeChannelName('site_settings_realtime'))
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: SITE_SETTINGS_TABLE,
        filter: `id=eq.${SITE_SETTINGS_ID}`,
      },
      (payload) => {
        const nextSettings = mapSupabaseSiteSettings(payload.new as SupabaseSiteSettingsRow)
        logSiteSettings('Realtime recibido para configuracion del sitio', nextSettings)
        callback(nextSettings)
      },
    )
    .subscribe((status) => {
      logSiteSettings('Estado realtime configuracion del sitio', status)
    })

  return () => {
    void client.removeChannel(channel)
  }
}
