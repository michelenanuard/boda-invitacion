import type { RealtimeChannel } from '@supabase/supabase-js'
import { defaultWeddingContent } from '../data/weddingData'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import type { WeddingContent } from '../types/wedding'

export const WEDDING_CONTENT_STORAGE_KEY = 'wedding-invitation-content'
export const WEDDING_CONTENT_BASE_SIGNATURE_KEY = 'wedding-invitation-content-base-signature'
export const WEDDING_CONTENT_UPDATED_EVENT = 'wedding-content-updated'

const SITE_CONTENT_TABLE = 'site_content'
const SITE_CONTENT_ID = 'main'

type SiteContentRow = {
  id: string
  content: WeddingContent | Partial<WeddingContent> | null
  updated_at: string | null
}

export type PublishedWeddingContent = {
  content: WeddingContent
  updatedAt: string | null
}

function isQuotaExceededError(error: unknown) {
  return error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
}

function cloneContent(content: WeddingContent): WeddingContent {
  return JSON.parse(JSON.stringify(content)) as WeddingContent
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`
  }

  if (isRecord(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`
  }

  return JSON.stringify(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T
  }

  if (isRecord(base)) {
    if (!isRecord(override)) {
      return base
    }

    const result: Record<string, unknown> = { ...base }

    for (const [key, value] of Object.entries(override)) {
      const baseValue = result[key]

      if (baseValue === undefined) {
        result[key] = value
        continue
      }

      result[key] = deepMerge(baseValue, value)
    }

    return result as T
  }

  if (override === undefined || override === null || typeof override !== typeof base) {
    return base
  }

  return override as T
}

export function getDefaultWeddingContent(): WeddingContent {
  return cloneContent(defaultWeddingContent)
}

function normalizeWeddingContent(content: unknown): WeddingContent {
  if (!isRecord(content)) {
    return getDefaultWeddingContent()
  }

  return deepMerge(getDefaultWeddingContent(), content)
}

function createRealtimeChannelName(baseName: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${baseName}:${crypto.randomUUID()}`
  }

  return `${baseName}:${Date.now()}:${Math.random().toString(36).slice(2)}`
}

function logWeddingContent(message: string, data?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[SupabaseContent] ${message}`, data ?? '')
  }
}

function errorWeddingContent(message: string, error?: unknown) {
  console.error(`[SupabaseContent] ${message}`, error ?? '')
}

function getContentUserMessage(error: unknown) {
  const text = error instanceof Error ? error.message : String(error ?? '')
  const lowerText = text.toLowerCase()

  if (lowerText.includes('relation') && lowerText.includes('does not exist')) {
    return 'La tabla site_content no existe en Supabase. Ejecuta el SQL de configuracion.'
  }

  if (lowerText.includes('row-level security') || lowerText.includes('permission denied')) {
    return 'Supabase rechazo el cambio por permisos. Revisa las politicas RLS de site_content.'
  }

  return 'No se pudo guardar el contenido en Supabase.'
}

function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase no esta configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  }

  return supabase
}

function getBaseContentSignature() {
  return JSON.stringify({
    coupleDisplayName: defaultWeddingContent.coupleDisplayName,
    weddingDate: defaultWeddingContent.weddingDate,
    weddingTime: defaultWeddingContent.weddingTime,
    heroTitle: defaultWeddingContent.heroTitle,
    heroSubtitle: defaultWeddingContent.heroSubtitle,
    galleryCount: defaultWeddingContent.gallery.length,
    storyCount: defaultWeddingContent.story.length,
    faqCount: defaultWeddingContent.faq.length,
  })
}

export function getWeddingContent(): WeddingContent {
  if (typeof window === 'undefined') {
    return getDefaultWeddingContent()
  }

  const isAdminRoute = window.location.pathname.startsWith('/admin')

  if (import.meta.env.PROD && !isAdminRoute) {
    return getDefaultWeddingContent()
  }

  const baseContentSignature = getBaseContentSignature()
  const storedBaseContentSignature = window.localStorage.getItem(WEDDING_CONTENT_BASE_SIGNATURE_KEY)

  if (storedBaseContentSignature && storedBaseContentSignature !== baseContentSignature) {
    window.localStorage.removeItem(WEDDING_CONTENT_STORAGE_KEY)
  }

  if (!storedBaseContentSignature || storedBaseContentSignature !== baseContentSignature) {
    window.localStorage.setItem(WEDDING_CONTENT_BASE_SIGNATURE_KEY, baseContentSignature)
  }

  const rawContent = window.localStorage.getItem(WEDDING_CONTENT_STORAGE_KEY)

  if (!rawContent) {
    return getDefaultWeddingContent()
  }

  try {
    const parsedContent = JSON.parse(rawContent)

    if (!isRecord(parsedContent)) {
      return getDefaultWeddingContent()
    }

    return deepMerge(getDefaultWeddingContent(), parsedContent)
  } catch {
    return getDefaultWeddingContent()
  }
}

export async function getPublishedWeddingContent(): Promise<PublishedWeddingContent> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      content: getWeddingContent(),
      updatedAt: null,
    }
  }

  const { data, error } = await supabase
    .from(SITE_CONTENT_TABLE)
    .select('id, content, updated_at')
    .eq('id', SITE_CONTENT_ID)
    .maybeSingle()

  if (error) {
    errorWeddingContent('Error cargando contenido publicado', error)
    throw new Error(getContentUserMessage(error))
  }

  if (!data) {
    return {
      content: getDefaultWeddingContent(),
      updatedAt: null,
    }
  }

  const row = data as SiteContentRow

  return {
    content: normalizeWeddingContent(row.content),
    updatedAt: row.updated_at,
  }
}

export function saveWeddingContent(content: WeddingContent) {
  try {
    window.localStorage.setItem(WEDDING_CONTENT_STORAGE_KEY, JSON.stringify(content))
    window.localStorage.setItem(WEDDING_CONTENT_BASE_SIGNATURE_KEY, getBaseContentSignature())
    window.dispatchEvent(new CustomEvent(WEDDING_CONTENT_UPDATED_EVENT, { detail: content }))
  } catch (error) {
    if (isQuotaExceededError(error)) {
      throw new Error(
        'No hay espacio suficiente en el navegador para guardar estos cambios. Usa imagenes mas livianas o elimina algunas fotos cargadas.',
        { cause: error },
      )
    }

    throw error
  }
}

function cacheWeddingContentBestEffort(content: WeddingContent) {
  try {
    window.localStorage.setItem(WEDDING_CONTENT_STORAGE_KEY, JSON.stringify(content))
    window.localStorage.setItem(WEDDING_CONTENT_BASE_SIGNATURE_KEY, getBaseContentSignature())
  } catch (error) {
    if (isQuotaExceededError(error)) {
      window.localStorage.removeItem(WEDDING_CONTENT_STORAGE_KEY)
      logWeddingContent('Cache local omitido por falta de espacio; Supabase conserva el contenido.')
      return
    }

    throw error
  }
}

export async function savePublishedWeddingContent(content: WeddingContent): Promise<PublishedWeddingContent> {
  const normalizedContent = normalizeWeddingContent(content)

  if (!isSupabaseConfigured || !supabase) {
    saveWeddingContent(normalizedContent)
    logWeddingContent('Contenido guardado en fallback localStorage')
    return {
      content: normalizedContent,
      updatedAt: new Date().toISOString(),
    }
  }

  const client = getSupabaseClient()
  const { data, error } = await client
    .from(SITE_CONTENT_TABLE)
    .upsert({
      id: SITE_CONTENT_ID,
      content: normalizedContent,
      updated_at: new Date().toISOString(),
    })
    .select('id, content, updated_at')
    .single()

  if (error || !data) {
    errorWeddingContent('Error guardando contenido publicado', error)
    throw new Error(getContentUserMessage(error))
  }

  const row = data as SiteContentRow
  const savedContent = normalizeWeddingContent(row.content)

  if (stableStringify(savedContent) !== stableStringify(normalizedContent)) {
    throw new Error('Supabase respondió, pero el contenido guardado no coincide con los cambios enviados. Intenta nuevamente.')
  }

  const publishedContent = {
    content: savedContent,
    updatedAt: row.updated_at,
  }

  cacheWeddingContentBestEffort(publishedContent.content)
  window.dispatchEvent(new CustomEvent(WEDDING_CONTENT_UPDATED_EVENT, { detail: publishedContent.content }))
  logWeddingContent('Contenido publicado guardado', { updatedAt: publishedContent.updatedAt })
  return publishedContent
}

export function subscribeToPublishedWeddingContent(callback: (content: PublishedWeddingContent) => void) {
  if (!isSupabaseConfigured || !supabase) {
    return () => undefined
  }

  const client = getSupabaseClient()
  const channel: RealtimeChannel = client
    .channel(createRealtimeChannelName('site_content_realtime'))
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: SITE_CONTENT_TABLE,
        filter: `id=eq.${SITE_CONTENT_ID}`,
      },
      (payload) => {
        const row = payload.new as SiteContentRow
        const nextContent = {
          content: normalizeWeddingContent(row.content),
          updatedAt: row.updated_at,
        }

        logWeddingContent('Realtime recibido para contenido publicado', { updatedAt: nextContent.updatedAt })
        callback(nextContent)
      },
    )
    .subscribe((status) => {
      logWeddingContent('Estado realtime contenido publicado', status)
    })

  return () => {
    void client.removeChannel(channel)
  }
}

export function resetWeddingContent() {
  window.localStorage.removeItem(WEDDING_CONTENT_STORAGE_KEY)
  window.localStorage.setItem(WEDDING_CONTENT_BASE_SIGNATURE_KEY, getBaseContentSignature())
  window.dispatchEvent(new CustomEvent(WEDDING_CONTENT_UPDATED_EVENT, { detail: getDefaultWeddingContent() }))
}

export function exportWeddingContent() {
  return JSON.stringify(getWeddingContent(), null, 2)
}

export function importWeddingContent(json: string) {
  const parsedContent = JSON.parse(json) as WeddingContent

  if (!isRecord(parsedContent) || typeof parsedContent.coupleDisplayName !== 'string') {
    throw new Error('El archivo no parece ser un respaldo válido de la invitación.')
  }

  saveWeddingContent(deepMerge(getDefaultWeddingContent(), parsedContent))
}

export function hasCustomContent() {
  return typeof window !== 'undefined' && window.localStorage.getItem(WEDDING_CONTENT_STORAGE_KEY) !== null
}
